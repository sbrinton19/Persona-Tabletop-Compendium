package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;
import com.localhost.PersonaTabletopCompendiumServer.Common.FusionCalculator;

/**
 * The complete data for a persona including its skills, transmutes, negotiates,
 * and drops. This class should only be used to query database data & serialize
 * to JSON
 * 
 * @author Stefan
 *
 */
public class FullPersona extends FlatPersona {
	protected static FusionCalculator helper = FusionCalculator.getCalculator();
	protected LeveledSkill[] skills;
	protected DropReference[] drops;
	protected DropReference[] negotiates;
	protected ItemReference[] transmutes = new ItemReference[4];
	protected Recipe[] toRecipes;
	protected Recipe[] fromRecipes;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullPersona() {
	}

	/**
	 * This is for reading a {@link FullPersona} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FullPersona from
	 */
	public FullPersona(ResultSet rs) {
		/**
		 * This is used to get the FlatPersona fields that this class inherits
		 */
		super(rs);
		// Once we get the persona data, get all of the dependent data
		DatabaseHandler dbh = DatabaseHandler.getHandler();
		this.skills = dbh.getLeveledSkills(this.id);
		for (LeveledSkill skill : this.skills) {
			skill.level = skill.level == this.level ? 0 : skill.level;
		}
		DropReference[][] bothDrops = dbh.getBothDrops(this.id);
		this.drops = bothDrops[0];
		this.negotiates = bothDrops[1];
		this.transmutes = dbh.getTransmutes(this.id);
		this.toRecipes = helper.getFusionsTo(this);
		this.fromRecipes = helper.getFusionsFrom(this);
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
	public void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, FullPersona.class);
	}
	
	/**
	 * Never call this method under any circumstances
	 */
	@Override
	public void read(JsonReader in, String name) throws IOException, IllegalArgumentException, IllegalAccessException {
		return;
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
	protected boolean isJsonOnly(String name) {
		// All of these fields should only be written to JSON
		return true;
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
	 * This function should never be used
	 */
	protected boolean isIgnoredUpdateField(String name) {
		return true;
	}
	
	/**
	 * Never call this method under any circumstances
	 */
	public boolean databaseInsert(Connection conn) {
		return false;
	}
}
