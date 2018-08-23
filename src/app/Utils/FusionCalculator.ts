import { Persona, Arcana, Recipe } from '../Classes/Persona';
import { specialCombos } from '../Data/RecipeData';
import { arcanaCombos, ArcanaPair, rareCombos } from '../Data/ArcanaComboData';
import { PersonaService } from '../persona.service';
const rarePersonae = [];
const personaService = new PersonaService();

function getPersonaeList() {
    let list: Persona[];
    personaService.getPersonaeList().subscribe(personae => list = personae);
    return list;
}

function getPersonaeMap() {
    let map: Map<string, Persona>;
    personaService.getPersonaeMap().subscribe(personae => map = personae);
    return map;
}
const personaeList = getPersonaeList();
const personaeMap = getPersonaeMap();

class CalculatorHelper {
    public static personaeByArcana: Map<Arcana, Persona[]> = new Map<Arcana, Persona[]>([
        [Arcana.Fool, []],
        [Arcana.Magician, []],
        [Arcana.Priestess, []],
        [Arcana.Empress, []],
        [Arcana.Emperor, []],
        [Arcana.Hierophant, []],
        [Arcana.Lovers, []],
        [Arcana.Chariot, []],
        [Arcana.Strength, []],
        [Arcana.Hermit, []],
        [Arcana.Fortune, []],
        [Arcana.Justice, []],
        [Arcana.Hanged, []],
        [Arcana.Death, []],
        [Arcana.Temperance, []],
        [Arcana.Devil, []],
        [Arcana.Tower, []],
        [Arcana.Star, []],
        [Arcana.Moon, []],
        [Arcana.Sun, []],
        [Arcana.Judgement, []]
    ]);
    public static getPersonaeByArcana(arcana: Arcana): Persona[] {
        let personae: Persona[];
        if (!CalculatorHelper.personaeByArcana.get(arcana).length) {
            personae = personaeList.filter(persona => persona.arcana === arcana);
            CalculatorHelper.personaeByArcana.set(arcana, personae);
        } else {
            personae = CalculatorHelper.personaeByArcana.get(arcana);
        }
        return personae;
    }
}

export function getFusionsTo(persona: Persona): Recipe[] {
    if (persona.rare) {
        return [];
    }
    if (persona.special) {
        return [getSpecialFusionTo(persona)];
    }
    return getArcanaRecipes(persona);
}

function getSpecialFusionTo(persona: Persona): Recipe {
    return specialCombos.find(c => c.result.name === persona.name);
}

function getArcanaRecipes(persona: Persona): Recipe[] {
    const recipes: Recipe[] = new Array<Recipe>();
    const combos: number[] = new Array<number>();
    arcanaCombos.forEach( function(value, key, map) {
        if (persona.arcana === value) {
            combos.push(key);
        }
    });
    // fuse 2 persona normally (including down-rank)
    combos.forEach(combo => {
        const personae1 = CalculatorHelper.getPersonaeByArcana(combo % 21);
        const personae2 = CalculatorHelper.getPersonaeByArcana(Math.floor(combo / 21));
        for (let i = 0, persona1 = null; persona1 = personae1[i]; i++) {
            for (let j = 0, persona2 = null; persona2 = personae2[j]; j++) {
                // for same arcana fusion only consider k > j to avoid duplicates
                if (persona1.arcana === persona2.arcana && j <= i) {
                    continue;
                }
                // rare fusion will be handled separately
                if (persona1.rare && !persona2.rare) {
                    continue;
                }
                if (persona2.rare && !persona1.rare) {
                    continue;
                }
                const result = fuseNormal(persona1, persona2);
                if (!result) {
                    continue;
                }
                if (result !== persona || persona1 === persona || persona2 === persona) {
                    continue;
                }
                recipes.push(new Recipe([persona1, persona2], persona));
            }
        }
    });
    // rare fusion where one persona is a rare one and the other is a normal one
    rarePersonae.forEach(rarePersona => {
        const personae = CalculatorHelper.getPersonaeByArcana(persona.arcana);
        personae.forEach(mainPersona => {
            if (rarePersona === mainPersona) {
                return;
            }
            const result = fuseRare(rarePersona, mainPersona);
            if (!result) {
                return;
            }
            if (result !== persona || rarePersona === persona || mainPersona === persona) {
                return;
            }
            recipes.push(new Recipe([rarePersona, mainPersona], result));
        });
    });
    return recipes;
}

export function getFusionsFrom(persona: Persona): Recipe[] {
    const recipes = [];
    personaeList.forEach(persona2 => {
        if (persona2 === persona) {
            return;
        }
        const result = fuse(persona, persona2);
        if (result !== null) {
            recipes.push(new Recipe([persona, persona2], result));
        }
    });
    return recipes;
}

function fuse(persona1: Persona, persona2: Persona): Persona {
    const result = fuseSpecial(persona1, persona2);
    if (result !== null) {
        return result;
    }
    if (persona1.rare) {
        if (persona2.rare) {
            return fuseNormal(persona1, persona2);
        } else {
            return fuseRare(persona1, persona2);
        }
    } else if (persona2.rare) {
        return fuseRare(persona2, persona1);
    } else {
        return fuseNormal(persona1, persona2);
    }
}

function fuseSpecial(persona1: Persona, persona2: Persona): Persona {
    let persona = null;
    specialCombos.forEach(combo => {
        if (combo.sources.length !== 2 || persona !== null) {
            return;
        }
        if (((persona1.name === combo.sources[0].name && persona2.name === combo.sources[1].name) ||
                (persona2.name === combo.sources[0].name && persona1.name === combo.sources[1].name))) {
                persona = personaeMap[combo.result.name];
                return;
        }
    });
    return persona;
}

function fuseNormal(persona1: Persona, persona2: Persona): Persona {
    const level = 1 + Math.floor((persona1.level + persona2.level) / 2);
    const pair = ArcanaPair(persona1.arcana, persona2.arcana);
    const arcana = arcanaCombos.get(pair);
    if (arcana === undefined) {
        return null;
    }
    const personae = CalculatorHelper.getPersonaeByArcana(arcana);
    let persona = null;
    let found = false;
    if (persona1.arcana === persona2.arcana) {
        // same-arcana down-rank fusion
        for (let i = personae.length - 1; i >= 0; i--) {
            persona = personae[i];
            if (persona.level <= level) {
                if (persona.special || persona.rare || persona === persona1 || persona === persona2) {
                    continue;
                }
                found = true;
                break;
            }
        }
    } else {
        // different-arcana fusion
        for (let i = 0; i < personae.length; i++) {
            persona = personae[i];
            if (persona.level >= level) {
                if (persona.special || persona.rare) {
                    continue;
                }
                found = true;
                break;
            }
        }
    }
    return found ? persona : null;
}

function fuseRare (rarePersona: Persona, mainPersona: Persona) {
    let modifier = rareCombos[mainPersona.arcana][rarePersonae.indexOf(rarePersona.name)];
    const personae = CalculatorHelper.getPersonaeByArcana(mainPersona.arcana);
    const mainPersonaIndex = personae.indexOf(mainPersona);
    let newPersona = personae[mainPersonaIndex + modifier];
    if (!newPersona) {
        return null;
    }
    if (newPersona.special) {
        if (modifier > 0) {
            modifier++;
        } else if (modifier < 0) {
            modifier--;
        }
        newPersona = personae[mainPersonaIndex + modifier];
    }
    return newPersona;
}
