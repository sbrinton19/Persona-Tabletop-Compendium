package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatPersona;

/**
 * A custom JSON adapter for the FlatPersona Class
 * 
 * @author Stefan
 *
 */
public class FlatPersonaTypeAdapter extends TypeAdapter<FlatPersona> {

	@Override
	public void write(JsonWriter out, FlatPersona persona) throws IOException {
		try {
			persona.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatPersona read(JsonReader in) throws IOException {
		FlatPersona persona = new FlatPersona();
		in.beginObject();
		while (in.hasNext()) {
			try {
				persona.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return persona;
	}

}
