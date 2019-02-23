package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatConsumable;

/**
 * A custom JSON adapter for the FlatConsumable Class
 * 
 * @author Stefan
 *
 */
public class FlatConsumableTypeAdapter extends TypeAdapter<FlatConsumable> {
	@Override
	public void write(JsonWriter out, FlatConsumable consumable) throws IOException {
		try {
			consumable.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatConsumable read(JsonReader in) throws IOException {
		FlatConsumable consumable = new FlatConsumable();
		in.beginObject();
		while (in.hasNext()) {
			try {
				consumable.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return consumable;
	}
}
