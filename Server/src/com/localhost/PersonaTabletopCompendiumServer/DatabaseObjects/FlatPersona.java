package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Arcana;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ElemResist;

/**
 * The FlatPersona class is the server representation of the DB Table persona
 * with added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatPersona extends DatabaseObject {
	protected int id;
	protected String name;
	protected Arcana arcana;
	protected byte level;
	protected double hp;
	protected double sp;
	protected double strength;
	protected double magic;
	protected double endurance;
	protected double agility;
	protected double luck;
	// This array needs to work with reflection
	// And primitives don't really do that in Java
	protected Double stats[] = new Double[7];
	protected ElemResist phys;
	protected ElemResist gun;
	protected ElemResist fire;
	protected ElemResist ice;
	protected ElemResist elec;
	protected ElemResist wind;
	protected ElemResist psy;
	protected ElemResist nuke;
	protected ElemResist bless;
	protected ElemResist curse;
	protected ElemResist[] elems = new ElemResist[10];
	protected String note;
	protected boolean special;
	protected boolean max;
	protected boolean dlc;
	protected boolean rare;
	private static String PERSONASEARCH = null;
	private static String PERSONAINSERT = null;
	private static String PERSONAUPDATE = null;

	/**
	 * Produces a {@link FlatPersona} with the array stats and elems
	 * 
	 * @param id
	 *            The Unique id for this persona
	 * @param name
	 *            The name of this persona
	 * @param arcana
	 *            The arcana of this persona
	 * @param level
	 *            The default starting level for this persona
	 * @param stats
	 *            The stats for this persona at the default level
	 * @param elems
	 *            The elemental resistances and weaknesses for this persona as
	 *            an array of {@link ElemResist}
	 * @param note
	 *            Any special notes about this persona
	 * @param special
	 *            If this persona can only be fused from a special fusion recipe
	 * @param max
	 *            If this persona requires the corresponding Arcana confidant to
	 *            be maxed out before fusing to it
	 * @param dlc
	 *            If this is a dlc persona
	 * @param rare
	 *            If this persona cannot be produced by fusion and uses the rare
	 *            fusion formula
	 */
	public FlatPersona(int id, String name, Arcana arcana, byte level, Double[] stats, ElemResist[] elems, String note,
			boolean special, boolean max, boolean dlc, boolean rare) {
		this.id = id;
		this.name = name;
		this.arcana = arcana;
		this.level = level;
		this.stats = stats;
		this.elems = elems;
		this.hp = stats[0];
		this.sp = stats[1];
		this.strength = stats[2];
		this.magic = stats[3];
		this.endurance = stats[4];
		this.agility = stats[5];
		this.luck = stats[6];
		this.phys = elems[0];
		this.gun = elems[1];
		this.fire = elems[2];
		this.ice = elems[3];
		this.elec = elems[4];
		this.wind = elems[5];
		this.psy = elems[6];
		this.nuke = elems[7];
		this.bless = elems[8];
		this.curse = elems[9];
		this.note = note;
		this.special = special;
		this.max = max;
		this.dlc = dlc;
		this.rare = rare;
	}

	/**
	 * 
	 * Produces a {@link FlatPersona} with the enumerated stats and elems
	 * 
	 * @param id
	 *            The Unique id for this persona
	 * @param name
	 *            The name of this persona
	 * @param arcana
	 *            The arcana of this persona
	 * @param level
	 *            The default starting level for this persona
	 * @param hp
	 *            The starting HP for this persona
	 * @param sp
	 *            The starting SP for this persona
	 * @param strength
	 *            The starting strength for this persona
	 * @param magic
	 *            The starting magic for this persona
	 * @param endurance
	 *            The starting endurance for this persona
	 * @param agility
	 *            The starting agility for this persona
	 * @param luck
	 *            The starting luck for this persona
	 * @param phys
	 *            The resistance or weakness to physical attacks for this
	 *            persona
	 * @param gun
	 *            The resistance or weakness to gun attacks for this persona
	 * @param fire
	 *            The resistance or weakness to fire attacks for this persona
	 * @param ice
	 *            The resistance or weakness to ice attacks for this persona
	 * @param elec
	 *            The resistance or weakness to electric attacks for this
	 *            persona
	 * @param wind
	 *            The resistance or weakness to wind attacks for this persona
	 * @param psy
	 *            The resistance or weakness to psychic attacks for this persona
	 * @param nuke
	 *            The resistance or weakness to nuclear attacks for this persona
	 * @param bless
	 *            The resistance or weakness to bless attacks for this persona
	 * @param curse
	 *            The resistance or weakness to curse attacks for this persona
	 * @param note
	 *            Any special notes about this persona
	 * @param special
	 *            If this persona can only be fused from a special fusion recipe
	 * @param max
	 *            If this persona requires the corresponding Arcana confidant to
	 *            be maxed out before fusing to it
	 * @param dlc
	 *            If this is a dlc persona
	 * @param rare
	 *            If this persona cannot be produced by fusion and uses the rare
	 *            fusion formula
	 */
	public FlatPersona(int id, String name, Arcana arcana, byte level, double hp, double sp, double strength,
			double magic, double endurance, double agility, double luck, ElemResist phys, ElemResist gun,
			ElemResist fire, ElemResist ice, ElemResist elec, ElemResist wind, ElemResist psy, ElemResist nuke,
			ElemResist bless, ElemResist curse, String note, boolean special, boolean max, boolean dlc, boolean rare) {
		this.id = id;
		this.name = name;
		this.arcana = arcana;
		this.level = level;
		this.hp = hp;
		this.sp = sp;
		this.strength = strength;
		this.magic = magic;
		this.endurance = endurance;
		this.agility = agility;
		this.luck = luck;
		this.stats = new Double[] { hp, sp, strength, magic, endurance, agility, luck };
		this.phys = phys;
		this.gun = gun;
		this.fire = fire;
		this.ice = ice;
		this.elec = elec;
		this.wind = wind;
		this.psy = psy;
		this.nuke = nuke;
		this.bless = bless;
		this.curse = curse;
		this.elems = new ElemResist[] { phys, gun, fire, ice, elec, wind, psy, nuke, bless, curse };
		this.note = note;
		this.special = special;
		this.max = max;
		this.dlc = dlc;
		this.rare = rare;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatPersona() {
		initSUIDStrings();
	}

	/**
	 * Reads a {@link FlatPersona} from the Database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatPersona out of
	 */
	public FlatPersona(ResultSet rs) {
		fieldReader(rs, FlatPersona.class);
		this.stats = new Double[] { hp, sp, strength, magic, endurance, agility, luck };
		this.elems = new ElemResist[] { phys, gun, fire, ice, elec, wind, psy, nuke, bless, curse };
	}

	/**
	 * @return The Unique id for this persona
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return The name of this persona
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return The arcana of this persona
	 */
	public Arcana getArcana() {
		return arcana;
	}

	/**
	 * @return The default starting level for this persona
	 */
	public byte getLevel() {
		return level;
	}

	/**
	 * 
	 * @return The starting HP for this persona
	 */
	public double getHP() {
		return hp;
	}

	/**
	 * @return The starting SP for this persona
	 */
	public double getSP() {
		return sp;
	}

	/**
	 * @return The starting strength for this persona
	 */
	public double getStrength() {
		return strength;
	}

	/**
	 * @return The starting magic for this persona
	 */
	public double getMagic() {
		return magic;
	}

	/**
	 * @return The starting endurance for this persona
	 */
	public double getEndurance() {
		return endurance;
	}

	/**
	 * @return The starting agility for this persona
	 */
	public double getAgility() {
		return agility;
	}

	/**
	 * @return The starting luck for this persona
	 */
	public double getLuck() {
		return luck;
	}

	/**
	 * @return The stats for this persona at the default level
	 */
	public Double[] getStats() {
		return stats;
	}

	/**
	 * @return The resistance or weakness to physical attacks for this persona
	 */
	public ElemResist getPhys() {
		return phys;
	}

	/**
	 * @return The resistance or weakness to gun attacks for this persona
	 */
	public ElemResist getGun() {
		return gun;
	}

	/**
	 * @return The resistance or weakness to fire attacks for this persona
	 */
	public ElemResist getFire() {
		return fire;
	}

	/**
	 * @return The resistance or weakness to ice attacks for this persona
	 */
	public ElemResist getIce() {
		return ice;
	}

	/**
	 * @return The resistance or weakness to electric attacks for this persona
	 */
	public ElemResist getElec() {
		return elec;
	}

	/**
	 * @return The resistance or weakness to wind attacks for this persona
	 */
	public ElemResist getWind() {
		return wind;
	}

	/**
	 * @return The resistance or weakness to psychic attacks for this persona
	 */
	public ElemResist getPsy() {
		return psy;
	}

	/**
	 * @return The resistance or weakness to nuclear attacks for this persona
	 */
	public ElemResist getNuke() {
		return nuke;
	}

	/**
	 * @return The resistance or weakness to bless attacks for this persona
	 */
	public ElemResist getBless() {
		return bless;
	}

	/**
	 * @return The resistance or weakness to curse attacks for this persona
	 */
	public ElemResist getCurse() {
		return curse;
	}

	/**
	 * @return The elemental resistances and weaknesses for this persona as an
	 *         array of {@link ElemResist}
	 */
	public ElemResist[] getElems() {
		return elems;
	}

	/**
	 * @return Any special notes about this persona
	 */
	public String getNote() {
		return note;
	}

	/**
	 * @return If this persona can only be fused from a special fusion recipe
	 */
	public boolean isSpecial() {
		return special;
	}

	/**
	 * @return If this persona requires the corresponding Arcana confidant to be
	 *         maxed out before fusing to it
	 */
	public boolean isMax() {
		return max;
	}

	/**
	 * @return If this is a dlc persona
	 */
	public boolean isDlc() {
		return dlc;
	}

	/**
	 * @return If this persona cannot be produced by fusion and uses the rare
	 *         fusion formula
	 */
	public boolean isRare() {
		return rare;
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
		write(out, FlatPersona.class);
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
		read(in, name, FlatPersona.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatPersona.PERSONASEARCH != null)
			return;
		FlatPersona.PERSONASEARCH = "SELECT * FROM persona WHERE persona.id = ?";
		String insertTemplate = "INSERT INTO persona(%s) VALUES(%s)";
		String updateTemplate = "UPDATE persona SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatPersona.class);
		FlatPersona.PERSONAINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatPersona.PERSONAUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("PERSONAINSERT") || name.equals("PERSONAUPDATE") || name.equals("PERSONASEARCH")
				|| name.equals("PERSONADELETE");
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
		return name.equals("stats") || name.equals("elems");
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
		return name.equals("hp") || name.equals("sp") || name.equals("strength") || name.equals("magic")
				|| name.equals("endurance") || name.equals("agility") || name.equals("luck") || name.equals("phys")
				|| name.equals("gun") || name.equals("fire") || name.equals("ice") || name.equals("elec")
				|| name.equals("wind") || name.equals("psy") || name.equals("nuke") || name.equals("bless")
				|| name.equals("curse");
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
		// Id is used to search on an update, so don't update it
		return name.equals("id");
	}
	
	/**
	 * Searches the database for this {@link FlatPersona FlatPersona's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the persona table for this
	 *         FlatPersona's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectPersona(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatPersona.PERSONASEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatPersona} into the persona
	 * table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatPersona.PERSONAINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@code this} {@link FlatPersona FlatPersona's} entry
	 * in the persona table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatPersona.PERSONAUPDATE);
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
		prep.setString(1 + bump, this.name);
		prep.setByte(2 + bump, this.arcana.getValue());
		prep.setByte(3 + bump, this.level);
		prep.setDouble(4 + bump, this.hp);
		prep.setDouble(5 + bump, this.sp);
		prep.setDouble(6 + bump, this.strength);
		prep.setDouble(7 + bump, this.magic);
		prep.setDouble(8 + bump, this.endurance);
		prep.setDouble(9 + bump, this.agility);
		prep.setDouble(10 + bump, this.luck);
		prep.setByte(11 + bump, this.phys.getValue());
		prep.setByte(12 + bump, this.gun.getValue());
		prep.setByte(13 + bump, this.fire.getValue());
		prep.setByte(14 + bump, this.ice.getValue());
		prep.setByte(15 + bump, this.elec.getValue());
		prep.setByte(16 + bump, this.wind.getValue());
		prep.setByte(17 + bump, this.psy.getValue());
		prep.setByte(18 + bump, this.nuke.getValue());
		prep.setByte(19 + bump, this.bless.getValue());
		prep.setByte(20 + bump, this.curse.getValue());
		prep.setString(21 + bump, this.note);
		prep.setBoolean(22 + bump, this.special);
		prep.setBoolean(23 + bump, this.max);
		prep.setBoolean(24 + bump, this.dlc);
		prep.setBoolean(25 + bump, this.rare);
		if (!insert) {
			prep.setInt(26, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete persona table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeletePersona(Connection conn) {
		// TODO Auto-generated method stub
	}
}
