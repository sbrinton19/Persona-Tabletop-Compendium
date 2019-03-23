/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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
	protected int sourceId;
	protected int skillId;
	protected boolean isPersona;
	protected byte level;
	
	private static String _PERSONASKILLSEARCH = null;
	private static String _PERSONASKILLINSERT = null;
	private static String _PERSONASKILLUPDATE = null;
	private static String _PERSONASKILLDELETE = null;

	/**
	 * Constructor for a complete {@link PersonaSkill}
	 * 
	 * @param sourceId
	 *            The id of the source
	 * @param skillid
	 *            The id of the skill
	 * @param level
	 *            The level the skill is learned by the persona
	 * @param isPersona
	 *            If the source is a persona, if not it is a shadow
	 */
	public PersonaSkill(int sourceId, int skillid, byte level, boolean isPersona) {
		initSUIDStrings();
		this.sourceId = sourceId;
		this.skillId = skillid;
		this.level = level;
		this.isPersona = isPersona;
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
		initSUIDStrings();
		fieldReader(rs, PersonaSkill.class);
	}

	/**
	 * @return The id of the source
	 */
	public int getSourceId() {
		return sourceId;
	}

	/**
	 * @return The id of the skill
	 */
	public int getSkillid() {
		return skillId;
	}

	/**
	 * @return The level the skill is learned by the persona
	 */
	public byte getLevel() {
		return level;
	}
	
	/**
	 * @return If the source is a persona, if not it is a shadow
	 */
	public boolean isPersona() {
		return isPersona;
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
	@Override
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
	 * @throws InstantiationException 
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 */
	@Override
	public void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, NoSuchMethodException, SecurityException, InstantiationException {
		read(in, name, PersonaSkill.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (PersonaSkill._PERSONASKILLSEARCH != null)
			return;
		PersonaSkill._PERSONASKILLSEARCH = "SELECT * FROM persona_skill WHERE persona_skill.sourceid = ? AND persona_skill.skillId = ? AND persona_skill.isPersona = ?";
		PersonaSkill._PERSONASKILLDELETE = "DELETE FROM persona_skill WHERE persona_skill.sourceid = ? AND persona_skill.skillId = ? AND persona_skill.isPersona = ?";
		String insertTemplate = "INSERT INTO persona_skill(%s) VALUES(%s)";
		String updateTemplate = "UPDATE persona_skill SET %s WHERE sourceId = ? AND skillId = ? AND isPersona = ?";
		String[] built = fieldBuilder(PersonaSkill.class);
		PersonaSkill._PERSONASKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		PersonaSkill._PERSONASKILLUPDATE = String.format(updateTemplate, built[2]);
	}
	
	/**
	 * Shorthand function to check if a given field should only be used for
	 * reading/writing JSON
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the field is only present in JSON, false otherwise
	 */
	@Override
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
	@Override
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
	@Override
	protected boolean isIgnoredField(String name) {
		return name.equals("_PERSONASKILLINSERT") || name.equals("_PERSONASKILLUPDATE")
				|| name.equals("_PERSONASKILLSEARCH") || name.equals("_PERSONASKILLDELETE");
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
	@Override
	protected boolean isIgnoredUpdateField(String name) {
		// We search on sourceId, skillId, and isPersona so we don't update them
		return name.equals("sourceId") || name.equals("skillId") || name.equals("isPersona");
	}

	/**
	 * Searches the database for {@code this} {@link PersonaSkill PersonaSkill's} Primary Key
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the persona_skill table for
	 *         this PersonaSkill's complete Primary Key
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(PersonaSkill._PERSONASKILLSEARCH);
		search.setInt(1, this.sourceId);
		search.setInt(2, this.skillId);
		search.setBoolean(3, this.isPersona);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link PersonaSkill} into the persona_skill
	 * table
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(PersonaSkill._PERSONASKILLINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@code this} {@link PersonaSkill PersonaSkill's} entry in the persona_skill
	 * table
	 * @param conn
	 *            A connection to the Database
	 * @return true if the update completes successfully with no errors,
	 *         otherwise false
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(PersonaSkill._PERSONASKILLUPDATE);
			return insertUpdate(update, false);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method parameterizes and executes the database inserts and updates
	 * due to their similarity
	 * 
	 * @param prep
	 *            The {@link PreparedStatement} to parameterize and execute
	 * @param insert
	 *            Whether we are performing an insert or update
	 * @return True if the operation completes successfully false if otherwise
	 * @throws SQLException
	 */
	@Override
	protected boolean insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.sourceId);
			prep.setInt(2, this.skillId);
			prep.setBoolean(3, this.isPersona);
			bump = 3;
		}
		prep.setByte(1 + bump, this.level);
		if (!insert) {
			prep.setInt(2, this.sourceId);
			prep.setInt(3, this.skillId);
			prep.setBoolean(4, this.isPersona);
		}
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Searches the database for this {@link PersonaSkill PersonaSkill's} id
	 * and deletes that entry
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the operation succeeded false otherwise
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		PreparedStatement delete;
		try {
			delete = conn.prepareStatement(PersonaSkill._PERSONASKILLDELETE);
			delete.setInt(1, this.sourceId);
			delete.setInt(2, this.skillId);
			delete.setBoolean(3, this.isPersona);
			int count = delete.executeUpdate();
			return count == 1;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
}
