package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ActivityType;

/**
 * This class represents an item with the data of the personae that drop it or
 * transmute into it, and the vendors that sell it. It is not bound to any
 * specific Item Class, it will instead dynamically write a "Full" version of
 * it
 * 
 * @author Stefan
 *
 */
public class FullItem extends DatabaseObject {
	protected FlatItem item;
	protected PersonaReference transmute;
	protected PersonaReference[] droppers;
	protected PersonaReference[] negotiators;
	protected VendorItemReference[] vendorSources;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullItem() {
	}


	/**
	 * Full Constructor for a {@link FullItem}
	 * 
	 * @param item 
	 * 			The item this FullItem represents
	 * @param transmute
	 * 			The persona that transmutes into this item, if one exists
	 * 			as a {@link PersonaReference}
	 * @param droppers
	 * 			The personae that drop this item as {@link PersonaReference PersonaReferences}
	 * @param negotiators
	 * 			The personae that will give this item from negotiating 
	 * 			as {@link PersonaReference PersonaReferences}
	 * @param vendorSources
	 * 			The vendors that will sell this item as {@link VendorItemReference VendorItemReferences}
	 */
	public FullItem(FlatItem item, PersonaReference transmute, PersonaReference[] droppers,
			PersonaReference[] negotiators, VendorItemReference[] vendorSources) {
		this.item = item;
		this.transmute = transmute;
		this.droppers = droppers;
		this.negotiators = negotiators;
		this.vendorSources = vendorSources;
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
		write(out, FullItem.class);
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
	 * @return false if the field is one to write, true if it should be ignored
	 *         when writing
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
