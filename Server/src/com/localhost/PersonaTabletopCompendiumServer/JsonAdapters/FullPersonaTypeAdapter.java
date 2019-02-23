package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

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

	@Override
	public void write(JsonWriter out, FullPersona fullPersona) throws IOException {
		try {
			fullPersona.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FullPersona read(JsonReader in) throws IOException {
		FullPersona fullPersona = new FullPersona();
		in.beginObject();
		while (in.hasNext()) {
			try {
				fullPersona.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return fullPersona;
	}

}
