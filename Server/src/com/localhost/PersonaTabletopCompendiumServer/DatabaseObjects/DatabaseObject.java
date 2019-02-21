package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.*;

/**
 * A common base class to define shared methods or aspects of database objects
 * 
 * @author Stefan
 *
 */
public abstract class DatabaseObject {

	/**
	 * Writes the {@link Field fields} of any of this object's subclasses out to
	 * JSON
	 * 
	 * @param out
	 *            {@link JsonWriter} to write out to
	 * @param clazz
	 *            The subclass of this object to write the fields of to JSON,
	 *            only its declared fields will be read into
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws IOException
	 * @throws InstantiationException
	 */
	protected void write(final JsonWriter out, Class<?> clazz)
			throws IllegalArgumentException, IllegalAccessException, IOException, InstantiationException {
		DatabaseObject instant = null;
		instant = (DatabaseObject) clazz.newInstance();
		for (Field field : clazz.getDeclaredFields()) {
			String name = field.getName();
			if (instant.isIgnoredField(name) || instant.isDatabaseOnly(name))
				continue;
			Object fieldValue = field.get(this);
			out.name(name);
			fieldWriter(out, fieldValue);
		}
	}

	/**
	 * Writes a {@link Field} of this object out to JSON
	 * 
	 * @param out
	 *            {@link JsonWriter} to write out to
	 * @param fieldValue
	 *            The value of the field
	 * @throws IOException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InstantiationException
	 */
	private void fieldWriter(final JsonWriter out, Object fieldValue)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		if (fieldValue.getClass().isArray()) {
			out.beginArray();
			for (Object obj : (Object[]) fieldValue) {
				if (obj != null) {
					fieldWriter(out, obj);
				}
			}
			out.endArray();
		} else if (fieldValue instanceof ByteValueEnum) {
			out.value(((ByteValueEnum<?>) fieldValue).getValue());
		} else if (fieldValue instanceof DoubleValueEnum) {
			out.value(((DoubleValueEnum<?>) fieldValue).getValue());
		} else if (fieldValue instanceof Byte) {
			out.value((byte) fieldValue);
		} else if (fieldValue instanceof Integer) {
			out.value((int) fieldValue);
		} else if (fieldValue instanceof String) {
			out.value((String) fieldValue);
		} else if (fieldValue instanceof Double) {
			out.value((double) fieldValue);
		} else if (fieldValue instanceof Boolean) {
			out.value((boolean) fieldValue);
		}
		// After this point are object calls which means you need to terminate
		// them with an endObject as they don't call it themselves to support
		// easy subclassing
		else if (fieldValue instanceof DatabaseObject) {
			((DatabaseObject) fieldValue).write(out);
			out.endObject();
		}
	}

	/**
	 * Used to read from JSON into a specified subclass of this class
	 * 
	 * @param in
	 *            A {@link JsonReader} to read from
	 * @param name
	 *            The name of the field being read from JSON into the same field
	 *            in this object
	 * @param clazz
	 *            The specific subclass to check for the given field, only its
	 *            declared fields will be checked
	 * @return True if the given field name belongs to this subclass and was
	 *         set, false if not
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws IOException
	 */
	protected boolean read(final JsonReader in, String name, Class<?> clazz)
			throws IllegalArgumentException, IllegalAccessException, IOException {
		for (Field field : clazz.getDeclaredFields()) {
			if (field.getName().equals(name)) {
				fieldReader(in, field);
				// We found the correct field and populated it
				// End this
				return true;
			}
		}
		return false;
	}

	/**
	 * Reads a value into this object's {@link Field fields} from a JSON Object
	 * via {@link JsonReader}
	 * 
	 * @param in
	 *            JsonReader to read in from
	 * @param field
	 *            The field to read into from the JSON
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws IOException
	 */
	private void fieldReader(final JsonReader in, Field field)
			throws IllegalArgumentException, IllegalAccessException, IOException {
		Class<?> clazz = field.getType();
		if (clazz.isArray()) {
			in.beginArray();
			// If you ever add a recursive array object
			// You're on your own
			arrayReader(in, field);
			in.endArray();
		} else if (clazz.equals(byte.class)) {
			field.setByte(this, (byte) in.nextInt());
		} else if (clazz.equals(int.class)) {
			field.setInt(this, in.nextInt());
		} else if (clazz.equals(String.class)) {
			field.set(this, in.nextString());
		} else if (clazz.equals(double.class)) {
			field.set(this, in.nextDouble());
		} else if (clazz.equals(boolean.class)) {
			field.set(this, in.nextBoolean());
		} else if (clazz.equals(ElemResist.class)) {
			field.set(this, ElemResist.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(ItemType.class)) {
			field.set(this, ItemType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(ConsumableType.class)) {
			field.set(this, ConsumableType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(ArmorClass.class)) {
			field.set(this, ArmorClass.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(GearPool.class)) {
			field.set(this, GearPool.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(Arcana.class)) {
			field.set(this, Arcana.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(DamageMultiplier.class)) {
			field.set(this, DamageMultiplier.fromDoubleStatic(in.nextDouble()));
		} else if (clazz.equals(Element.class)) {
			field.set(this, Element.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(AilmentType.class)) {
			field.set(this, AilmentType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(SupportType.class)) {
			field.set(this, SupportType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(PassiveType.class)) {
			field.set(this, PassiveType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(ActivityType.class)) {
			field.set(this, ActivityType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(BoundType.class)) {
			field.set(this, BoundType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(RestrictionType.class)) {
			field.set(this, RestrictionType.fromIntStatic(in.nextInt()));
		} else if (clazz.equals(Location.class)) {
			field.set(this, Location.fromIntStatic(in.nextInt()));
		}
	}

	/**
	 * This method is not written to be extensible/generic Each array to be read
	 * needs to be read according to which object it is a field of Implemented
	 * Classes and fields {@link Loot} arcanaSources {@link Recipe} sources
	 * 
	 * @param in
	 * @param field
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	private void arrayReader(JsonReader in, Field field)
			throws IOException, IllegalArgumentException, IllegalAccessException {
		int i = 0;
		if (field.getType().getComponentType().equals(Arcana.class)) {
			Arcana[] arcanaSources = new Arcana[6];
			while (in.hasNext()) {
				arcanaSources[i++] = Arcana.fromIntStatic(in.nextInt());
			}
			field.set(this, arcanaSources);
		} else if (field.getType().getComponentType().equals(int.class)) {
			int[] sources = new int[7];
			while (in.hasNext()) {
				int temp = in.nextInt();
				sources[i++] = temp;
			}
			while (i < 7) {
				sources[i++] = -1;
			}
			field.set(this, sources);
		}
	}

	/**
	 * Read into all of the fields of a specified subclass of this class from a
	 * database result
	 * 
	 * @param rs
	 *            A {@link ResultSet} pointing to a row with the data for this
	 *            object
	 * @param clazz
	 *            The subclass to read into, only its declared fields will be
	 *            read into
	 */
	protected void fieldReader(ResultSet rs, Class<?> clazz) {
		for (Field field : clazz.getDeclaredFields()) {
			DatabaseObject instant = null;
			try {
				instant = (DatabaseObject) clazz.newInstance();
			} catch (InstantiationException | IllegalAccessException e1) {
				e1.printStackTrace();
			}
			try {
				if (!(instant.isIgnoredField(field.getName()) || instant.isJsonOnly(field.getName()))) {
					Class<?> fieldClass = field.getType();
					if (fieldClass.isArray()) {
						// If you ever add a recursive array object
						// You're on your own
						arrayReader(rs, field);
					} else if (fieldClass.equals(byte.class)) {
						byte val = rs.getByte(field.getName());
						val = rs.wasNull() ? -1 : val;
						field.setByte(this, val);
					} else if (fieldClass.equals(int.class)) {
						int val = rs.getInt(field.getName());
						val = rs.wasNull() ? -1 : val;
						field.setInt(this, val);
					} else if (fieldClass.equals(double.class)) {
						double val = rs.getDouble(field.getName());
						val = rs.wasNull() ? -1 : val;
						field.setDouble(this, val);
					} else if (fieldClass.equals(boolean.class)) {
						field.setBoolean(this, rs.getBoolean(field.getName()));
					} else if (fieldClass.equals(String.class)) {
						field.set(this, rs.getString(field.getName()));
					} else if (fieldClass.equals(ItemType.class)) {
						field.set(this, ItemType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(ConsumableType.class)) {
						field.set(this, ConsumableType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(ArmorClass.class)) {
						field.set(this, ArmorClass.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(GearPool.class)) {
						field.set(this, GearPool.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(Arcana.class)) {
						field.set(this, Arcana.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(ElemResist.class)) {
						field.set(this, ElemResist.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(DamageMultiplier.class)) {
						field.set(this, DamageMultiplier.fromDoubleStatic(rs.getDouble(field.getName())));
					} else if (fieldClass.equals(Element.class)) {
						field.set(this, Element.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(AilmentType.class)) {
						field.set(this, AilmentType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(SupportType.class)) {
						field.set(this, SupportType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(PassiveType.class)) {
						field.set(this, PassiveType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(ActivityType.class)) {
						field.set(this, ActivityType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(BoundType.class)) {
						field.set(this, BoundType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(RestrictionType.class)) {
						field.set(this, RestrictionType.fromByteStatic(rs.getByte(field.getName())));
					} else if (fieldClass.equals(Location.class)) {
						field.set(this, Location.fromByteStatic(rs.getByte(field.getName())));
					}
				}
			} catch (IllegalArgumentException | IllegalAccessException | IOException | SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * This method is not written to be extensible/generic Each array to be read
	 * needs to be read according to which object it is a field of Implemented
	 * Classes and fields {@link Loot} arcanaSources {@link Recipe} sources
	 * 
	 * @param rs
	 * @param field
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	private void arrayReader(ResultSet rs, Field field)
			throws IOException, IllegalArgumentException, IllegalAccessException, SQLException {
		if (field.getType().getComponentType().equals(Arcana.class)) {
			ArrayList<Arcana> arcanaSources = new ArrayList<Arcana>();
			for (int i = 0; i < 6; i++) {
				byte temp = rs.getByte(field.getName() + Integer.toString(i + 1));
				if (!rs.wasNull()) {
					arcanaSources.add(Arcana.fromByteStatic(temp));
				}
			}
			Arcana[] trueArcanaSources = new Arcana[arcanaSources.size()];
			arcanaSources.toArray(trueArcanaSources);
			field.set(this, trueArcanaSources);
		} else if (field.getType().getComponentType().equals(int.class)) {
			int[] sources = new int[7];
			for (int i = 0; i < 7; i++) {
				int temp = rs.getInt(field.getName() + Integer.toString(i + 1));
				if (rs.wasNull()) {
					sources[i] = -1;
				} else {
					sources[i] = temp;
				}
			}
			field.set(this, sources);
		}
	}

	/**
	 * Helper for dynamically constructing each database object subclass' set of
	 * SQL statements
	 * 
	 * @param clazz
	 *            the subclass to generate strings for
	 * @return A {@code String[]} of length 3: 0 is the table column names for
	 *         an insert, 1 is the series of question marks for the insert, 2 is
	 *         the "table column = ?" for the update
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 */
	protected String[] fieldBuilder(Class<?> clazz) {
		StringBuilder dbTableValues = new StringBuilder();
		StringBuilder questions = new StringBuilder();
		StringBuilder updateValues = new StringBuilder();
		DatabaseObject instant = null;
		try {
			instant = (DatabaseObject) clazz.newInstance();
		} catch (InstantiationException | IllegalAccessException e1) {
			e1.printStackTrace();
		}
		for (Field field : clazz.getDeclaredFields()) {
			if (instant.isIgnoredField(field.getName()) || instant.isJsonOnly(field.getName())) {
				continue;
			}
			if (field.getType().isArray()) {
				int length = 0;
				try {
					length = Array.getLength(field.get(this));
				} catch (IllegalArgumentException | IllegalAccessException e) {
					e.printStackTrace();
				}
				// SQL doesn't play nice with arrays
				// So they are represented as a bunch of pattern-named columns
				// Avoid arrays as much as possible because of these kinds of
				// restrictions
				for (int i = 0; i < length; i++) {
					dbTableValues.append(field.getName());
					dbTableValues.append(Integer.toString(i + 1));
					dbTableValues.append(",");
					questions.append("?,");
					if (!instant.isIgnoredUpdateField(field.getName())) {
						updateValues.append(field.getName());
						updateValues.append(Integer.toString(i + 1));
						updateValues.append(" = ?, ");
					}
				}
			} else {
				dbTableValues.append(field.getName());
				dbTableValues.append(",");
				questions.append("?,");
				if (!instant.isIgnoredUpdateField(field.getName())) {
					updateValues.append(field.getName());
					updateValues.append(" = ?, ");
				}
			}
		}
		if (questions.length() > 0) {
			dbTableValues.deleteCharAt(dbTableValues.length() - 1);
			questions.deleteCharAt(questions.length() - 1);
			if (updateValues.length() > 1) {
				updateValues.deleteCharAt(updateValues.length() - 2);
			}
		}
		String[] ret = { dbTableValues.toString(), questions.toString(), updateValues.toString() };
		return ret;
	}

	/**
	 * Write this object out to JSON
	 * 
	 * @param out
	 *            The {@link JsonWriter} to write out to
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public abstract void write(final JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException;

	/**
	 * Read a field of this object from JSON
	 * 
	 * @param in
	 *            The {@link JsonReader} to read this object from
	 * @param name
	 *            The name of the {@link Field} of this class to read into
	 * @throws IOException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public abstract void read(final JsonReader in, final String name)
			throws IOException, IllegalArgumentException, IllegalAccessException;

	protected abstract boolean isIgnoredField(String name);

	protected abstract boolean isJsonOnly(String name);

	protected abstract boolean isDatabaseOnly(String name);

	protected abstract boolean isIgnoredUpdateField(String name);

	public abstract boolean databaseInsert(Connection conn);
}
