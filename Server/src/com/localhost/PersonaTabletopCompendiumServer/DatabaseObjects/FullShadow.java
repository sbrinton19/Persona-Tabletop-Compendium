package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;

/**
 * The complete data for a shadow including its skills, negotiates, and drops.
 * This class should only be used to do database operations and serialize & deserialize JSON
 * 
 * @author Stefan
 *
 */
public class FullShadow extends FlatShadow {
	protected FlatSkill[] shadowSkills;
	protected DropReference[] drops;
	protected DropReference[] negotiates;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullShadow() {
		super();
	}

	/**
	 * This is for reading a {@link FullShadow} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FullShadow from
	 */
	public FullShadow(ResultSet rs) {
		/**
		 * This is used to get the FlatShadow fields that this class inherits
		 */
		super(rs);
		// Once we get the shadow data, get all of the dependent data
		DatabaseHandler dbh = DatabaseHandler.getHandler();
		this.shadowSkills = dbh.getShadowSkills(this.id);
		DropReference[][] bothDrops = dbh.getBothDrops(this.id, false);
		this.drops = bothDrops[0];
		this.negotiates = bothDrops[1];
	}

	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatPersona#write(JsonWriter) super.write(out)} but does not call
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
		write(out, FullShadow.class);
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
		if (!read(in, name, FullShadow.class)) {
			super.read(in, name);	
		}
	}
	
	/**
	 * Shorthand function to check if a given field should not be considered
	 * when writing to JSON
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the field is one to write, true if it should be
	 *         ignored when writing
	 */
	@Override
	protected boolean isIgnoredField(String name) {
		// Ignore helper
		return name.equals("helper");
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
		// All of these fields should only be written to JSON
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
	 * This method inserts {@code this} {@link FullShadow} into the shadow table,
	 * its skills into the persona_skill table, and the drops/negotiates into the
	 * drop_table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	@Override
	protected boolean databaseInsert(Connection conn) {
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
		// If we got here it means this shadow has an ID of -1 and that means
		// NONE of its references should be in the database so these should all be
		// straight inserts
		this.id = DatabaseHandler.getHandler().getNextAvailableShadowId();
		if (!super.databaseInsert(conn)) {
			return false;
		}
		for (FlatSkill skill : shadowSkills) {
			PersonaSkill temp = new PersonaSkill(this.id, skill.id, skill.minLevel, false);
			if (!temp.databaseInsert(conn)) {
				System.err.printf("Failed to properly insert skill: %s (%d) from shadow: %s (%d)\n", skill.name, skill.id, this.name, this.id);
			}
		}
		for (DropReference drop : drops) {
			Drop temp = new Drop(drop.id, this.id, true, false, drop.low, drop.high);
			if (!temp.databaseInsert(conn)) {
				System.err.printf("Failed to properly insert drop: %s (%d) from shadow: %s (%d)\n", drop.name, drop.id, this.name, this.id);
			}
		}
		for (DropReference negot : negotiates) {
			Drop temp = new Drop(negot.id, this.id, false, false, negot.low, negot.high);
			if (!temp.databaseInsert(conn)) {
				System.err.printf("Failed to properly insert negot: %s (%d) from shadow: %s (%d)\n", negot.name, negot.id, this.name, this.id);
			}
		}
		return true;
	}
	
	/**
	 * This method updates {@code this} {@link FullShadow} in the shadow table,
	 * its skills in the persona_skill table, and the drops/negotiates in the
	 * drop_table
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
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
		DatabaseHandler dbh = DatabaseHandler.getHandler();
		ArrayList<FlatSkill> oldSkills = new ArrayList<FlatSkill>(Arrays.asList(dbh.getShadowSkills(this.id)));
		DropReference[][] bothDrops = dbh.getBothDrops(this.id, false);
		ArrayList<DropReference> oldDrops  = new ArrayList<DropReference>(Arrays.asList(bothDrops[0]));
		ArrayList<DropReference> oldNegots = new ArrayList<DropReference>(Arrays.asList(bothDrops[1]));
		if (!super.databaseUpdate(conn)) {
			return false;
		}
		for (FlatSkill skill : shadowSkills) {
			for (int i = 0; i < oldSkills.size(); i++) {
				if (skill.id == oldSkills.get(i).id) {
					oldSkills.remove(i);
					break;
				}
			}
			PersonaSkill temp = new PersonaSkill(this.id, skill.id, skill.minLevel, false);
			if (!temp.updateOrInsert(conn)) {
				System.err.printf("Failed to properly updateOrInsert skill: %s (%d) from shadow: %s (%d)\n", skill.name, skill.id, this.name, this.id);
			}
		}
		for (FlatSkill skill : oldSkills) {
			PersonaSkill temp = new PersonaSkill(this.id, skill.id, skill.minLevel, false);
			if (!temp.databaseDelete(conn)) {
				System.err.printf("Failed to properly delete skill: %s (%d) from shadow: %s (%d)\n", skill.name, skill.id, this.name, this.id);
			}
		}
		for (DropReference drop : drops) {
			for (int i = 0; i < oldDrops.size(); i++) {
				if (drop.id == oldDrops.get(i).id) {
					oldDrops.remove(i);
					break;
				}
			}
			Drop temp = new Drop(drop.id, this.id, true, false, drop.low, drop.high);
			if (!temp.updateOrInsert(conn)) {
				System.err.printf("Failed to properly insert drop: %s (%d) from shadow: %s (%d)\n", drop.name, drop.id, this.name, this.id);
			}
		}
		for (DropReference drop : oldDrops) {
			Drop temp = new Drop(drop.id, this.id, true, false, drop.low, drop.high);
			if (!temp.databaseDelete(conn)) {
				System.err.printf("Failed to properly delete drop: %s (%d) from shadow: %s (%d)\n", drop.name, drop.id, this.name, this.id);
			}			
		}
		for (DropReference negot : negotiates) {
			for (int i = 0; i < oldNegots.size(); i++) {
				if (negot.id == oldNegots.get(i).id) {
					oldNegots.remove(i);
					break;
				}
			}
			Drop temp = new Drop(negot.id, this.id, false, false, negot.low, negot.high);
			if (!temp.updateOrInsert(conn)) {
				System.err.printf("Failed to properly insert negot: %s (%d) from shadow: %s (%d)\n", negot.name, negot.id, this.name, this.id);
			}
		}
		for (DropReference negot : oldNegots) {
			Drop temp = new Drop(negot.id, this.id, false, false, negot.low, negot.high);
			if (!temp.databaseDelete(conn)) {
				System.err.printf("Failed to properly delete negot: %s (%d) from shadow: %s (%d)\n", negot.name, negot.id, this.name, this.id);
			}		
		}
		return true;
	}
	
}
