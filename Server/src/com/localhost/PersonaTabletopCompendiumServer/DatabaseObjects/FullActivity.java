package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ActivityType;

/**
 * The complete data for an activity including its Restrictions & Vendors if it is
 * a shopping activity. This class should only be used to query database data & serialize
 * to JSON
 * 
 * @author Stefan
 *
 */
public class FullActivity extends FlatActivity {
	protected Restriction[] restrictions;
	protected FullVendor[] vendors;

	/**
	 * Empty constructor for instantiation via reflection
	 */
	public FullActivity() {
	}

	/**
	 * This is for reading a {@link FullActivity} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a
	 *            FullActivity from
	 */
	public FullActivity(ResultSet rs) {
		/**
		 * This is used to get the FlatActivity fields that this class inherits
		 */
		super(rs);
		// Once we get the persona data, get all of the dependent data
		DatabaseHandler dbh = DatabaseHandler.getHandler();
		this.restrictions = dbh.getRestrictionsForActivity(this.id);
		if (this.type == ActivityType.SHOPPING) {
			this.vendors = dbh.getShoppingVendors(this.id);
		} else {
			this.vendors = new FullVendor[0];
		}
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
		write(out, FullActivity.class);
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
