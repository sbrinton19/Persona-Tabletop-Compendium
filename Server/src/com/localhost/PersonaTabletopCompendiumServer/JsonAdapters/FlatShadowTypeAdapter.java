package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatShadow;

/**
 * A custom JSON adapter for the FlatPersona Class
 * 
 * @author Stefan
 *
 */
public class FlatShadowTypeAdapter extends TypeAdapter<FlatShadow> {

	@Override
	public void write(JsonWriter out, FlatShadow shadow) throws IOException {
		try {
			shadow.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatShadow read(JsonReader in) throws IOException {
		FlatShadow shadow = new FlatShadow();
		in.beginObject();
		while (in.hasNext()) {
			try {
				shadow.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return shadow;
	}

}
