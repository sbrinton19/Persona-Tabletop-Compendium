package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.PersonaSkill;

/**
 * A custom JSON adapter for the PersonaSkill Class
 * 
 * @author Stefan
 *
 */
public class PersonaSkillTypeAdapter extends TypeAdapter<PersonaSkill> {

	@Override
	public void write(JsonWriter out, PersonaSkill personaSkill) throws IOException {
		try {
			personaSkill.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public PersonaSkill read(JsonReader in) throws IOException {
		PersonaSkill personaSkill = new PersonaSkill();
		in.beginObject();
		while (in.hasNext()) {
			try {
				personaSkill.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return personaSkill;
	}

}
