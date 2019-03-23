package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * The PersonaReference class extends DatabaseObject to leverage the JSON
 * serialization. This class should not be used to perform any database
 * operations itself or to deserialize JSON. This also means this class
 * does not need a TypeAdapater as it it will be "seamlessly" handled
 * during the serialization of its parent since it extends
 * DatabaseObject
 * 
 * @author Stefan
 *
 */
public class PersonaReference extends DatabaseObject {
	protected int id;
	protected String name;
	protected byte level;
	protected byte arcana;

	/**
	 * Full Constructor for a {@link PersonaReference}
	 * 
	 * @param id
	 *            The id of the persona being referenced
	 * @param name
	 *            The name of the referenced persona
	 * @param level
	 *            The level of the persona or the level it learns a skill
	 * @param arcana
	 *            The arcana of this persona
	 */
	public PersonaReference(int id, String name, byte level, byte arcana) {
		this.id = id;
		this.name = name;
		this.level = level;
		this.arcana = arcana;
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
		return id;
	}

	/**
	 * @return The name of the referenced persona
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return The level of the persona or the level it learns a skill
	 */
	public byte getLevel() {
		return level;
	}

	/**
	 * @return The arcana of this persona
	 */
	public byte getArcana() {
		return arcana;
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
	@Override
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
	@Override
	protected boolean isJsonOnly(String name) {
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
	 * This function should never be used
	 */
	@Override
	protected boolean isIgnoredUpdateField(String name) {
		return true;
	}
	
	/**
	 * Never call this method under any circumstances
	 */
	@Override
	public boolean databaseInsert(Connection conn) {
		return false;
	}

	/**
	 * Never call this method under any circumstances
	 */
	@Override
	protected ResultSet databaseSelect(Connection conn) throws SQLException {
		return null;
	}

	/**
	 * Never call this method under any circumstances
	 */
	@Override
	protected boolean databaseUpdate(Connection conn) {
		return false;
	}

	/**
	 * Never call this method under any circumstances
	 */
	@Override
	protected boolean insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		return false;
	}

	/**
	 * Never call this method under any circumstances
	 */
	@Override
	public boolean databaseDelete(Connection conn) {
		return false;
	}
}
