/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatPassiveSkill;

/**
 * A custom JSON adapter for the FlatPassiveSkill Class
 * 
 * @author Stefan
 *
 */
public class FlatPassiveSkillTypeAdapter extends TypeAdapter<FlatPassiveSkill> {

	@Override
	public void write(final JsonWriter out, final FlatPassiveSkill skill) throws IOException {
		try {
			skill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatPassiveSkill read(JsonReader in) throws IOException {
		FlatPassiveSkill skill = new FlatPassiveSkill();
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
