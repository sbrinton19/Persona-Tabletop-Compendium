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
 * The FlatRangedWeapon class is the server representation of the joined DB
 * Tables item & weapon rows where magSize is non-zero, with added DB & JSON
 * support
 * 
 * @author Stefan
 *
 */
public class FlatRangedWeapon extends FlatWeapon {
	protected byte magSize;
	protected byte magCount;
	private static String RANGEDWEAPONSEARCH = null;
	private static String RANGEDWEAPONINSERT = null;
	private static String RANGEDWEAPONUPDATE = null;

	/**
	 * Produces a complete {@link FlatRangedWeapon}
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
	 * @param baseDamage
	 *            The fixed damage added to the raw damage
	 * @param maxDamageDice
	 *            The maximum number of damage dice rolled for an attack
	 * @param damageDie
	 *            The side count of the damage die
	 * @param lowRange
	 *            The minimum range of this weapon
	 * @param highrange
	 *            The maximum range of this weapon
	 * @param failValue
	 *            Rolling this value or lower is an automatic failure to hit
	 * @param magSize
	 *            The number of consecutive attacks this weapon can take in a
	 *            turn
	 * @param magCount
	 *            This times the magSize is the total number of attacks this
	 *            weapon can take
	 */
	public FlatRangedWeapon(int id, String name, byte schedule, String description, String special, ItemType type,
			byte origins, int transmuteid, byte baseDamage, byte maxDamageDice, byte damageDie, byte lowRange,
			byte highRange, byte failValue, byte magSize, byte magCount) {
		super(id, name, schedule, description, special, type, origins, transmuteid, baseDamage, maxDamageDice,
				damageDie, lowRange, highRange, failValue);
		this.magSize = magSize;
		this.magCount = magCount;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatRangedWeapon() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatRangedWeapon} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatRangedWeapon from
	 */
	public FlatRangedWeapon(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatRangedWeapon.class);
	}

	/**
	 * @return The number of consecutive attacks this weapon can take in a turn
	 */
	public byte getMagSize() {
		return magSize;
	}

	/**
	 * @return This times the magSize is the total number of attacks this weapon
	 *         can take
	 */
	public byte getMagCount() {
		return magCount;
	}
	
	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatWeapon#write(JsonWriter) super.write(out)} but does not call
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
		write(out, FlatRangedWeapon.class);
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
		if (!read(in, name, FlatRangedWeapon.class)) {
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
		if (FlatRangedWeapon.RANGEDWEAPONSEARCH != null)
			return;
		FlatRangedWeapon.RANGEDWEAPONSEARCH = "SELECT * FROM weapon WHERE weapon.itemid = ?";
		String insertTemplate = "INSERT INTO weapon(itemid,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE weapon SET %s WHERE itemid = ?";
		String[] superBuilt = fieldBuilder(FlatWeapon.class);
		String[] thisBuilt = fieldBuilder(FlatRangedWeapon.class);
		String[] built = new String[3];
		for (int i = 0; i < thisBuilt.length; i++)
			built[i] = superBuilt[i] + "," + thisBuilt[i];
		FlatRangedWeapon.RANGEDWEAPONINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatRangedWeapon.RANGEDWEAPONUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("RANGEDWEAPONINSERT") || name.equals("RANGEDWEAPONUPDATE")
				|| name.equals("RANGEDWEAPONSEARCH") || name.equals("RANGEDWEAPONDELETE");
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
		// All members of RangedFlatWeapon are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatRangedWeapon
	 * FlatRangedWeapon's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the weapon table for this
	 *         FlatRanedWeapon's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectRangedWeapon(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatRangedWeapon.RANGEDWEAPONSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatRangedWeapon
	 * FlatRangedWeapon's} base data into the item table and if successful, then
	 * inserts the FlatRangedWeapon data into the weapon side table or updates
	 * it if a matching orphan entry is found
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
	 * This method updates {@code this} {@link FlatRangedWeapon
	 * FlatRangedWeapon's} entry in the item table and if successful, then
	 * updates its weapon side table entry or if there is no corresponding side
	 * table entry, inserts it
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false if
	 *         otherwise
	 */
	@Override
	public boolean databaseUpdate(Connection conn) {
		if (super.databaseUpdate(conn)) {
			return updateOrInsert(conn);
		}
		return false;
	}

	/**
	 * Queries the weapon side table to see if we are updating or inserting and
	 * then performs the appropriate action
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, false if
	 *         otherwise
	 */
	private boolean updateOrInsert(Connection conn) {
		PreparedStatement state;
		try {
			ResultSet rs = this.databaseSelectRangedWeapon(conn);
			boolean isInsert;
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				state = conn.prepareStatement(FlatRangedWeapon.RANGEDWEAPONINSERT);
				isInsert = true;
			} else {
				state = conn.prepareStatement(FlatRangedWeapon.RANGEDWEAPONUPDATE);
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
		prep.setByte(1 + bump, this.getBaseDamage());
		prep.setByte(2 + bump, this.getMaxDamageDice());
		prep.setByte(3 + bump, this.getDamageDie());
		prep.setByte(4 + bump, this.getLowRange());
		prep.setByte(5 + bump, this.getHighRange());
		prep.setByte(6 + bump, this.getFailValue());
		prep.setByte(7 + bump, this.magSize);
		prep.setByte(8 + bump, this.magCount);
		if (!insert) {
			prep.setInt(9, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete FlatRangedWeapon entries in the weapon
	 * table
	 * 
	 * @param conn
	 */
	public void databaseDeleteRangedWeapon(Connection conn) {
		// TODO Auto-generated method stub
	}
}
