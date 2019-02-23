package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects;

import java.io.IOException;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Element;

/**
 * The LeveledSkill class extends DatabaseObject to leverage the JSON
 * serialization. This class should not be used to perform any database
 * operations itself or to deserialize JSON. This also means this class
 * does not need a TypeAdapater as it it will be "seamlessly" handled
 * during the serialization of its parent since it extends
 * DatabaseObject
 * 
 * @author Stefan
 *
 */
public class LeveledSkill extends FlatSkill {
	protected byte level;

	/**
	 * Full Constructor for {@link LeveledSkill}
	 * 
	 * @param id
	 *            The Unique id for this skill
	 * @param name
	 *            The name of this skill
	 * @param cost
	 *            The cost in HP percentage or absolute SP for this skill
	 * @param element
	 *            The element of this skill as an {@link Element} enum
	 * @param minlevel
	 *            The recommended minimum level to learn this skill
	 * @param description
	 *            Additional description of this skill's effects
	 * @param allyCardId
	 *            The item id for the ally skill card for this skill
	 * @param mainCardId
	 *            The item id for the main skill card for this skill
	 * @param aoe
	 *            The size of this skill's area of effect
	 * @param level
	 *            The level this skill is learned at
	 */
	public LeveledSkill(int id, String name, byte cost, Element element, byte minlevel, String description,
			int allyCardId, int mainCardId, byte aoe, byte level) {
		super(id, name, cost, element, minlevel, description, allyCardId, mainCardId, aoe);
		this.level = level;
	}

	/**
	 * Empty Constructor for Reflection invocation
	 */
	public LeveledSkill() {
	}

	/**
	 * Copy-like Constructor for {@link LeveledSkill}
	 * 
	 * @param fs
	 *            The {@link FlatSkill} to copy into a new LeveledSkill
	 * @param level
	 *            The level this skill is learned at
	 */
	public LeveledSkill(FlatSkill fs, byte level) {
		super(fs);
		this.level = level;
	}
	
	/**
	 * @return the level this skill is learned at
	 */
	public byte getLevel() {
		return level;
	}
	
	/**
	 * This method is an intentionally incomplete implementation of
	 * {@link DatabaseObject#write(JsonWriter)} for JSON Serialization. It calls
	 * {@link JsonWriter#beginObject() out.beginObject()} via
	 * {@link FlatSkill#write(JsonWriter) super.write(out)} but does not call
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
	public void write(JsonWriter out)
			throws IOException, IllegalArgumentException, IllegalAccessException, InstantiationException {
		super.write(out);
		write(out, LeveledSkill.class);
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
