package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.ActivityType;

/**
 * The FlatActivity class is the server representation of the DB Table activity with
 * added DB & JSON support
 * 
 * @author Stefan
 *
 */
public class FlatActivity extends DatabaseObject {
	protected int id;
	protected String activityName;
	protected String locationName;
	protected byte availableTimes;
	protected byte availableWeekDays;
	protected ActivityType type;
	protected byte value;
	protected int secondValue;
	protected String description;
	private static String ACTIVITYSEARCH = null;
	private static String ACTIVITYINSERT = null;
	private static String ACTIVITYUPDATE = null;

	/**
	 * Produces a complete {@link FlatActivity}
	 * 
	 * @param id
	 *            The Unique id for this activity
	 * @param activityName
	 *            The name of this activity
	 * @param locationName
	 * 			  The name of the location this activity takes place in
	 * @param availableTimes
	 *            A {@code byte} being used as a bit array to represent the
	 *            times this activity can be done (see
	 *            {@link AvailableTime})
 	 * @param availableWeekDays
	 *            A {@code byte} being used as a bit array to represent the
	 *            days of the week this activity can be done (see
	 *            {@link AvailableWeekDay})
	 * @param type
	 *            An {@link ActivityType} representing the type of this activity
	 * @param value
	 *            A generic {@code byte} value to represent the effect of this activity
	 * @param secondValue
	 *            A generic {@code int} value to represent a second effect
	 *            of this activity, if it needs one
	 * @param description
	 *            A description of this activity if one is necessary
	 */
	public FlatActivity(int id, String activityName, String locationName, byte availableTimes, byte availableWeekDays,
			ActivityType type, byte value, byte secondValue, String description) {
		this.id = id;
		this.activityName = activityName;
		this.locationName = locationName;
		this.availableTimes = availableTimes;
		this.availableWeekDays = availableWeekDays;
		this.type = type;
		this.value = value;
		this.secondValue = secondValue;
		this.description = description;
		initSUIDStrings();
	}

	/**
	 * The empty constructor used for loading from JSON
	 */
	public FlatActivity() {
		initSUIDStrings();
	}

	/**
	 * This is for reading a {@link FlatActivity} from the database
	 * 
	 * @param rs
	 *            The {@link ResultSet} pointing to the row to make a FlatActivity
	 *            from
	 */
	public FlatActivity(ResultSet rs) {
		fieldReader(rs, FlatActivity.class);
	}

	/**
	 * @return The Unique id for this item
	 */
	public int getId() {
		return id;
	}

	/**
	 * @return The name of this activity
	 */
	public String getActivityName() {
		return activityName;
	}

	/**
	 * @return The name of the location this activity takes place in
	 */
	public String getLocationName() {
		return locationName;
	}

	/**
	 * @return A {@code byte} being used as a bit array to represent the times of day
	 *         this activity can be done (see {@link AvailableTime})
	 */
	public byte getAvailableTimes() {
		return availableTimes;
	}

	/**
	 * @return A {@code byte} being used as a bit array to represent the days of the week
	 *         this activity can be done (see {@link AvailableWeekDay})
	 */
	public byte getAvailableWeekDays() {
		return availableWeekDays;
	}
	
	/**
	 * @return An {@link ActivityType} representing the type of this activity
	 */
	public ActivityType getType() {
		return type;
	}

	/**
	 * @return A generic {@code byte} value to represent the effect of this activity
	 */
	public byte getValue() {
		return value;
	}

	/**
	 * @return A generic {@code int} value to represent a second effect
	 *         of this activity, if it needs one
	 */
	public int getSecondValue() {
		return secondValue;
	}

	/**
	 * @return A description of this activity if one is necessary 
	 */
	public String getDescription() {
		return description;
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
		write(out, FlatActivity.class);
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
		read(in, name, FlatActivity.class);
	}
	
	/**
	 * This method dynamically constructs the Strings used for database
	 * operations based on the fields declared in this class. Any fields that
	 * are not in the corresponding DB table should be added to the
	 * {@link #isIgnoredField(String)} or {@link #isJsonOnly(String)} function
	 */
	private void initSUIDStrings() {
		if (FlatActivity.ACTIVITYSEARCH != null)
			return;
		FlatActivity.ACTIVITYSEARCH = "SELECT * FROM activity WHERE activity.id = ?";
		String insertTemplate = "INSERT INTO activity(%s) VALUES(%s)";
		String updateTemplate = "UPDATE activity SET %s WHERE id = ?";
		String[] built = fieldBuilder(FlatActivity.class);
		FlatActivity.ACTIVITYINSERT = String.format(insertTemplate, built[0], built[1]);
		FlatActivity.ACTIVITYUPDATE = String.format(updateTemplate, built[2]);
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
		return name.equals("ACTIVITYINSERT") || name.equals("ACTIVITYUPDATE") || name.equals("ACTIVITYSEARCH")
				|| name.equals("ACTIVITYDELETE");
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
		// Id is used to search on an update so do not update it
		return name.equals("id");
	}

	/**
	 * Searches the database for this FlatActivity's id
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return A {@link ResultSet} for a search in the activity table for this
	 *         FlatActivity's id
	 * @throws SQLException
	 */
	public ResultSet databaseSelectActivity(Connection conn) throws SQLException {
		PreparedStatement search = conn.prepareStatement(FlatActivity.ACTIVITYSEARCH);
		search.setInt(1, this.id);
		ResultSet ret = search.executeQuery();
		return ret;
	}

	/**
	 * This method inserts {@code this} FlatActivity into the activity table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @result True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseInsert(Connection conn) {
		PreparedStatement insert;
		try {
			insert = conn.prepareStatement(FlatActivity.ACTIVITYINSERT);
			insertUpdate(insert, true);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/**
	 * This method updates {@link this} FlatActivity's entry in the activity table.
	 * 
	 * @param conn
	 *            A connection to the Database
	 * @return True if the operation completes successfully with no errors,
	 *         false if otherwise
	 */
	public boolean databaseUpdate(Connection conn) {
		PreparedStatement update;
		try {
			update = conn.prepareStatement(FlatActivity.ACTIVITYUPDATE);
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
		int bump = 0;
		if (insert) {
			prep.setInt(1, this.getId());
			bump = 1;
		}
		prep.setString(1 + bump, this.activityName);
		prep.setString(2 + bump, this.locationName);
		prep.setByte(3 + bump, this.availableTimes);
		prep.setByte(4 + bump, this.availableWeekDays);
		prep.setByte(5 + bump, this.type.getValue());
		if (this.value == -1) {
			prep.setNull(6 + bump, java.sql.Types.TINYINT);
		} else {
			prep.setByte(6 + bump, this.value);
		}
		if (this.secondValue == -1) {
			prep.setNull(7 + bump, java.sql.Types.INTEGER);
		} else {
			prep.setInt(7 + bump, this.secondValue);
		}
		prep.setString(8 + bump, this.description);
		if (!insert) {
			prep.setInt(9, this.getId());
		}
		prep.executeUpdate();
		prep.close();
	}

	/**
	 * Unimplemented function to delete activity table rows.
	 * 
	 * @param conn
	 */
	public void databaseDeleteActivity(Connection conn) {
		// TODO Auto-generated method stub
	}

}