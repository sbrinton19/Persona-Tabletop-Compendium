package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.ItemReference;

/**
 * A custom JSON adapter for the ItemReference Class
 * 
 * @author Stefan
 *
 */
public class ItemReferenceTypeAdapter extends TypeAdapter<ItemReference> {

	@Override
	public void write(JsonWriter out, ItemReference ItemReference) throws IOException {
		try {
			ItemReference.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	/**
	 * Shouldn't ever try to read in an ItemReference from JSON
	 */
	@Override
	public ItemReference read(JsonReader in) throws IOException {
		ItemReference ItemReference = new ItemReference();
		in.beginObject();
		while (in.hasNext()) {
			try {
				ItemReference.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return ItemReference;
	}

}
