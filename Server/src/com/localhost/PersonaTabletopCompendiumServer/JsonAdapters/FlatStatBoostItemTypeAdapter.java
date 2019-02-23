package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatStatBoostItem;

/**
 * A custom JSON adapter for the FlatStatBoostItem Class
 * 
 * @author Stefan
 *
 */
public class FlatStatBoostItemTypeAdapter extends TypeAdapter<FlatStatBoostItem> {
	@Override
	public void write(JsonWriter out, FlatStatBoostItem statBoostItem) throws IOException {
		try {
			statBoostItem.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatStatBoostItem read(JsonReader in) throws IOException {
		FlatStatBoostItem statBoostItem = new FlatStatBoostItem();
		in.beginObject();
		while (in.hasNext()) {
			try {
				statBoostItem.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return statBoostItem;
	}
}
