package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.BoundType;

/**
 * The BoundRestriction class is the server representation of the DB Table bound_restriction with
 * added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class BoundRestriction extends DatabaseObject {
	protected int restrictionid;
	protected int boundid;
	protected BoundType type;
	private static String BOUNDRESTRICTIONSEARCH = null;
	private static String BOUNDRESTRICTIONINSERT = null;
	private static String BOUNDRESTRICTIONUPDATE = null;

	/**
	 * Produces a complete {@link BoundRestriction}
	 * 
	 * @param restrictionid
	 *            The Unique id of the restriction
	 * @param boundid
	 *            The Unique id of the object bound to this restriction
	 * @param type
	 * 			  A {@link BoundType} representing the class of the bound object 
	 */
	public BoundRestriction(int restrictionid, int boundid, BoundType type) {
		this.restrictionid = restrictionid;
		this.boundid = boundid;
		this.type = type;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public BoundRestriction() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link BoundRestriction} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a BoundRestriction
	 *            from
	 */
	public BoundRestriction(ResultSet rs) {
		fieldReader(rs, BoundRestriction.class);
	}

	/**
	 * @return The Unique id of the restriction
	 */
	public int getRestrictionId() {
		return restrictionid;
	}

	/**
	 * @return The Unique id of the bound item
	 */
	public int getBoundId() {
		return boundid;
	}
	
	/**
	 * @return A {@link BoundType} representing the class of the bound object
	 */
	public BoundType getType() {
		return type;
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
		write(out, BoundRestriction.class);
	}

	/**
	 * This method is an implementation of
	 * {@link DatabaseObject#read(JsonReader, String)} for JSON deserialization.
	 * 
	 * @param in
	 *            A {@link JsonReader} for the JSON
	 * @param name
	 *            The name of the {@link Field} to read into this object
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException {
		read(in, name, BoundRestriction.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (BoundRestriction.BOUNDRESTRICTIONSEARCH != null)
			return;
		BoundRestriction.BOUNDRESTRICTIONSEARCH = "SELECT * FROM bound_restriction WHERE bound_restriction.restrictionid = ? AND bound_restriction.boundid = ? AND bound_restriction.type = ?";
		String insertTemplate = "INSERT INTO bound_restriction(%s) VALUES(%s)";
		String updateTemplate = "UPDATE bound_restriction SET %s WHERE bound_restriction.restrictionid = ? AND bound_restriction.boundid = ? AND bound_restriction.type = ?";
		String[] built = fieldBuilder(BoundRestriction.class);
		BoundRestriction.BOUNDRESTRICTIONINSERT = String.format(insertTemplate, built[0], built[1]);
		BoundRestriction.BOUNDRESTRICTIONUPDATE = String.format(updateTemplate, built[2]);
	}

	/**
	 * Shorthand function to check if a given field should not be considered
	 * when reading/writing from JSON or the database
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return false if the field is one to read/write, true if it should be
	 *         ignored when reading/writing
	 */
	protected boolean isIgnoredField(String name) {
		return name.equals("BOUNDRESTRICTIONINSERT") || name.equals("BOUNDRESTRICTIONUPDATE") || name.equals("BOUNDRESTRICTIONSEARCH")
				|| name.equals("BOUNDRESTRICTIONDELETE");
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
	protected boolean isDatabaseOnly(String name) {
		// No database unique fields
		return false;
	}

	/**
	 * Shorthand function for checking if a given field is not changed by an
	 * update in the database. Note: This method does not check if a field is an
	 * ignored field. So, this method should always be prefaced with
	 * {@link #isIgnoredField(String name) isIgnoredField} to check for ignored
	 * fields
	 * 
	 * @param name
	 *            Name of the field to be checked
	 * @return true if the given field should not be updated when performing a
	 *         SQL update
	 */
	protected boolean isIgnoredUpdateField(String name) {
		// The ids and type are used as the primary key
		return name.equals("restrictionid") || name.equals("boundid") || name.equals("type");
	}

	/**
	 * Searches the database for this BoundRestriction's primary key
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the bound_restriction table for this
	 *         BoundRestriction's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectBoundRestriction(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(BoundRestriction.BOUNDRESTRICTIONSEARCH);
		search.setInt(1, this.restrictionid);
		search.setInt(2, this.boundid);
		search.setByte(3, this.type.getValue());
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} BoundRestriction into the bound_restriction table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(BoundRestriction.BOUNDRESTRICTIONINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@link this} BoundRestriction's entry in the bound_restriction table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(BoundRestriction.BOUNDRESTRICTIONUPDATE);
			insertUpdate(update, false);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method parameterizes and executes the database inserts and updates
	 * due to their similarity
	 * 
	 * @param prep
	 *            The {@link PreparedStatement} to parameterize and execute
	 * @param insert
	 *            Whether we are inserting or updating
	 * @throws SQLException
	 */
	private void insertUpdate(PreparedStatement prep, boolean insert) throws SQLException {
		// This currently has no other fields other than those that
		// compose the primary key, but it'll follow standard form for future proofing
		@SuppressWarnings("unused")
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.restrictionid);
			prep.setInt(2, this.boundid);
			prep.setByte(3, this.type.getValue());
			bump = 3;
		}

		if (!insert) {
			/*prep.setInt(1, this.restrictionid);
			prep.setInt(2, this.boundid);
			prep.setByte(3, this.type.getValue());*/
			System.out.println("Cannot update a bound restriction this is a duplicate entry");
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete bound_restriction table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteBoundRestriction(Connection conn) {
		// TODO Auto-generated method stub
	}

}
