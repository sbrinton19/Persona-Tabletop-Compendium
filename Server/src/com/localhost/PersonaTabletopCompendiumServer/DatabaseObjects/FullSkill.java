package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * This class represents a skill with the data of the personae that learn it. It
 * is not bound to any specific Skill Class, it will instead dynamically write a
 * "Full" version of it
 * 
 * @author Stefan
 *
 */
public class FullSkill extends DatabaseObject {

	protected FlatSkill skill;
	protected PersonaReference[] personaSources;
	protected String skillClass;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullSkill() {
	}

	/**
	 * Full Constructor for a {@link FullSkill}
	 * @param skill The skill this FullSkill represents
	 * @param refs The personae that learn this skill as {@link PersonaReference PersonaReferences}
	 */
	public FullSkill(FlatSkill skill, PersonaReference[] refs) {
		this.skill = skill;
		personaSources = refs;
		skillClass = skill.getClass().getSimpleName();
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
		write(out, FullSkill.class);
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
		// No ignored fields
		return false;
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