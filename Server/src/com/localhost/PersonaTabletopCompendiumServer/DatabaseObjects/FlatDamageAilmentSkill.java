package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.AilmentType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.DamageMultiplier;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;

/**
 * The FlatDamageAilmentSkill class is the server representation of the joined
 * DB tables skill, damage_skill, & ailment_skill with added DB & JSON Support
 * 
 * @author Stefan
 *
 */
public class FlatDamageAilmentSkill extends FlatDamageSkill {
	protected AilmentType ailmentType;
	protected byte ailmentFailValue;
	private static String DAMAGEAILMENTSKILLSEARCH = null;
	private static String DAMAGEAILMENTSKILLINSERT = null;
	private static String DAMAGEAILMENTSKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link FlatDamageAilmentSkill}
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
	 * @param ailmentType
	 *            the type of ailment this skill can inflict as an
	 *            {@link AilmentType} enum
	 * @param ailmentFailValue
	 *            Rolling this value or lower fails to inflict the ailment
	 */
	public FlatDamageAilmentSkill(int id, String name, byte cost, Element element, byte minlevel, String description,
			int allyCardId, int mainCardId, byte aoe, byte maxDamageDice, DamageMultiplier multiplier, byte damageBonus,
			byte damageDie, AilmentType ailmentType, byte ailmentFailValue) {
		super(id, name, cost, element, minlevel, description, allyCardId, mainCardId, aoe, maxDamageDice, multiplier,
				damageBonus, damageDie);
		this.ailmentType = ailmentType;
		this.ailmentFailValue = ailmentFailValue;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatDamageAilmentSkill() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatDamageAilmentSkill} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatDamageAilment from
	 */
	public FlatDamageAilmentSkill(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatDamageAilmentSkill.class);
	}

	/**
	 * @return The type of ailment this skill can inflict as an
	 */
	public AilmentType getAilmentType() {
		return ailmentType;
	}

	/**
	 * @return Rolling this value or lower fails to inflict the ailment
	 */
	public byte getAilmentFailValue() {
		return ailmentFailValue;
	}

	/**
	 * @param replace
	 *            Should the description field be replaced with the compiled
	 *            description
	 * @return A complete description compiled from the values of this skill's
	 *         fields
	 */
	public String getCompiledDescription(boolean replace) {
		return super.getCompiledDescription(replace,
				String.format("%s FV=%d", this.ailmentType.asString(), this.ailmentFailValue));
	}

	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatDamageSkill#write(JsonWriter) super.write(out)} but does not
	 * call {@link JsonWriter#endObject() out.endObject()}. This is to enable
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
		write(out, FlatDamageAilmentSkill.class);
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
		if (!read(in, name, FlatDamageAilmentSkill.class)) {
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
		if (FlatDamageAilmentSkill.DAMAGEAILMENTSKILLSEARCH != null)
			return;
		FlatDamageAilmentSkill.DAMAGEAILMENTSKILLSEARCH = "SELECT * FROM ailment_skill WHERE ailment_skill.skillid = ?";
		String insertTemplate = "INSERT INTO ailment_skill(skillid,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE ailment_skill SET %s WHERE skillid = ?";
		String[] built = fieldBuilder(FlatDamageAilmentSkill.class);
		FlatDamageAilmentSkill.DAMAGEAILMENTSKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatDamageAilmentSkill.DAMAGEAILMENTSKILLUPDATE = String.format(updateTemplate, built[2]);
	}

	/**
	 * Shorthand function to check if a given field should not be considered
	 * when reading/writing from JSON or the database
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the row is one to read/write, true if it should be
	 *         ignored when reading/writing
	 */
	protected boolean isIgnoredField(String name) {
		return name.equals("DAMAGEAILMENTSKILLINSERT") || name.equals("DAMAGEAILMENTSKILLUPDATE")
				|| name.equals("DAMAGEAILMENTSKILLSEARCH") || name.equals("DAMAGEAILMENTSKILLDELETE");
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
		// All members of FlatDamageAilmentSkill are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatDamageAilmentSkill
	 * FlatDamageAilmentSkill's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the ailment_skill table for
	 *         this FlatDamageAilmentSkill's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectAilmentDamageSkill(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatDamageAilmentSkill.DAMAGEAILMENTSKILLSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatDamageAilmentSkill
	 * FlatDamageAilmentSkill's} base data into the skill & damage_skill tables
	 * and if successful, then inserts the FlatDamageAilmentSkill data into the
	 * ailment_skill side table or updates it if a matching orphan entry is
	 * found
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, false otherwise
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		if (super.databaseInsert(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * This method updates {@code this} {@link FlatDamageAilmentSkill
	 * FlatDamageAilmentSkill's} entries in the skill & damage_skill tables and
	 * if successful, then updates its ailment_skill side table entry or if
	 * there is no corresponding side table entry, inserts it
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false otherwise
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		if (super.databaseUpdate(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * Queries the ailment_skill side table to see if we are updating or
	 * inserting and then performs the appropriate action
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectAilmentDamageSkill(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatDamageAilmentSkill.DAMAGEAILMENTSKILLINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatDamageAilmentSkill.DAMAGEAILMENTSKILLUPDATE);
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
		prep.setByte(1 + bump, this.ailmentType.getValue());
		prep.setByte(2 + bump, this.ailmentFailValue);
		if (!insert) {
			prep.setInt(3, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete related damage_skill & ailment_skill
	 * table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteDamageAilmentSkill(Connection conn) {
		// TODO Auto-generated method stub
	}
}
