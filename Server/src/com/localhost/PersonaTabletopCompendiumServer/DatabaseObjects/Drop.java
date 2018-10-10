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
 * The Drop class is the server representation of the DB table drop_table with
 * added DB & JSON support.
 * 
 * @author Stefan
 *
 */
public class Drop extends DatabaseObject {
	protected int itemid;
	protected int personaid;
	protected boolean isDrop;
	protected byte low;
	protected byte high;
	private static String DROPSEARCH = null;
	private static String DROPINSERT = null;
	private static String DROPUPDATE = null;

	/**
	 * Constructor for a complete {@link Drop}
	 * 
	 * @param itemid
	 *            The unique id of the item for this drop
	 * @param personaid
	 *            The unique id of the persona for this drop
	 * @param isDrop
	 *            Is this a drop from defeating this persona; otherwise, it is
	 *            from negotiation
	 * @param low
	 *            The lower bound for rolling/drawing for this drop
	 * @param high
	 *            The upper bound for rolling/drawing for this drop
	 */
	public Drop(int itemid, int personaid, boolean isDrop, byte low, byte high) {
		this.itemid = itemid;
		this.personaid = personaid;
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
	 * Used to read a {@link Drop} from a database
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
	public int getItemid() {
		return itemid;
	}

	/**
	 * @return The unique id of the persona for this drop
	 */
	public int getPersonaid() {
		return personaid;
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
	 */
	public void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException {
		read(in, name, Drop.class);
	}

	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (Drop.DROPSEARCH != null)
			return;
		Drop.DROPSEARCH = "SELECT * FROM drop_table WHERE drop_table.itemid = ? AND drop_table.personaid = ? AND drop_table.isDrop = ?";
		String insertTemplate = "INSERT INTO drop_table(%s) VALUES(%s)";
		String updateTemplate = "UPDATE drop_table SET %s WHERE itemid = ? AND personaid = ? AND isDrop = ?";
		String[] built = fieldBuilder(Drop.class);
		Drop.DROPINSERT = String.format(insertTemplate, built[0], built[1]);
		Drop.DROPUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("DROPINSERT") || name.equals("DROPUPDATE") || name.equals("DROPSEARCH")
				|| name.equals("DROPDELETE");
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
		// We search on itemid, personaid, and isDrop so we don't update them
		return name.equals("itemid") || name.equals("personaid") || name.equals("isDrop");
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
	public ResultSet databaseSelectDrop(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(Drop.DROPSEARCH);
		search.setInt(1, this.itemid);
		search.setInt(2, this.personaid);
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
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(Drop.DROPINSERT);
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
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(Drop.DROPUPDATE);
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
			prep.setInt(1, this.itemid);
			prep.setInt(2, this.personaid);
			prep.setBoolean(3, this.isDrop);
			bump = 3;
		}
		prep.setByte(1 + bump, this.low);
		prep.setByte(2 + bump, this.high);
		if (!insert) {
			prep.setInt(3, this.itemid);
			prep.setInt(4, this.personaid);
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
	public void databaseDeleteDrop(Connection conn) {
		// TODO Auto-generated method stub
	}
}
