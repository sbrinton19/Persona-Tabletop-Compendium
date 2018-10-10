/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.PassiveType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.RecoveryType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ReductionType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.AilmentType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.BoostType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.MasteryType;

/**
 * The FlatPassiveSkill class is the server representation of the joined DB
 * tables skill & passive_skill with added DB & JSON Support
 * 
 * @author Stefan
 *
 */
public class FlatPassiveSkill extends FlatSkill {
	protected PassiveType passiveType;
	protected byte type;
	protected byte value;
	protected byte secondValue;
	private static String PASSIVESKILLSEARCH = null;
	private static String PASSIVESKILLINSERT = null;
	private static String PASSIVESKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link FlatPassiveSkill}
	 * 
	 * @param id
	 *            The Unique id for this skill
	 * @param name
	 *            The name of this skill
	 * @param cost
	 *            The cost in HP percentage or absolute SP for this skill
	 * @param element
	 *            The element of this skill as an {@link Element} enum
	 * @param minlevel
	 *            The recommended minimum level to learn this skill
	 * @param description
	 *            Additional description of this skill's effects
	 * @param allyCardId
	 *            The item id for the ally skill card for this skill
	 * @param mainCardId
	 *            The item id for the main skill card for this skill
	 * @param aoe
	 *            The size of this skill's area of effect
	 * @param passiveType
	 *            The type of effect this skill has as a {@link PassiveType}
	 *            enum
	 * @param type
	 *            The subtype of passive skill this is represented as a
	 *            {@code byte}
	 * @param value
	 *            A generic {@code byte} value to represent bonuses granted by
	 *            this skill
	 * @param secondValue
	 *            A generic {@code byte} value to represent a second bonus
	 *            granted by this skill, if it has one
	 */
	public FlatPassiveSkill(int id, String name, byte cost, Element element, byte minlevel, String description,
			int allyCardId, int mainCardId, byte aoe, PassiveType passiveType, byte type, byte value,
			byte secondValue) {
		super(id, name, cost, element, minlevel, description, allyCardId, mainCardId, aoe);
		this.passiveType = passiveType;
		this.type = type;
		this.value = value;
		this.secondValue = secondValue;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatPassiveSkill() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatPassiveSkill} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatPassiveSkill from
	 */
	public FlatPassiveSkill(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatPassiveSkill.class);
	}

	/**
	 * @return The type of effect this skill has as a {@link PassiveType} enum
	 */
	public PassiveType getPassiveType() {
		return passiveType;
	}

	/**
	 * @return The subtype of passive skill this is represented as a {@code
	 * byte}
	 */
	public byte getType() {
		return type;
	}

	/**
	 * @return A generic {@code byte} value to represent bonuses granted by this
	 *         skill
	 */
	public byte getValue() {
		return value;
	}

	/**
	 * @return A generic {@code byte} value to represent a second bonus granted
	 *         by this skill, if it has one
	 */
	public byte getSecondValue() {
		return secondValue;
	}

	/**
	 * @param replace
	 *            Should the description field be replaced with the compiled
	 *            description
	 * @return A complete description compiled from the values of this skill's
	 *         fields
	 */
	public String getCompiledDescription(boolean replace) {
		StringBuilder sb = new StringBuilder();
		if (this.type == 0 || this.passiveType == PassiveType.IRREGULAR) {
			// All type 0s correspond to being special
			// So it should just use the description
		} else if (this.passiveType == PassiveType.BOOST) {
			BoostType boost = BoostType.fromByteStatic(this.type);
			if (boost == BoostType.AILMENT) {
				AilmentType ailment = AilmentType.fromByteStatic(this.value);
				sb.append(String.format("Reduce FV for attacks that inflict %s by %s", ailment.asString(), this.type));
			} else {
				Element element = Element.fromByteStatic(this.value);
				sb.append(String.format("+%d%% to all %s damage", this.type, element.asString()));
			}
		} else if (this.passiveType == PassiveType.REDUCTION) {
			ReductionType reduction = ReductionType.fromByteStatic(this.type);
			if (reduction == ReductionType.RESISTAILMENT || reduction == ReductionType.NULLAILMENT) {
				AilmentType ailment = AilmentType.fromByteStatic(this.value);
				if (reduction == ReductionType.RESISTAILMENT) {
					sb.append(
							String.format("When you would be afflicted with %s, roll a d20 on an 11+ it misses instead",
									ailment.asString()));
				} else {
					sb.append(String.format("Nullify %s", ailment.asString()));
				}
			} else {
				Element element = Element.fromByteStatic(this.value);
				if (reduction == ReductionType.RESISTELEMENT) {
					sb.append(String.format("Halve all %s", element.asString()));
				} else if (reduction == ReductionType.NULLELEMENT) {
					sb.append(String.format("Nullify all %s attacks", element.asString()));
				} else {
					if (reduction == ReductionType.REPEL) {
						sb.append(String.format("Reflect all %s damage back to attacker", element.asString()));
					} else {
						sb.append(String.format("All %s damage is treated as healing", element.asString()));
					}
					if (element == Element.CURSE || element == Element.BLESS) {
						sb.append("; Instakill attacks are nullified");
					}
				}
			}
		} else if (this.passiveType == PassiveType.DODGE) {
			Element element = Element.fromByteStatic(this.value);
			sb.append(String.format("When targeted by %s attacks, roll d20, on a %d or higher you dodge the attack",
					element.asString(), this.type));
		} else if (this.passiveType == PassiveType.COUNTER) {
			sb.append(String.format(
					"Every time you are hit with a Physical or Gun attack, roll d20, on a %d-20 repel the attack",
					this.value));
		} else if (this.passiveType == PassiveType.RECOVER) {
			RecoveryType recovery = RecoveryType.fromByteStatic(this.type);
			if (recovery == RecoveryType.AILMENT) {
				sb.append(String.format("%s %d turns", recovery.asString(), this.value));
			} else if (recovery == RecoveryType.HPSP) {
				sb.append(String.format("Heal %d%s & %d%s a turn", this.value, RecoveryType.HP.asString(),
						this.secondValue, RecoveryType.SP.asString()));
			} else {
				sb.append(String.format("Heal %d%s a turn", this.value, recovery.asString()));
			}
		} else if (this.passiveType == PassiveType.GROWTH) {
			String extraS = this.value > 1 ? "s" : "";
			sb.append(String.format("Allows %d active ally skill%s at no cost", this.value, extraS));
		} else if (this.passiveType == PassiveType.MASTER || this.passiveType == PassiveType.CHAIN) {
			MasteryType mastery = MasteryType.fromByteStatic(this.type);
			String godLevel;
			String formatString;
			if (this.type % 2 == 1 && this.passiveType == PassiveType.MASTER) {
				godLevel = (this.value == 2 ? "half" : "a quarter");
				formatString = "Reduces skill %s cost by %s";

			} else {
				if (this.type % 2 == 0) {
					godLevel = (this.value == 2 ? " to all allies" : "");
					formatString = "Grants %s%s";
				} else {
					godLevel = (this.value == 2 ? "4" : "2");
					formatString = "Restores %2$s%% %1$s";
				}
				if (this.passiveType == PassiveType.MASTER) {
					formatString = formatString.concat(" at the outbreak of combat");
				} else {
					formatString = formatString.concat(" after a baton pass");
				}
			}
			sb.append(String.format(formatString, mastery.asString(), godLevel));
		} else {
			RecoveryType recovery = RecoveryType.fromByteStatic(this.type);
			if (recovery == RecoveryType.AILMENT) {
				sb.append(String.format("%s %d turns", recovery.asString(), this.value));
			} else {
				if (this.value != -1) {
					if (this.passiveType == PassiveType.POST) {
						sb.append("Gain ");
					} else {
						sb.append("Heal ");
					}
					if (recovery == RecoveryType.HPSP) {
						sb.append(String.format("%d%s & %d%s", this.value, RecoveryType.HP.asString(), this.secondValue,
								RecoveryType.SP.asString()));
					} else {
						sb.append(String.format("%d%s", this.value, recovery.asString()));
					}
				} else {
					sb.append("Fully restore HP & SP");
				}
				if (this.passiveType == PassiveType.RECOVER) {
					sb.append(" a turn");
				} else if (this.passiveType == PassiveType.KILL) {
					sb.append(" when you kill an enemy");
				} else if (this.passiveType == PassiveType.POST) {
					sb.append(" after combat if you did not die");
				}
			}
		}
		if (this.description.length() > 0) {
			sb.append(this.description);
		}
		String aoe = this.getAoE();
		if (aoe.length() > 0) {
			sb.append("; ");
			sb.append(aoe);
		}
		if (replace)
			this.description = sb.toString();
		return sb.toString();
	}
	
	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatSkill#write(JsonWriter) super.write(out)} but does not call
	 * {@link JsonWriter#endObject() out.endObject()}. This is to enable
	 * subclasses to call this method to serialize their common fields. The
	 * top-level caller should be the only method to call the "closing brace"
	 * {@link JsonWriter#endObject()}
	 * 
	 * @param out
	 *            A {@link JsonWriter} for output
	 * @throws IOException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InstantiationException
	 */
	public void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, FlatPassiveSkill.class);
	}

	/**
	 * This method is an implementation of
	 * {@link DatabaseObject#read(JsonReader, String)} for JSON deserialization.
	 * 
	 * @param in
	 *            A {@link JsonReader} for the JSON
	 * @param name
	 *            The name of the {@link Field} to read into this object
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException {
		if (!read(in, name, FlatPassiveSkill.class)) {
			// We struck out check if the superclass has what were looking for
			super.read(in, name);
		}
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatPassiveSkill.PASSIVESKILLSEARCH != null)
			return;
		FlatPassiveSkill.PASSIVESKILLSEARCH = "SELECT * FROM passive_skill WHERE passive_skill.skillid = ?";
		String insertTemplate = "INSERT INTO passive_skill(skillid,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE passive_skill SET %s WHERE skillid = ?";
		String[] built = fieldBuilder(FlatPassiveSkill.class);
		FlatPassiveSkill.PASSIVESKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatPassiveSkill.PASSIVESKILLUPDATE = String.format(updateTemplate, built[2]);
	}

	/**
	 * Shorthand function to check if a given field should not be considered
	 * when reading/writing from JSON or the database
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the field is one to read/write, true if it should be
	 *         ignored when reading/writing
	 */
	protected boolean isIgnoredField(String name) {
		return name.equals("PASSIVESKILLINSERT") || name.equals("PASSIVESKILLUPDATE")
				|| name.equals("PASSIVESKILLSEARCH") || name.equals("PASSIVESKILLDELETE");
	}

	/**
	 * Shorthand function to check if a given field should only be used for
	 * reading/writing JSON
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the field is only present in JSON, false otherwise
	 */
	protected boolean isJsonOnly(String name) {
		// No JSON unique fields
		return false;
	}

	/**
	 * Shorthand function to check if a given field should only be used for
	 * reading/writing database entries
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the field is only present in database entries, false
	 *         otherwise
	 */
	protected boolean isDatabaseOnly(String name) {
		// No database unique fields
		return false;
	}

	/**
	 * Shorthand function for checking if a given field is not changed by an
	 * update in the database. Note: This method does not check if a field is an
	 * ignored field. So, this method should always be prefaced with
	 * {@link #isIgnoredField(String name) isIgnoredField} to check for ignored
	 * fields
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the given field should not be updated when performing a
	 *         SQL update
	 */
	protected boolean isIgnoredUpdateField(String name) {
		// All members of FlatPassiveSkill are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatPassiveSkill
	 * FlatPassiveSkill's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the passive_skill table for
	 *         this FlatPassiveSkill's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectPassiveSkill(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatPassiveSkill.PASSIVESKILLSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatPassiveSkill
	 * FlatPassiveSkill's} base data into the skill table and if successful,
	 * then inserts the FlatPassiveSkill data into the passive_skill side table
	 * or updates it if a matching orphan entry is found
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, false if
	 *         otherwise
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		if (super.databaseInsert(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * This method updates {@code this} {@link FlatPassiveSkill
	 * FlatPassiveSkill's} entry in the skill table and if successful, then
	 * updates its passive_skill side table entry or if there is no
	 * corresponding side table entry, inserts it
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false if
	 *         otherwise
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		if (super.databaseUpdate(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * Queries the passive_skill side table to see if we are updating or
	 * inserting and then performs the appropriate action
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false if
	 *         otherwise
	 */
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectPassiveSkill(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatPassiveSkill.PASSIVESKILLINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatPassiveSkill.PASSIVESKILLUPDATE);
				isInsert = false;
			}
			insertUpdate(state, isInsert);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method parameterizes and executes the database inserts and updates
	 * due to their similarity
	 * 
	 * @param prep
	 *            The {@link PreparedStatement} to parameterize and execute
	 * @param insert
	 *            Whether we are inserting or updating
	 * @throws SQLException
	 */
	private void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.getId());
			bump = 1;
		}
		prep.setByte(1 + bump, this.passiveType.getValue());
		prep.setByte(2 + bump, this.type);
		if (this.value == -1) {
			prep.setNull(3 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setByte(3 + bump, this.value);
		}
		if (this.secondValue == -1) {
			prep.setNull(4 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setByte(4 + bump, this.secondValue);
		}
		if (!insert) {
			prep.setInt(5, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete passive_skill table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeletePassiveSkill(Connection conn) {
		// TODO Auto-generated method stub
	}
}
