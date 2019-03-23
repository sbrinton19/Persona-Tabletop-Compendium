package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Arcana;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ElemResist;

/**
 * The FlatShadow class is the server representation of the DB Table shadow
 * with added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatShadow extends DatabaseObject {
	protected int id;
	protected int personaId;
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
	protected byte maxDamageDice;
	protected byte damageDie;
	protected String note;

	private static String _SHADOWSEARCH = null;
	private static String _SHADOWINSERT = null;
	private static String _SHADOWUPDATE = null;

	/**
	 * Produces a {@link FlatShadow} with the array stats and elems
	 * 
	 * @param id
	 *            The Unique id for this shadow
	 * @param personaId
	 *            The Unique id for the persona this shadow is based on; -1 if there is no such persona
	 * @param name
	 *            The name of this shadow
	 * @param arcana
	 *            The arcana of this shadow
	 * @param level
	 *            The absolute level of this shadow
	 * @param stats
	 *            This shadow's stats
	 * @param elems
	 *            The elemResists of this shadow as an array of {@link ElemResist ElemResists}
	 * @param maxDamageDice
	 *            The maximum number of damage dice for this shadow's melee attack
	 * @param damageDie
	 *            The damage die for this shadow's melee attack
 	 * @param note
	 *            Any special notes about this shadow
	 */
	public FlatShadow(int id, int personaId, String name, Arcana arcana, byte level, Double[] stats, ElemResist[] elems, byte maxDamageDice, byte damageDie, String note) {
		this.id = id;
		this.personaId = personaId;
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
		this.maxDamageDice = maxDamageDice;
		this.damageDie = damageDie;
		this.note = note;
	}

	/**
	 * Produces a {@link FlatShadow} with the enumerated stats and elems
	 * 
	 * @param id
	 *            The Unique id for this shadow
	 * @param personaId
	 *            The Unique id for the persona this shadow is based on; -1 if there is no such persona
	 * @param name
	 *            The name of this shadow
	 * @param arcana
	 *            The arcana of this shadow
	 * @param level
	 *            This shadow's level
	 * @param hp
	 *            The starting HP for this shadow
	 * @param sp
	 *            The starting SP for this shadow
	 * @param strength
	 *            The starting strength for this shadow
	 * @param magic
	 *            The starting magic for this shadow
	 * @param endurance
	 *            The starting endurance for this shadow
	 * @param agility
	 *            The starting agility for this shadow
	 * @param luck
	 *            The starting luck for this shadow
	 * @param phys
	 *            The resistance or weakness to physical attacks for this
	 *            shadow
	 * @param gun
	 *            The resistance or weakness to gun attacks for this shadow
	 * @param fire
	 *            The resistance or weakness to fire attacks for this shadow
	 * @param ice
	 *            The resistance or weakness to ice attacks for this shadow
	 * @param elec
	 *            The resistance or weakness to electric attacks for this
	 *            shadow
	 * @param wind
	 *            The resistance or weakness to wind attacks for this shadow
	 * @param psy
	 *            The resistance or weakness to psychic attacks for this shadow
	 * @param nuke
	 *            The resistance or weakness to nuclear attacks for this shadow
	 * @param bless
	 *            The resistance or weakness to bless attacks for this shadow
	 * @param curse
	 *            The resistance or weakness to curse attacks for this shadow
	 * @param maxDamageDice
	 *            The maximum number of damage dice for this shadow's melee attack
	 * @param damageDie
	 *            The damage die for this shadow's melee attack
	 * @param note
	 *            Any special notes about this shadow
	 */
	public FlatShadow(int id, int personaId, String name, Arcana arcana, byte level, double hp, double sp, double strength,
			double magic, double endurance, double agility, double luck, ElemResist phys, ElemResist gun,
			ElemResist fire, ElemResist ice, ElemResist elec, ElemResist wind, ElemResist psy, ElemResist nuke,
			ElemResist bless, ElemResist curse, byte maxDamageDice, byte damageDie, String note, boolean special,
			boolean max, boolean dlc, boolean rare) {
		this.id = id;
		this.personaId = personaId;
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
		this.maxDamageDice = maxDamageDice;
		this.damageDie = damageDie;
		this.note = note;
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatShadow() {
		initSUIDStrings();
	}

	/**
	 * Reads a {@link FlatShadow} from the Database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FlatShadow out of
	 */
	public FlatShadow(ResultSet rs) {
		fieldReader(rs, FlatShadow.class);
		this.stats = new Double[] { hp, sp, strength, magic, endurance, agility, luck };
		this.elems = new ElemResist[] { phys, gun, fire, ice, elec, wind, psy, nuke, bless, curse };
	}

	/**
	 * @return The Unique id for this shadow
	 */
	public int getId() {
		return id;
	}

	/** 
	 * @return The Unique id for the persona this shadow is based on; -1 if there is no such persona
	 */
	public int getPersonaId() {
		return personaId;
	}
	
	/**
	 * @return The name of this shadow
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return The arcana of this shadow
	 */
	public Arcana getArcana() {
		return arcana;
	}

	/**
	 * @return The default starting level for this shadow
	 */
	public byte getLevel() {
		return level;
	}

	/**
	 * 
	 * @return The starting HP for this shadow
	 */
	public double getHP() {
		return hp;
	}

	/**
	 * @return The starting SP for this shadow
	 */
	public double getSP() {
		return sp;
	}

	/**
	 * @return The starting strength for this shadow
	 */
	public double getStrength() {
		return strength;
	}

	/**
	 * @return The starting magic for this shadow
	 */
	public double getMagic() {
		return magic;
	}

	/**
	 * @return The starting endurance for this shadow
	 */
	public double getEndurance() {
		return endurance;
	}

	/**
	 * @return The starting agility for this shadow
	 */
	public double getAgility() {
		return agility;
	}

	/**
	 * @return The starting luck for this shadow
	 */
	public double getLuck() {
		return luck;
	}

	/**
	 * @return The stats for this shadow, at the default level
	 */
	public Double[] getStats() {
		return stats;
	}

	/**
	 * @return The resistance or weakness to physical attacks for this shadow
	 */
	public ElemResist getPhys() {
		return phys;
	}

	/**
	 * @return The resistance or weakness to gun attacks for this shadow
	 */
	public ElemResist getGun() {
		return gun;
	}

	/**
	 * @return The resistance or weakness to fire attacks for this shadow
	 */
	public ElemResist getFire() {
		return fire;
	}

	/**
	 * @return The resistance or weakness to ice attacks for this shadow
	 */
	public ElemResist getIce() {
		return ice;
	}

	/**
	 * @return The resistance or weakness to electric attacks for this shadow
	 */
	public ElemResist getElec() {
		return elec;
	}

	/**
	 * @return The resistance or weakness to wind attacks for this shadow
	 */
	public ElemResist getWind() {
		return wind;
	}

	/**
	 * @return The resistance or weakness to psychic attacks for this shadow
	 */
	public ElemResist getPsy() {
		return psy;
	}

	/**
	 * @return The resistance or weakness to nuclear attacks for this shadow
	 */
	public ElemResist getNuke() {
		return nuke;
	}

	/**
	 * @return The resistance or weakness to bless attacks for this shadow
	 */
	public ElemResist getBless() {
		return bless;
	}

	/**
	 * @return The resistance or weakness to curse attacks for this shadow
	 */
	public ElemResist getCurse() {
		return curse;
	}

	/**
	 * @return The elemental resistances and weaknesses for this shadow, as an
	 *         array of {@link ElemResist}
	 */
	public ElemResist[] getElems() {
		return elems;
	}

	/**
	 * @return maxDamageDice
	 *            The maximum number of damage dice for this shadow's melee attack
	 */
	public byte getMaxDamageDice() {
		return maxDamageDice;
	}

	/**
	 * @return damageDic
	 *            The damage die for this shadow's melee attack
	 */
	public byte getDamageDie() {
		return damageDie;
	}
	
	/**
	 * @return Any special notes about this shadow
	 */
	public String getNote() {
		return note;
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
		write(out, FlatShadow.class);
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
		read(in, name, FlatShadow.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatShadow._SHADOWSEARCH != null)
			return;
		FlatShadow._SHADOWSEARCH = "SELECT * FROM shadow WHERE shadow.id = ?";
		String insertTemplate = "INSERT INTO shadow(%s) VALUES(%s)";
		String updateTemplate = "UPDATE shadow SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatShadow.class);
		FlatShadow._SHADOWINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatShadow._SHADOWUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("_SHADOWINSERT") || name.equals("_SHADOWUPDATE") || name.equals("_SHADOWSEARCH")
				|| name.equals("_SHADOWDELETE");
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
	@Override
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
	@Override
	protected boolean isIgnoredUpdateField(String name) {
		// Id is used to search on an update, so don't update it
		return name.equals("id");
	}
	
	/**
	 * Searches the database for this {@link FlatShadow FlatShadow's} id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the shadow table for this
	 *         FlatShadow's id
	 * @throws SQLException
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatShadow._SHADOWSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} {@link FlatShadow} into the shadow
	 * table
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
			insert = conn.prepareStatement(FlatShadow._SHADOWINSERT);
			return insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * This method updates {@code this} {@link FlatShadow FlatShadow's} entry
	 * in the shadow table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatShadow._SHADOWUPDATE);
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
		if (this.personaId < 0) {
			prep.setNull(1 + bump, java.sql.Types.INTEGER);	
		}
		else {
			prep.setInt(1 + bump, this.personaId);
		}
		prep.setString(2 + bump, this.name);
		prep.setByte(3 + bump, this.arcana.getValue());
		prep.setByte(4 + bump, this.level);
		prep.setDouble(5 + bump, this.hp);
		prep.setDouble(6 + bump, this.sp);
		prep.setDouble(7 + bump, this.strength);
		prep.setDouble(8 + bump, this.magic);
		prep.setDouble(9 + bump, this.endurance);
		prep.setDouble(10 + bump, this.agility);
		prep.setDouble(11 + bump, this.luck);
		prep.setByte(12 + bump, this.phys.getValue());
		prep.setByte(13 + bump, this.gun.getValue());
		prep.setByte(14 + bump, this.fire.getValue());
		prep.setByte(15 + bump, this.ice.getValue());
		prep.setByte(16 + bump, this.elec.getValue());
		prep.setByte(17 + bump, this.wind.getValue());
		prep.setByte(18 + bump, this.psy.getValue());
		prep.setByte(19 + bump, this.nuke.getValue());
		prep.setByte(20 + bump, this.bless.getValue());
		prep.setByte(21 + bump, this.curse.getValue());
		prep.setByte(22 + bump, this.maxDamageDice);
		prep.setByte(23 + bump, this.damageDie);
		prep.setString(24 + bump, this.note);
		if (!insert) {
			prep.setInt(25, this.getId());
		}
		int count = prep.executeUpdate();
		prep.close();
		return count == 1;
	}

	/**
	 * Unimplemented function to delete shadow table rows.
	 * 
	 * @param conn
	 * @return 
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}
}
