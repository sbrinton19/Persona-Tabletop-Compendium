package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatVendorItem;

/**
 * A custom JSON adapter for the FlatVendorItem Class
 * 
 * @author Stefan
 *
 */
public class FlatVendorItemTypeAdapter extends TypeAdapter<FlatVendorItem> {

	@Override
	public void write(JsonWriter out, FlatVendorItem vendorItem) throws IOException {
		try {
			vendorItem.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatVendorItem read(JsonReader in) throws IOException {
		FlatVendorItem vendorItem = new FlatVendorItem();
		in.beginObject();
		while (in.hasNext()) {
			try {
				vendorItem.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return vendorItem;
	}
}
