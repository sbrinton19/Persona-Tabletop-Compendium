package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.BoundRestriction;

/**
 * A custom JSON adapter for the BoundRestriction Class
 * 
 * @author Stefan
 *
 */
public class BoundRestrictionTypeAdapter extends TypeAdapter<BoundRestriction> {

	@Override
	public void write(JsonWriter out, BoundRestriction restriction) throws IOException {
		try {
			restriction.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public BoundRestriction read(JsonReader in) throws IOException {
		BoundRestriction restriction = new BoundRestriction();
		in.beginObject();
		while (in.hasNext()) {
			try {
				restriction.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return restriction;
	}

}
