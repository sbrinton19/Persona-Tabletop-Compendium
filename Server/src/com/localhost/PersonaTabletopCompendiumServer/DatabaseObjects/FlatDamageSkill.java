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
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.DamageMultiplier;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;

/**
 * The FlatDamageSkill class is the server representation of the joined DB
 * tables skill & damage_skill with added DB & JSON Support
 * 
 * @author Stefan
 *
 */
public class FlatDamageSkill extends FlatSkill {
	protected byte maxDamageDice;
	protected DamageMultiplier multiplier;
	protected byte damageBonus;
	protected byte damageDie;
	private static String DAMAGESKILLSEARCH = null;
	private static String DAMAGESKILLINSERT = null;
	private static String DAMAGESKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link FlatDamageSkill}
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
	 * @param maxDamageDice
	 *            The maximum number of damage dice rolled for this attack
	 * @param multiplier
	 *            The amount the raw damage is multiplied by before being
	 *            assessed
	 * @param damageBonus
	 *            The amount of fixed damage added to the raw damage
	 * @param damageDie
	 *            The number of sides of the damage die for this skill
	 */
	public FlatDamageSkill(int id, String name, byte cost, Element element, byte minlevel, String description,
			int allyCardId, int mainCardId, byte aoe, byte maxDamageDice, DamageMultiplier multiplier, byte damageBonus,
			byte damageDie) {
		super(id, name, cost, element, minlevel, description, allyCardId, mainCardId, aoe);
		this.maxDamageDice = maxDamageDice;
		this.multiplier = multiplier;
		this.damageBonus = damageBonus;
		this.damageDie = damageDie;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatDamageSkill() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatDamageSkill} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatDamageSkill from
	 */
	public FlatDamageSkill(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatDamageSkill.class);
	}

	/**
	 * @return The maximum number of damage dice rolled for this attack
	 */
	public byte getMaxDamageDice() {
		return maxDamageDice;
	}

	/**
	 * @return The amount the raw damage is multiplied by before being assessed
	 */
	public DamageMultiplier getMultiplier() {
		return multiplier;
	}

	/**
	 * @return The amount of fixed damage added to the raw damage
	 */
	public byte getDamageBonus() {
		return damageBonus;
	}

	/**
	 * @return The number of sides of the damage die for this skill
	 */
	public byte getDamageDie() {
		return damageDie;
	}

	/**
	 * @param replace
	 *            Should the description field be replaced with the compiled
	 *            description
	 * @return A complete description compiled from the values of this skill's
	 *         fields
	 */
	public String getCompiledDescription(boolean replace) {
		return getCompiledDescription(replace, "");
	}

	/**
	 * This version of getCompiledDescription is to let
	 * {@link FlatDamageAilmentSkill} insert its Ailment description into the
	 * desired place in the compiled description
	 * 
	 * @param replace
	 *            Should the description field be replaced with the composed
	 *            description
	 * @param ailment
	 *            The ailment description for a FlatDamageAilmentSkill
	 * @return the complete description composed using the fields of this class
	 */
	protected String getCompiledDescription(boolean replace, String ailment) {
		StringBuilder sb = new StringBuilder();
		String closingParen = "";
		boolean noMax = false;
		if (this.multiplier == DamageMultiplier.NONE) {
			// Multiplier of none means no damage calculation
		} else {
			// Construct up to the multiplier
			if (this.element == Element.HEALING) {
				sb.append("Heals ");
				if (this.multiplier != DamageMultiplier.LIGHT) {
					sb.append(DamageMultiplier.getPrettyString(this.multiplier.getValue() * 2.0));
					sb.append("*(");
					closingParen = ")";
				}
			} else {
				sb.append("Deals ");
				if (this.multiplier != DamageMultiplier.MEDIUM) {
					sb.append(this.multiplier.getPrettyString());
					sb.append("*(");
					closingParen = ")";
				}
			}
			// Construct up to the damage bonus
			if (this.damageDie < 0 && this.maxDamageDice < 0) {
				// Negative damage values mean we should ignore whatever
				// Standard form is used for a given element and use the default
				// form
				noMax = true;
				sb.append(String.format("%dd%d", -1 * this.maxDamageDice, -1 * this.damageDie));
			} else if (this.element == Element.GUN) {
				noMax = true;
				sb.append(String.format("%dd%d", this.maxDamageDice, this.damageDie));
			} else if (this.element == Element.PHYSICAL) {
				sb.append(String.format("(STR Bonus)d%d + PAB", this.damageDie));
			} else if (Element.GUN.getValue() < this.element.getValue()
					&& this.element.getValue() < Element.BLESS.getValue()) {
				sb.append(String.format("(MAG Bonus)d%d + (MAG Bonus)", this.damageDie));
			} else if (Element.NUKE.getValue() < this.element.getValue()
					&& this.element.getValue() < Element.SUPPORT.getValue()) {
				sb.append(String.format("(MAG Bonus)d%d + 2*(MAG Bonus)", this.damageDie));
			}
			// Add non-zero damage bonuses
			if (this.damageBonus != 0) {
				sb.append(String.format(" + %d", this.damageBonus));
			}
			// Closing parenthesis for skills with a damage multiplier other
			// than 1
			sb.append(closingParen);
			// Skills that have a variable damage dice need to print their max
			if (!noMax) {
				sb.append(String.format("; Max %dd%d", this.maxDamageDice, this.damageDie));
			}
		}

		if (this.description.length() > 0) {
			if (sb.length() > 0) {
				sb.append("; ");
			}
			sb.append(this.description);
		}

		if (ailment.length() > 0) {
			if (sb.length() > 0) {
				sb.append("; ");
			}
			sb.append(ailment);
		}
		String aoe = this.getAoE();
		if (aoe.length() > 0) {
			sb.append("; ");
			sb.append(aoe);
		}

		if (replace) {
			this.description = sb.toString();
		}
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
		write(out, FlatDamageSkill.class);
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
		if (!read(in, name, FlatDamageSkill.class)) {
			// We struck out check if the super class has what were looking for
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
		if (FlatDamageSkill.DAMAGESKILLSEARCH != null)
			return;
		FlatDamageSkill.DAMAGESKILLSEARCH = "SELECT * FROM damage_skill WHERE damage_skill.skillid = ?";
		String insertTemplate = "INSERT INTO damage_skill(skillid,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE damage_skill SET %s WHERE skillid = ?";
		String[] built = fieldBuilder(FlatDamageSkill.class);
		FlatDamageSkill.DAMAGESKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatDamageSkill.DAMAGESKILLUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("DAMAGESKILLINSERT") || name.equals("DAMAGESKILLUPDATE") || name.equals("DAMAGESKILLSEARCH")
				|| name.equals("DAMAGESKILLDELETE");
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
		// All members of FlatDamageSkill are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatDamageSkill FlatDamageSkill's}
	 * id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the damage_skill table for
	 *         this FlatDamageSkill's skillId
	 * @throws SQLException
	 */
	public ResultSet databaseSelectDamageSkill(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatDamageSkill.DAMAGESKILLSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatDamageSkill
	 * FlatDamageSkill's} base data into the skill table and if successful, then
	 * inserts the DamageSkill data into the damage_skill side table or updates
	 * it if a matching orphan entry is found
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		if (super.databaseInsert(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * This method updates {@code this} {@link FlatDamageSkill
	 * FlatDamageSkill's} entry in the skill table and if successful, then
	 * updates its damage_skill side table entry or if there is no corresponding
	 * side table entry, inserts it
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		if (super.databaseUpdate(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * Queries the damage_skill side table to see if we are updating or
	 * inserting and then performs the appropriate action
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectDamageSkill(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatDamageSkill.DAMAGESKILLINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatDamageSkill.DAMAGESKILLUPDATE);
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
		prep.setByte(1 + bump, this.maxDamageDice);
		if (this.multiplier == null) {
			prep.setNull(2 + bump, java.sql.Types.DOUBLE);
		} else {
			prep.setDouble(2 + bump, this.multiplier.getValue());
		}
		prep.setByte(3 + bump, this.damageBonus);
		prep.setByte(4 + bump, this.damageDie);
		if (!insert) {
			prep.setInt(5, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete damage_skill table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteDamageSkill(Connection conn) {
		// TODO Auto-generated method stub
	}
}
