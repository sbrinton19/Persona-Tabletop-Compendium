package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.DropReference;

/**
 * A custom JSON adapter for the DropReference Class
 * 
 * @author Stefan
 *
 */
public class DropReferenceTypeAdapter extends TypeAdapter<DropReference> {
	// The only time either function should hit the catch is after
	// adding a new member variable to the DropReference class if its
	// type is unhandled in the write or read methods
	@Override
	public void write(JsonWriter out, DropReference dropReference) throws IOException {
		try {
			dropReference.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	/**
	 * Shouldn't ever try to read in an DropReference form JSON
	 */
	@Override
	public DropReference read(JsonReader in) throws IOException {
		DropReference dropReference = new DropReference();
		in.beginObject();
		while (in.hasNext()) {
			try {
				dropReference.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return dropReference;
	}

}
