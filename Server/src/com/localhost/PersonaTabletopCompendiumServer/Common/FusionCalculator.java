package com.localhost.PersonaTabletopCompendiumServer.Common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.localhost.PersonaTabletopCompendiumServer.DatabaseHandler;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.FlatPersona;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.PersonaReference;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Recipe;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.Arcana;

/**
 * The helper class for finding any and all fusions
 * 
 * @author Stefan
 *
 */
public class FusionCalculator {
	private static FusionCalculator singleton = null;

	/**
	 * Maps an integer representation of an Arcana Pairing to the Arcana they
	 * fuse to
	 */
	private Map<Integer, Arcana> arcanaCombos = new HashMap<Integer, Arcana>();
	/**
	 * Maps Arcana to the list of Arcana Pairings that fuse to that Arcana
	 */
	private ArrayList<ArrayList<Integer>> reverseMap = new ArrayList<ArrayList<Integer>>(20);
	/**
	 * Maps an Arcana to an array of modifiers for rare persona fusion
	 */
	private Map<Arcana, Integer[]> rareCombos = new HashMap<Arcana, Integer[]>();
	/**
	 * Maps an Arcana to the Persona of that Arcana
	 */
	private ArrayList<ArrayList<FlatPersona>> personaMap = new ArrayList<ArrayList<FlatPersona>>(20);
	/**
	 * The complete list of rare persona
	 */
	private ArrayList<FlatPersona> rarePersonae = new ArrayList<FlatPersona>();
	/**
	 * Special fusion recipes
	 */
	private Recipe[] specialFusions;

	/**
	 * Assembles the helper objects for the calculator
	 */
	private FusionCalculator() {
		FlatPersona[] personaeList = DatabaseHandler.getHandler().getPersonae(FlatPersona.class, null);
		specialFusions = DatabaseHandler.getHandler().getSpecialRecipes();
		for (int i = 0; i < 21; i++) {
			reverseMap.add(new ArrayList<Integer>());
			personaMap.add(new ArrayList<FlatPersona>());
		}
		for (FlatPersona persona : personaeList) {
			personaMap.get(persona.getArcana().getValue()).add(persona);
			if (persona.isRare()) {
				rarePersonae.add(persona);
			}
		}
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.FOOL), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.MAGICIAN), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.PRIESTESS), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.EMPRESS), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.EMPEROR), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.HIEROPHANT), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.LOVERS), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.CHARIOT), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.JUSTICE), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.HERMIT), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.FORTUNE), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.STRENGTH), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.HANGED), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.DEATH), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.TEMPERANCE), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.DEVIL), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.TOWER), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.STAR), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.MOON), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.SUN), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.FOOL, Arcana.JUDGEMENT), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.MAGICIAN), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.PRIESTESS), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.EMPRESS), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.EMPEROR), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.HIEROPHANT), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.LOVERS), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.CHARIOT), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.JUSTICE), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.HERMIT), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.FORTUNE), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.STRENGTH), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.HANGED), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.DEATH), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.TEMPERANCE), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.DEVIL), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.TOWER), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.STAR), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.MOON), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.SUN), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.MAGICIAN, Arcana.JUDGEMENT), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.PRIESTESS), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.EMPRESS), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.EMPEROR), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.HIEROPHANT), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.LOVERS), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.CHARIOT), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.JUSTICE), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.HERMIT), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.FORTUNE), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.STRENGTH), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.HANGED), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.DEATH), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.TEMPERANCE), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.DEVIL), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.TOWER), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.STAR), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.MOON), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.SUN), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.PRIESTESS, Arcana.JUDGEMENT), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.EMPRESS), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.EMPEROR), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.HIEROPHANT), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.LOVERS), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.CHARIOT), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.JUSTICE), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.HERMIT), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.FORTUNE), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.STRENGTH), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.HANGED), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.DEATH), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.TEMPERANCE), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.DEVIL), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.TOWER), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.STAR), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.MOON), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.SUN), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.EMPRESS, Arcana.JUDGEMENT), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.EMPEROR), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.HIEROPHANT), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.LOVERS), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.CHARIOT), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.JUSTICE), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.HERMIT), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.FORTUNE), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.STRENGTH), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.HANGED), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.DEATH), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.TEMPERANCE), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.DEVIL), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.TOWER), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.STAR), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.MOON), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.SUN), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.EMPEROR, Arcana.JUDGEMENT), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.HIEROPHANT), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.LOVERS), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.CHARIOT), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.JUSTICE), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.HERMIT), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.FORTUNE), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.STRENGTH), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.HANGED), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.DEATH), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.TEMPERANCE), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.DEVIL), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.TOWER), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.STAR), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.MOON), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.SUN), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.HIEROPHANT, Arcana.JUDGEMENT), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.LOVERS), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.CHARIOT), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.JUSTICE), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.HERMIT), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.FORTUNE), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.STRENGTH), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.HANGED), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.DEATH), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.TEMPERANCE), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.DEVIL), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.TOWER), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.STAR), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.MOON), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.SUN), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.LOVERS, Arcana.JUDGEMENT), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.CHARIOT), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.JUSTICE), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.HERMIT), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.FORTUNE), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.STRENGTH), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.HANGED), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.DEATH), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.TEMPERANCE), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.DEVIL), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.TOWER), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.STAR), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.MOON), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.CHARIOT, Arcana.SUN), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.JUSTICE), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.HERMIT), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.FORTUNE), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.STRENGTH), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.HANGED), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.DEATH), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.TEMPERANCE), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.DEVIL), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.TOWER), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.STAR), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.MOON), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.JUSTICE, Arcana.SUN), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.HERMIT), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.FORTUNE), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.STRENGTH), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.HANGED), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.DEATH), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.TEMPERANCE), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.DEVIL), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.TOWER), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.STAR), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.MOON), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.SUN), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.HERMIT, Arcana.JUDGEMENT), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.FORTUNE), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.STRENGTH), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.HANGED), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.DEATH), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.TEMPERANCE), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.DEVIL), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.TOWER), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.STAR), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.MOON), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.SUN), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.FORTUNE, Arcana.JUDGEMENT), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.STRENGTH), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.HANGED), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.DEATH), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.TEMPERANCE), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.DEVIL), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.TOWER), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.STAR), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.MOON), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.STRENGTH, Arcana.SUN), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.HANGED), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.DEATH), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.TEMPERANCE), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.DEVIL), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.TOWER), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.STAR), Arcana.JUSTICE);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.MOON), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.SUN), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.HANGED, Arcana.JUDGEMENT), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.DEATH), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.TEMPERANCE), Arcana.HANGED);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.DEVIL), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.TOWER), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.STAR), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.MOON), Arcana.HIEROPHANT);
		arcanaCombos.put(arcanaPair(Arcana.DEATH, Arcana.SUN), Arcana.PRIESTESS);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.TEMPERANCE), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.DEVIL), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.TOWER), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.STAR), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.MOON), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.SUN), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.TEMPERANCE, Arcana.JUDGEMENT), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.DEVIL), Arcana.DEVIL);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.TOWER), Arcana.MAGICIAN);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.STAR), Arcana.STRENGTH);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.MOON), Arcana.CHARIOT);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.SUN), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.DEVIL, Arcana.JUDGEMENT), Arcana.LOVERS);
		arcanaCombos.put(arcanaPair(Arcana.TOWER, Arcana.TOWER), Arcana.TOWER);
		arcanaCombos.put(arcanaPair(Arcana.TOWER, Arcana.STAR), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.TOWER, Arcana.MOON), Arcana.HERMIT);
		arcanaCombos.put(arcanaPair(Arcana.TOWER, Arcana.SUN), Arcana.EMPEROR);
		arcanaCombos.put(arcanaPair(Arcana.TOWER, Arcana.JUDGEMENT), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.STAR, Arcana.STAR), Arcana.STAR);
		arcanaCombos.put(arcanaPair(Arcana.STAR, Arcana.MOON), Arcana.TEMPERANCE);
		arcanaCombos.put(arcanaPair(Arcana.STAR, Arcana.SUN), Arcana.JUDGEMENT);
		arcanaCombos.put(arcanaPair(Arcana.STAR, Arcana.JUDGEMENT), Arcana.FORTUNE);
		arcanaCombos.put(arcanaPair(Arcana.MOON, Arcana.MOON), Arcana.MOON);
		arcanaCombos.put(arcanaPair(Arcana.MOON, Arcana.SUN), Arcana.EMPRESS);
		arcanaCombos.put(arcanaPair(Arcana.MOON, Arcana.JUDGEMENT), Arcana.FOOL);
		arcanaCombos.put(arcanaPair(Arcana.SUN, Arcana.SUN), Arcana.SUN);
		arcanaCombos.put(arcanaPair(Arcana.SUN, Arcana.JUDGEMENT), Arcana.DEATH);
		arcanaCombos.put(arcanaPair(Arcana.JUDGEMENT, Arcana.JUDGEMENT), Arcana.JUDGEMENT);
		for (Map.Entry<Integer, Arcana> entry : arcanaCombos.entrySet()) {
			reverseMap.get(entry.getValue().getValue()).add(entry.getKey());
		}
		rareCombos.put(Arcana.FOOL, new Integer[] { -1, 1, -1, 1, -1, -1, 1, 2 });
		rareCombos.put(Arcana.MAGICIAN, new Integer[] { 1, -1, 2, -1, 1, 1, 1, 1 });
		rareCombos.put(Arcana.PRIESTESS, new Integer[] { -1, 1, -1, 2, 1, -1, 1, 1 });
		rareCombos.put(Arcana.EMPRESS, new Integer[] { -1, 2, -1, 1, 1, 1, -1, 1 });
		rareCombos.put(Arcana.EMPEROR, new Integer[] { 2, -1, 1, -1, -1, 1, 1, -1 });
		rareCombos.put(Arcana.HIEROPHANT, new Integer[] { 1, -1, 1, -2, 1, -1, -1, -1 });
		rareCombos.put(Arcana.LOVERS, new Integer[] { -1, 1, -1, 1, -1, -1, -2, 1 });
		rareCombos.put(Arcana.CHARIOT, new Integer[] { 1, -1, 1, -1, 1, -2, -1, -1 });
		rareCombos.put(Arcana.STRENGTH, new Integer[] { -1, 1, -2, 1, 1, 1, -1, -1 });
		rareCombos.put(Arcana.HERMIT, new Integer[] { 2, -1, -1, 1, 1, 1, 1, -2 });
		rareCombos.put(Arcana.FORTUNE, new Integer[] { 1, -1, 2, -1, -2, -1, 1, -1 });
		rareCombos.put(Arcana.JUSTICE, new Integer[] { 1, -1, -1, 2, 1, 1, -1, 1 });
		rareCombos.put(Arcana.HANGED, new Integer[] { 1, 1, -1, -1, 1, 2, -1, -1 });
		rareCombos.put(Arcana.DEATH, new Integer[] { 1, -1, 1, 1, -1, -1, 2, 1 });
		rareCombos.put(Arcana.TEMPERANCE, new Integer[] { -1, 1, -1, -1, 1, 1, -1, 2 });
		rareCombos.put(Arcana.DEVIL, new Integer[] { -2, 1, -1, 1, 1, 2, -1, -1 });
		rareCombos.put(Arcana.TOWER, new Integer[] { -1, -2, 1, 1, 1, 1, -1, -1 });
		rareCombos.put(Arcana.STAR, new Integer[] { 1, -1, 1, -1, 1, -1, 1, 1 });
		rareCombos.put(Arcana.MOON, new Integer[] { -1, 2, 1, -1, 1, -1, -1, -1 });
		rareCombos.put(Arcana.SUN, new Integer[] { 1, -1, -1, 1, 1, -1, 2, 1 });
		rareCombos.put(Arcana.JUDGEMENT, new Integer[] { -1, -1, 1, -1, 1, 1, -1, -1 });
	}

	/**
	 * Convert 2 Arcana to an int representation
	 * 
	 * @param arc1
	 *            The first arcana
	 * @param arc2
	 *            The second arcana
	 * @return An integer of a form such that % 21 & /21 (int division) will
	 *         recover the two arcana values
	 */
	private int arcanaPair(Arcana arc1, Arcana arc2) {
		if (arc1.getValue() > arc2.getValue()) {
			return arc2.getValue() * 21 + arc1.getValue();
		} else {
			return arc1.getValue() * 21 + arc2.getValue();
		}
	}

	/**
	 * @return The singleton instance of the {@link FusionCalculator}
	 */
	public static FusionCalculator getCalculator() {
		if (singleton == null) {
			singleton = new FusionCalculator();
		}
		return singleton;
	}

	/**
	 * Get all of the Recipes for the given persona
	 * 
	 * @param persona
	 *            The persona to get fusions for
	 * @return An array of {@link Recipe Recipes}
	 */
	public Recipe[] getFusionsTo(FlatPersona persona) {
		if (persona.isRare()) {
			// Can't fuse to rare persona
			return new Recipe[0];
		} else if (persona.isSpecial()) {
			// Specials only have one way to be fused
			for (Recipe special : specialFusions) {
				if (special.getResult().getId() == persona.getId()) {
					return new Recipe[] { special };
				}
			}
			System.err.println("Failed to find a special fusion for a special fusion persona");
			return null;
		} else {
			// Otherwise normal fusions
			return getArcanaRecipes(persona);
		}
	}

	/**
	 * Get all of the valid 2 persona fusions that use the given persona
	 * 
	 * @param persona
	 *            The persona to get valid fusions from
	 * @return An array of {@link Recipe Recipes} where the given persona is one
	 *         of the two sources
	 */
	public Recipe[] getFusionsFrom(FlatPersona persona) {
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		for (ArrayList<FlatPersona> arcanaSet : personaMap) {
			for (FlatPersona persona2 : arcanaSet) {
				if (persona2.getId() == persona.getId()) {
					continue;
				}
				PersonaReference result = fuse(persona, persona2);
				if (result != null) {
					PersonaReference[] sources = {
							new PersonaReference(persona.getId(), persona.getName(), persona.getLevel(),
									persona.getArcana().getValue()),
							new PersonaReference(persona2.getId(), persona2.getName(), persona2.getLevel(),
									persona2.getArcana().getValue()) };
					recipes.add(new Recipe(result, sources));
				}
			}
		}
		Recipe[] temp = new Recipe[recipes.size()];
		recipes.toArray(temp);
		return temp;
	}

	/**
	 * Get the recipes to fuse to the given persona
	 * 
	 * @param persona
	 *            The persona to get recipes for
	 * @return An Array of {@link Recipe Recipes} that result in the given
	 *         persona
	 */
	private Recipe[] getArcanaRecipes(FlatPersona persona) {
		ArrayList<Recipe> recipes = new ArrayList<Recipe>();
		ArrayList<Integer> combos = reverseMap.get(persona.getArcana().getValue());
		for (int combo : combos) {
			ArrayList<FlatPersona> personae1 = personaMap.get(combo % 21);
			ArrayList<FlatPersona> personae2 = personaMap.get(combo / 21);
			for (int i = 0; i < personae1.size(); i++) {
				FlatPersona persona1 = personae1.get(i);
				for (int j = 0; j < personae2.size(); j++) {
					FlatPersona persona2 = personae2.get(j);
					// For same arcana fusion only consider j > i to avoid
					// duplicates
					if (persona1.getArcana() == persona2.getArcana() && j <= i) {
						continue;
					}
					// Rare fusion will be handled separately
					else if (persona1.isRare() && !persona2.isRare()) {
						continue;
					} else if (!persona1.isRare() && persona2.isRare()) {
						continue;
					}
					PersonaReference result = fuseNormal(persona1, persona2);
					if (result == null) {
						continue;
					}
					// If the result isn't what we're looking for, or either of
					// the sources is
					// the same as what we're looking for (which would mean its
					// the same as the result)
					// throw it out
					if (result.getId() != persona.getId() || persona1.getId() == persona.getId()
							|| persona2.getId() == persona.getId()) {
						continue;
					}
					PersonaReference[] sources = {
							new PersonaReference(persona1.getId(), persona1.getName(), persona1.getLevel(),
									persona1.getArcana().getValue()),
							new PersonaReference(persona2.getId(), persona2.getName(), persona2.getLevel(),
									persona2.getArcana().getValue()) };
					recipes.add(new Recipe(new PersonaReference(persona.getId(), persona.getName(), persona.getLevel(),
							persona.getArcana().getValue()), sources));
				}
			}
		}
		// rare fusion where one persona is a rare and the other is normal
		for (FlatPersona rare : rarePersonae) {
			ArrayList<FlatPersona> personae = personaMap.get(persona.getArcana().getValue());
			for (FlatPersona mainPersona : personae) {
				if (rare.getId() == mainPersona.getId()) {
					continue;
				}
				PersonaReference result = fuseRare(rare, mainPersona);
				if (result == null) {
					continue;
				} else if (result.getId() != persona.getId() || rare.getId() == persona.getId()
						|| mainPersona.getId() == persona.getId()) {
					continue;
				}
				PersonaReference[] sources = {
						new PersonaReference(rare.getId(), rare.getName(), rare.getLevel(),
								rare.getArcana().getValue()),
						new PersonaReference(mainPersona.getId(), mainPersona.getName(), mainPersona.getLevel(),
								mainPersona.getArcana().getValue()) };
				recipes.add(new Recipe(new PersonaReference(persona.getId(), persona.getName(), persona.getLevel(),
						persona.getArcana().getValue()), sources));
			}
		}
		Recipe[] temp = new Recipe[recipes.size()];
		recipes.toArray(temp);
		return temp;
	}

	/**
	 * Fuse the two given personae accounting for Normal & Rare fusion
	 * 
	 * @param persona1
	 * @param persona2
	 * @return The {@link PersonaReference} for the result of the fusion;
	 *         {@code null} if the two do not have a valid result
	 */
	private PersonaReference fuse(FlatPersona persona1, FlatPersona persona2) {
		PersonaReference result = fuseSpecial(persona1, persona2);
		if (result != null) {
			return result;
		}
		if (persona1.isRare()) {
			if (persona2.isRare()) {
				return fuseNormal(persona1, persona2);
			} else {
				return fuseRare(persona1, persona2);
			}
		} else if (persona2.isRare()) {
			return fuseRare(persona2, persona1);
		} else {
			return fuseNormal(persona1, persona2);
		}
	}

	/**
	 * Check if the two personae fuse to unique/special result instead of using
	 * the default formula
	 * 
	 * @param persona1
	 * @param persona2
	 * @return The {@link PersonaReference} for the result of the special
	 *         fusion; {@code null{ if there is no special fusion using the two
	 *         given personae
	 */
	private PersonaReference fuseSpecial(FlatPersona persona1, FlatPersona persona2) {
		PersonaReference result = null;
		for (Recipe special : specialFusions) {
			if (special.getSource()[2] != null) {
				break;
			}
			if ((persona1.getId() == special.getSource()[0].getId()
					&& persona2.getId() == special.getSource()[1].getId())
					|| (persona2.getId() == special.getSource()[0].getId()
							&& persona1.getId() == special.getSource()[1].getId())) {
				result = special.getResult();
				break;
			}
		}
		return result;
	}

	/**
	 * Fuse according using the standard fusion equation
	 * 
	 * @param persona1
	 * @param persona2
	 * @return The {@link PersonaReference} for result of the fusion;
	 *         {@code null} if there is no valid result for this fusion
	 */
	private PersonaReference fuseNormal(FlatPersona persona1, FlatPersona persona2) {
		int level = 1 + (persona1.getLevel() + persona2.getLevel()) / 2;
		int pair = arcanaPair(persona1.getArcana(), persona2.getArcana());
		Arcana arcana = arcanaCombos.get(pair);
		if (arcana == null) {
			return null;
		}
		ArrayList<FlatPersona> personae = this.personaMap.get(arcana.getValue());
		FlatPersona persona = null;
		boolean found = false;
		if (persona1.getArcana() == persona2.getArcana()) {
			// same-arcana down-rank fusion
			for (int i = personae.size() - 1; i >= 0; i--) {
				persona = personae.get(i);
				if (persona.getLevel() <= level) {
					if (persona.isSpecial() || persona.isRare() || persona.getId() == persona1.getId()
							|| persona.getId() == persona2.getId()) {
						continue;
					}
					found = true;
					break;
				}
			}
		} else {
			// different-arcana fusion
			for (int i = 0; i < personae.size(); i++) {
				persona = personae.get(i);
				if (persona.getLevel() >= level) {
					if (persona.isSpecial() || persona.isRare()) {
						continue;
					}
					found = true;
					break;
				}
			}
		}
		return found ? new PersonaReference(persona.getId(), persona.getName(), persona.getLevel(),
				persona.getArcana().getValue()) : null;
	}

	/**
	 * Fuse using the rare fusion equation
	 * 
	 * @param persona1
	 * @param persona2
	 * @return The {@link PersonaReference} for result of the rare fusion;
	 *         {@code null} if there is no valid result for this fusion
	 */
	private PersonaReference fuseRare(FlatPersona rare, FlatPersona main) {
		int modifier = rareCombos.get(main.getArcana())[rarePersonae.indexOf(rare)];
		ArrayList<FlatPersona> personae = personaMap.get(main.getArcana().getValue());
		int index = personae.indexOf(main);
		if (index + modifier >= personae.size() || index + modifier < 0) {
			return null;
		}
		FlatPersona newPersona = personae.get(index + modifier);
		if (newPersona.isSpecial()) {
			if (modifier > 0) {
				modifier++;
			} else if (modifier < 0) {
				modifier--;
			}
			if (index + modifier >= personae.size() || index + modifier < 0) {
				return null;
			}
			newPersona = personae.get(index + modifier);
		}
		return new PersonaReference(newPersona.getId(), newPersona.getName(), newPersona.getLevel(),
				newPersona.getArcana().getValue());
	}
}
