/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatDamageAilmentSkill;

/**
 * TypeAdapter for (De)Serializing FlatDamageAilmentSkills from JSON
 * 
 * @author Stefan
 *
 */
public class FlatDamageAilmentSkillTypeAdapter extends TypeAdapter<FlatDamageAilmentSkill> {

	@Override
	public void write(final JsonWriter out, final FlatDamageAilmentSkill skill) throws IOException {
		try {
			skill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatDamageAilmentSkill read(JsonReader in) throws IOException {
		FlatDamageAilmentSkill skill = new FlatDamageAilmentSkill();
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
