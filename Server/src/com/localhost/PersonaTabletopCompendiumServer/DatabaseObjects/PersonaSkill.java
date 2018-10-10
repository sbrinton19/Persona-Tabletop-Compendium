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

/**
 * The PersonaSkill class is the server representation of the DB table
 * persona_skill with added DB & JSON support.
 * 
 * @author Stefan
 *
 */
public class PersonaSkill extends DatabaseObject {
	protected int personaid;
	protected int skillid;
	protected byte level;
	private static String PERSONASKILLSEARCH = null;
	private static String PERSONASKILLINSERT = null;
	private static String PERSONASKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link PersonaSkill}
	 * 
	 * @param personaid
	 *            The id of the persona
	 * @param skillid
	 *            The id of the skill
	 * @param level
	 *            The level the skill is learned by the persona
	 */
	public PersonaSkill(int personaid, int skillid, byte level) {
		this.personaid = personaid;
		this.skillid = skillid;
		this.level = level;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public PersonaSkill() {
		initSUIDStrings();
	}

	/**
	 * Used to read a {@link PersonaSkill} from a database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            PersonaSkill out of
	 */
	public PersonaSkill(ResultSet rs) {
		fieldReader(rs, PersonaSkill.class);
	}

	/**
	 * @return The id of the persona
	 */
	public int getPersonaid() {
		return personaid;
	}

	/**
	 * @return The id of the skill
	 */
	public int getSkillid() {
		return skillid;
	}

	/**
	 * @return The level the skill is learned by the persona
	 */
	public byte getLevel() {
		return level;
	}

	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} but does not call
	 * {@link JsonWriter#endObject() out.endObject()}. This is to enable
	 * subclasses to call this method to serialize their common fields. The
	 * top-level caller should be the only method to call the "closing brace"
	 * {@link JsonWriter#endObject() out.endObject()}
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
		out.beginObject();
		write(out, PersonaSkill.class);
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
		read(in, name, PersonaSkill.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (PersonaSkill.PERSONASKILLSEARCH != null)
			return;
		PersonaSkill.PERSONASKILLSEARCH = "SELECT * FROM persona_skill WHERE persona_skill.personaid = ? AND persona_skill.skillid = ?";
		String insertTemplate = "INSERT INTO persona_skill(%s) VALUES(%s)";
		String updateTemplate = "UPDATE persona_skill SET %s WHERE personaid = ? AND skillid = ?";
		String[] built = fieldBuilder(PersonaSkill.class);
		PersonaSkill.PERSONASKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		PersonaSkill.PERSONASKILLUPDATE = String.format(updateTemplate, built[2]);
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
	 * Shorthand function to check if a given field should not be considered
	 * when reading/writing from JSON or the database
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the field is one to read/write, true if it should be
	 *         ignored when reading/writing
	 */
	protected boolean isIgnoredField(String name) {
		return name.equals("PERSONASKILLINSERT") || name.equals("PERSONASKILLUPDATE")
				|| name.equals("PERSONASKILLSEARCH") || name.equals("PERSONASKILLDELETE");
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
		// We search on personaid, skillid so we don't update them
		return name.equals("personaid") || name.equals("skillid");
	}

	/**
	 * Searches the database for this {@link PersonaSkill PersonaSkill's} Primary Key
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the persona_skill table for
	 *         this PersonaSkill's complete Primary Key
	 * @throws SQLException
	 */
	public ResultSet databaseSelectPersonaSkill(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(PersonaSkill.PERSONASKILLSEARCH);
		search.setInt(1, this.personaid);
		search.setInt(2, this.skillid);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link PersonaSkill} into the persona_skill
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(PersonaSkill.PERSONASKILLINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@code this} {@link PersonaSkill PersonaSkill's} entry in the persona_skill
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return true if the update completes successfully with no errors,
	 *         otherwise false
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(PersonaSkill.PERSONASKILLUPDATE);
			insertUpdate(update, false);
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
	 *            Whether we are performing an insert or update
	 * @throws SQLException
	 */
	private void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.personaid);
			prep.setInt(2, this.skillid);
			bump = 2;
		}
		prep.setByte(1 + bump, this.level);
		if (!insert) {

			prep.setInt(2, this.personaid);
			prep.setInt(3, this.skillid);
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete persona_skill table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeletePersonaSkill(Connection conn) {
		// TODO Auto-generated method stub
	}
}
