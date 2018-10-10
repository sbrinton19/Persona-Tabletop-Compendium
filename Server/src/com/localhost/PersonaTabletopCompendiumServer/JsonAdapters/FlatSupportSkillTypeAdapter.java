/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatSupportSkill;

/**
 * TypeAdapter for (De)Serializing FlatSupportSkills from JSON
 * 
 * @author Stefan
 *
 */
public class FlatSupportSkillTypeAdapter extends TypeAdapter<FlatSupportSkill> {

	@Override
	public void write(final JsonWriter out, final FlatSupportSkill skill) throws IOException {
		try {
			skill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatSupportSkill read(JsonReader in) throws IOException {
		FlatSupportSkill skill = new FlatSupportSkill();
		in.beginObject();
		while (in.hasNext()) {
			try {
				skill.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return skill;
	}
}
