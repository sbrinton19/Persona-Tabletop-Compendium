package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.ResultSet;

import com.google.gson.stream.JsonWriter;

/**
 * The VendorItemReference class extends {@link ItemReference} and comes with the same
 * caveats about its use. Additionally this class will be "owned" by a parent object.
 * If it is an item object, the name will be a vendor & the id will be the activity the vendor belongs to.
 * If it is a vendor object, the name & id will be that of an item being sold by the vendor 
 * 
 * @author Stefan
 *
 */
public class VendorItemReference extends ItemReference {
	protected int cost;
	protected Restriction[] restrictions;

	/**
	 * Full Constructor for {@link VendorItemReference}
	 * 
	 * @param id
	 *            The unique id of either the activity the vendor that sells
	 *            this item belongs to or the the id of the item being sold
	 *            by this vendor
	 * @param name
	 *            The name of either the vendor selling this item or
	 *            the item being sold by this vendor
	 * @param cost
	 *            The cost the item is being sold for at the given vendor
	 * @param restrictions
	 *            The restrictions for when the item is being sold at the given vendor
	 */
	public VendorItemReference(int id, String name, int cost, Restriction[] restrictions) {
		super(id, name);
		this.cost = cost;
		this.restrictions = restrictions;
	}

	/**
	 * Empty Constructor for instantiating this object via reflection
	 */
	public VendorItemReference() {
	}

	/**
	 * Used to read in a VendorItemReference from a {@link ResultSet} &
	 * array of restrictions passed in via a different {@link DatabaseObject}
	 * subclass to populate its own fields, primarily {@link FullVendor} & {@link FullItem}
	 * 
	 * @param rs
	 *            The ResultSet to build this VendorItemReference form
	 * @param restrictions
	 *            The restrictions for this VendorItemReference            
	 */
	public VendorItemReference(ResultSet rs, Restriction[] restrictions) {
		super(rs);
		fieldReader(rs, VendorItemReference.class);
		this.restrictions = restrictions;
	}
	
	/**
	 * @return The cost the item is being sold at from the given vendor
	 */
	public int getCost() {
		return cost;
	}

	/**
	 * @return The restrictions for when the item is being sold at from the given vendor
	 */
	public Restriction[] getRestrictions() {
		return restrictions;
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
		write(out, VendorItemReference.class);
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
		// restrictions is not read in using a single ResultSet
		return name.equals("restrictions");
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
}
