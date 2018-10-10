package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * The DropReference class extends {@link ItemReference} and comes with the same
 * caveats about its use
 * 
 * @author Stefan
 *
 */
public class DropReference extends ItemReference {
	protected byte low;
	protected byte high;

	/**
	 * Full Constructor for {@link DropReference}
	 * 
	 * @param id
	 *            The unique id of the item for this drop
	 * @param name
	 *            The name of the item for this drop
	 * @param low
	 *            The lower bound of rolls/draws for this drop
	 * @param high
	 *            The upper bound of rolls/draws for this drop
	 */
	public DropReference(int id, String name, byte low, byte high) {
		super(id, name);
		this.low = low;
		this.high = high;
	}

	/**
	 * Empty Constructor for instantiating this object via reflection
	 */
	public DropReference() {
	}

	/**
	 * Used to read in a DropReference from a {@link ResultSet} passed in via a
	 * different {@link DatabaseObject} subclass to populate its own fields,
	 * primarily {@link FullPersona}
	 * 
	 * @param rs
	 *            The ResultSet to build this DropReference form
	 */
	public DropReference(ResultSet rs) {
		super(rs);
		fieldReader(rs, DropReference.class);
	}
	
	/**
	 * @return The lower bound of rolls/draws for this drop
	 */
	public byte getLow() {
		return low;
	}

	/**
	 * @return The upper bound of rolls/draws for this drop
	 */
	public byte getHigh() {
		return high;
	}

	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link ItemReference#write(JsonWriter) super.write(out)} but does not
	 * call {@link JsonWriter#endObject() out.endObject()}. This is to enable
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
		super.write(out);
		write(out, DropReference.class);
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
