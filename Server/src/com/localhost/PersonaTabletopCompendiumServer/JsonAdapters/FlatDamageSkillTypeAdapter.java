/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatDamageSkill;

/**
 * A custom JSON adapter for the FlatDamageSkill Class
 * 
 * @author Stefan
 *
 */
public class FlatDamageSkillTypeAdapter extends TypeAdapter<FlatDamageSkill> {

	@Override
	public void write(final JsonWriter out, final FlatDamageSkill skill) throws IOException {
		try {
			skill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatDamageSkill read(JsonReader in) throws IOException {
		FlatDamageSkill skill = new FlatDamageSkill();
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
