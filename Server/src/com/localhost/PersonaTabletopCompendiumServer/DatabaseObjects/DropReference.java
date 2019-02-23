package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.ResultSet;

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
	@Override
	public void write(JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, DropReference.class);
	}
}
