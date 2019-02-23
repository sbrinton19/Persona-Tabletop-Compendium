/**
 * 
 */
package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatDamageAilmentSkill;

/**
 * A custom JSON adapter for the FlatDamageAilmentSkill Class
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
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return skill;
	}
}
