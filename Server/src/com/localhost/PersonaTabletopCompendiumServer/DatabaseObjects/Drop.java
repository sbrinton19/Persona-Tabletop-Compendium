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
	protected int sourceId;
	protected boolean isDrop;
	protected boolean isPersona;
	protected byte low;
	protected byte high;
	private static String _DROPSEARCH = null;
	private static String _DROPINSERT = null;
	private static String _DROPUPDATE = null;
	private static String _DROPDELETE = null;

	/**
	 * Constructor for a complete {@link Drop}
	 * 
	 * @param itemId
	 *            The unique id of the item for this drop
	 * @param sourceId
	 *            The unique id of the source for this drop
	 * @param isDrop
	 *            Is this a drop from defeating this persona/shadow; otherwise, it is
	 *            from negotiation
	 * @param isPersona
	 *            Is this drop from a persona, if not it is from a shadow
	 * @param low
	 *            The lower bound for rolling/drawing for this drop
	 * @param high
	 *            The upper bound for rolling/drawing for this drop
	 */
	public Drop(int itemId, int sourceId, boolean isDrop, boolean isPersona, byte low, byte high) {
		initSUIDStrings();
		this.itemId = itemId;
		this.sourceId = sourceId;
		this.isDrop = isDrop;
		this.isPersona = isPersona;
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
		initSUIDStrings();
		fieldReader(rs, Drop.class);
	}
	
	/**
	 * @return The unique id of the item for this drop
	 */
	public int getItemId() {
		return itemId;
	}

	/**
	 * @return The unique id of the source for this drop
	 */
	public int getSourceId() {
		return sourceId;
	}

	/**
	 * @return Is this a drop from defeating this persona/shadow; otherwise, it is from
	 *         negotiation
	 */
	public boolean isDrop() {
		return isDrop;
	}

	/**
	 * @return Is this drop from a persona, if not it is from a shadow
	 */
	public boolean isPersona() {
		return isPersona;
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
		Drop._DROPSEARCH = "SELECT * FROM drop_table WHERE drop_table.itemId = ? AND drop_table.sourceId = ? AND drop_table.isDrop = ? AND drop_table.isPersona = ?";
		Drop._DROPDELETE = "DELETE FROM drop_table WHERE drop_table.itemId = ? AND drop_table.sourceId = ? AND drop_table.isDrop = ? AND drop_table.isPersona = ?";
		String insertTemplate = "INSERT INTO drop_table(%s) VALUES(%s)";
		String updateTemplate = "UPDATE drop_table SET %s WHERE itemId = ? AND sourceId = ? AND isDrop = ? AND isPersona = ?";
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
		// We search on itemId, sourceId, isDrop, and isPersona so we don't update them
		return name.equals("itemId") || name.equals("sourceId") || name.equals("isDrop") || name.equals("isPersona") ;
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
		search.setInt(2, this.sourceId);
		search.setBoolean(3, this.isDrop);
		search.setBoolean(4, this.isPersona);
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
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
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
	 * @return True if the operation completed successfully false if otherwise
	 * @throws SQLException
	 */
	@Override
	protected boolean insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.itemId);
			prep.setInt(2, this.sourceId);
			prep.setBoolean(3, this.isDrop);
			prep.setBoolean(4, this.isPersona);
			bump = 4;
		}
		prep.setByte(1 + bump, this.low);
		prep.setByte(2 + bump, this.high);
		if (!insert) {
			prep.setInt(3, this.itemId);
			prep.setInt(4, this.sourceId);
			prep.setBoolean(5, this.isDrop);
			prep.setBoolean(6, this.isPersona);
		}
		int count = prep.executeUpdate();
		prep.close();
		return (count == 1);
	}

	/**
	 * Searches the database for this {@link Drop Drop's} id
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
			delete = conn.prepareStatement(Drop._DROPDELETE);
			delete.setInt(1, this.itemId);
			delete.setInt(2, this.sourceId);
			delete.setBoolean(3, this.isDrop);
			delete.setBoolean(4, this.isPersona);
			int count = delete.executeUpdate();
			return count == 1;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
}
