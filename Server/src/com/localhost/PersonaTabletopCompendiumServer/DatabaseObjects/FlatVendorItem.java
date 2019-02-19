package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * The FlatVendorItem class is the server representation of the vendor_item DB Table
 * with DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatVendorItem extends DatabaseObject {
	protected int id;
	protected int vendorId;
	protected int itemId;
	protected int cost;
	private static String VENDORITEMSEARCH = null;
	private static String VENDORITEMINSERT = null;
	private static String VENDORITEMUPDATE = null;
	
	/**
	 * Full constructor for {@link FlatVendorItem}
	 * 
	 * @param id
	 *            The id of the vendor item pair
	 * @param vendorId
	 *            The id of the vendor
	 * @param itemId
	 *            The id of the item
	 * @param cost
	 *            The cost of the item at vendor

	 */
	public FlatVendorItem(int id, int vendorId, int itemId, int cost) {
		this.id = id;
		this.vendorId = vendorId;
		this.itemId = itemId;
		this.cost = cost;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatVendorItem() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatVendorItem} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatVendorItem
	 *            from
	 */
	public FlatVendorItem(ResultSet rs) {
		fieldReader(rs, FlatVendorItem.class);
	}

	/**
	 * @return The id of the vendor item pair
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return The id of the vendor
	 */
	public int getVendorId() {
		return vendorId;
	}
	
	/**
	 * @return The id of the item
	 */
	public int getItemId() {
		return itemId;
	}
	
	/**
	 * @return The cost of the item at the vendor
	 */
	public int getCost() {
		return cost;
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
		write(out, FlatVendorItem.class);
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
		read(in, name, FlatVendorItem.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatVendorItem.VENDORITEMSEARCH != null)
			return;
		FlatVendorItem.VENDORITEMSEARCH = "SELECT * FROM vendor_item WHERE vendor_item.id = ?";
		String insertTemplate = "INSERT INTO vendor_item(%s) VALUES(%s)";
		String updateTemplate = "UPDATE vendor_item SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatVendorItem.class);
		FlatVendorItem.VENDORITEMINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatVendorItem.VENDORITEMUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("VENDORITEMINSERT") || name.equals("VENDORITEMUPDATE") || name.equals("VENDORITEMSEARCH")
				|| name.equals("VENDORITEMDELETE");
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
		// Id is used to search on an update so do not update it
		return name.equals("id");
	}

	/**
	 * Searches the database for this FlatVendorItem's id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the vendor_item table for this
	 *         FlatVendorItem's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectVendorItem(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatVendorItem.VENDORITEMSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} FlatVendorItem into the vendor_item table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatVendorItem.VENDORITEMINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@link this} FlatVendorItem's entry in the vendor_item table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatVendorItem.VENDORITEMUPDATE);
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
		prep.setInt(1 + bump, this.vendorId);
		prep.setInt(2 + bump, this.itemId);
		prep.setInt(3 + bump, this.cost);
		if (!insert) {
			prep.setInt(4, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete vendor_item table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteVendorItem(Connection conn) {
		// TODO Auto-generated method stub
	}

}
