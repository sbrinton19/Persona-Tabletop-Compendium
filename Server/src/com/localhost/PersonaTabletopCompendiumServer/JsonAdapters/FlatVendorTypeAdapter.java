package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatVendor;

/**
 * A custom JSON adapter for the FlatVendor Class
 * 
 * @author Stefan
 *
 */
public class FlatVendorTypeAdapter extends TypeAdapter<FlatVendor> {

	@Override
	public void write(JsonWriter out, FlatVendor vendor) throws IOException {
		try {
			vendor.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatVendor read(JsonReader in) throws IOException {
		FlatVendor vendor = new FlatVendor();
		in.beginObject();
		while (in.hasNext()) {
			try {
				vendor.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return vendor;
	}

}
