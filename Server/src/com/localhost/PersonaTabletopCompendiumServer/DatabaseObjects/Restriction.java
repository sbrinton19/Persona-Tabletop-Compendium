package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.RestrictionType;

/**
 * The Restriction class is the server representation of the DB Table restriction with
 * added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class Restriction extends DatabaseObject {
	protected int id;
	protected RestrictionType type;
	protected int value;
	protected int secondValue;
	protected boolean negate;
	protected boolean bonus;
	protected String description;
	private static String _RESTRICTIONSEARCH = null;
	private static String _RESTRICTIONINSERT = null;
	private static String _RESTRICTIONUPDATE = null;

	/**
	 * Produces a complete {@link Restriction}
	 * 
	 * @param id
	 *            The Unique id for this Restriction
	 * @param type
	 *            A {@link RestrictionType} representing the type of this restriction
	 * @param value
	 *            A generic {@code int} value to represent the effect of this restriction
	 * @param secondValue
	 *            A generic {@code int} value to represent a second effect
	 *            of this restriction, if it needs one
	 * @param negate
	 *            A boolean if true this restriction is the logical negation
	 *            false if it is not
 	 * @param bonus
	 *            A boolean if true this restriction represents a bonus if met
	 *            false if this restriction is required for an activity
	 * @param description
	 *            A description of this restriction if one is necessary
	 */
	public Restriction(int id, RestrictionType type, int value, int secondValue,
			boolean negate, boolean bonus, String description) {
		this.id = id;
		this.type = type;
		this.value = value;
		this.secondValue = secondValue;
		this.negate = negate;
		this.bonus = bonus;
		this.description = description;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public Restriction() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link Restriction} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a Restriction
	 *            from
	 */
	public Restriction(ResultSet rs) {
		fieldReader(rs, Restriction.class);
	}

	/**
	 * @return The Unique id for this item
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return A {@link RestrictionType} representing the type of this restriction
	 */
	public RestrictionType getType() {
		return type;
	}

	/**
	 * @return A generic {@code int} value to represent the effect of this restriction
	 */
	public int getValue() {
		return value;
	}

	/**
	 * @return A generic {@code int} value to represent a second effect
	 *         of this restriction, if it needs one
	 */
	public int getSecondValue() {
		return secondValue;
	}

	/**
	 * @return Whether this restriction is logically negated or not
	 */
	public boolean isNegated() {
		return negate;
	}

	/**
	 * @return Whether this restriction is for a bonus or not
	 */
	public boolean isBonus() {
		return bonus;
	}
	
	/**
	 * @return A description of this restriction if one is necessary 
	 */
	public String getDescription() {
		return description;
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
	@Override
	public void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		out.beginObject();
		write(out, Restriction.class);
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
		read(in, name, Restriction.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (Restriction._RESTRICTIONSEARCH != null)
			return;
		Restriction._RESTRICTIONSEARCH = "SELECT * FROM restriction WHERE restriction.id = ?";
		String insertTemplate = "INSERT INTO restriction(%s) VALUES(%s)";
		String updateTemplate = "UPDATE restriction SET %s WHERE id = ?";
		String[] built = fieldBuilder(Restriction.class);
		Restriction._RESTRICTIONINSERT = String.format(insertTemplate, built[0], built[1]);
		Restriction._RESTRICTIONUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_RESTRICTIONINSERT") || name.equals("_RESTRICTIONUPDATE") || name.equals("_RESTRICTIONSEARCH")
				|| name.equals("_RESTRICTIONDELETE");
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
		// Id is used to search on an update so do not update it
		return name.equals("id");
	}

	/**
	 * Searches the database for {@code this} {@link Restriction Restriction's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the restriction table for this
	 *         Restriction's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(Restriction._RESTRICTIONSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link Restriction} into the restriction table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(Restriction._RESTRICTIONINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@link this} {@link Restriction Restriction's} entry in the restriction table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(Restriction._RESTRICTIONUPDATE);
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
		prep.setByte(1 + bump, this.type.getValue());
		if (this.value == -1) {
			prep.setNull(2 + bump, java.sql.Types.INTEGER);
		} else {
			prep.setInt(2 + bump, this.value);
		}
		if (this.secondValue == -1) {
			prep.setNull(3 + bump, java.sql.Types.INTEGER);
		} else {
			prep.setInt(3 + bump, this.secondValue);
		}
		prep.setBoolean(4 + bump, this.negate);
		prep.setBoolean(5 + bump, this.bonus);
		prep.setString(6 + bump, this.description);
		if (!insert) {
			prep.setInt(7, this.getId());
		}
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Unimplemented function to delete restriction table rows.
	 * 
	 * @param conn
	 * @return 
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}
}
