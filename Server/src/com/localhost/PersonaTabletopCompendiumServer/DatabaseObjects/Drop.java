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
 * The Drop class is the server representation of the DB table drop_table with
 * added DB & JSON support.
 * 
 * @author Stefan
 *
 */
public class Drop extends DatabaseObject {
	protected int itemId;
	protected int personaId;
	protected boolean isDrop;
	protected byte low;
	protected byte high;
	private static String _DROPSEARCH = null;
	private static String _DROPINSERT = null;
	private static String _DROPUPDATE = null;

	/**
	 * Constructor for a complete {@link Drop}
	 * 
	 * @param itemId
	 *            The unique id of the item for this drop
	 * @param personaId
	 *            The unique id of the persona for this drop
	 * @param isDrop
	 *            Is this a drop from defeating this persona; otherwise, it is
	 *            from negotiation
	 * @param low
	 *            The lower bound for rolling/drawing for this drop
	 * @param high
	 *            The upper bound for rolling/drawing for this drop
	 */
	public Drop(int itemId, int personaId, boolean isDrop, byte low, byte high) {
		this.itemId = itemId;
		this.personaId = personaId;
		this.isDrop = isDrop;
		this.low = low;
		this.high = high;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public Drop() {
		initSUIDStrings();
	}

	/**
	 * Used to read a {@link Drop} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a Drop out
	 *            of
	 */
	public Drop(ResultSet rs) {
		fieldReader(rs, Drop.class);
	}
	
	/**
	 * @return The unique id of the item for this drop
	 */
	public int getItemId() {
		return itemId;
	}

	/**
	 * @return The unique id of the persona for this drop
	 */
	public int getPersonaId() {
		return personaId;
	}

	/**
	 * @return Is this a drop from defeating this persona; otherwise, it is from
	 *         negotiation
	 */
	public boolean isDrop() {
		return isDrop;
	}

	/**
	 * @return The lower bound for rolling/drawing for this drop
	 */
	public byte getLow() {
		return low;
	}

	/**
	 * @return The upper bound for rolling/drawing for this drop
	 */
	public byte getHigh() {
		return high;
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
		write(out, Drop.class);
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
		read(in, name, Drop.class);
	}

	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (Drop._DROPSEARCH != null)
			return;
		Drop._DROPSEARCH = "SELECT * FROM drop_table WHERE drop_table.itemId = ? AND drop_table.personaId = ? AND drop_table.isDrop = ?";
		String insertTemplate = "INSERT INTO drop_table(%s) VALUES(%s)";
		String updateTemplate = "UPDATE drop_table SET %s WHERE itemId = ? AND personaId = ? AND isDrop = ?";
		String[] built = fieldBuilder(Drop.class);
		Drop._DROPINSERT = String.format(insertTemplate, built[0], built[1]);
		Drop._DROPUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_DROPINSERT") || name.equals("_DROPUPDATE") || name.equals("_DROPSEARCH")
				|| name.equals("_DROPDELETE");
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
		// We search on itemId, personaId, and isDrop so we don't update them
		return name.equals("itemId") || name.equals("personaId") || name.equals("isDrop");
	}

	/**
	 * Searches the database for this {@link Drop Drop's} Primary Key
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the drop_table for this
	 *         Drop's complete Primary Key
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(Drop._DROPSEARCH);
		search.setInt(1, this.itemId);
		search.setInt(2, this.personaId);
		search.setBoolean(3, this.isDrop);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link Drop} into the drop_table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(Drop._DROPINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@code this} {@link Drop Drop's} entry in the
	 * drop_table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return true if the update completes successfully with no errors,
	 *         otherwise false
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(Drop._DROPUPDATE);
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
	@Override
	protected void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.itemId);
			prep.setInt(2, this.personaId);
			prep.setBoolean(3, this.isDrop);
			bump = 3;
		}
		prep.setByte(1 + bump, this.low);
		prep.setByte(2 + bump, this.high);
		if (!insert) {
			prep.setInt(3, this.itemId);
			prep.setInt(4, this.personaId);
			prep.setBoolean(5, this.isDrop);
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete drop_table table rows.
	 * 
	 * @param conn
	 */
	@Override
	public void databaseDelete(Connection conn) {
		
	}
}
