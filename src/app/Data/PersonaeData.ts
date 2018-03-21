import { Persona, Arcana, ElemResist } from '../Classes/Persona';
import { Drop, SkillCardType, Item } from '../Classes/Item';
import { emptyItem, weaponList, armorList, lootList, recoveryList, accessoryList, skillCardList } from './ItemData';
import { NameData } from './NameData';
import { skillList } from './SkillData';
import { PersonaSkill } from '../Classes/Skill';
const emptyDrop = new Drop(emptyItem, 0, 0);

function personaSkill(name: string, level: number): PersonaSkill {
    return new PersonaSkill(skillList.find(s => s.name === name), level);
}

function drop(list: Item[], name: string, low: number, high: number) {
    return new Drop(list.find(l => l.name === name), low, high);
}

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
                personaSkill(NameData.EIHA, 0),
                personaSkill(NameData.CLEAVE, 2),
                personaSkill(NameData.SUKUNDA, 4),
                personaSkill(NameData.DREAMNEEDLE, 5),
                personaSkill(NameData.ADVERSERESOLVE, 7)
            ], // skills
            [
                weaponList.find(w => w.name === 'Main Gauche'), // Main Gauche
                armorList.find(a => a.name === 'Black Garb'), // Black Garb
                emptyItem,
                emptyItem
            ], // transmu
            [emptyDrop], // negot
            [
                drop(lootList,'Thick Parchment', 6, 16), // Thick Parchment
                drop(recoveryList,'Soul Drop', 16, 20)  // Soul Drop
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
                personaSkill(NameData.AGI, 0),
                personaSkill(NameData.RAKUNDA, 0),
                personaSkill(NameData.SHARPSTUDENT, 4),
                personaSkill(NameData.DAZZLER, 5),
                personaSkill(NameData.RESISTSLEEP, 7),
            ], // skills
            [
                weaponList.find(w => w.name === 'Pumpkin Cannon'), // Pumpkin Cannon
                armorList.find(a => a.name === 'Wizard\'s Robes'), // Wizard's Robes
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(recoveryList,'Devil Fruit', 1, 6),
                drop(recoveryList,'Soul Drop', 7, 13)
            ], // negot
            [
                drop(lootList,'Cork Wood', 6, 16), // Cork Wood
                drop(recoveryList,'Devil Fruit', 16, 20)  // Devil Fruit
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
                personaSkill(NameData.DIA, 0),
                personaSkill(NameData.ZIO, 0),
                personaSkill(NameData.PATRA, 3),
                personaSkill(NameData.TARUKAJA, 5),
                personaSkill(NameData.RESISTCONFUSE, 6),
            ],
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === 'Breath Sash'),
                skillCardList.find(s => s.skillName === NameData.DIA && s.cardType === SkillCardType.Ally)
            ],
            [
                drop(recoveryList,'Devil Fruit', 1, 4),
                drop(recoveryList,'Soul Drop', 5, 8),
                drop(recoveryList,'Life Stone', 9, 12),
                drop(skillCardList,'Dia Ally', 13, 13),
            ], // negot
            [
                drop(lootList,'Plant Balm', 6, 16),
                drop(recoveryList,'Devil Fruit', 16, 20)
            ], // drops
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
            [40, 50, 5, 7.5, 7.5, 10, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist, 
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral], 
            [
                personaSkill(NameData.PULINPA, 0),
                personaSkill(NameData.ENERGYDROP, 0),
                personaSkill(NameData.LUNGE, 4),
                personaSkill(NameData.SUKUNDA, 5),
                personaSkill(NameData.SKULLCRACKER, 7),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === 'Leather Breastplate'),
                emptyItem,
                skillCardList.find(s => s.skillName === NameData.ENERGYDROP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList,'Devil Fruit', 1, 4),
                drop(recoveryList,'Rancid Gravy', 5, 8),
                drop(recoveryList,'Life Stone', 9, 12),
                drop(skillCardList,'Energy Drop Ally', 13, 13),
            ], // negot
            [
                drop(lootList, 'Cork Wood', 6, 16),
                drop(recoveryList, 'Devil Fruit', 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            'Agathion',
            Arcana.Chariot,
            3,
            [50, 30, 7.5, 10, 12.5, 17.5, 7.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, 
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral], 
            [
                personaSkill(NameData.ZIO, 0),
                personaSkill(NameData.BAISUDI, 0),
                personaSkill(NameData.DIA, 0),
                personaSkill(NameData.LUNGE, 4),
                personaSkill(NameData.RAKUKAJA, 6),
                personaSkill(NameData.DODGEELECTRIC, 8),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === 'Bronze Shield'),
                emptyItem,
                skillCardList.find(s => s.skillName === NameData.ZIO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList,'Devil Fruit', 1, 4),
                drop(recoveryList,'Stone Bread', 5, 8),
                drop(recoveryList,'Life Stone', 9, 12),
                drop(skillCardList,'Zio Ally', 13, 13),
            ], // negot
            [
                drop(lootList, 'Tin Clasp', 6, 16),
                drop(recoveryList, 'Devil Fruit', 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            'Bicorn',
            Arcana.Hermit,
            4,
            [80, 40, 12.5, 7.5, 7.5, 12.5, 7.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, 
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist], 
            [
                personaSkill(NameData.LUNGE, 0),
                personaSkill(NameData.TARUNDA, 0),
                personaSkill(NameData.GARU, 6),
                personaSkill(NameData.ICEWALL, 7),
                personaSkill(NameData.APTPUPIL, 8),
            ], // skills
            [
                weaponList.find(w => w.name === 'Horn Bill'),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === NameData.GARU && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList,'Devil Fruit', 1, 4),
                drop(recoveryList,'Rancid Gravy', 5, 8),
                drop(recoveryList,'Life Stone', 9, 12),
                drop(skillCardList,'Zio Ally', 13, 13),
            ], // negot
            [
                drop(lootList, 'Plant Balm', 6, 16),
                drop(recoveryList, 'Devil Fruit', 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            'Dummy Data',
            Arcana.Fool,
            0,
            [40, 50, 5, 7.5, 7.5, 10, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, 
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral], 
            [
                personaSkill(NameData.PULINPA, 0),
                personaSkill(NameData.ENERGYDROP, 0),
                personaSkill(NameData.LUNGE, 4),
                personaSkill(NameData.SUKUNDA, 5),
                personaSkill(NameData.SKULLCRACKER, 7),
            ], // skills
            [
                weaponList.find(w => w.name === 'Main Gauche'),
                armorList.find(a => a.name === 'Leather Breastplate'),
                accessoryList.find(a => a.name === 'Breath Sash'),
                skillCardList.find(s => s.skillName === NameData.ZIO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList,'Devil Fruit', 1, 4),
                drop(recoveryList,'Rancid Gravy', 5, 8),
                drop(recoveryList,'Life Stone', 9, 12),
                drop(skillCardList,'Zio Ally', 13, 13),
                drop(lootList,'Dummy', 15, 15),
            ], // negot
            [
                drop(lootList, 'Dummy', 6, 16),
                drop(recoveryList, 'Devil Fruit', 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
    ];
export const personaeMap = personaeList.reduce(function (map: Map<string, Persona>, persona: Persona) {
    map[persona.name] = persona;
    return map;
}, {}) as Map<string, Persona>;


const dlcPersona = [['Orpheus', 'Orpheus Picaro'], ['Izanagi', 'Izanagi Picaro'], ['Thanatos', 'Thanatos Picaro'],
['Magatsu-Izanagi', 'Magatsu-Izanagi Picaro'], ['Kaguya', 'Kaguya Picaro'], ['Ariadne', 'Ariadne Picaro'],
['Asterius', 'Asterius Picaro'], ['Tsukiyomi', 'Tsukiyomi Picaro'], ['Messiah', 'Messiah Picaro']];
