package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatItem;

/**
 * A custom JSON adapter for the FlatItem Class
 * 
 * @author Stefan
 *
 */
public class FlatItemTypeAdapter extends TypeAdapter<FlatItem> {

	@Override
	public void write(JsonWriter out, FlatItem item) throws IOException {
		try {
			item.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatItem read(JsonReader in) throws IOException {
		FlatItem item = new FlatItem();
		in.beginObject();
		while (in.hasNext()) {
			try {
				item.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return item;
	}

}
