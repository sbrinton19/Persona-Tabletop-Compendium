package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.LeveledSkill;

/**
 * A custom JSON adapter for the LeveledSkill Class
 * 
 * @author Stefan
 *
 */
public class LeveledSkillTypeAdapter extends TypeAdapter<LeveledSkill> {
	// The only time either function should hit the catch is after
	// adding a new member variable to the LeveledSkill class if its
	// type is unhandled in the write or read methods
	@Override
	public void write(JsonWriter out, LeveledSkill leveledSkill) throws IOException {
		try {
			leveledSkill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	/**
	 * Shouldn't ever try to read in an LeveledSkill form JSON
	 */
	@Override
	public LeveledSkill read(JsonReader in) throws IOException {
		LeveledSkill leveledSkill = new LeveledSkill();
		in.beginObject();
		while (in.hasNext()) {
			try {
				leveledSkill.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return leveledSkill;
	}

}
