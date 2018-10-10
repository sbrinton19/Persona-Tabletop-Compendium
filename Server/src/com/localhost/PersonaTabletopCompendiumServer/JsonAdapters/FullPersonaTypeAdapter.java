package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FullPersona;

/**
 * A custom JSON adapter for the FullPersona Class
 * 
 * @author Stefan
 *
 */
public class FullPersonaTypeAdapter extends TypeAdapter<FullPersona> {
	// The only time either function should hit the catch is after
	// adding a new member variable to the FullPersona class if its
	// type is unhandled in the write or read methods
	@Override
	public void write(JsonWriter out, FullPersona FullPersona) throws IOException {
		try {
			FullPersona.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FullPersona read(JsonReader in) throws IOException {
		FullPersona FullPersona = new FullPersona();
		in.beginObject();
		while (in.hasNext()) {
			try {
				FullPersona.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return FullPersona;
	}

}
