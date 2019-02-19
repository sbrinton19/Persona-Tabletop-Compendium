package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ConsumableType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ItemType;

/**
 * The FlatTraitBoostItem class is the server representation of a TraitBoost item
 * Note: currently, there is no side table for FlatTraitBoostItem so this class is a
 * wrapper of {@link FlatItem}
 * 
 * @author Stefan
 *
 */
public class FlatTraitBoostItem extends FlatItem {
	private static String TRAITBOOSTITEMSEARCH = null;
	private static String TRAITBOOSTITEMINSERT = null;
	private static String TRAITBOOSTITEMUPDATE = null;

	/**
	 * Produces a complete {@link FlatTraitBoostItem}
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
	public FlatTraitBoostItem(int id, String name, byte schedule, String description, String special, ItemType type,
			byte origins, int transmuteId, ConsumableType consumableType) {
		super(id, name, schedule, description, special, type, origins, transmuteId, consumableType);
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatTraitBoostItem() {
		initSUIDStrings();
	}

	/**
	 * This constructor is for reading a {@link FlatTraitBoostItem} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatTraitBoostItem from
	 */
	public FlatTraitBoostItem(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatTraitBoostItem.class);
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
	public void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, FlatTraitBoostItem.class);
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
		if (!read(in, name, FlatTraitBoostItem.class)) {
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
		if (FlatTraitBoostItem.TRAITBOOSTITEMSEARCH != null)
			return;
		FlatTraitBoostItem.TRAITBOOSTITEMSEARCH = "SELECT * FROM item WHERE item.itemid = ? AND item.type = ?";
		String insertTemplate = "INSERT INTO item(%s) VALUES(%s)";
		String updateTemplate = "UPDATE item SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatTraitBoostItem.class);
		FlatTraitBoostItem.TRAITBOOSTITEMINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatTraitBoostItem.TRAITBOOSTITEMUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("TRAITBOOSTITEMINSERT") || name.equals("TRAITBOOSTITEMUPDATE") || name.equals("TRAITBOOSTITEMSEARCH")
				|| name.equals("TRAITBOOSTITEMDELETE");
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
		return false;
	}

	/**
	 * Searches the database for this {@link FlatTraitBoostItem FlatTraitBoostItem's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the item table for this
	 *         FlatTraitBoostItem's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectTraitBoostItem(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatTraitBoostItem.TRAITBOOSTITEMSEARCH);
		search.setInt(1, getId());
		search.setByte(2, getType().getValue());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatTraitBoostItem} into the item
	 * table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		return super.databaseInsert(conn);
	}

	/**
	 * This method updates {@code this} {@link FlatTraitBoostItem FlatTraitBoostItem's} entry in the item table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @returns true if the insert completes successfully with no errors;
	 *          otherwise false
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		return super.databaseUpdate(conn);
	}

	/**
	 * Queries the skill_card side table to see if we are updating or inserting
	 * and then performs the appropriate action
	 * 
	 * NOTE: There is no skill_card side table at this time so this is an unused
	 * method
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@SuppressWarnings("unused")
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectTraitBoostItem(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatTraitBoostItem.TRAITBOOSTITEMINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatTraitBoostItem.TRAITBOOSTITEMUPDATE);
				isInsert = false;
			}
			insertUpdate(state, isInsert);
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
	public void databaseDeleteTraitBoostItem(Connection conn) {
		// TODO Auto-generated method stub
	}
}
