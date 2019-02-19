package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatActivity;

/**
 * A custom JSON adapter for the FlatActivity Class
 * 
 * @author Stefan
 *
 */
public class FlatActivityTypeAdapter extends TypeAdapter<FlatActivity> {

	@Override
	public void write(JsonWriter out, FlatActivity activity) throws IOException {
		try {
			activity.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatActivity read(JsonReader in) throws IOException {
		FlatActivity activity = new FlatActivity();
		in.beginObject();
		while (in.hasNext()) {
			try {
				activity.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return activity;
	}

}
