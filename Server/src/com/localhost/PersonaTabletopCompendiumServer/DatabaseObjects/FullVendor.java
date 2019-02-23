package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.ResultSet;

import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;

/**
 * The FullVendor class extends FlatVendor to leverage its field & the JSON
 * serialization. This class should not be used to perform any database
 * operations itself or to deserialize JSON. This also means this class
 * does not need a TypeAdapater as it it will be "seamlessly" handled
 * during the serialization of its parent since it extends
 * DatabaseObject via FlatVendor
 * 
 * @author Stefan
 *
 */
public class FullVendor extends FlatVendor {
	protected VendorItemReference[] vendorItems;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullVendor() {
	}

	/**
	 * This is for reading a {@link FullVendor} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FullVendor from
	 */
	public FullVendor(ResultSet rs) {
		/**
		 * This is used to get the FlatVendor fields that this class inherits
		 */
		super(rs);
		// Once we get the vendor data, get all of the dependent data
		DatabaseHandler dbh = DatabaseHandler.getHandler();
		this.vendorItems = dbh.getItemsForVendor(this.getId());
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
		super.write(out);
		write(out, FullVendor.class);
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
	@Override
	protected boolean isDatabaseOnly(String name) {
		// No database unique fields
		return false;
	}
}
