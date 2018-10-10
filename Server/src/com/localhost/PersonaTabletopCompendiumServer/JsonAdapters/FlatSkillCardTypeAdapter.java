package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatSkillCard;

/**
 * Custom TypeAdapter for reading and writing FlatSkillCards to/from JSON
 * 
 * @author Stefan
 *
 */
public class FlatSkillCardTypeAdapter extends TypeAdapter<FlatSkillCard> {
	@Override
	public void write(JsonWriter out, FlatSkillCard skillCard) throws IOException {
		try {
			skillCard.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatSkillCard read(JsonReader in) throws IOException {
		FlatSkillCard skillCard = new FlatSkillCard();
		in.beginObject();
		while (in.hasNext()) {
			try {
				skillCard.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return skillCard;
	}
}