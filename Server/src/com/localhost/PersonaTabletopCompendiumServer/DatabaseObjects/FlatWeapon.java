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
 * The FlatWeapon class is the server representation of the joined DB Tables
 * item & weapon where the magSize is 0, with added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatWeapon extends FlatItem {
	protected byte baseDamage;
	protected byte maxDamageDice;
	protected byte damageDie;
	protected byte minRange;
	protected byte maxRange;
	protected byte failValue;
	private static String _WEAPONSEARCH = null;
	private static String _WEAPONINSERT = null;
	private static String _WEAPONUPDATE = null;

	/**
	 * Produces a complete {@link FlatWeapon}
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
	 * @param transmuteId
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
	 * @param minRange
	 *            The minimum range of this weapon
	 * @param maxrange
	 *            The maximum range of this weapon
	 * @param failValue
	 *            Rolling this value or lower is an automatic failure to hit
	 */
	public FlatWeapon(int id, String name, byte schedule, String description, String special, ItemType type,
			byte origins, int transmuteId, byte baseDamage, byte maxDamageDice, byte damageDie, byte minRange,
			byte maxRange, byte failValue) {
		super(id, name, schedule, description, special, type, origins, transmuteId, ConsumableType.NONE);
		this.baseDamage = baseDamage;
		this.maxDamageDice = maxDamageDice;
		this.damageDie = damageDie;
		this.minRange = minRange;
		this.maxRange = maxRange;
		this.failValue = failValue;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatWeapon() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatWeapon} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatWeapon
	 *            from
	 */
	public FlatWeapon(ResultSet rs) {
		super(rs);
		fieldReader(rs, FlatWeapon.class);
	}

	/**
	 * @return The fixed damage added to the raw damage
	 */
	public byte getBaseDamage() {
		return baseDamage;
	}

	/**
	 * @return The maximum number of damage dice rolled for an attack
	 */
	public byte getMaxDamageDice() {
		return maxDamageDice;
	}

	/**
	 * @return The side count of the damage die
	 */
	public byte getDamageDie() {
		return damageDie;
	}

	/**
	 * @return The minimum range of this weapon
	 */
	public byte getMinRange() {
		return minRange;
	}

	/**
	 * @return The maximum range of this weapon
	 */
	public byte getMaxRange() {
		return maxRange;
	}

	/**
	 * @return Rolling this value or lower is an automatic failure to hit
	 */
	public byte getFailValue() {
		return failValue;
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
		write(out, FlatWeapon.class);
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
		if (!read(in, name, FlatWeapon.class)) {
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
		if (FlatWeapon._WEAPONSEARCH != null)
			return;
		FlatWeapon._WEAPONSEARCH = "SELECT * FROM weapon WHERE weapon.skillId = ?";
		String insertTemplate = "INSERT INTO weapon(skillId,%s) VALUES(?,%s)";
		String updateTemplate = "UPDATE weapon SET %s WHERE skillId = ?";
		String[] built = fieldBuilder(FlatWeapon.class);
		FlatWeapon._WEAPONINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatWeapon._WEAPONUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_WEAPONINSERT") || name.equals("_WEAPONUPDATE") || name.equals("_WEAPONSEARCH")
				|| name.equals("_WEAPONDELETE");
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
		// All members of FlatWeapon are updated
		// in the side table during an UPDATE
		return false;
	}

	/**
	 * Searches the database for this {@link FlatWeapon FlatWeapon's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the weapon table for this
	 *         FlatWeapon's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatWeapon._WEAPONSEARCH);
		search.setInt(1, getId());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatWeapon FlatWeapon's} data
	 * into the weapon side table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatWeapon._WEAPONINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@code this} {@link FlatWeapon FlatWeapon's} entry in
	 * the weapon side table
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatWeapon._WEAPONUPDATE);
			return insertUpdate(update, false);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * First checks the item table for an entry for {@code this} item's 
	 * id and inserts or updates as appropriate. If successful, it then attempts
	 * to do the same for the weapon table.
	 * 
	 * @param conn
	 *            A connection to the database
	 * @return True if the action was performed without errors, otherwise false
	 */
	@Override
	public boolean updateOrInsert(Connection conn) {
		if (super.updateOrInsert(conn)) {
			try {
				ResultSet rs = this.databaseSelect(conn);
				if (rs == null) {
					return false;
				}
				if (!rs.isBeforeFirst()) {
					// No data so blind insert
					return databaseInsert(conn);
				} else {
					return databaseUpdate(conn);
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}			
		}
		return false;
	}

	/**
	 * This method parameterizes and executes the database inserts and updates
	 * due to their similarity
	 * 
	 * @param prep
	 *            The {@link PreparedStatement} to parameterize and execute
	 * @param insert
	 *            Whether we are inserting or updating
	 * @return True if the operation completed successfully, false if otherwise 
	 * @throws SQLException
	 */
	@Override
	protected boolean insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.getId());
			bump = 1;
		}
		prep.setByte(1 + bump, this.baseDamage);
		prep.setByte(2 + bump, this.maxDamageDice);
		prep.setByte(3 + bump, this.damageDie);
		prep.setByte(4 + bump, this.minRange);
		prep.setByte(5 + bump, this.maxRange);
		prep.setByte(6 + bump, this.failValue);
		if (!insert) {
			prep.setInt(7, this.getId());
		}
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Unimplemented function to delete weapon table rows.
	 * 
	 * @param conn
	 * @return 
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}
}
