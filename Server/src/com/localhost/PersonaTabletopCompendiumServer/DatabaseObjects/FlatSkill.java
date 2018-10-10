package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Comparator;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;

/**
 * The FlatSkill class is the server representation of the DB table skill with
 * added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatSkill extends DatabaseObject implements Comparator<FlatSkill> {
	protected int id;
	protected String name;
	protected byte cost;
	protected Element element;
	protected byte minLevel;
	protected String description;
	protected int allyCardId;
	protected int mainCardId;
	protected byte aoe;
	private static String SKILLSEARCH = null;
	private static String SKILLINSERT = null;
	private static String SKILLUPDATE = null;

	/**
	 * Constructor for a complete {@link FlatSkill}
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
	 */
	public FlatSkill(int id, String name, byte cost, Element element, byte minlevel, String description, int allyCardId,
			int mainCardId, byte aoe) {
		this.id = id;
		this.name = name;
		this.cost = cost;
		this.element = element;
		this.minLevel = minlevel;
		this.description = description;
		this.allyCardId = allyCardId;
		this.mainCardId = mainCardId;
		this.aoe = aoe;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatSkill() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatSkill} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatSkill
	 *            from
	 */
	public FlatSkill(ResultSet rs) {
		fieldReader(rs, FlatSkill.class);
	}

	/**
	 * Copy Constructor, also usable to forcibly "downcast" subclasses
	 * 
	 * @param fs
	 *            The {@link FlatSkill} to copy (or forcibly "downcast")
	 */
	public FlatSkill(FlatSkill fs) {
		this.allyCardId = fs.allyCardId;
		this.aoe = fs.aoe;
		this.cost = fs.cost;
		this.description = fs.description;
		this.element = fs.element;
		this.id = fs.id;
		this.mainCardId = fs.mainCardId;
		this.minLevel = fs.minLevel;
		this.name = fs.name;
	}

	/**
	 * @return The Unique id for this skill
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return The name of this skill
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return The cost in HP percentage or absolute SP for this skill
	 */
	public byte getCost() {
		return cost;
	}

	/**
	 * @return The element of this skill as an {@link Element} enum
	 */
	public Element getElement() {
		return element;
	}

	/**
	 * @return The recommended minimum level to learn this skill
	 */
	public byte getMinlevel() {
		return minLevel;
	}

	/**
	 * @return Additional description of this skill's effects
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @return The item id for the ally skill card for this skill
	 */
	public int getAllyCardId() {
		return allyCardId;
	}

	/**
	 * @return The item id for the main skill card for this skill
	 */
	public int getMainCardId() {
		return mainCardId;
	}

	/**
	 * @return The size of this skill's area of effect
	 */
	public byte getAoe() {
		return aoe;
	}

	/**
	 * @return This class has to not be abstract to facilitate JSON
	 *         serialization. This method should NOT be invoked on an instance
	 *         of this class only on its subclasses
	 */
	public String getCompiledDescription() {
		return description;
	}

	/**
	 * @return This class has to not be abstract to facilitate JSON
	 *         serialization. This method should NOT be invoked on an instance
	 *         of this class only on its subclasses
	 */
	public String getCompiledDescription(boolean replace) {
		return description;
	}

	/**
	 * @return A string representing toe Area of Effect of this skill
	 */
	protected String getAoE() {
		if (this.aoe == -1) {
			return "";
		} else if (this.aoe == 0) {
			return "Targets Self";
		}
		return String.format("AoE=%s", this.aoe);
	}

	/**
	 * Compares two skills by id
	 */
	public int compare(FlatSkill dis, FlatSkill dat) {
		return dis.id - dat.id;
	}
	
	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} but does not call
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
		out.beginObject();
		write(out, FlatSkill.class);
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
		read(in, name, FlatSkill.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatSkill.SKILLSEARCH != null)
			return;
		FlatSkill.SKILLSEARCH = "SELECT * FROM skill WHERE skill.id = ?";
		String insertTemplate = "INSERT INTO skill(%s) VALUES(%s)";
		String updateTemplate = "UPDATE skill SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatSkill.class);
		FlatSkill.SKILLINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatSkill.SKILLUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("SKILLINSERT") || name.equals("SKILLUPDATE") || name.equals("SKILLSEARCH")
				|| name.equals("SKILLDELETE");
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
	 * fieldss
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the given field should not be updated when performing a
	 *         SQL update
	 */
	protected boolean isIgnoredUpdateField(String name) {
		// Id is used to search on an update, so don't update it
		return name.equals("id");
	}

	/**
	 * Searches the database for this {@link FlatSkill FlatSkill's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the skill table for this
	 *         FlatSkill's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectSkill(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatSkill.SKILLSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatSkill} into the skill table
	 * Note: The skill table has two FK constraints in allyCardId & mainCardId
	 * on the item table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatSkill.SKILLINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@code this} {@link FlatSkill FlatSkill's} entry in
	 * the skill table Note: The skill table has two FK constraints in
	 * allyCardId & mainCardId on the item table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatSkill.SKILLUPDATE);
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
	 *            Whether we are inserting or updating
	 * @throws SQLException
	 */
	private void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.getId());
			bump = 1;
		}
		prep.setString(1 + bump, this.name);
		prep.setByte(2 + bump, this.cost);
		prep.setByte(3 + bump, this.element.getValue());
		prep.setByte(4 + bump, this.minLevel);
		prep.setString(5 + bump, this.description);
		prep.setInt(6 + bump, this.allyCardId);
		prep.setInt(7 + bump, this.mainCardId);
		if (this.aoe == -1) {
			prep.setNull(8 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setInt(8 + bump, this.aoe);
		}
		if (!insert) {
			prep.setInt(9, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete skill table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteSkill(Connection conn) {
		// TODO Auto-generated method stub
	}

}
