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
 * The FlatItem class is the server representation of the DB Table item with
 * added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatItem extends DatabaseObject {
	protected int id;
	protected String name;
	protected byte schedule;
	protected String description;
	protected String special;
	protected ItemType type;
	protected byte origins;
	protected int transmuteId;
	protected ConsumableType consumableType;
	private static String _ITEMSEARCH = null;
	private static String _ITEMINSERT = null;
	private static String _ITEMUPDATE = null;

	/**
	 * Produces a complete {@link FlatItem}
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
	public FlatItem(int id, String name, byte schedule, String description, String special, ItemType type, byte origins,
			int transmuteid, ConsumableType consumableType) {
		this.id = id;
		this.name = name;
		this.schedule = schedule;
		this.description = description;
		this.special = special;
		this.type = type;
		this.origins = origins;
		this.transmuteId = transmuteid;
		this.consumableType = consumableType;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatItem() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatItem} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatItem
	 *            from
	 */
	public FlatItem(ResultSet rs) {
		fieldReader(rs, FlatItem.class);
	}

	/**
	 * @return The Unique id for this item
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return The name of this item
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return A number representing the major dungeon this item becomes
	 *         available during
	 */
	public byte getSchedule() {
		return schedule;
	}

	/**
	 * @return A description of the item
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @return The special effects of this item
	 */
	public String getSpecial() {
		return special;
	}

	/**
	 * @return An {@link ItemType} representing the type of this item
	 */
	public ItemType getType() {
		return type;
	}

	/**
	 * @return A {@code byte} being used as a bit array to represent the sources
	 *         this item can be obtained from (see {@link OriginType})
	 */
	public byte getOrigins() {
		return origins;
	}

	/**
	 * @return The unique id of the persona that transmutes into this item, -1
	 *         if none do
	 */
	public int getTransmuteId() {
		return transmuteId;
	}

	/**
	 * @return A {@link ConsumableType} representing when this item can be
	 *         consumed
	 */
	public ConsumableType getConsumableType() {
		return consumableType;
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
		write(out, FlatItem.class);
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
		read(in, name, FlatItem.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatItem._ITEMSEARCH != null)
			return;
		FlatItem._ITEMSEARCH = "SELECT * FROM item WHERE item.id = ?";
		String insertTemplate = "INSERT INTO item(%s) VALUES(%s)";
		String updateTemplate = "UPDATE item SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatItem.class);
		FlatItem._ITEMINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatItem._ITEMUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_ITEMINSERT") || name.equals("_ITEMUPDATE") || name.equals("_ITEMSEARCH")
				|| name.equals("_ITEMDELETE");
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
	 * Searches the database for this {@link FlatItem FlatItem's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the item table for this
	 *         FlatItem's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatItem._ITEMSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatItem} into the item table. Note: the
	 * item table has an optional FK constraint in transmuteId
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
			insert = conn.prepareStatement(FlatItem._ITEMINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@code this} {@link FlatItem FlatItem's} entry in the item table.
	 * Note: The item table has an optional FK constraint in transmuteId
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
			update = conn.prepareStatement(FlatItem._ITEMUPDATE);
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
		prep.setString(1 + bump, this.name);
		prep.setByte(2 + bump, this.schedule);
		prep.setString(3 + bump, this.description);
		prep.setString(4 + bump, this.special);
		prep.setByte(5 + bump, this.type.getValue());
		prep.setByte(6 + bump, this.origins);
		if (this.transmuteId == -1) {
			prep.setNull(7 + bump, java.sql.Types.INTEGER);
		} else {
			prep.setInt(7 + bump, this.transmuteId);
		}
		prep.setByte(8 + bump, this.consumableType.getValue());
		if (!insert) {
			prep.setInt(9, this.getId());
		}
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Unimplemented function to delete item table rows.
	 * 
	 * @param conn
	 * @return 
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}

}
