package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatLoot;

/**
 * A custom JSON adapter for the FlatLoot Class
 * 
 * @author Stefan
 *
 */
public class FlatLootTypeAdapter extends TypeAdapter<FlatLoot> {

	@Override
	public void write(JsonWriter out, FlatLoot loot) throws IOException {
		try {
			loot.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatLoot read(JsonReader in) throws IOException {
		FlatLoot loot = new FlatLoot();
		in.beginObject();
		while (in.hasNext()) {
			try {
				loot.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return loot;
	}

}
