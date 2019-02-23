package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ConsumableType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ItemType;

/**
 * The FlatStatBoostItem class is the server representation of a StatBoost item
 * Note: currently, there is no side table for FlatStatBoostItem so this class is a
 * wrapper of {@link FlatItem}
 * 
 * @author Stefan
 *
 */
public class FlatStatBoostItem extends FlatItem {
	private static String _STATBOOSTITEMSEARCH = null;
	@SuppressWarnings("unused")
	private static String _STATBOOSTITEMINSERT = null;
	@SuppressWarnings("unused")
	private static String _STATBOOSTITEMUPDATE = null;

	/**
	 * Produces a complete {@link FlatStatBoostItem}
	 * 
	 * @param id
	 *            The Unique id for this item
	 * @param name
	 *            The name of this item
	 * @param schedule
	 *            A number representing the major dungeon this item becomes
	 *            available during
	 * @param description
	 *            A description of the item
	 * @param special
	 *            The special effects of this item
	 * @param type
	 *            An {@link ItemType} representing the type of this item
	 * @param origins
	 *            A {@code byte} being used as a bit array to represent the
	 *            sources this item can be obtained from (see
	 *            {@link OriginType})
	 * @param transmuteid
	 *            The unique id of the persona that transmutes into this item,
	 *            -1 if none do
	 * @param consumableType
	 *            A {@link ConsumableType} representing when this item can be
	 *            consumed
	 */
	public FlatStatBoostItem(int id, String name, byte schedule, String description, String special, ItemType type,
			byte origins, int transmuteId, ConsumableType consumableType) {
		super(id, name, schedule, description, special, type, origins, transmuteId, consumableType);
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatStatBoostItem() {
		initSUIDStrings();
	}

	/**
	 * This constructor is for reading a {@link FlatStatBoostItem} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatStatBoostItem from
	 */
	public FlatStatBoostItem(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatStatBoostItem.class);
	}

	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatItem#write(JsonWriter) super.write(out)} but does not call
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
		write(out, FlatStatBoostItem.class);
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
		if (!read(in, name, FlatStatBoostItem.class)) {
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
		if (FlatStatBoostItem._STATBOOSTITEMSEARCH != null)
			return;
		FlatStatBoostItem._STATBOOSTITEMSEARCH = "SELECT * FROM item WHERE item.id = ? AND item.type = ?";
		String insertTemplate = "INSERT INTO item(%s) VALUES(%s)";
		String updateTemplate = "UPDATE item SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatStatBoostItem.class);
		FlatStatBoostItem._STATBOOSTITEMINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatStatBoostItem._STATBOOSTITEMUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_STATBOOSTITEMINSERT") || name.equals("_STATBOOSTITEMUPDATE") || name.equals("_STATBOOSTITEMSEARCH")
				|| name.equals("_STATBOOSTITEMDELETE");
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
		return false;
	}

	/**
	 * Searches the database for this {@link FlatStatBoostItem FlatStatBoostItem's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the item table for this
	 *         FlatStatBoostItem's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatStatBoostItem._STATBOOSTITEMSEARCH);
		search.setInt(1, getId());
		search.setByte(2, getType().getValue());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatStatBoostItem} into the item
	 * table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		return super.databaseInsert(conn);
	}

	/**
	 * This method updates {@code this} {@link FlatStatBoostItem FlatStatBoostItem's} entry in the item table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		return super.databaseUpdate(conn);
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
	@Override
	protected void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		@SuppressWarnings("unused")
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.id);
			bump = 1;
		}
		if (!insert) {
			prep.setInt(1, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete skill_card table rows.
	 * 
	 * @param conn
	 */
	@Override
	public void databaseDelete(Connection conn) {

	}
}
