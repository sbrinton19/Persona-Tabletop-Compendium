package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Drop;

/**
 * A custom JSON adapter for the Drop Class
 * 
 * @author Stefan
 *
 */
public class DropTypeAdapter extends TypeAdapter<Drop> {

	@Override
	public void write(JsonWriter out, Drop drop) throws IOException {
		try {
			drop.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public Drop read(JsonReader in) throws IOException {
		Drop drop = new Drop();
		in.beginObject();
		while (in.hasNext()) {
			try {
				drop.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return drop;
	}

}
