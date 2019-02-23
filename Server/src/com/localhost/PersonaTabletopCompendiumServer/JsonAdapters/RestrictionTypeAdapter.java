package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Restriction;

/**
 * A custom JSON adapter for the Restriction Class
 * 
 * @author Stefan
 *
 */
public class RestrictionTypeAdapter extends TypeAdapter<Restriction> {

	@Override
	public void write(JsonWriter out, Restriction restriction) throws IOException {
		try {
			restriction.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public Restriction read(JsonReader in) throws IOException {
		Restriction restriction = new Restriction();
		in.beginObject();
		while (in.hasNext()) {
			try {
				restriction.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return restriction;
	}

}
