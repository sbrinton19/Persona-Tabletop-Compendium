import { Persona, Arcana, ElemResist } from '../Classes/Persona';
import { Drop, SkillCardType } from '../Classes/Item';
import { emptyItem, weaponList, armorList, lootList, recoveryList, accessoryList, skillCardList } from './ItemData';
import { NameData } from './NameData';
import { skillList } from './SkillData';
import { PersonaSkill } from '../Classes/Skill';
const emptyDrop = new Drop(emptyItem, 0, 0);
export const personaeList: Persona[] =
    [
        new Persona(
            NameData.ARSENE,
            Arcana.Fool,
            1,
            [40, 20, 5, 5, 5, 7.5, 2.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
            [
                new PersonaSkill(skillList.find(s => s.name === NameData.EIHA), 0),
                new PersonaSkill(skillList.find(s => s.name === NameData.CLEAVE), 2),
                new PersonaSkill(skillList.find(s => s.name === NameData.SUKUNDA), 4),
                new PersonaSkill(skillList.find(s => s.name === NameData.DREAMNEEDLE), 5),
                new PersonaSkill(skillList.find(s => s.name === NameData.ADVERSERESOLVE), 7)
            ], // skills
            [
                weaponList.find(w => w.name === 'Main Gauche'), // Main Gauche
                armorList.find(a => a.name === 'Black Garb'), // Black Garb
                emptyItem,
                emptyItem
            ], // transmu
            [emptyDrop], // negot
            [
                new Drop(lootList.find(l => l.name === 'Thick Parchment'), 11, 16), // Thick Parchment
                new Drop(recoveryList.find(l => l.name === 'Soul Drop'), 16, 20)  // Soul Drop
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            NameData.JACKOLANTERN,
            Arcana.Magician,
            2,
            [30, 15, 5, 7.5, 7.5, 7.5, 5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                new PersonaSkill(skillList.find(s => s.name === NameData.AGI), 0),
                new PersonaSkill(skillList.find(s => s.name === NameData.RAKUNDA), 0),
                new PersonaSkill(skillList.find(s => s.name === NameData.SHARPSTUDENT), 4),
                new PersonaSkill(skillList.find(s => s.name === NameData.DAZZLER), 5),
                new PersonaSkill(skillList.find(s => s.name === NameData.RESISTSLEEP), 7),
            ], // skills
            [
                weaponList.find(w => w.name === 'Pumpkin Cannon'), // Pumpkin Cannon
                armorList.find(a => a.name === 'Wizard\'s Robes'), // Wizard's Robes
                emptyItem,
                emptyItem
            ], // transmu
            [
                new Drop(recoveryList.find(r => r.name === 'Devil Fruit'), 1, 6),
                new Drop(recoveryList.find(r => r.name === 'Soul Drop'), 7, 13)
            ], // negot
            [
                new Drop(lootList.find(l => l.name === 'Cork Wood'), 11, 16), // Cork Wood
                new Drop(recoveryList.find(r => r.name === 'Devil Fruit'), 16, 20)  // Devil Fruit
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            NameData.PIXIE,
            Arcana.Lovers,
            2,
            [20, 30, 2.5, 7.5, 7.5, 10, 5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist,
                ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak],
            [
                new PersonaSkill(skillList.find(s => s.name === NameData.DIA), 0),
                new PersonaSkill(skillList.find(s => s.name === NameData.ZIO), 0),
                new PersonaSkill(skillList.find(s => s.name === NameData.PATRA), 3),
                new PersonaSkill(skillList.find(s => s.name === NameData.TARUKAJA), 5),
                new PersonaSkill(skillList.find(s => s.name === NameData.RESISTCONFUSE), 6),
            ],
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === 'Breath Sash'),
                skillCardList.find(s => s.skillName === NameData.DIA && s.cardType === SkillCardType.Ally)
            ],
            [

            ],
            [],
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            NameData.MANDRAKE,
            Arcana.Death,
            3,
            [30, 15, 5, 7.5, 7.5, 7.5, 5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                emptyItem
            ], // transmu
            [emptyDrop], // negot
            [
                new Drop(emptyItem, 11, 16),
                new Drop(emptyItem, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        )

    ];
export const personaeMap = personaeList.reduce(function (map: Map<string, Persona>, persona: Persona) {
    map[persona.name] = persona;
    return map;
}, {}) as Map<string, Persona>;


const dlcPersona = [['Orpheus', 'Orpheus Picaro'], ['Izanagi', 'Izanagi Picaro'], ['Thanatos', 'Thanatos Picaro'],
['Magatsu-Izanagi', 'Magatsu-Izanagi Picaro'], ['Kaguya', 'Kaguya Picaro'], ['Ariadne', 'Ariadne Picaro'],
['Asterius', 'Asterius Picaro'], ['Tsukiyomi', 'Tsukiyomi Picaro'], ['Messiah', 'Messiah Picaro']];
