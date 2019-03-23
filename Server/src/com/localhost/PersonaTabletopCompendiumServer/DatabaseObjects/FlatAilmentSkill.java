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
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.AilmentType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;

/**
 * The FlatAilmentSkill class is the server representation of the joined DB
 * tables skill & ailment_skill with added DB & JSON Support
 * 
 * @author Stefan
 *
 */
public class FlatAilmentSkill extends FlatSkill {
	protected AilmentType ailmentType;
	protected byte ailmentFailValue;
	private static String _AILMENTSKILLSEARCH = null;
	private static String _AILMENTSKILLINSERT = null;
	private static String _AILMENTSKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link FlatAilmentSkill}
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
	 * @param ailmentType
	 *            the type of ailment this skill can inflict as an
	 *            {@link AilmentType} enum
	 * @param ailmentFailValue
	 *            Rolling this value or lower fails to inflict the ailment
	 */
	public FlatAilmentSkill(int id, String name, byte cost, Element element, byte minlevel, String description,
			int allyCardId, int mainCardId, byte aoe, AilmentType ailmentType, byte ailmentFailValue) {
		super(id, name, cost, element, minlevel, description, allyCardId, mainCardId, aoe);
		this.ailmentType = ailmentType;
		this.ailmentFailValue = ailmentFailValue;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatAilmentSkill() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatAilmentSkill} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatAilmentSkill from
	 */
	public FlatAilmentSkill(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatAilmentSkill.class);
	}

	/**
	 * @return the type of ailment this skill can inflict as an
	 *         {@link AilmentType} enum
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
	@Override
	public String getCompiledDescription(boolean replace) {
		StringBuilder sb = new StringBuilder();
		sb.append(String.format("%s FV=%d", this.ailmentType.asString(), this.ailmentFailValue));
		if (this.description.length() > 0) {
			if (sb.length() > 0) {
				sb.append("; ");
			}
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
	@Override
	public void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, FlatAilmentSkill.class);
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
		if (!read(in, name, FlatAilmentSkill.class)) {
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
		if (FlatAilmentSkill._AILMENTSKILLSEARCH != null)
			return;
		FlatAilmentSkill._AILMENTSKILLSEARCH = "SELECT * FROM ailment_skill WHERE ailment_skill.skillId = ?";
		String insertTemplate = "INSERT INTO ailment_skill(skillId,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE ailment_skill SET %s WHERE skillId = ?";
		String[] built = fieldBuilder(FlatAilmentSkill.class);
		FlatAilmentSkill._AILMENTSKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatAilmentSkill._AILMENTSKILLUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_AILMENTSKILLINSERT") || name.equals("_AILMENTSKILLUPDATE")
				|| name.equals("_AILMENTSKILLSEARCH") || name.equals("_AILMENTSKILLDELETE");
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
		// All members of FlatAilmentSkill are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this 
	 * {@link FlatAilmentSkill FlatAilmentSkill's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the ailment_skill table for
	 *         this FlatAilmentSkill's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatAilmentSkill._AILMENTSKILLSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatAilmentSkill FlatAilmentSkill's}
	 * data into the ailment_skill side table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, false otherwise
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatAilmentSkill._AILMENTSKILLINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@code this} {@link FlatAilmentSkill FlatAilmentSkill's}
	 * entry in the ailment_skill side table 
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false otherwise
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatAilmentSkill._AILMENTSKILLUPDATE);
			return insertUpdate(update, false);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * First checks the skill table for an entry for {@code this} skill's 
	 * id and inserts or updates as appropriate. If successful, it then attempts
	 * to do the same for the ailment_skill table.
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean updateOrInsert(Connection conn) {
		if (super.updateOrInsert(conn)) {
			try {
				ResultSet rs = this.databaseSelect(conn);
				if (rs == null) {
					return false;
				}
				if (!rs.isBeforeFirst()) {
					// No data so blind insert
					return databaseInsert(conn);
				} else {
					return databaseUpdate(conn);
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}			
		}
		return false;
	}

	/**
	 * This method parameterizes and executes the database inserts and updates
	 * due to their similarity
	 * 
	 * @param prep
	 *            The {@link PreparedStatement} to parameterize and execute
	 * @param insert
	 *            Whether we are inserting or updating
	 * @return True if the operation completed successfully false if otherwise
	 * @throws SQLException
	 */
	@Override
	protected boolean insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
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
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Unimplemented function to delete ailment_skill table rows.
	 * 
	 * @param conn
	 * @return 
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}
}
