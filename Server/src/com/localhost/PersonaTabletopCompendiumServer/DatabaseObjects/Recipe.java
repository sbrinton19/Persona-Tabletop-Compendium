package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * The Recipe class extends DatabaseObject to leverage the JSON
 * serialization. This class should not be used to perform any database
 * operations itself or to deserialize JSON. This also means this class
 * does not need a TypeAdapater as it it will be "seamlessly" handled
 * during the serialization of its parent since it extends
 * DatabaseObject
 * 
 * @author Stefan
 *
 */
public class Recipe extends DatabaseObject {
	protected PersonaReference result;
	protected PersonaReference[] sources = new PersonaReference[7];
	protected double cost = 0;

	/**
	 * Complete {@link Recipe} constructor
	 * 
	 * @param result
	 *            The persona produced by this recipe
	 * @param sources
	 *            The personae that fuse together to make the result
	 */
	public Recipe(PersonaReference result, PersonaReference[] sources) {
		this.result = result;
		this.sources = sources;
		for (PersonaReference ref : sources) {
			if (ref == null) {
				break;
			}
			int level = ref.level;
			cost += (27 * level * level) + (126 * level) + 2147;
		}
	}

	/**
	 * The empty constructor used for Invocation by Reflection
	 */
	public Recipe() {
	}

	/**
	 * @return The persona produced by this recipe
	 */
	public PersonaReference getResult() {
		return result;
	}

	/**
	 * @return The personae that fuse together to make the result
	 */
	public PersonaReference[] getSource() {
		return sources;
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
		write(out, Recipe.class);
	}

	/**
	 * This method should not be called
	 */
	@Override
	public void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException {
		return;
	}

	/**
	 * Shorthand function to check if a given field should not be considered
	 * when writing to JSON
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the field is one to write, true if it should be ignored
	 *         when writing
	 */
	@Override
	protected boolean isIgnoredField(String name) {
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
