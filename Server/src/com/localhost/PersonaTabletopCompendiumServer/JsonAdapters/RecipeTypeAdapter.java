package com.localhost.PersonaTabletopCompendiumServer.JsonAdapters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Recipe;

/**
 * A custom JSON adapter for the Recipe Class
 * 
 * @author Stefan
 *
 */
public class RecipeTypeAdapter extends TypeAdapter<Recipe> {
	// The only time either function should hit the catch is after
	// adding a new member variable to the PersonaSkill class if its
	// type is unhandled in the write or read methods
	@Override
	public void write(JsonWriter out, Recipe recipe) throws IOException {
		try {
			recipe.write(out);
		} catch (IllegalArgumentException | IllegalAccessException | InstantiationException e) {
			e.printStackTrace();
		}
		out.endObject();
	}

	@Override
	public Recipe read(JsonReader in) throws IOException {
		Recipe recipe = new Recipe();
		in.beginObject();
		while (in.hasNext()) {
			try {
				recipe.read(in, in.nextName());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		in.endObject();
		return recipe;
	}

}
