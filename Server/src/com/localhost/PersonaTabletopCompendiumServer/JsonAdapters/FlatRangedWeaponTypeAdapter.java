package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatRangedWeapon;

/**
 * Custom adapter for serializing/deserializing FlatRangedWeapons from JSON
 * 
 * @author Stefan
 *
 */
public class FlatRangedWeaponTypeAdapter extends TypeAdapter<FlatRangedWeapon> {

	@Override
	public void write(JsonWriter out, FlatRangedWeapon rangedWeapon) throws IOException {
		try {
			rangedWeapon.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public FlatRangedWeapon read(JsonReader in) throws IOException {
		FlatRangedWeapon weapon = new FlatRangedWeapon();
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
