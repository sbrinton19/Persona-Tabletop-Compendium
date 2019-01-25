/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatAilmentSkill;

/**
 * A custom JSON adapter for the FlatAilmentSkill Class
 * 
 * @author Stefan
 *
 */
public class FlatAilmentSkillTypeAdapter extends TypeAdapter<FlatAilmentSkill> {

	@Override
	public void write(final JsonWriter out, final FlatAilmentSkill skill) throws IOException {
		try {
			skill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatAilmentSkill read(JsonReader in) throws IOException {
		FlatAilmentSkill skill = new FlatAilmentSkill();
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
