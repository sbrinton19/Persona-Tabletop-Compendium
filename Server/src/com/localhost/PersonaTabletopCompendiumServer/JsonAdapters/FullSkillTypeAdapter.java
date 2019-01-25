/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FullSkill;

/**
 * A custom JSON adapter for the FullSkill Class
 * 
 * @author Stefan
 *
 */
public class FullSkillTypeAdapter extends TypeAdapter<FullSkill> {

	@Override
	public void write(final JsonWriter out, final FullSkill skill) throws IOException {
		try {
			skill.write(out);
			out.endObject();
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
	}

	@Override
	public FullSkill read(JsonReader in) throws IOException {
		FullSkill skill = new FullSkill();
		while (in.hasNext()) {
			try {
				skill.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return skill;
	}

}
