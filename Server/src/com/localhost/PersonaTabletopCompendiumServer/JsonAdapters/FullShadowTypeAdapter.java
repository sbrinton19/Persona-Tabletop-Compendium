package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FullPersona;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FullShadow;

/**
 * A custom JSON adapter for the FullShadow Class
 * 
 * @author Stefan
 *
 */
public class FullShadowTypeAdapter extends TypeAdapter<FullShadow> {

	@Override
	public void write(JsonWriter out, FullShadow fullShadow) throws IOException {
		try {
			fullShadow.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FullShadow read(JsonReader in) throws IOException {
		FullShadow fullShadow = new FullShadow();
		in.beginObject();
		while (in.hasNext()) {
			try {
				fullShadow.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return fullShadow;
	}

}
