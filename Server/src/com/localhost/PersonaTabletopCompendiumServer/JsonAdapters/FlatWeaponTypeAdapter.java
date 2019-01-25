package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatWeapon;

/**
 * A custom JSON adapter for the FlatWeapon Class
 * 
 * @author Stefan
 *
 */
public class FlatWeaponTypeAdapter extends TypeAdapter<FlatWeapon> {

	@Override
	public void write(final JsonWriter out, final FlatWeapon weapon) throws IOException {
		try {
			weapon.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatWeapon read(JsonReader in) throws IOException {
		FlatWeapon weapon = new FlatWeapon();
		in.beginObject();
		while (in.hasNext()) {
			try {
				weapon.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		in.endObject();
		return weapon;
	}

}
