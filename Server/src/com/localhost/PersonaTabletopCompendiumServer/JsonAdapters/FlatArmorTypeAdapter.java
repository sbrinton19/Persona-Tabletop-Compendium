package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatArmor;

/**
 * A custom JSON adapter for the FlatArmor Class
 * 
 * @author Stefan
 *
 */
public class FlatArmorTypeAdapter extends TypeAdapter<FlatArmor> {

	@Override
	public void write(JsonWriter out, FlatArmor armor) throws IOException {
		try {
			armor.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatArmor read(JsonReader in) throws IOException {
		FlatArmor armor = new FlatArmor();
		in.beginObject();
		while (in.hasNext()) {
			try {
				armor.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException | InstantiationException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return armor;
	}

}
