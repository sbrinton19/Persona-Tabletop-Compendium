package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ArmorClass;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ConsumableType;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.GearPool;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ItemType;

/**
 * The FlatArmor class is the server representation of the joined DB Tables item
 * & armor with added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatArmor extends FlatItem {
	protected ArmorClass armorClass;
	protected byte damageReduction;
	protected byte moveAimPenalty;
	protected byte maxDodgeBonus;
	protected GearPool dirtyGearPool;
	private static String ARMORSEARCH = null;
	private static String ARMORINSERT = null;
	private static String ARMORUPDATE = null;

	/**
	 * Produces a complete {@link FlatArmor}
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
	 * @param armorClass
	 *            An {@link ArmorClass} representing the type of this armor
	 * @param damageReduction
	 *            The amount of damage blocked by this armor
	 * @param moveAimPenalty
	 *            The reduction of movement and aim incurred while using this
	 *            armor
	 * @param maxDodgeBonus
	 *            The maximum dodge bonus allowed when using this armor
	 * @param dirtyGearPool
	 *            The dirty armor item that when washed can become this armor as
	 *            a {@link GearPool} enum
	 */
	public FlatArmor(int id, String name, byte schedule, String description, String special, ItemType type,
			byte origins, int transmuteid, ConsumableType consumableType, ArmorClass armorClass, byte damageReduction,
			byte moveAimPenalty, byte maxDodgeBonus, GearPool dirtyGearPool) {
		super(id, name, schedule, description, special, type, origins, transmuteid, consumableType);
		this.armorClass = armorClass;
		this.damageReduction = damageReduction;
		this.moveAimPenalty = moveAimPenalty;
		this.maxDodgeBonus = maxDodgeBonus;
		this.dirtyGearPool = dirtyGearPool;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatArmor() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatArmor} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatArmor
	 *            from
	 */
	public FlatArmor(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatArmor.class);
	}
	
	/**
	 * @return An {@link ArmorClass} representing the type of this armor
	 */
	public ArmorClass getArmorClass() {
		return armorClass;
	}

	/**
	 * @return The amount of damage blocked by this armor
	 */
	public int getDamageReduction() {
		return damageReduction;
	}

	/**
	 * @return The reduction of movement and aim incurred while using this armor
	 */
	public int getMoveAimPenalty() {
		return moveAimPenalty;
	}

	/**
	 * @return The maximum dodge bonus allowed when using this armor
	 */
	public int getMaxDodgeBonus() {
		return maxDodgeBonus;
	}

	/**
	 * @return The dirty armor item that when washed can become this armor as a
	 *         {@link GearPool} enum
	 */
	public GearPool getDirtyGearPool() {
		return dirtyGearPool;
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
		write(out, FlatArmor.class);
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
		if (!read(in, name, FlatArmor.class)) {
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
		if (FlatArmor.ARMORSEARCH != null)
			return;
		FlatArmor.ARMORSEARCH = "SELECT * FROM armor WHERE armor.itemid = ?";
		String insertTemplate = "INSERT INTO armor(itemid,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE armor SET %s WHERE itemid = ?";
		String[] built = fieldBuilder(FlatArmor.class);
		FlatArmor.ARMORINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatArmor.ARMORUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("ARMORINSERT") || name.equals("ARMORUPDATE") || name.equals("ARMORSEARCH")
				|| name.equals("ARMORDELETE");
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
		// All members of FlatArmor are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatArmor FlatArmor's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the armor table for this
	 *         FlatArmor's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectArmor(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatArmor.ARMORSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatArmor FlatArmor's} base data
	 * into the item table and if successful, then inserts the FlatArmor data
	 * into the armor side table or updates it if a matching orphan entry is
	 * found
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		if (super.databaseInsert(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * This method updates {@code this} {@link FlatArmor FlatArmor's} entry in
	 * the item table and if successful, then updates its armor side table entry
	 * or if there is no corresponding side table entry, inserts it
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		if (super.databaseUpdate(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * Queries the armor side table to see if we are updating or inserting and
	 * then performs the appropriate action
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectArmor(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatArmor.ARMORINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatArmor.ARMORUPDATE);
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
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.getId());
			bump = 1;
		}
		prep.setByte(1 + bump, this.armorClass.getValue());
		if (this.damageReduction == -1) {
			prep.setByte(2 + bump, (byte) 0);
		} else {
			prep.setByte(2 + bump, this.damageReduction);
		}
		if (this.moveAimPenalty == -1) {
			prep.setNull(3 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setByte(3 + bump, this.moveAimPenalty);
		}
		if (this.maxDodgeBonus == -1) {
			prep.setNull(4 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setByte(4 + bump, this.maxDodgeBonus);
		}
		prep.setByte(5 + bump, this.dirtyGearPool.getValue());
		if (!insert) {
			prep.setInt(6, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete armor table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteArmor(Connection conn) {
		// TODO Auto-generated method stub
	}

}
