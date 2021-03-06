package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatAccessory;

/**
 * A custom JSON adapter for the FlatAccessory Class
 * 
 * @author Stefan
 *
 */
public class FlatAccessoryTypeAdapter extends TypeAdapter<FlatAccessory> {

	@Override
	public void write(JsonWriter out, FlatAccessory accessory) throws IOException {
		try {
			accessory.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatAccessory read(JsonReader in) throws IOException {
		FlatAccessory accessory = new FlatAccessory();
		in.beginObject();
		while (in.hasNext()) {
			try {
				accessory.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return accessory;
	}
}
