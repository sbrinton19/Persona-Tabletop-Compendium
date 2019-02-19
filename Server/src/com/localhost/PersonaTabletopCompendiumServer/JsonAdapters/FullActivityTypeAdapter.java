package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FullActivity;

/**
 * A custom JSON adapter for the FullActivity Class
 * 
 * @author Stefan
 *
 */
public class FullActivityTypeAdapter extends TypeAdapter<FullActivity> {

	@Override
	public void write(JsonWriter out, FullActivity fullActivity) throws IOException {
		try {
			fullActivity.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FullActivity read(JsonReader in) throws IOException {
		FullActivity fullActivity = new FullActivity();
		in.beginObject();
		while (in.hasNext()) {
			try {
				fullActivity.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return fullActivity;
	}

}
