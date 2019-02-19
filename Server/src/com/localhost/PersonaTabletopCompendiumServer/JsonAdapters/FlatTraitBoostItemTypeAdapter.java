package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatTraitBoostItem;

/**
 * A custom JSON adapter for the FlatTraitBoostItem Class
 * 
 * @author Stefan
 *
 */
public class FlatTraitBoostItemTypeAdapter extends TypeAdapter<FlatTraitBoostItem> {
	@Override
	public void write(JsonWriter out, FlatTraitBoostItem traitBoostItem) throws IOException {
		try {
			traitBoostItem.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatTraitBoostItem read(JsonReader in) throws IOException {
		FlatTraitBoostItem traitBoostItem = new FlatTraitBoostItem();
		in.beginObject();
		while (in.hasNext()) {
			try {
				traitBoostItem.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return traitBoostItem;
	}
}
