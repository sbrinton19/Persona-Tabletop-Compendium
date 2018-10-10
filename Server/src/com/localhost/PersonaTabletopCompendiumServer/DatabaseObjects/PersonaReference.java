package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * The PersonaReference class extends DatabaseObject to leverage the JSON
 * serialization. This class should not be used to perform any database
 * operations itself or to deserialize JSON
 * 
 * @author Stefan
 *
 */
public class PersonaReference extends DatabaseObject {
	protected int personaId;
	protected String personaName;
	protected byte level;
	protected byte originArcana;

	/**
	 * Full Constructor for a {@link PersonaReference}
	 * 
	 * @param personaId
	 *            The id of the persona being referenced
	 * @param personaName
	 *            The name of the referenced persona
	 * @param level
	 *            The level of the persona or the level it learns a skill
	 * @param originArcana
	 *            The arcana of this persona or origins for an item referencing
	 *            this persona
	 */
	public PersonaReference(int personaId, String personaName, byte level, byte originArcana) {
		this.personaId = personaId;
		this.personaName = personaName;
		this.level = level;
		this.originArcana = originArcana;
	}

	/**
	 * Empty Constructor for Reflection invocation
	 */
	public PersonaReference() {
	}

	/**
	 * Used to read in a PersonaReference from a {@link ResultSet} passed in via
	 * a different {@link DatabaseObject} subclass to populate its own fields,
	 * primarily {@link FullSkill} & {@link FullItem}
	 * 
	 * @param rs
	 *            The ResultSet to build this PersonaReference form
	 */
	public PersonaReference(ResultSet rs) {
		fieldReader(rs, PersonaReference.class);
	}

	/**
	 * @return The id of the persona being referenced
	 */
	public int getId() {
		return personaId;
	}

	/**
	 * @return The name of the referenced persona
	 */
	public String getName() {
		return personaName;
	}

	/**
	 * @return The level of the persona or the level it learns a skill
	 */
	public byte getLevel() {
		return level;
	}

	/**
	 * @return The arcana of this persona or origins for an item referencing
	 *         this persona
	 */
	public byte getOriginArcana() {
		return originArcana;
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
	public void write(JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		out.beginObject();
		write(out, PersonaReference.class);
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
