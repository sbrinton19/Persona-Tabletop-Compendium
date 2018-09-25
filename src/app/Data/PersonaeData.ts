import { Persona, Arcana, ElemResist } from '../Classes/Persona';
import { Drop, SkillCardType, Item, ConsumableType } from '../Classes/Item';
import { emptyItem, weaponList, armorList, lootList, consumableList, accessoryList, skillCardList } from './ItemData';
import { PersonaeNameData, SkillNameData, ItemNameData } from './NameData';
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
            PersonaeNameData.ARSENE,
            Arcana.Fool,
            1,
            [40, 20, 5, 5, 5, 7.5, 2.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
            [
                personaSkill(SkillNameData.EIHA, 0),
                personaSkill(SkillNameData.CLEAVE, 2),
                personaSkill(SkillNameData.SUKUNDA, 4),
                personaSkill(SkillNameData.DREAMNEEDLE, 5),
                personaSkill(SkillNameData.ADVERSERESOLVE, 7)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MAINGAUCHE), // Main Gauche
                armorList.find(a => a.name === ItemNameData.BLACKGARB), // Black Garb
                emptyItem,
                emptyItem
            ], // transmu
            [emptyDrop], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16), // Thick Parchment
                drop(consumableList, ItemNameData.SOULDROP, 16, 20)  // Soul Drop
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.JACKOLANTERN,
            Arcana.Magician,
            2,
            [30, 15, 5, 7.5, 7.5, 7.5, 5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGI, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.SHARPSTUDENT, 4),
                personaSkill(SkillNameData.DAZZLER, 5),
                personaSkill(SkillNameData.RESISTSLEEP, 7),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PUMPKINCANNON), // Pumpkin Cannon
                armorList.find(a => a.name === ItemNameData.WIZARDSROBES), // Wizard's Robes
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(consumableList, ItemNameData.SOULDROP, 7, 12),
                drop(weaponList, ItemNameData.PUMPKINCANNON, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16), // Cork Wood
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 20)  // Devil Fruit
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PIXIE,
            Arcana.Lovers,
            2,
            [20, 30, 2.5, 7.5, 7.5, 10, 5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist,
                ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak],
            [
                personaSkill(SkillNameData.DIA, 0),
                personaSkill(SkillNameData.ZIO, 0),
                personaSkill(SkillNameData.PATRA, 3),
                personaSkill(SkillNameData.TARUKAJA, 5),
                personaSkill(SkillNameData.RESISTCONFUSE, 6),
            ],
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CALMINGMASK),
                skillCardList.find(s => s.skillName === SkillNameData.DIA && s.cardType === SkillCardType.Ally)
            ],
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(consumableList, ItemNameData.SOULDROP, 5, 8),
                drop(accessoryList, ItemNameData.CALMINGMASK, 9, 12),
                drop(skillCardList, 'Dia Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 19),
                drop(accessoryList, ItemNameData.CALMINGMASK, 20, 20),
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MANDRAKE,
            Arcana.Death,
            3,
            [40, 50, 5, 7.5, 7.5, 10, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.PULINPA, 0),
                personaSkill(SkillNameData.ENERGYDROP, 0),
                personaSkill(SkillNameData.LUNGE, 4),
                personaSkill(SkillNameData.SUKUNDA, 5),
                personaSkill(SkillNameData.SKULLCRACKER, 7),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.LEATHERBREASTPLATE),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ENERGYDROP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 5, 9),
                drop(armorList, ItemNameData.LEATHERBREASTPLATE, 10, 12),
                drop(skillCardList, 'Energy Drop Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 20),
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.AGATHION,
            Arcana.Chariot,
            3,
            [50, 30, 7.5, 10, 12.5, 17.5, 7.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ZIO, 0),
                personaSkill(SkillNameData.BAISUDI, 0),
                personaSkill(SkillNameData.DIA, 0),
                personaSkill(SkillNameData.LUNGE, 4),
                personaSkill(SkillNameData.RAKUKAJA, 6),
                personaSkill(SkillNameData.DODGEELEC, 8),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.BRONZESHIELD),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ZIO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(consumableList, ItemNameData.STONEBREAD, 5, 8),
                drop(armorList, ItemNameData.BRONZESHIELD, 9, 12),
                drop(skillCardList, 'Zio Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BICORN,
            Arcana.Hermit,
            4,
            [80, 40, 12.5, 7.5, 7.5, 12.5, 7.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.LUNGE, 0),
                personaSkill(SkillNameData.TARUNDA, 0),
                personaSkill(SkillNameData.GARU, 6),
                personaSkill(SkillNameData.ICEWALL, 7),
                personaSkill(SkillNameData.APTPUPIL, 8),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HORNBILL),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.GARU && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(consumableList, ItemNameData.ODDMORSEL, 5, 8),
                drop(weaponList, ItemNameData.HORNBILL, 12, 12),
                drop(skillCardList, 'Garu Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.INCUBUS,
            Arcana.Devil,
            5,
            [70, 60, 10, 15, 10, 12.5, 7.5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist], // Intentional change
            [
                personaSkill(SkillNameData.LIFEDRAIN, 0),
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.EIHA, 7),
                personaSkill(SkillNameData.TARUNDA, 8),
                personaSkill(SkillNameData.DODGECURSE, 9),
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CHAKRACHOKER),
                skillCardList.find(s => s.skillName === SkillNameData.EIHA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(consumableList, ItemNameData.SOULDROP, 7, 10),
                drop(skillCardList, 'Eiha Ally', 11, 12),
                drop(skillCardList, 'Eiha Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 19),
                drop(accessoryList, ItemNameData.CHAKRACHOKER, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KELPIE,
            Arcana.Strength,
            6,
            [80, 35, 12.5, 12.5, 12.5, 15, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GARU, 0),
                personaSkill(SkillNameData.LUNGE, 0),
                personaSkill(SkillNameData.RESISTBRAINWASH, 8),
                personaSkill(SkillNameData.SUKUKAJA, 9),
                personaSkill(SkillNameData.TERRORCLAW, 10),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GREENWHIP),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BRAINGUARD),
                skillCardList.find(s => s.skillName === SkillNameData.TERRORCLAW && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(accessoryList, ItemNameData.BRAINGUARD, 7, 11),
                drop(skillCardList, 'Terror Claw Ally', 12, 12),
                drop(weaponList, ItemNameData.GREENWHIP, 10, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.DEVILFRUIT, 16, 19),
                drop(accessoryList, ItemNameData.BRAINGUARD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SAKIMITAMA,
            Arcana.Lovers,
            6,
            [62, 48, 10, 15, 12.5, 15, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.ENERGYDROP, 0),
                personaSkill(SkillNameData.WINDWALL, 4),
                personaSkill(SkillNameData.GROWTH1, 7),
                personaSkill(SkillNameData.RAKUKAJA, 8),
                personaSkill(SkillNameData.RESISTDIZZY, 10)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DIAMONDARMLET),
                skillCardList.find(s => s.skillName === SkillNameData.RAKUKAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULDROP, 1, 6),
                drop(consumableList, ItemNameData.BITTERSOUL, 7, 12),
                drop(skillCardList, 'Rakukaja Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 3, 14),
                drop(accessoryList, ItemNameData.SHIELDGOGGLES, 14, 17),
                drop(accessoryList, ItemNameData.DIAMONDARMLET, 18, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'Uncommon enemy with good drops'
        ),
        new Persona(
            PersonaeNameData.SILKY,
            Arcana.Priestess,
            6,
            [62, 48, 10, 17.5, 10, 12.5, 12.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.DORMINA, 0),
                personaSkill(SkillNameData.DIA, 7),
                personaSkill(SkillNameData.PATRA, 9),
                personaSkill(SkillNameData.SHARPSTUDENT, 10),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ICEGLOVES),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.LUCKYCHARM),
                emptyItem
            ], // transmu
            [
                drop(armorList, ItemNameData.SILKENSHIRT, 1, 6),
                drop(accessoryList, ItemNameData.LUCKYCHARM, 7, 10),
                drop(skillCardList, 'Bufu Ally', 11, 12),
                drop(weaponList, ItemNameData.ICEGLOVES, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.EXTINGUISHORB, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GENBU,
            Arcana.Temperance,
            7,
            [0, 0, 12.5, 15, 17.5, 15, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.PATRA, 8),
                personaSkill(SkillNameData.MABUFU, 10),
                personaSkill(SkillNameData.RESISTFORGET, 11),
                personaSkill(SkillNameData.DEFENSEMASTER, 12),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SHELLBLADE),
                armorList.find(a => a.name === ItemNameData.SHELLSHIELD),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(skillCardList, 'Patra Ally', 1, 6),
                drop(weaponList, ItemNameData.STONEBLADE, 7, 10),
                drop(armorList, ItemNameData.SHELLSHIELD, 11, 12),
                drop(weaponList, ItemNameData.SHELLBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(skillCardList, 'Patra Ally', 17, 18),
                drop(weaponList, ItemNameData.STONEBLADE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'First appears as miniboss'
        ),
        new Persona(
            PersonaeNameData.SUCCUBUS,
            Arcana.Moon,
            7,
            [0, 0, 10, 17.5, 12.5, 20, 10],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.MARINKARIN, 0),
                personaSkill(SkillNameData.REBELLION, 0),
                personaSkill(SkillNameData.AGI, 8),
                personaSkill(SkillNameData.DEKAJA, 10),
                personaSkill(SkillNameData.BRAINWASHBOOST, 11),
                personaSkill(SkillNameData.MUDO, 12)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BRAINBREAKER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MARINKARIN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOLYWATER, 1, 4),
                drop(consumableList, ItemNameData.SOULDROP, 5, 8),
                drop(armorList, ItemNameData.CHROMEDLEATHERS, 9, 11),
                drop(skillCardList, 'Marin Karin Main', 12, 12),
                drop(weaponList, ItemNameData.BRAINBREAKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 16, 17),
                drop(consumableList, ItemNameData.SOULDROP, 18, 19),
                drop(armorList, ItemNameData.CHROMEDLEATHERS, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OBARIYON,
            Arcana.Fool,
            8,
            [0, 0, 17.5, 7.5, 22.5, 20, 10],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.SNAP, 0),
                personaSkill(SkillNameData.SUKUNDA, 0),
                personaSkill(SkillNameData.LUCKYPUNCH, 9),
                personaSkill(SkillNameData.RESISTFEAR, 10),
                personaSkill(SkillNameData.DEKAJA, 12),
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.WILDCLOGS),
                skillCardList.find(s => s.skillName === SkillNameData.LUCKYPUNCH && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SPICYBREAD, 1, 4),
                drop(accessoryList, ItemNameData.WILDCLOGS, 5, 8),
                drop(weaponList, ItemNameData.STUDDEDKNUCKLEDUSTER, 9, 12),
                drop(skillCardList, 'Lucky Punch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(accessoryList, ItemNameData.WILDCLOGS, 17, 19),
                drop(weaponList, ItemNameData.STUDDEDKNUCKLEDUSTER, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BERITH,
            Arcana.Hierophant,
            9,
            [0, 0, 20, 15, 17.5, 20, 12.5],
            [ElemResist.Neutral, ElemResist.Null, ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.CLEAVE, 0),
                personaSkill(SkillNameData.RAKUKAJA, 0),
                personaSkill(SkillNameData.DOUBLEFANGS, 10),
                personaSkill(SkillNameData.DODGEFIRE, 11),
                personaSkill(SkillNameData.SLEDGEHAMMER, 13),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.SCALEARMOR),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.CLEAVE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEMONDRINK, 1, 4),
                drop(weaponList, ItemNameData.SPEAR, 5, 8),
                drop(armorList, ItemNameData.BRONZEARMOR, 9, 12),
                drop(skillCardList, 'Cleave Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 19),
                drop(armorList, ItemNameData.BRONZEARMOR, 20, 20),
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HUAPO,
            Arcana.Hanged,
            9,
            [0, 0, 10, 25, 10, 20, 20],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGI, 0),
                personaSkill(SkillNameData.DORMINA, 0),
                personaSkill(SkillNameData.TARUNDA, 11),
                personaSkill(SkillNameData.RESISTFORGET, 12),
                personaSkill(SkillNameData.MARAGI, 13),
                personaSkill(SkillNameData.BURNBOOST, 15),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SLINGBOW),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.NOTEBOOK),
                emptyItem
            ], // transmu
            [
                drop(skillCardList, 'Agi Ally', 1, 4),
                drop(skillCardList, 'Agi Main', 5, 8),
                drop(accessoryList, ItemNameData.NOTEBOOK, 11, 12),
                drop(weaponList, ItemNameData.SLINGBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.THAWSTONE, 16, 19),
                drop(skillCardList, 'Agi Main', 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KOROPOKKURU,
            Arcana.Hermit,
            9,
            [0, 0, 12.5, 20, 15, 22.5, 15],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.DODGEICE, 11),
                personaSkill(SkillNameData.RAKUNDA, 12),
                personaSkill(SkillNameData.FIREWALL, 13),
                personaSkill(SkillNameData.MABUFU, 14)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.STONECROSSBOW),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.BUFU && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 7),
                drop(armorList, ItemNameData.KILIMWEAVESHIRT, 8, 9),
                drop(weaponList, ItemNameData.BOWGUN, 10, 12),
                drop(weaponList, ItemNameData.STONECROSSBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 17, 19),
                drop(armorList, ItemNameData.KILIMWEAVESHIRT, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MOKOI,
            Arcana.Death,
            9,
            [0, 0, 22.5, 12.5, 15, 25, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DAZZLER, 0),
                personaSkill(SkillNameData.SKULLCRACKER, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.MARINKARIN, 11),
                personaSkill(SkillNameData.DODGEELEC, 13),
                personaSkill(SkillNameData.DEKUNDA, 14)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ZOMBIEKARAMBIT),
                armorList.find(a => a.name === ItemNameData.SHEPHERDSBOLERO),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(weaponList, ItemNameData.KOPIS, 5, 9),
                drop(armorList, ItemNameData.SHEPHERDSBOLERO, 12, 12),
                drop(weaponList, ItemNameData.ZOMBIEKARAMBIT, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANDRAS,
            Arcana.Devil,
            10,
            [0, 0, 12.5, 22.5, 17.5, 25, 15],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.TARUKAJA, 11),
                personaSkill(SkillNameData.APTPUPIL, 13),
                personaSkill(SkillNameData.MABUFU, 14),
                personaSkill(SkillNameData.ICEBREAK, 15)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MARQUISESTOC),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MABUFU && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 6),
                drop(weaponList, ItemNameData.BROADSWORD, 7, 9),
                drop(lootList, ItemNameData.BLACKKOGATANA, 10, 12),
                drop(weaponList, ItemNameData.MARQUISESTOC, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 16, 19),
                drop(weaponList, ItemNameData.BROADSWORD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SLIME,
            Arcana.Chariot,
            10,
            [0, 0, 22.5, 15, 27.5, 15, 12.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.LUNGE, 0),
                personaSkill(SkillNameData.EIHA, 11),
                personaSkill(SkillNameData.FIREWALL, 13),
                personaSkill(SkillNameData.HEADBUTT, 14)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.REVOLTINGREVOLVER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.HEADBUTT && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 8),
                drop(weaponList, ItemNameData.COLTARMY, 9, 11),
                drop(skillCardList, 'Headbutt Main', 12, 12),
                drop(weaponList, ItemNameData.REVOLTINGREVOLVER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 19),
                drop(lootList, ItemNameData.BLACKROCK, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.APSARAS,
            Arcana.Priestess,
            11,
            [0, 0, 17.5, 27.5, 15, 25, 15],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.ICEWALL, 0),
                personaSkill(SkillNameData.REBELLION, 0),
                personaSkill(SkillNameData.MEDIA, 13),
                personaSkill(SkillNameData.ELECWALL, 14),
                personaSkill(SkillNameData.WINDWALL, 16)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ICESHOT),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ICEWALL && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.EXTINGUISHORB, 1, 6),
                drop(weaponList, ItemNameData.M1GARAND, 7, 9),
                drop(weaponList, ItemNameData.ICESHOT, 10, 12),
                drop(skillCardList, 'Ice Wall Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.EXTINGUISHORB, 17, 19),
                drop(lootList, ItemNameData.BLACKROBE, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.JACKFROST,
            Arcana.Magician,
            11,
            [0, 0, 20, 22.5, 17.5, 22.5, 17.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BAISUDI, 0),
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.ICEBREAK, 0),
                personaSkill(SkillNameData.MABUFU, 12),
                personaSkill(SkillNameData.RAKUNDA, 13),
                personaSkill(SkillNameData.FREEZEBOOST, 15)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.MAGICAMULET),
                skillCardList.find(s => s.skillName === SkillNameData.FREEZEBOOST && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.EXTINGUISHORB, 1, 4),
                drop(consumableList, ItemNameData.SOULDROP, 5, 9),
                drop(skillCardList, 'Mabufu Ally', 10, 12),
                drop(skillCardList, 'Freeze Boost Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.EXTINGUISHORB, 15, 18),
                drop(consumableList, ItemNameData.SOULDROP, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'Hee ho hee ho'
        ),
        new Persona(
            PersonaeNameData.KODAMA,
            Arcana.Star,
            11,
            [0, 0, 17.5, 27.5, 20, 25, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GARU, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.PSI, 12),
                personaSkill(SkillNameData.EVILTOUCH, 13),
                personaSkill(SkillNameData.TARUKAJA, 14),
                personaSkill(SkillNameData.FEARBOOST, 15),
                personaSkill(SkillNameData.RESISTFEAR, 17)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.FORESTSWRATH),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.GARU && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DISCHARGESTONE, 1, 6),
                drop(weaponList, ItemNameData.BAZOOKA, 7, 9),
                drop(skillCardList, 'Magaru Ally', 11, 12),
                drop(weaponList, ItemNameData.FORESTSWRATH, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KOPPATENGU,
            Arcana.Temperance,
            11,
            [0, 0, 17.5, 20, 20, 27.5, 15],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.SNAP, 0),
                personaSkill(SkillNameData.GARU, 0),
                personaSkill(SkillNameData.GROWTH1, 12),
                personaSkill(SkillNameData.TAUNT, 13),
                personaSkill(SkillNameData.RAGEBOOST, 14),
                personaSkill(SkillNameData.WAGEWAR, 15)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.GROWTH1 && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(consumableList, ItemNameData.SOURYOGURT, 5, 9),
                drop(skillCardList, 'Growth 1 Ally', 10, 12),
                drop(skillCardList, 'Growth 1 Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 16, 18),
                drop(consumableList, ItemNameData.SOURYOGURT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANGEL,
            Arcana.Justice,
            12,
            [0, 0, 17.5, 22.5, 22.5, 22.5, 22.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.DAZZLER, 0),
                personaSkill(SkillNameData.DIA, 0),
                personaSkill(SkillNameData.HAMA, 0),
                personaSkill(SkillNameData.KOUHA, 13),
                personaSkill(SkillNameData.BAISUDI, 14),
                personaSkill(SkillNameData.DODGECURSE, 15),
                personaSkill(SkillNameData.DEKUNDA, 17)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HEAVENSMESSENGER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.KOUHA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOLYWATER, 1, 5),
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 6, 9),
                drop(weaponList, ItemNameData.WEBLEY, 10, 11),
                drop(skillCardList, 'Kouha Main', 12, 12),
                drop(weaponList, ItemNameData.HEAVENSMESSENGER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 17, 19),
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ONMORAKI,
            Arcana.Moon,
            12,
            [0, 0, 22.5, 30, 17.5, 25, 12.5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.ICEWALL, 0),
                personaSkill(SkillNameData.MUDO, 0),
                personaSkill(SkillNameData.AGI, 13),
                personaSkill(SkillNameData.PULINPA, 14),
                personaSkill(SkillNameData.CONFUSEBOOST, 15),
                personaSkill(SkillNameData.RESISTFEAR, 17)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MINDCARVER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.CONFUSEBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.THAWSTONE, 1, 6),
                drop(weaponList, ItemNameData.ICEPICK, 7, 11),
                drop(skillCardList, 'Confuse Boost Ally', 12, 12),
                drop(weaponList, ItemNameData.MINDCARVER, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.THAWSTONE, 17, 18),
                drop(weaponList, ItemNameData.ICEPICK, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.IPPONDATARA,
            Arcana.Hermit,
            13,
            [0, 0, 27.5, 17.5, 35, 15, 20],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.RESISTDIZZY, 0),
                personaSkill(SkillNameData.SLEDGEHAMMER, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.HEADBUTT, 15), // Intentionally Changed
                personaSkill(SkillNameData.SHARPSTUDENT, 16),
                personaSkill(SkillNameData.COUNTER, 18)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ANCIENTTSURUGI),
                armorList.find(a => a.name === ItemNameData.CHAINMAIL),
                accessoryList.find(a => a.name === ItemNameData.SHIELDGOGGLES),
                emptyItem
            ], // transmu
            [
                drop(armorList, ItemNameData.ROUNDSHIELD, 1, 4),
                drop(armorList, ItemNameData.LINENCUIRASS, 5, 7),
                drop(weaponList, ItemNameData.BASTARDSWORD, 8, 11),
                drop(armorList, ItemNameData.CHAINMAIL, 12, 12),
                drop(weaponList, ItemNameData.ANCIENTTSURUGI, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(armorList, ItemNameData.LINENCUIRASS, 17, 19),
                drop(weaponList, ItemNameData.BASTARDSWORD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'Uncommon with equipment drops'
        ),
        new Persona(
            PersonaeNameData.INUGAMI,
            Arcana.Hanged,
            14,
            [0, 0, 27.5, 22.5, 22.5, 30, 20],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.GIANTSLICE, 0),
                personaSkill(SkillNameData.PULINPA, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.DREAMNEEDLE, 15),
                personaSkill(SkillNameData.LUCKYPUNCH, 17),
                personaSkill(SkillNameData.BRAINSHAKE, 18),
                personaSkill(SkillNameData.CONFUSEBOOST, 19)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SPIRITTANTO),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ARMYSOCKS),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 4),
                drop(consumableList, ItemNameData.REVIVALBEAD, 5, 7),
                drop(accessoryList, ItemNameData.ARMYSOCKS, 7, 10),
                drop(weaponList, ItemNameData.DIRK, 11, 12),
                drop(weaponList, ItemNameData.SPIRITTANTO, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KUSHIMITAMA,
            Arcana.Strength,
            14,
            [0, 0, 20, 30, 27.5, 22.5, 22.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.GARU, 0),
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.MEDIA, 0),
                personaSkill(SkillNameData.REGENERATE1, 15),
                personaSkill(SkillNameData.WINDWALL, 16),
                personaSkill(SkillNameData.FORGETBOOST, 18)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.STRENGTHBELT),
                skillCardList.find(s => s.skillName === SkillNameData.MEDIA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 5, 6),
                drop(accessoryList, ItemNameData.STRENGTHBELT, 7, 9),
                drop(skillCardList, 'Media Ally', 10, 12),
                drop(skillCardList, 'Media Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 19),
                drop(accessoryList, ItemNameData.STRENGTHBELT, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MAKAMI,
            Arcana.Temperance,
            15,
            [0, 0, 32.5, 30, 20, 27.5, 20],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DOUBLEFANGS, 0),
                personaSkill(SkillNameData.ENERGYDROP, 0),
                personaSkill(SkillNameData.FREI, 0),
                personaSkill(SkillNameData.MAFREI, 17),
                personaSkill(SkillNameData.MAKAJAMA, 18),
                personaSkill(SkillNameData.RESISTDESPAIR, 19),
                personaSkill(SkillNameData.DODGEELEC, 20)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CUTEPLUSHIE),
                skillCardList.find(s => s.skillName === SkillNameData.MAKAJAMA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.ODDMORSEL, 1, 4),
                drop(consumableList, ItemNameData.MAGICALOINTMENT, 5, 7),
                drop(accessoryList, ItemNameData.CUTEPLUSHIE, 8, 11),
                drop(skillCardList, 'Makajama Ally', 12, 12),
                drop(skillCardList, 'Makajama Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 19),
                drop(accessoryList, ItemNameData.CUTEPLUSHIE, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARCHANGEL,
            Arcana.Justice,
            16,
            [0, 0, 32.5, 25, 32.5, 30, 17.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.DAZZLER, 0),
                personaSkill(SkillNameData.HAMA, 0),
                personaSkill(SkillNameData.PSI, 0),
                personaSkill(SkillNameData.REBELLION, 18),
                personaSkill(SkillNameData.MAKOUHA, 19),
                personaSkill(SkillNameData.VAJRABLAST, 21)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CRUSADERSCROSSBOW),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.POWERANKLET),
                skillCardList.find(s => s.skillName === SkillNameData.HAMA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 5, 6),
                drop(accessoryList, ItemNameData.POWERANKLET, 7, 8),
                drop(skillCardList, 'Hama Ally', 9, 11),
                drop(skillCardList, 'Hama Main', 12, 12),
                drop(weaponList, ItemNameData.CRUSADERSCROSSBOW, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(armorList, ItemNameData.RINGMAIL, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ELIGOR,
            Arcana.Emperor,
            16,
            [0, 0, 30, 25, 32.5, 25, 25],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.SHARPSTUDENT, 0),
                personaSkill(SkillNameData.MARAGI, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.DOUBLEFANGS, 18),
                personaSkill(SkillNameData.SUKUNDA, 19),
                personaSkill(SkillNameData.MEMORYBLOW, 20)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HELLSPARTISAN),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TARUKAJA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Tarukaja Ally', 1, 7),
                drop(consumableList, ItemNameData.DEMONDRINK, 8, 10),
                drop(weaponList, ItemNameData.SPONTOON, 11, 12),
                drop(weaponList, ItemNameData.HELLSPARTISAN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 19),
                drop(armorList, ItemNameData.IRONARMOR, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HIGHPIXIE,
            Arcana.Fool,
            16,
            [0, 0, 20, 35, 25, 32.5, 25],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DORMINA, 0),
                personaSkill(SkillNameData.GARU, 0),
                personaSkill(SkillNameData.MEDIA, 0),
                personaSkill(SkillNameData.DIARAMA, 18),
                personaSkill(SkillNameData.TAUNT, 19),
                personaSkill(SkillNameData.MAGARU, 20)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DIARAMA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RANCIDSOUL, 1, 4),
                drop(armorList, ItemNameData.WIZARDSROBES, 5, 9),
                drop(skillCardList, 'Diarama Ally', 10, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.RANCIDSOUL, 17, 18),
                drop(armorList, ItemNameData.WIZARDSROBES, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KAGUYA,
            Arcana.Moon,
            16,
            [0, 0, 27.5, 37.5, 30, 27.5, 15],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.COUNTER, 0),
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.DIVINEGRACE, 0),
                personaSkill(SkillNameData.AMRITADROP, 18),
                personaSkill(SkillNameData.KOUGA, 20),
                personaSkill(SkillNameData.MEDIARAMA, 21),
                personaSkill(SkillNameData.NULLPHYS, 22),
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.MAGESHABIT),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DIARAMA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.LIFESTONE, 4, 6),
                drop(armorList, ItemNameData.CHANTERSDJELLABA, 7, 10),
                drop(armorList, ItemNameData.MAGESHABIT, 11, 12),
                drop(skillCardList, 'Diarama Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.LIFESTONE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SHIISAA,
            Arcana.Chariot,
            16,
            [0, 0, 32.5, 22.5, 30, 32.5, 20],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.DOUBLEFANGS, 0),
                personaSkill(SkillNameData.SKULLCRACKER, 0),
                personaSkill(SkillNameData.ZIO, 0),
                personaSkill(SkillNameData.RAMPAGE, 18),
                personaSkill(SkillNameData.DODGECURSE, 20),
                personaSkill(SkillNameData.DODGEELEC, 21)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DEMONMASK),
                skillCardList.find(s => s.skillName === SkillNameData.MAZIO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.EXTINGUISHORB, 1, 4),
                drop(consumableList, ItemNameData.LIFESTONE, 5, 9),
                drop(accessoryList, ItemNameData.DEMONMASK, 10, 12),
                drop(skillCardList, 'Mazio Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.EXTINGUISHORB, 17, 19),
                drop(accessoryList, ItemNameData.DEMONMASK, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NEKOMATA,
            Arcana.Magician,
            17,
            [0, 0, 32.5, 25, 30, 37.5, 20],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.MAGARU, 0),
                personaSkill(SkillNameData.TERRORCLAW, 0),
                personaSkill(SkillNameData.HYSTERICALSLAP, 18),
                personaSkill(SkillNameData.WINDBREAK, 20),
                personaSkill(SkillNameData.ELECWALL, 22),
                personaSkill(SkillNameData.DODGEELEC, 22),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CATONINE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.WITCHAMULET),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.RANCIDGRAVY, 1, 4),
                drop(accessoryList, ItemNameData.MAGICAMULET, 5, 9),
                drop(accessoryList, ItemNameData.WITCHAMULET, 10, 12),
                drop(weaponList, ItemNameData.CATONINE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 17, 18),
                drop(accessoryList, ItemNameData.MAGICAMULET, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OROBAS,
            Arcana.Hierophant,
            17,
            [0, 0, 27.5, 35, 37.5, 30, 15],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
            [
                personaSkill(SkillNameData.DEKAJA, 0),
                personaSkill(SkillNameData.MARAGI, 0),
                personaSkill(SkillNameData.SUKUKAJA, 0),
                personaSkill(SkillNameData.MARAKUNDA, 19),
                personaSkill(SkillNameData.FIREBREAK, 20),
                personaSkill(SkillNameData.MAKAJAMAON, 21)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.WINDBREAKER),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MARAGI && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOLYWATER, 1, 4),
                drop(skillCardList, 'Maragi Ally', 5, 9),
                drop(armorList, ItemNameData.RINGMAIL, 10, 12),
                drop(armorList, ItemNameData.WINDBREAKER, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.SPICYBREAD, 17, 18),
                drop(consumableList, ItemNameData.HOLYWATER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SUDAMA,
            Arcana.Hermit,
            17,
            [0, 0, 22.5, 35, 30, 32.5, 25],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.SHARPSTUDENT, 0),
                personaSkill(SkillNameData.LUCKYPUNCH, 0),
                personaSkill(SkillNameData.MAGARU, 0),
                personaSkill(SkillNameData.AMBIENTAID, 20),
                personaSkill(SkillNameData.WINDWALL, 21),
                personaSkill(SkillNameData.APTPUPIL, 22),
                personaSkill(SkillNameData.GARULA, 23)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.WINDSREQUIEM),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.JADERING),
                skillCardList.find(s => s.skillName === SkillNameData.MAGARU && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEVILFRUIT, 1, 3),
                drop(lootList, ItemNameData.BLACKROBE, 4, 6),
                drop(accessoryList, ItemNameData.JADERING, 7, 9),
                drop(weaponList, ItemNameData.PPSH41, 10, 12),
                drop(weaponList, ItemNameData.WINDSREQUIEM, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(lootList, ItemNameData.BLACKROBE, 17, 18),
                drop(accessoryList, ItemNameData.JADERING, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LEANANSIDHE,
            Arcana.Lovers,
            19,
            [0, 0, 22.5, 42.5, 30, 40, 25],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.PSIO, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.MARINKARIN, 20),
                personaSkill(SkillNameData.MAMUDO, 21),
                personaSkill(SkillNameData.MAPSI, 22),
                personaSkill(SkillNameData.EIGA, 23)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BEWITCHINGIRON),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CIRCULARBAND),
                skillCardList.find(s => s.skillName === SkillNameData.MAPSI && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Psi Main', 1, 8),
                drop(accessoryList, ItemNameData.CIRCULARBAND, 9, 11),
                drop(skillCardList, 'Psio Ally', 12, 12),
                drop(weaponList, ItemNameData.BEWITCHINGIRON, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.RANCIDSOUL, 17, 19),
                drop(accessoryList, ItemNameData.CIRCULARBAND, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MATADOR,
            Arcana.Death,
            19,
            [0, 0, 30, 32.5, 30, 40, 27.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.NULLDIZZY, 0),
                personaSkill(SkillNameData.PSI, 0),
                personaSkill(SkillNameData.SUKUKAJA, 0),
                personaSkill(SkillNameData.RAMPAGE, 20), // Intentionally Changed
                personaSkill(SkillNameData.TRIGGERHAPPY, 22),
                personaSkill(SkillNameData.GARULA, 23)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ESPADA),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SUKUKAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 7),
                drop(lootList, ItemNameData.BLACKKOGATANA, 8, 11),
                drop(skillCardList, 'Sukukaja Main', 12, 12),
                drop(weaponList, ItemNameData.ESPADA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 17, 18),
                drop(lootList, ItemNameData.BLACKKOGATANA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ONI,
            Arcana.Strength,
            19,
            [0, 0, 42.5, 20, 40, 32.5, 25],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.COUNTER, 0),
                personaSkill(SkillNameData.SNAP, 0),
                personaSkill(SkillNameData.RAMPAGE, 0),
                personaSkill(SkillNameData.GIANTSLICE, 21),
                personaSkill(SkillNameData.SHARPSTUDENT, 22),
                personaSkill(SkillNameData.MEMORYBLOW, 23)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ONIPOUND),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.GIANTSLICE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 9),
                drop(weaponList, ItemNameData.HEAVYGRIP, 10, 12),
                drop(weaponList, ItemNameData.ONIPOUND, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 18),
                drop(accessoryList, ItemNameData.POWERANKLET, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SUZAKU,
            Arcana.Sun,
            19,
            [0, 0, 27.5, 35, 25, 45, 27.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.FREI, 0),
                personaSkill(SkillNameData.MARINKARIN, 0),
                personaSkill(SkillNameData.TARUNDA, 0),
                personaSkill(SkillNameData.OMINOUSWORDS, 21),
                personaSkill(SkillNameData.MAFREI, 22),
                personaSkill(SkillNameData.SPEEDMASTER, 23),
                personaSkill(SkillNameData.MATARUNDA, 24)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.VERMILLIONRIFLE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAFREI && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(lootList, ItemNameData.BLACKROCK, 1, 4),
                drop(skillCardList, 'Frei Ally', 5, 9),
                drop(skillCardList, 'Mafrei Main', 10, 12),
                drop(weaponList, ItemNameData.VERMILLIONRIFLE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(lootList, ItemNameData.BLACKROCK, 17, 19),
                drop(weaponList, ItemNameData.M40, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.IZANAGI,
            Arcana.Fool,
            20,
            [0, 0, 35, 32.5, 32.5, 35, 32.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.ASSAULTDIVE, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.MAZIO, 0),
                personaSkill(SkillNameData.VICIOUSSTRIKE, 21),
                personaSkill(SkillNameData.DODGEPHYS, 22),
                personaSkill(SkillNameData.ZIONGA, 24),
                personaSkill(SkillNameData.GROWTH2, 25)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CITRINERING),
                skillCardList.find(s => s.skillName === SkillNameData.MAZIO && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Giant Slice Ally', 1, 4), // Intentionally Weird
                drop(lootList, ItemNameData.BLACKCARD, 5, 7),
                drop(accessoryList, ItemNameData.YELLOWBAND, 8, 10),
                drop(accessoryList, ItemNameData.CITRINERING, 11, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 18),
                drop(accessoryList, ItemNameData.YELLOWBAND, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NIGIMITAMA,
            Arcana.Temperance,
            20,
            [0, 0, 30, 35, 35, 37.5, 30],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.BAISUDI, 0),
                personaSkill(SkillNameData.MAKOUHA, 0),
                personaSkill(SkillNameData.MEDIA, 0),
                personaSkill(SkillNameData.DIVINEGRACE, 22),
                personaSkill(SkillNameData.MEPATRA, 23),
                personaSkill(SkillNameData.CLIMATEDECORUM, 24)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAKOUHA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(lootList, ItemNameData.BLACKROBE, 5, 9),
                drop(skillCardList, 'Makouha Ally', 10, 12),
                drop(skillCardList, 'Makouha Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(lootList, ItemNameData.BLACKROBE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NUE,
            Arcana.Moon,
            20,
            [0, 0, 40, 25, 42.5, 35, 25],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.MAEIHA, 0),
                personaSkill(SkillNameData.SKULLCRACKER, 0),
                personaSkill(SkillNameData.MUDO, 21),
                personaSkill(SkillNameData.PULINPA, 22),
                personaSkill(SkillNameData.MAMUDO, 24),
                personaSkill(SkillNameData.ASSAULTDIVE, 25),
                personaSkill(SkillNameData.CURSEBOOST, 26)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CHIMERASLING),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BLACKBAND),
                skillCardList.find(s => s.skillName === SkillNameData.MUDO && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 6),
                drop(accessoryList, ItemNameData.BLACKBAND, 7, 9),
                drop(skillCardList, 'Mudo Ally', 10, 11),
                drop(skillCardList, 'Mudo Main', 12, 12),
                drop(weaponList, ItemNameData.CHIMERASLING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.STRAWDOLL, 17, 19),
                drop(accessoryList, ItemNameData.BLACKBAND, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.YAKSINI,
            Arcana.Empress,
            20,
            [0, 0, 35, 27.5, 32.5, 40, 32.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.COUNTER, 0),
                personaSkill(SkillNameData.HYSTERICALSLAP, 0),
                personaSkill(SkillNameData.WAGEWAR, 0),
                personaSkill(SkillNameData.ONIKAGURA, 22),
                personaSkill(SkillNameData.ATTACKMASTER, 23),
                personaSkill(SkillNameData.VICIOUSSTRIKE, 24)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.TEMPTRESSBLADE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.HYSTERICALSLAP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.ODDMORSEL, 1, 4),
                drop(weaponList, ItemNameData.KAMA, 5, 9),
                drop(skillCardList, 'Hysterical Slap Ally', 10, 11),
                drop(weaponList, ItemNameData.TEMPTRESSBLADE, 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ORTHRUS,
            Arcana.Hanged,
            21,
            [0, 0, 40, 35, 35, 47.5, 17.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.DODGEICE, 0),
                personaSkill(SkillNameData.DOUBLEFANGS, 0),
                personaSkill(SkillNameData.BURNBOOST, 22),
                personaSkill(SkillNameData.CORNEREDFANG, 24),
                personaSkill(SkillNameData.MATARUKAJA, 26)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.THIEFMASK),
                skillCardList.find(s => s.skillName === SkillNameData.AGILAO && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(accessoryList, ItemNameData.RUBYRING, 1, 6),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 7, 7),
                drop(accessoryList, ItemNameData.THIEFMASK, 8, 12),
                drop(skillCardList, 'Agilao Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(accessoryList, ItemNameData.RUBYRING, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SHIKIOUJI,
            Arcana.Chariot,
            21,
            [0, 0, 27.5, 37.5, 40, 40, 32.5],
            [ElemResist.Null, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.SNAP, 0),
                personaSkill(SkillNameData.TAUNT, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.MAPSI, 22),
                personaSkill(SkillNameData.DEKAJA, 24),
                personaSkill(SkillNameData.PSIO, 26),
                personaSkill(SkillNameData.ONIKAGURA, 27)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PAPERCANNON),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SNAP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SPICYBREAD, 1, 4),
                drop(consumableList, ItemNameData.HOLYWATER, 5, 9),
                drop(weaponList, ItemNameData.KONGSBERGM1914, 10, 12),
                drop(weaponList, ItemNameData.PAPERCANNON, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(lootList, ItemNameData.BLACKROCK, 17, 18),
                drop(consumableList, ItemNameData.HOLYWATER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PHOENIX,
            Arcana.Hierophant,
            22,
            [0, 0, 35, 37.5, 37.5, 45, 27.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DREAMNEEDLE, 0),
                personaSkill(SkillNameData.FREILA, 0),
                personaSkill(SkillNameData.DIARAMA, 23),
                personaSkill(SkillNameData.RECARM, 25),
                personaSkill(SkillNameData.NUKEBOOST, 27)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ZODIACCHARM),
                skillCardList.find(s => s.skillName === SkillNameData.RECARM && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 7),
                drop(accessoryList, ItemNameData.ZODIACCHARM, 8, 10),
                drop(skillCardList, 'Recarm Ally', 11, 12),
                drop(skillCardList, 'Recarm Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FUUKI,
            Arcana.Star,
            23,
            [0, 0, 35, 42.5, 40, 37.5, 35],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GARULA, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.TETRABREAK, 0),
                personaSkill(SkillNameData.WINDBOOST, 25),
                personaSkill(SkillNameData.DODGEWIND, 26),
                personaSkill(SkillNameData.RESISTPSY, 27)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.GREENBAND),
                skillCardList.find(s => s.skillName === SkillNameData.GARULA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.TETRAHAMMER, 1, 4),
                drop(skillCardList, 'Magaru Main', 5, 9),
                drop(accessoryList, ItemNameData.GREENBAND, 10, 12),
                drop(skillCardList, 'Garula Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.TETRAHAMMER, 17, 19),
                drop(accessoryList, ItemNameData.GREENBAND, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NAGA,
            Arcana.Hermit,
            24,
            [0, 0, 37.5, 42.5, 37.5, 42.5, 27.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MEMORYBLOW, 0),
                personaSkill(SkillNameData.DOUBLEFANGS, 0),
                personaSkill(SkillNameData.ZIONGA, 0),
                personaSkill(SkillNameData.ELECBOOST, 26),
                personaSkill(SkillNameData.DAZZLER, 27),
                personaSkill(SkillNameData.MAZIONGA, 28),
                personaSkill(SkillNameData.MARAKUKAJA, 29)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.YELLOWBAND),
                skillCardList.find(s => s.skillName === SkillNameData.ZIONGA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEMONDRINK, 1, 4),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 5, 9),
                drop(accessoryList, ItemNameData.YELLOWBAND, 10, 12),
                drop(skillCardList, 'Zionga Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 18),
                drop(accessoryList, ItemNameData.YELLOWBAND, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.RAKSHASA,
            Arcana.Strength,
            24,
            [0, 0, 50, 37.5, 45, 42.5, 22.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
            [
                personaSkill(SkillNameData.GIANTSLICE, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.WINDWALL, 0),
                personaSkill(SkillNameData.REGENERATE1, 26),
                personaSkill(SkillNameData.MINDSLICE, 27),
                personaSkill(SkillNameData.COUNTERSTRIKE, 28),
                personaSkill(SkillNameData.ADVERSERESOLVE, 30)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.RESILIENTBELT),
                skillCardList.find(s => s.skillName === SkillNameData.ADVERSERESOLVE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEMONDRINK, 1, 4),
                drop(accessoryList, ItemNameData.RESILIENTBELT, 5, 9),
                drop(skillCardList, 'Tarukaja Main', 10, 12),
                drop(skillCardList, 'Adverse Resolve Ally', 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 18),
                drop(skillCardList, 'Tarukaja Ally', 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SANDMAN,
            Arcana.Magician,
            24,
            [0, 0, 27.5, 32.5, 35, 50, 52.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DORMINA, 0),
                personaSkill(SkillNameData.GARULA, 0),
                personaSkill(SkillNameData.DORMINRUSH, 25),
                personaSkill(SkillNameData.SUKUNDA, 26),
                personaSkill(SkillNameData.NULLSLEEP, 27),
                personaSkill(SkillNameData.MAGARULA, 28),
                personaSkill(SkillNameData.SLEEPBOOST, 29)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ALARMCLOCK),
                skillCardList.find(s => s.skillName === SkillNameData.DORMINA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONESOUL, 1, 4),
                drop(consumableList, ItemNameData.SNUFFSOUL, 5, 9),
                drop(accessoryList, ItemNameData.ALARMCLOCK, 10, 12),
                drop(skillCardList, 'Dormina Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.STONESOUL, 17, 19),
                drop(accessoryList, ItemNameData.ALARMCLOCK, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SUIKI,
            Arcana.Moon,
            24,
            [0, 0, 40, 37.5, 37.5, 45, 37.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFULA, 0),
                personaSkill(SkillNameData.HEADBUTT, 0),
                personaSkill(SkillNameData.MABUFU, 0),
                personaSkill(SkillNameData.NULLNUKE, 26),
                personaSkill(SkillNameData.WAGEWAR, 27),
                personaSkill(SkillNameData.DODGEFIRE, 28),
                personaSkill(SkillNameData.MABUFULA, 29)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FIREMASK),
                skillCardList.find(s => s.skillName === SkillNameData.BUFULA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Mabufu Main', 5, 9),
                drop(accessoryList, ItemNameData.FIREMASK, 10, 12),
                drop(skillCardList, 'Bufula Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(accessoryList, ItemNameData.FIREMASK, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANZU,
            Arcana.Hierophant,
            25,
            [0, 0, 35, 45, 37.5, 52.5, 35],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GARULA, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.WINDBREAK, 0),
                personaSkill(SkillNameData.ASSAULTDIVE, 27),
                personaSkill(SkillNameData.DEKAJA, 28),
                personaSkill(SkillNameData.NULLFORGET, 29)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.WINDMASK),
                skillCardList.find(s => s.skillName === SkillNameData.GARULA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(consumableList, ItemNameData.RANCIDSOUL, 5, 7),
                drop(accessoryList, ItemNameData.WINDMASK, 8, 11),
                drop(skillCardList, 'Garula Main', 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 17, 18),
                drop(consumableList, ItemNameData.RANCIDSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FLAUROS,
            Arcana.Devil,
            25,
            [0, 0, 47.5, 35, 45, 45, 32.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DEKAJA, 0),
                personaSkill(SkillNameData.DORMINRUSH, 0),
                personaSkill(SkillNameData.GIANTSLICE, 0),
                personaSkill(SkillNameData.DODGEPHYS, 28),
                personaSkill(SkillNameData.ASSAULTDIVE, 29),
                personaSkill(SkillNameData.HEATUP, 30)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SHACKLES),
                emptyItem
            ], // transmu
            [
                emptyDrop
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.SNUFFSOUL, 17, 19),
                drop(lootList, ItemNameData.BLACKKOGATANA, 20, 20)
            ], // drops
            true,
            false,
            false,
            false,
            'Does not appear in any negotiable encounters'
        ),
        new Persona(
            PersonaeNameData.JIKOKUTEN,
            Arcana.Temperance,
            25,
            [0, 0, 47.5, 30, 47.5, 42.5, 37.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak],
            [
                personaSkill(SkillNameData.MEMORYBLOW, 0),
                personaSkill(SkillNameData.DEFENSEMASTER, 0),
                personaSkill(SkillNameData.RAKUNDA, 0),
                personaSkill(SkillNameData.DEKUNDA, 27),
                personaSkill(SkillNameData.COUNTER, 28),
                personaSkill(SkillNameData.MATARUKAJA, 30),
                personaSkill(SkillNameData.ADVERSERESOLVE, 31)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BOLDEYEPATCH),
                skillCardList.find(s => s.skillName === SkillNameData.MEMORYBLOW && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(skillCardList, 'Memory Blow Ally', 5, 9),
                drop(skillCardList, 'Memory Blow Main', 10, 10),
                drop(accessoryList, ItemNameData.BOLDEYEPATCH, 11, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KINKI,
            Arcana.Chariot,
            25,
            [0, 0, 52.5, 32.5, 52.5, 37.5, 30],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.VAJRABLAST, 0),
                personaSkill(SkillNameData.RAKUKAJA, 0),
                personaSkill(SkillNameData.REGENERATE1, 0),
                personaSkill(SkillNameData.DODGEPSY, 27),
                personaSkill(SkillNameData.SLEDGEHAMMER, 28),
                personaSkill(SkillNameData.BADBEAT, 30),
                personaSkill(SkillNameData.COUNTERSTRIKE, 31)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.GOLDENARMOR),
                accessoryList.find(a => a.name === ItemNameData.STRENGTHANKLET),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 5),
                drop(accessoryList, ItemNameData.STRENGTHANKLET, 6, 9),
                drop(armorList, ItemNameData.GOLDENARMOR, 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CLOTHO,
            Arcana.Fortune,
            26,
            [0, 0, 35, 47.5, 42.5, 50, 37.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAHAMA, 0),
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.MEPATRA, 0),
                personaSkill(SkillNameData.TETRAJA, 27),
                personaSkill(SkillNameData.MAKAJAMAON, 29),
                personaSkill(SkillNameData.ENERGYSHOWER, 30),
                personaSkill(SkillNameData.INVIGORATE1, 32)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.STAMINASASH),
                skillCardList.find(s => s.skillName === SkillNameData.TETRAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Patra Ally', 1, 6),
                drop(consumableList, ItemNameData.HOMUNCULUS, 1, 6),
                drop(accessoryList, ItemNameData.STAMINASASH, 7, 9),
                drop(skillCardList, 'Tetraja Ally', 10, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(lootList, ItemNameData.BLACKCARD, 17, 19),
                drop(accessoryList, ItemNameData.STAMINASASH, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ISIS,
            Arcana.Priestess,
            26,
            [0, 0, 37.5, 52.5, 40, 45, 37.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.SUKUKAJA, 0),
                personaSkill(SkillNameData.RESISTFORGET, 27),
                personaSkill(SkillNameData.ZIONGA, 29),
                personaSkill(SkillNameData.GARULA, 30),
                personaSkill(SkillNameData.MAKARAKARN, 32)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAKARAKARN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.MAKARAHAMMER, 1, 4),
                drop(consumableList, ItemNameData.REVIVALBEAD, 5, 9),
                drop(skillCardList, 'Makarakarn Ally', 10, 12),
                drop(skillCardList, 'Makarakarn Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.MAKARAHAMMER, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LAMIA,
            Arcana.Empress,
            26,
            [0, 0, 52.5, 37.5, 45, 47.5, 30],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.ASSAULTDIVE, 0), // Changed Intentionally
                personaSkill(SkillNameData.RAKUKAJA, 0),
                personaSkill(SkillNameData.OMINOUSWORDS, 27),
                personaSkill(SkillNameData.FOULBREATH, 28),
                personaSkill(SkillNameData.MARAGION, 30),
                personaSkill(SkillNameData.DESPAIRBOOST, 31)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.THERMOS),
                skillCardList.find(s => s.skillName === SkillNameData.OMINOUSWORDS && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULDROP, 1, 4),
                drop(consumableList, ItemNameData.ODDMORSEL, 5, 9),
                drop(accessoryList, ItemNameData.THERMOS, 10, 12),
                drop(skillCardList, 'Ominous Words Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 18),
                drop(consumableList, ItemNameData.ODDMORSEL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ORPHEUS,
            Arcana.Fool,
            26,
            [0, 0, 42.5, 42.5, 42.5, 42.5, 42.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.CADENZA, 0),
                personaSkill(SkillNameData.TARUNDA, 0),
                personaSkill(SkillNameData.ENDURE, 27),
                personaSkill(SkillNameData.MARAGION, 29),
                personaSkill(SkillNameData.MARAKUKAJA, 30),
                personaSkill(SkillNameData.FIREBOOST, 32)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HADESHARP),
                skillCardList.find(s => s.skillName === SkillNameData.CADENZA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULDROP, 1, 4),
                drop(consumableList, ItemNameData.REVIVALBEAD, 5, 9),
                drop(consumableList, ItemNameData.BALMOFLIFE, 10, 12),
                drop(skillCardList, 'Cadenza Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 18),
                drop(consumableList, ItemNameData.LIFESTONE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CHORONZON,
            Arcana.Magician,
            28,
            [0, 0, 40, 47.5, 47.5, 45, 47.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.LIFEDRAIN, 0),
                personaSkill(SkillNameData.PULINPA, 0),
                personaSkill(SkillNameData.RAMPAGE, 0),
                personaSkill(SkillNameData.MAEIHA, 29),
                personaSkill(SkillNameData.DODGEELEC, 30),
                personaSkill(SkillNameData.EIGA, 31),
                personaSkill(SkillNameData.CURSEBOOST, 32),
                personaSkill(SkillNameData.CLIMATEDECORUM, 33)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ELECMASK),
                skillCardList.find(s => s.skillName === SkillNameData.LIFEDRAIN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULDROP, 1, 4),
                drop(consumableList, ItemNameData.STONESOUL, 5, 9),
                drop(accessoryList, ItemNameData.ELECMASK, 10, 12),
                drop(skillCardList, 'Life Drain Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 18),
                drop(accessoryList, ItemNameData.ELECMASK, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SETANTA,
            Arcana.Emperor,
            28,
            [0, 0, 50, 42.5, 47.5, 45, 42.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.COUNTER, 0),
                personaSkill(SkillNameData.DORMINRUSH, 0),
                personaSkill(SkillNameData.GIANTSLICE, 0),
                personaSkill(SkillNameData.RISINGSLASH, 31),
                personaSkill(SkillNameData.REBELLION, 32),
                personaSkill(SkillNameData.CHARGE, 34)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HOUNDOFCULAINN),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.COUNTER && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEMONDRINK, 1, 4),
                drop(skillCardList, 'Counter Main', 5, 9),
                drop(weaponList, ItemNameData.BARDICHE, 10, 12),
                drop(weaponList, ItemNameData.HOUNDOFCULAINN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 19),
                drop(weaponList, ItemNameData.BARDICHE, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.AMENOUZUME,
            Arcana.Lovers,
            29,
            [0, 0, 37.5, 55, 47.5, 50, 45],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFULA, 0),
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.MAZIO, 0),
                personaSkill(SkillNameData.TENTARAFOO, 31),
                personaSkill(SkillNameData.DIVINEGRACE, 32),
                personaSkill(SkillNameData.SHOCKBOOST, 34)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DAWNBLADE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DIVINEGRACE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BITTERSOUL, 1, 4),
                drop(weaponList, ItemNameData.SABRE, 5, 9),
                drop(skillCardList, 'Divine Grace Ally', 10, 12),
                drop(weaponList, ItemNameData.DAWNBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 19),
                drop(weaponList, ItemNameData.SABRE, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BLACKOOZE,
            Arcana.Moon,
            29,
            [0, 0, 47.5, 45, 50, 40, 52.5],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.MATARUNDA, 0),
                personaSkill(SkillNameData.STAGNANTAIR, 0),
                personaSkill(SkillNameData.AMBIENTAID, 31),
                personaSkill(SkillNameData.HEADBUTT, 32),
                personaSkill(SkillNameData.BRAINJACK, 34),
                personaSkill(SkillNameData.FLASHBOMB, 35)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SPIRITBELT),
                skillCardList.find(s => s.skillName === SkillNameData.EVILTOUCH && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.STONEBREAD, 5, 9),
                drop(accessoryList, ItemNameData.SPIRITBELT, 10, 12),
                drop(skillCardList, 'Evil Touch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.STONEBREAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PISACA,
            Arcana.Death,
            29,
            [0, 0, 47.5, 52.5, 52.5, 42.5, 40],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.BRAINSHAKE, 0), // Intentionally Changed
                personaSkill(SkillNameData.RAMPAGE, 0),
                personaSkill(SkillNameData.STAGNANTAIR, 0),
                personaSkill(SkillNameData.MAMUDO, 30),
                personaSkill(SkillNameData.ABYSMALSURGE, 32),
                personaSkill(SkillNameData.DESPAIRBOOST, 33),
                personaSkill(SkillNameData.MUDOON, 34)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DEMONMAW),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.JETRING),
                skillCardList.find(s => s.skillName === SkillNameData.MAMUDO && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(accessoryList, ItemNameData.JETRING, 5, 9),
                drop(skillCardList, 'Mamudo Ally', 10, 11),
                drop(skillCardList, 'Mamudo Main', 12, 12),
                drop(weaponList, ItemNameData.DEMONMAW, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 18),
                drop(consumableList, ItemNameData.STRAWDOLL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PRINCIPALITY,
            Arcana.Justice,
            29,
            [0, 0, 42.5, 47.5, 45, 52.5, 47.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.MAKAJAMAON, 0),
                personaSkill(SkillNameData.MAKOUGA, 0),
                personaSkill(SkillNameData.TETRAJA, 0),
                personaSkill(SkillNameData.MEDIARAMA, 31),
                personaSkill(SkillNameData.MABAISUDI, 32),
                personaSkill(SkillNameData.BLESSBOOST, 34)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SCEPTERFIST),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.WHITEBAND),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULDROP, 1, 4),
                drop(accessoryList, ItemNameData.WHITEBAND, 5, 9),
                drop(weaponList, ItemNameData.GAUNTLETS, 10, 12),
                drop(weaponList, ItemNameData.SCEPTERFIST, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 18),
                drop(consumableList, ItemNameData.RANCIDSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.TAKEMINAKATA,
            Arcana.Hanged,
            29,
            [0, 0, 50, 55, 52.5, 45, 32.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.ASSAULTDIVE, 0),
                personaSkill(SkillNameData.ELECBREAK, 0),
                personaSkill(SkillNameData.ZIONGA, 0),
                personaSkill(SkillNameData.MAZIONGA, 30),
                personaSkill(SkillNameData.DEFENSEMASTER, 32),
                personaSkill(SkillNameData.ELECBOOST, 34)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SHOCKBAND),
                skillCardList.find(s => s.skillName === SkillNameData.ELECBREAK && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Elec Break Ally', 5, 9),
                drop(accessoryList, ItemNameData.RUBBERGLOVES, 10, 12),
                drop(skillCardList, 'Elec Break Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(accessoryList, ItemNameData.RUBBERGLOVES, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARIADNE,
            Arcana.Fortune,
            30,
            [0, 0, 57.5, 47.5, 50, 42.5, 45],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.APTPUPIL, 0),
                personaSkill(SkillNameData.MIRACLEPUNCH, 0),
                personaSkill(SkillNameData.ASSAULTDIVE, 0), // Intentionally Changed
                personaSkill(SkillNameData.ATTACKMASTER, 31),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 32),
                personaSkill(SkillNameData.EVADEPHYS, 34),
                personaSkill(SkillNameData.CHARGE, 36)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.REDYARNBALL),
                skillCardList.find(s => s.skillName === SkillNameData.MIRACLEPUNCH && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.ODDMORSEL, 1, 4),
                drop(consumableList, ItemNameData.STONESOUL, 5, 9),
                drop(skillCardList, 'Miracle Punch Ally', 10, 12),
                drop(skillCardList, 'Miracle Punch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 18),
                drop(consumableList, ItemNameData.STONESOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NEKOSHOGUN,
            Arcana.Star,
            30,
            [0, 0, 47.5, 50, 47.5, 52.5, 45],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Resist],
            [
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.PSIO, 0),
                personaSkill(SkillNameData.INVIGORATE1, 31),
                personaSkill(SkillNameData.CORNEREDFANG, 33),
                personaSkill(SkillNameData.DEFENSEMASTER, 34),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 36)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CATNAP),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CAMEOBELT),
                skillCardList.find(s => s.skillName === SkillNameData.INVIGORATE1 && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                emptyDrop
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 19),
                drop(weaponList, ItemNameData.UPSILON, 20, 20)
            ], // drops
            true,
            false,
            false,
            false,
            'Does not appear in any negotiable encounters'
        ),
        new Persona(
            PersonaeNameData.ARAMITAMA,
            Arcana.Chariot,
            31,
            [0, 0, 50, 47.5, 50, 50, 52.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.FREILA, 0),
                personaSkill(SkillNameData.MIRACLEPUNCH, 0),
                personaSkill(SkillNameData.TAUNT, 0),
                personaSkill(SkillNameData.REBELLION, 32),
                personaSkill(SkillNameData.MARAKUNDA, 33),
                personaSkill(SkillNameData.RAGEBOOST, 35)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.RAGINGSTORM),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.FREILA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 6),
                drop(skillCardList, 'Freila Ally', 7, 11),
                drop(skillCardList, 'Freila Main', 12, 12),
                drop(weaponList, ItemNameData.RAGINGSTORM, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(weaponList, ItemNameData.TEC9, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ZOUCHOUTEN,
            Arcana.Strength,
            31,
            [0, 0, 55, 47.5, 60, 45, 42.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GIANTSLICE, 0),
                personaSkill(SkillNameData.ZIONGA, 0),
                personaSkill(SkillNameData.SLEDGEHAMMER, 32), // Intentionally Changed
                personaSkill(SkillNameData.SHARPSTUDENT, 33),
                personaSkill(SkillNameData.RESISTFEAR, 34),
                personaSkill(SkillNameData.SWIFTSTRIKE, 35),
                personaSkill(SkillNameData.ATTACKMASTER, 36)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.BRIGANDINE),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SLEDGEHAMMER && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(armorList, ItemNameData.SURVIVALVEST, 1, 8),
                drop(armorList, ItemNameData.BRIGANDINE, 9, 11),
                drop(skillCardList, 'Sledgehammer Ally', 12, 12),
                drop(skillCardList, 'Sledgehammer Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(armorList, ItemNameData.HEAVYCOAT, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.DECARABIA,
            Arcana.Fool,
            32,
            [0, 0, 52.5, 57.5, 47.5, 55, 45],
            [ElemResist.Weak, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.OMINOUSWORDS, 0),
                personaSkill(SkillNameData.MARAGION, 33),
                personaSkill(SkillNameData.FIREBOOST, 35),
                personaSkill(SkillNameData.NULLFIRE, 36),
                personaSkill(SkillNameData.EVILSMILE, 37),
                personaSkill(SkillNameData.TETRAKARN, 38)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HELLBARAGE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.REDBAND),
                skillCardList.find(s => s.skillName === SkillNameData.MARAGION && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Agilao Ally', 1, 8),
                drop(skillCardList, 'Maragion Ally', 9, 11),
                drop(skillCardList, 'Maragion Main', 12, 12),
                drop(weaponList, ItemNameData.HELLBARAGE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(accessoryList, ItemNameData.WOODCLAPPERS, 17, 18),
                drop(accessoryList, ItemNameData.REDBAND, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'Uncommon Drop enemy'
        ),
        new Persona(
            PersonaeNameData.JATAYU,
            Arcana.Tower,
            32,
            [0, 0, 45, 52.5, 50, 67.5, 42.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GARULA, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.DODGEPSY, 0), // Swapped with Flashbomb
                personaSkill(SkillNameData.FLASHBOMB, 33),
                personaSkill(SkillNameData.SNIPE, 35),
                personaSkill(SkillNameData.CLIMATEDECORUM, 36),
                personaSkill(SkillNameData.SPEEDMASTER, 38)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SAMSARA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.PSYCHICMASK),
                skillCardList.find(s => s.skillName === SkillNameData.MASUKUKAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 4),
                drop(consumableList, ItemNameData.IDATENOFUDA, 5, 7),
                drop(skillCardList, 'Masukukaja Ally', 8, 9),
                drop(accessoryList, ItemNameData.PSYCHICMASK, 10, 12),
                drop(weaponList, ItemNameData.SAMSARA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 16, 18),
                drop(skillCardList, 'Sukukaja Ally', 19, 19),
                drop(weaponList, ItemNameData.HUNTINGCROSSBOW, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LILIM,
            Arcana.Devil,
            32,
            [0, 0, 42.5, 57.5, 45, 62.5, 50],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.BUFULA, 0),
                personaSkill(SkillNameData.EVILSMILE, 0),
                personaSkill(SkillNameData.MASUKUNDA, 0),
                personaSkill(SkillNameData.FREEZEBOOST, 34),
                personaSkill(SkillNameData.DODGEBLESS, 35),
                personaSkill(SkillNameData.SPIRITDRAIN, 36),
                personaSkill(SkillNameData.MABUFULA, 37)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BEGUILINGNIGHT),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HAMAYAMASK),
                skillCardList.find(s => s.skillName === SkillNameData.MABUFULA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BITTERSOUL, 1, 4),
                drop(skillCardList, 'Bufula Main', 5, 9),
                drop(accessoryList, ItemNameData.HAMAYAMASK, 10, 12),
                drop(weaponList, ItemNameData.BEGUILINGNIGHT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.SOULDROP, 17, 19),
                drop(accessoryList, ItemNameData.HAMAYAMASK, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MITHRA,
            Arcana.Temperance,
            33,
            [0, 0, 47.5, 65, 47.5, 60, 45],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.KOUGA, 0),
                personaSkill(SkillNameData.MAHAMA, 0),
                personaSkill(SkillNameData.MAKOUGA, 34),
                personaSkill(SkillNameData.DEKUNDA, 35),
                personaSkill(SkillNameData.BLESSBOOST, 36),
                personaSkill(SkillNameData.THERMOPYLAE, 38)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.RULEBREAKER),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.PEARLRING),
                skillCardList.find(s => s.skillName === SkillNameData.KOUGA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 1, 3),
                drop(consumableList, ItemNameData.SOURYOGURT, 4, 7),
                drop(accessoryList, ItemNameData.PEARLRING, 8, 9),
                drop(skillCardList, 'Kouga Ally', 10, 11),
                drop(skillCardList, 'Kouga Main', 12, 12),
                drop(weaponList, ItemNameData.RULEBREAKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 17, 19),
                drop(weaponList, ItemNameData.MAGEMASHER, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MOTHMAN,
            Arcana.Moon,
            33,
            [0, 0, 52.5, 60, 40, 60, 52.5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAZIONGA, 0),
                personaSkill(SkillNameData.SHOCKBOOST, 0),
                personaSkill(SkillNameData.HEADBUTT, 0), // Intentionally Changed
                personaSkill(SkillNameData.TENTARAFOO, 35),
                personaSkill(SkillNameData.AMBIENTAID, 36),
                personaSkill(SkillNameData.MAKAJAMAON, 37)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BEASTANTENNA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SPINELRING),
                skillCardList.find(s => s.skillName === SkillNameData.MAZIONGA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 5, 6),
                drop(accessoryList, ItemNameData.SPINELRING, 7, 10),
                drop(skillCardList, 'Mazionga Ally', 11, 11),
                drop(skillCardList, 'Mazionga Main', 12, 12),
                drop(weaponList, ItemNameData.BEASTANTENNA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 17, 19),
                drop(weaponList, ItemNameData.SKINRIPPER, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LACHESIS,
            Arcana.Fortune,
            34,
            [0, 0, 45, 62.5, 55, 62.5, 47.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFULA, 0),
                personaSkill(SkillNameData.GROWTH2, 0),
                personaSkill(SkillNameData.MABAISUDI, 0),
                personaSkill(SkillNameData.MARAKUKAJA, 35),
                personaSkill(SkillNameData.ELECWALL, 36),
                personaSkill(SkillNameData.MABUFULA, 38),
                personaSkill(SkillNameData.ICEBOOST, 40)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MEASURINGBLADE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BLUEBAND),
                skillCardList.find(s => s.skillName === SkillNameData.MABUFULA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.KONGOUOFUDA, 1, 6),
                drop(skillCardList, 'Mabufula Main', 7, 9),
                drop(accessoryList, ItemNameData.BLUEBAND, 10, 12),
                drop(weaponList, ItemNameData.MEASURINGBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 17, 19),
                drop(accessoryList, ItemNameData.BLUEBAND, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARAHABAKI,
            Arcana.Hermit,
            35,
            [0, 0, 52.5, 57.5, 55, 60, 55],
            [ElemResist.Repel, ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Weak, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.ABYSMALSURGE, 0),
                personaSkill(SkillNameData.MAKARAKARN, 0),
                personaSkill(SkillNameData.NULLBRAINWASH, 0),
                personaSkill(SkillNameData.SPIRITDRAIN, 37),
                personaSkill(SkillNameData.MAEIGA, 38),
                personaSkill(SkillNameData.DEFENSEMASTER, 39)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PENETRATOR),
                armorList.find(a => a.name === ItemNameData.DEMONMAIL),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SPIRITDRAIN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONESOUL, 1, 4),
                drop(consumableList, ItemNameData.MAGICALOINTMENT, 5, 9),
                drop(armorList, ItemNameData.DEMONMAIL, 10, 11),
                drop(skillCardList, 'Spirit Drain Ally', 12, 12),
                drop(weaponList, ItemNameData.PENETRATOR, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.STONESOUL, 17, 18),
                drop(weaponList, ItemNameData.BARRETTM82, 19, 19),
                drop(armorList, ItemNameData.DEMONMAIL, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KAIWAN,
            Arcana.Star,
            36,
            [0, 0, 57.5, 65, 60, 55, 50],
            [ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.PSIO, 0),
                personaSkill(SkillNameData.FORGETBOOST, 37),
                personaSkill(SkillNameData.SPEEDMASTER, 38),
                personaSkill(SkillNameData.MAKAJAMAON, 39),
                personaSkill(SkillNameData.MAPSIO, 40),
                personaSkill(SkillNameData.MARAKUNDA, 41)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.YELLOWKING),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.TURQUOISERING),
                skillCardList.find(s => s.skillName === SkillNameData.MAPSIO && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 4),
                drop(accessoryList, ItemNameData.TURQUOISERING, 5, 9),
                drop(skillCardList, 'Mapsio Ally', 11, 11),
                drop(skillCardList, 'Mapsio Main', 12, 12),
                drop(weaponList, ItemNameData.YELLOWKING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 19),
                drop(accessoryList, ItemNameData.TURQUOISERING, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.THOTH,
            Arcana.Emperor,
            36,
            [0, 0, 52.5, 70, 52.5, 60, 52.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.FREILA, 0),
                personaSkill(SkillNameData.MASUKUNDA, 0),
                personaSkill(SkillNameData.TAUNT, 0),
                personaSkill(SkillNameData.MEGIDO, 37),
                personaSkill(SkillNameData.PSYWALL, 39),
                personaSkill(SkillNameData.MAFREILA, 40),
                personaSkill(SkillNameData.GROWTH2, 42)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.DIAMONDSHIELD),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAFREILA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SPICYBREAD, 1, 4),
                drop(skillCardList, 'Mafreila Ally', 5, 9),
                drop(armorList, ItemNameData.DIAMONDSHIELD, 10, 12),
                drop(skillCardList, 'Mafreila Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.SPICYBREAD, 17, 19),
                drop(armorList, ItemNameData.DIAMONDSHIELD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANUBIS,
            Arcana.Judgement,
            37,
            [0, 0, 57.5, 65, 60, 55, 57.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.HAMAON, 0),
                personaSkill(SkillNameData.MAKOUHA, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.NULLFEAR, 39),
                personaSkill(SkillNameData.DEKUNDA, 40),
                personaSkill(SkillNameData.RESISTBLESS, 41),
                personaSkill(SkillNameData.EIGA, 43)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.LUCKSCALES),
                skillCardList.find(s => s.skillName === SkillNameData.EIGA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(accessoryList, ItemNameData.LUCKSCALES, 5, 9),
                drop(skillCardList, 'Eiga Ally', 10, 12),
                drop(skillCardList, 'Eiga Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 3, 12),
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 13, 14),
                drop(consumableList, ItemNameData.STRAWDOLL, 15, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(accessoryList, ItemNameData.LUCKSCALES, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BELPHEGOR,
            Arcana.Tower,
            37,
            [0, 0, 62.5, 67.5, 60, 57.5, 47.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Repel],
            [
                personaSkill(SkillNameData.BUFULA, 0),
                personaSkill(SkillNameData.DODGEFIRE, 0),
                personaSkill(SkillNameData.NULLRAGE, 38),
                personaSkill(SkillNameData.ICEBREAK, 39),
                personaSkill(SkillNameData.MABUFULA, 41),
                personaSkill(SkillNameData.CONCENTRATE, 44),
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SAPPHIRERING),
                skillCardList.find(s => s.skillName === SkillNameData.ICEBREAK && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.ODDMORSEL, 1, 4),
                drop(consumableList, ItemNameData.EXTINGUISHORB, 5, 6),
                drop(accessoryList, ItemNameData.SAPPHIRERING, 7, 9),
                drop(skillCardList, 'Ice Break Ally', 10, 11),
                drop(skillCardList, 'Ice Break Main', 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 18),
                drop(accessoryList, ItemNameData.SAPPHIRERING, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LEGION,
            Arcana.Fool,
            38,
            [0, 0, 60, 60, 75, 57.5, 50],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.LIFEDRAIN, 0),
                personaSkill(SkillNameData.NEGATIVEPILE, 0),
                personaSkill(SkillNameData.RAMPAGE, 0),
                personaSkill(SkillNameData.PSIO, 39),
                personaSkill(SkillNameData.TETRABREAK, 40),
                personaSkill(SkillNameData.NULLDIZZY, 42)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.LEGIONSJAIL),
                skillCardList.find(s => s.skillName === SkillNameData.LIFEDRAIN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 3),
                drop(consumableList, ItemNameData.TETRAHAMMER, 4, 6),
                drop(skillCardList, 'Psio Main', 7, 10),
                drop(skillCardList, 'Life Drain Ally', 11, 12),
                drop(skillCardList, 'Life Drain Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 18),
                drop(consumableList, ItemNameData.TETRAHAMMER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ATROPOS,
            Arcana.Fortune,
            39,
            [0, 0, 57.5, 75, 55, 67.5, 55],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ELECBREAK, 0),
                personaSkill(SkillNameData.FIREWALL, 0),
                personaSkill(SkillNameData.MAZIONGA, 0),
                personaSkill(SkillNameData.MEDIARAMA, 41),
                personaSkill(SkillNameData.ELECBOOST, 43),
                personaSkill(SkillNameData.DODGEFIRE, 44),
                personaSkill(SkillNameData.CONCENTRATE, 45)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SCISSORBLADE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.FIREWALL && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DEMONDRINK, 1, 4),
                drop(consumableList, ItemNameData.LIFESTONE, 5, 9),
                drop(skillCardList, 'Fire Wall Ally', 10, 11),
                drop(skillCardList, 'Fire Wall Main', 12, 12),
                drop(weaponList, ItemNameData.SCISSORBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 18),
                drop(consumableList, ItemNameData.LIFESTONE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HELLBIKER,
            Arcana.Death,
            39,
            [0, 0, 65, 67.5, 60, 75, 42.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGILAO, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.SPEEDMASTER, 0),
                personaSkill(SkillNameData.FIREBOOST, 40),
                personaSkill(SkillNameData.TENTARAFOO, 41),
                personaSkill(SkillNameData.MARAGION, 42),
                personaSkill(SkillNameData.TRIGGERHAPPY, 43),
                personaSkill(SkillNameData.MAMUDOON, 44)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.ADAMANTVEST),
                accessoryList.find(a => a.name === ItemNameData.SWIFTSOCKS),
                skillCardList.find(s => s.skillName === SkillNameData.MUDOON && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(armorList, ItemNameData.ADAMANTVEST, 5, 8),
                drop(accessoryList, ItemNameData.SWIFTSOCKS, 9, 11),
                drop(skillCardList, 'Mudoon Ally', 12, 12),
                drop(skillCardList, 'Mudoon Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(armorList, ItemNameData.ADAMANTVEST, 17, 18),
                drop(accessoryList, ItemNameData.SWIFTSOCKS, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            'Uncommon loot dropper'
        ),
        new Persona(
            PersonaeNameData.MITHRAS,
            Arcana.Sun,
            39,
            [0, 0, 67.5, 62.5, 67.5, 62.5, 50],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAFREILA, 0),
                personaSkill(SkillNameData.VICIOUSSTRIKE, 0),
                personaSkill(SkillNameData.TENTARAFOO, 0),
                personaSkill(SkillNameData.TETRABREAK, 41),
                personaSkill(SkillNameData.NUKEBREAK, 42),
                personaSkill(SkillNameData.FREIDYNE, 45),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.TAUROCTONY),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.PETRAGENETRIX),
                skillCardList.find(s => s.skillName === SkillNameData.VICIOUSSTRIKE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.TETRAHAMMER, 5, 8),
                drop(skillCardList, 'Vicious Strike Ally', 9, 10),
                drop(skillCardList, 'Vicious Strike Main', 11, 12),
                drop(weaponList, ItemNameData.TAUROCTONY, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.TETRAHAMMER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.UNICORN,
            Arcana.Hierophant,
            39,
            [0, 0, 50, 67.5, 62.5, 70, 60],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.ASSAULTDIVE, 0),
                personaSkill(SkillNameData.DEKUNDA, 0),
                personaSkill(SkillNameData.MAHAMA, 0),
                personaSkill(SkillNameData.RECARM, 41), // Intentionally Changed
                personaSkill(SkillNameData.SWIFTSTRIKE, 42),
                personaSkill(SkillNameData.KOUGAON, 43),
                personaSkill(SkillNameData.HAMAON, 44),
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.UNICORNHORN),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.RUNNINGSHOES),
                skillCardList.find(s => s.skillName === SkillNameData.MAHAMA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BITTERSOUL, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(skillCardList, 'Mahama Ally', 10, 11),
                drop(skillCardList, 'Mahama Main', 12, 12),
                drop(weaponList, ItemNameData.UNICORNHORN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.BITTERSOUL, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.WHITERIDER,
            Arcana.Chariot,
            39,
            [0, 0, 60, 60, 62.5, 65, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Repel],
            [
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.ONIKAGURA, 0),
                personaSkill(SkillNameData.TRIPLEDOWN, 0),
                personaSkill(SkillNameData.SNIPE, 41),
                personaSkill(SkillNameData.MAEIGA, 42),
                personaSkill(SkillNameData.MASUKUKAJA, 43),
                personaSkill(SkillNameData.FOULBREATH, 44),
                personaSkill(SkillNameData.AILMENTBOOST, 45)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CONQUERINGCROSSBOW),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAEIGA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.IDATENOFUDA, 5, 9),
                drop(skillCardList, 'Maeiga Ally', 10, 12),
                drop(weaponList, ItemNameData.CONQUERINGCROSSBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 19),
                drop(consumableList, ItemNameData.IDATENOFUDA, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HARITI,
            Arcana.Empress,
            40,
            [0, 0, 60, 72.5, 62.5, 65, 57.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ENERGYSHOWER, 0),
                personaSkill(SkillNameData.MABAISUDI, 0),
                personaSkill(SkillNameData.ZIONGA, 0),
                personaSkill(SkillNameData.MEDIARAMA, 0),
                personaSkill(SkillNameData.RECARM, 41), // Intentionally Changed
                personaSkill(SkillNameData.NOCTURNALFLASH, 42),
                personaSkill(SkillNameData.DIZZYBOOST, 45),
                personaSkill(SkillNameData.SPIRITDRAIN, 46)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.MINDCHOKER),
                skillCardList.find(s => s.skillName === SkillNameData.MEDIARAMA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Energy Shower Ally', 1, 3),
                drop(skillCardList, 'Mabaisudi Ally', 4, 7),
                drop(accessoryList, ItemNameData.MINDCHOKER, 8, 10),
                drop(skillCardList, 'Mediarama Ally', 11, 12),
                drop(skillCardList, 'Mediarama Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(skillCardList, 'Energy Shower Ally', 17, 18),
                drop(skillCardList, 'Mabaisudi Ally', 18, 19),
                drop(accessoryList, ItemNameData.MINDCHOKER, 20, 20),
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KIKURIHIME,
            Arcana.Priestess,
            40,
            [0, 0, 55, 77.5, 60, 70, 55],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ENERGYDROP, 0),
                personaSkill(SkillNameData.LULLABY, 0),
                personaSkill(SkillNameData.MARAKUKAJA, 0),
                personaSkill(SkillNameData.MEDIARAMA, 41),
                personaSkill(SkillNameData.TETRAJA, 43),
                personaSkill(SkillNameData.DIVINEGRACE, 45)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DRUIDAMULET),
                skillCardList.find(s => s.skillName === SkillNameData.TETRAJA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RANCIDSOUL, 1, 4),
                drop(skillCardList, 'Energy Drop Main', 5, 9),
                drop(accessoryList, ItemNameData.DRUIDAMULET, 10, 12),
                drop(skillCardList, 'Tetraja Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.SNUFFSOUL, 17, 19),
                drop(accessoryList, ItemNameData.DRUIDAMULET, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.POWER,
            Arcana.Justice,
            41,
            [0, 0, 75, 65, 70, 62.5, 52.5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.HAMAON, 0),
                personaSkill(SkillNameData.SUKUKAJA, 0),
                personaSkill(SkillNameData.SWIFTSTRIKE, 42),
                personaSkill(SkillNameData.MAKOUGA, 43),
                personaSkill(SkillNameData.DIAGA, 44),
                personaSkill(SkillNameData.MASUKUKAJA, 45),
                personaSkill(SkillNameData.NULLCURSE, 46)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ANGELICSPEAR),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.MUSCLEANKLET),
                skillCardList.find(s => s.skillName === SkillNameData.HAMAON && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RANCIDGRAVY, 1, 3),
                drop(consumableList, ItemNameData.LIFESTONE, 4, 6),
                drop(accessoryList, ItemNameData.MUSCLEANKLET, 7, 9),
                drop(skillCardList, 'Hamaon Ally', 10, 11),
                drop(skillCardList, 'Hamaon Main', 12, 12),
                drop(weaponList, ItemNameData.ANGELICSPEAR, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 17, 19),
                drop(accessoryList, ItemNameData.MUSCLEANKLET, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.REDRIDER,
            Arcana.Tower,
            41,
            [0, 0, 65, 67.5, 62.5, 72.5, 57.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.MAPSIO, 0),
                personaSkill(SkillNameData.PSYBREAK, 0),
                personaSkill(SkillNameData.RISINGSLASH, 0),
                personaSkill(SkillNameData.NEGATIVEPILE, 42),
                personaSkill(SkillNameData.RESISTCONFUSE, 44),
                personaSkill(SkillNameData.PRESSINGSTANCE, 45),
                personaSkill(SkillNameData.RAGEBOOST, 46)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.WARBLADE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FIGHTERSCHARM),
                skillCardList.find(s => s.skillName === SkillNameData.PSYBREAK && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(accessoryList, ItemNameData.FIGHTERSCHARM, 5, 9),
                drop(skillCardList, 'Psy Break Ally', 10, 11),
                drop(skillCardList, 'Psy Break Main', 12, 12),
                drop(weaponList, ItemNameData.WARBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(accessoryList, ItemNameData.FIGHTERSCHARM, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.DAISOUJOU,
            Arcana.Hierophant,
            42,
            [0, 0, 55, 82.5, 60, 62.5, 72.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.MAKOUGA, 0),
                personaSkill(SkillNameData.SPIRITDRAIN, 0),
                personaSkill(SkillNameData.TOUCHOFTHEDIVINE, 43), // Intentionally Changed
                personaSkill(SkillNameData.BLESSBOOST, 44),
                personaSkill(SkillNameData.DIAGA, 45),
                personaSkill(SkillNameData.MEPATRA, 46),
                personaSkill(SkillNameData.NULLRAGE, 47)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.BUDDHAROBE),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAKOUGA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 3),
                drop(skillCardList, 'Me Patra Ally', 4, 6),
                drop(armorList, ItemNameData.BUDDHAROBE, 7, 10),
                drop(skillCardList, 'Makouga Ally', 11, 12),
                drop(skillCardList, 'Makouga Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(armorList, ItemNameData.BUDDHAROBE, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HECATONCHEIRES,
            Arcana.Hanged,
            42,
            [0, 0, 72.5, 62.5, 75, 62.5, 60],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.REGENERATE2, 0),
                personaSkill(SkillNameData.SWIFTSTRIKE, 0),
                personaSkill(SkillNameData.TARUKAJA, 0),
                personaSkill(SkillNameData.ENDURE, 43),
                personaSkill(SkillNameData.FOULBREATH, 45),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 46),
                personaSkill(SkillNameData.CHARGE, 48)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BALANCEBELT),
                skillCardList.find(s => s.skillName === SkillNameData.FORTIFIEDMOXY && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Tarukaja Main', 1, 4),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 5, 9),
                drop(accessoryList, ItemNameData.BALANCEBELT, 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(skillCardList, 'Tarukaja Main', 17, 18),
                drop(accessoryList, ItemNameData.BALANCEBELT, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KUMBHANDA,
            Arcana.Hermit,
            42,
            [0, 0, 72.5, 62.5, 67.5, 65, 65],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.ONIKAGURA, 0), // Intentionally Changed
                personaSkill(SkillNameData.STAGNANTAIR, 0),
                personaSkill(SkillNameData.WAGEWAR, 0),
                personaSkill(SkillNameData.TEMPESTSLASH, 43),
                personaSkill(SkillNameData.DEKAJA, 45),
                personaSkill(SkillNameData.RAGEBOOST, 46),
                personaSkill(SkillNameData.REVOLUTION, 47)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PRONGHORN),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DEKAJA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Dekaja Ally', 1, 4),
                drop(consumableList, ItemNameData.HOLYWATER, 5, 9),
                drop(skillCardList, 'Dekaja Main', 10, 12),
                drop(weaponList, ItemNameData.PRONGHORN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 19),
                drop(consumableList, ItemNameData.HOLYWATER, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KUSHINADA,
            Arcana.Lovers,
            42,
            [0, 0, 60, 75, 65, 70, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MIRACLEPUNCH, 0), // Intentionally Changed
                personaSkill(SkillNameData.MABUFULA, 0),
                personaSkill(SkillNameData.MATARUKAJA, 0),
                personaSkill(SkillNameData.DIAGA, 44),
                personaSkill(SkillNameData.NULLSLEEP, 45),
                personaSkill(SkillNameData.WINDWALL, 46),
                personaSkill(SkillNameData.AMRITASHOWER, 47)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.TURTLESHELLCHOKER),
                skillCardList.find(s => s.skillName === SkillNameData.MATARUKAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(skillCardList, 'Wind Wall Ally', 10, 12),
                drop(skillCardList, 'Matarukaja Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OSE,
            Arcana.Fool,
            42,
            [0, 0, 80, 60, 62.5, 77.5, 52.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.COUNTERSTRIKE, 0),
                personaSkill(SkillNameData.ONIKAGURA, 0),
                personaSkill(SkillNameData.SPEEDMASTER, 0),
                personaSkill(SkillNameData.TEMPESTSLASH, 43),
                personaSkill(SkillNameData.MATARUKAJA, 45),
                personaSkill(SkillNameData.HEATWAVE, 47)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ELPRESIDENTE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TEMPESTSLASH && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Matarukaja Ally', 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(skillCardList, 'Tempest Slash Ally', 10, 12),
                drop(weaponList, ItemNameData.ELPRESIDENTE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.YURLUNGUR,
            Arcana.Sun,
            42,
            [0, 0, 65, 72.5, 70, 67.5, 57.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BRAINJACK, 0),
                personaSkill(SkillNameData.MAZIONGA, 0),
                personaSkill(SkillNameData.MEGIDO, 0),
                personaSkill(SkillNameData.REVOLUTION, 44),
                personaSkill(SkillNameData.ELECBREAK, 45),
                personaSkill(SkillNameData.TETRABREAK, 47),
                personaSkill(SkillNameData.ELECBOOST, 48)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MIRRIRMINA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BLITZRING),
                skillCardList.find(s => s.skillName === SkillNameData.TETRABREAK && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(consumableList, ItemNameData.TETRAHAMMER, 5, 9),
                drop(skillCardList, 'Tetra Break Ally', 10, 12),
                drop(weaponList, ItemNameData.MIRRIRMINA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 17, 18),
                drop(consumableList, ItemNameData.TETRAHAMMER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANANTA,
            Arcana.Star,
            43,
            [0, 0, 60, 75, 77.5, 65, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DEFENSEMASTER, 0),
                personaSkill(SkillNameData.ELECWALL, 0),
                personaSkill(SkillNameData.MAFREILA, 0),
                personaSkill(SkillNameData.ABYSMALSURGE, 45),
                personaSkill(SkillNameData.GROWTH2, 46),
                personaSkill(SkillNameData.MARAKUKAJA, 47),
                personaSkill(SkillNameData.FREIDYNE, 48),
                personaSkill(SkillNameData.NUKEBOOST, 49)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SERPENTCANNON),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HUAKHON),
                skillCardList.find(s => s.skillName === SkillNameData.MARAKUKAJA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.KONGOUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 5, 9),
                drop(skillCardList, 'Marakukaja Ally', 10, 12),
                drop(weaponList, ItemNameData.SERPENTCANNON, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.SNUFFSOUL, 17, 19),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PAZUZU,
            Arcana.Devil,
            43,
            [0, 0, 72.5, 75, 67.5, 65, 60],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.MAEIGA, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.TENTARAFOO, 0),
                personaSkill(SkillNameData.AMBIENTAID, 45),
                personaSkill(SkillNameData.EVILSMILE, 46),
                personaSkill(SkillNameData.BADBEAT, 47),
                personaSkill(SkillNameData.EIGAON, 48)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.GUNCHARM),
                skillCardList.find(s => s.skillName === SkillNameData.TENTARAFOO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(accessoryList, ItemNameData.GUNCHARM, 5, 9),
                drop(skillCardList, 'Tentarafoo Ally', 10, 12),
                drop(skillCardList, 'Tentarafoo Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.STRAWDOLL, 17, 19),
                drop(accessoryList, ItemNameData.GUNCHARM, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.QUEENMAB,
            Arcana.Magician,
            43,
            [0, 0, 57.5, 87.5, 65, 75, 55],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAKAJAMAON, 0),
                personaSkill(SkillNameData.MAZIONGA, 0),
                personaSkill(SkillNameData.WINDWALL, 0),
                personaSkill(SkillNameData.MATARUNDA, 44),
                personaSkill(SkillNameData.MAKARABREAK, 46),
                personaSkill(SkillNameData.AGIDYNE, 48)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MASQUERADERIBBON),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAKARABREAK && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.MAKARAHAMMER, 1, 4),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 5, 9),
                drop(skillCardList, 'Makara Break Ally', 10, 12),
                drop(weaponList, ItemNameData.MASQUERADERIBBON, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.MAKARAHAMMER, 17, 19),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GIRIMEHKALA,
            Arcana.Moon,
            44,
            [0, 0, 90, 60, 80, 80, 37.5],
            [ElemResist.Repel, ElemResist.Repel, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.MARAKUNDA, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.SWIFTSTRIKE, 0),
                personaSkill(SkillNameData.FOULBREATH, 46),
                personaSkill(SkillNameData.WAGEWAR, 48),
                personaSkill(SkillNameData.REPELPHYS, 51)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.MIRRORMAIL),
                accessoryList.find(a => a.name === ItemNameData.REVENGEMIRROR),
                skillCardList.find(s => s.skillName === SkillNameData.SWIFTSTRIKE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Rakunda Main', 5, 7),
                drop(accessoryList, ItemNameData.REVENGEMIRROR, 8, 9),
                drop(armorList, ItemNameData.MIRRORMAIL, 10, 12),
                drop(skillCardList, 'Swift Strike Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(skillCardList, 'Rakunda Ally', 17, 19),
                drop(armorList, ItemNameData.MIRRORMAIL, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MAGATSUIZANAGI,
            Arcana.Tower,
            44,
            [0, 0, 92.5, 87.5, 80, 62.5, 25],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Null],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.EIGAON, 0),
                personaSkill(SkillNameData.MEGIDOLA, 0),
                personaSkill(SkillNameData.MAZIODYNE, 45),
                personaSkill(SkillNameData.BLOODBATH, 47),
                personaSkill(SkillNameData.ATTACKMASTER, 48),
                personaSkill(SkillNameData.MATARUKAJA, 50),
                personaSkill(SkillNameData.MARAKUKAJA, 50),
                personaSkill(SkillNameData.MASUKUKAJA, 50)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.KNIGHTCREST),
                skillCardList.find(s => s.skillName === SkillNameData.EIGAON && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.IDATENOFUDA, 1, 4),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 5, 7),
                drop(skillCardList, 'Eigaon Ally', 8, 9),
                drop(accessoryList, ItemNameData.KNIGHTCREST, 10, 12),
                drop(skillCardList, 'Eigaon Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.IDATENOFUDA, 17, 18),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OKUNINUSHI,
            Arcana.Emperor,
            44,
            [0, 0, 75, 70, 72.5, 70, 60],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Weak, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAPSIO, 0),
                personaSkill(SkillNameData.MATARUKAJA, 0),
                personaSkill(SkillNameData.TEMPESTSLASH, 0),
                personaSkill(SkillNameData.PSYBOOST, 45),
                personaSkill(SkillNameData.PSYBREAK, 46),
                personaSkill(SkillNameData.EVADENUKE, 47),
                personaSkill(SkillNameData.HEATWAVE, 49)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HEATMASK),
                skillCardList.find(s => s.skillName === SkillNameData.TEMPESTSLASH && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 7),
                drop(skillCardList, 'Evade Nuke Ally', 8, 9),
                drop(accessoryList, ItemNameData.HEATMASK, 10, 12),
                drop(skillCardList, 'Tempest Slash Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(accessoryList, ItemNameData.HEATMASK, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.VALKYRIE,
            Arcana.Strength,
            44,
            [0, 0, 82.5, 60, 70, 72.5, 62.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.COUNTERSTRIKE, 0),
                personaSkill(SkillNameData.RISINGSLASH, 0),
                personaSkill(SkillNameData.ATTACKMASTER, 45),
                personaSkill(SkillNameData.SWIFTSTRIKE, 46), // Intentionally Changed
                personaSkill(SkillNameData.MATARUKAJA, 47),
                personaSkill(SkillNameData.DODGEPHYS, 49)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.DRAGONSHIELD),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.RISINGSLASH && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(armorList, ItemNameData.DRAGONSHIELD, 10, 12),
                drop(skillCardList, 'Rising Slash Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SCATHACH,
            Arcana.Priestess,
            45,
            [0, 0, 72.5, 75, 70, 75, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.SHARPSTUDENT, 0),
                personaSkill(SkillNameData.MAGARULA, 0),
                personaSkill(SkillNameData.TEMPESTSLASH, 0),
                personaSkill(SkillNameData.MARAGION, 46),
                personaSkill(SkillNameData.MATARUKAJA, 48),
                personaSkill(SkillNameData.ATTACKMASTER, 49),
                personaSkill(SkillNameData.ENDURE, 50)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SHADOWSLING),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAGARULA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.RANCIDSOUL, 5, 9),
                drop(skillCardList, 'Magarula Ally', 10, 11),
                drop(skillCardList, 'Magarula Main', 12, 12),
                drop(weaponList, ItemNameData.SHADOWSLING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 17, 18),
                drop(consumableList, ItemNameData.SNUFFSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FORTUNA,
            Arcana.Fortune,
            46,
            [0, 0, 57.5, 80, 72.5, 85, 67.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAGARULA, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.TETRAJA, 0),
                personaSkill(SkillNameData.GARUDYNE, 47),
                personaSkill(SkillNameData.TOUCHNGO, 49),
                personaSkill(SkillNameData.AMRITADROP, 50),
                personaSkill(SkillNameData.EVADEELEC, 51)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FENGSHUICHARM),
                skillCardList.find(s => s.skillName === SkillNameData.AMRITADROP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(skillCardList, 'Amrita Drop Ally', 5, 9),
                drop(accessoryList, ItemNameData.FENGSHUICHARM, 10, 12),
                drop(skillCardList, 'Amrita Drop Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.HOMUNCULUS, 17, 18),
                drop(consumableList, ItemNameData.HIRANYA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.RANGDA,
            Arcana.Magician,
            48,
            [0, 0, 70, 85, 75, 82.5, 65],
            [ElemResist.Repel, ElemResist.Repel, ElemResist.Null, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.BLOODBATH, 0),
                personaSkill(SkillNameData.COUNTERSTRIKE, 0),
                personaSkill(SkillNameData.SWIFTSTRIKE, 0),
                personaSkill(SkillNameData.EIGAON, 49),
                personaSkill(SkillNameData.MATARUNDA, 51),
                personaSkill(SkillNameData.MUDOON, 53)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MATARUNDA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BITTERSOUL, 1, 3),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 4, 6),
                drop(skillCardList, 'Tarunda Ally', 7, 9),
                drop(skillCardList, 'Matarunda Ally', 10, 12),
                drop(skillCardList, 'Matarunda Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 7, 16),
                drop(consumableList, ItemNameData.SNUFFSOUL, 17, 18),
                drop(consumableList, ItemNameData.BITTERSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BUGS,
            Arcana.Fool,
            49,
            [0, 0, 87.5, 82.5, 75, 80, 60],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.MASUKUNDA, 0),
                personaSkill(SkillNameData.MIRACLEPUNCH, 0),
                personaSkill(SkillNameData.PSIODYNE, 0),
                personaSkill(SkillNameData.GODOFWAR, 51),
                personaSkill(SkillNameData.TRIPLEDOWN, 52),
                personaSkill(SkillNameData.EVADEPHYS, 54),
                personaSkill(SkillNameData.FASTHEAL, 55)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BEARGLOVES),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TRIPLEDOWN && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(skillCardList, 'Triple Down Ally', 10, 11),
                drop(skillCardList, 'Triple Down Main', 12, 12),
                drop(weaponList, ItemNameData.BEARGLOVES, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 7, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BYAKKO,
            Arcana.Temperance,
            49,
            [0, 0, 80, 80, 77.5, 80, 67.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.COUNTERSTRIKE, 0),
                personaSkill(SkillNameData.MABUFULA, 0),
                personaSkill(SkillNameData.SWIFTSTRIKE, 0),
                personaSkill(SkillNameData.ICEBOOST, 51),
                personaSkill(SkillNameData.EVADEFIRE, 52),
                personaSkill(SkillNameData.NULLRAGE, 54),
                personaSkill(SkillNameData.BUFUDYNE, 55)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.NULLRAGE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Evade Fire Ally', 5, 9),
                drop(skillCardList, 'Counterstrike Ally', 10, 12),
                drop(skillCardList, 'Null Rage Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(skillCardList, 'Evade Fire Ally', 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HORUS,
            Arcana.Sun,
            49,
            [0, 0, 75, 80, 80, 87.5, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DIAGA, 0),
                personaSkill(SkillNameData.KOUGAON, 0),
                personaSkill(SkillNameData.MEGIDOLA, 0), // Intentionally Changed
                personaSkill(SkillNameData.TOUCHNGO, 51),
                personaSkill(SkillNameData.MASUKUKAJA, 52),
                personaSkill(SkillNameData.HAMAON, 53),
                personaSkill(SkillNameData.HAMABOOST, 54)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HERMESSANDALS),
                skillCardList.find(s => s.skillName === SkillNameData.MEGIDOLA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.IDATENOFUDA, 1, 3),
                drop(skillCardList, 'Diarama Main', 4, 6),
                drop(skillCardList, 'Masukukaja Ally', 7, 9),
                drop(accessoryList, ItemNameData.HERMESSANDALS, 10, 12),
                drop(skillCardList, 'Megidola Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.IDATENOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KOUMOKUTEN,
            Arcana.Hermit,
            49,
            [0, 0, 92.5, 80, 85, 77.5, 62.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.RISINGSLASH, 0), // Intentionally Changed
                personaSkill(SkillNameData.REGENERATE2, 0),
                personaSkill(SkillNameData.REVOLUTION, 0),
                personaSkill(SkillNameData.ATTACKMASTER, 51),
                personaSkill(SkillNameData.MATARUKAJA, 52),
                personaSkill(SkillNameData.NUKEWALL, 53),
                personaSkill(SkillNameData.ENDURINGSOUL, 54),
                personaSkill(SkillNameData.DEADLYFURY, 55)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BINDINGPISTOL),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ATTACKMASTER && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(skillCardList, 'Matarukaja Main', 5, 8),
                drop(skillCardList, 'Nuke Wall Ally', 9, 11),
                drop(skillCardList, 'Attack Master Ally', 12, 12),
                drop(weaponList, ItemNameData.BINDINGPISTOL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.DAKINI,
            Arcana.Empress,
            50,
            [0, 0, 85, 80, 85, 70, 72.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BADBEAT, 0),
                personaSkill(SkillNameData.NEGATIVEPILE, 0), // Intentionally Changed
                personaSkill(SkillNameData.RISINGSLASH, 0),
                personaSkill(SkillNameData.HIGHCOUNTER, 51),
                personaSkill(SkillNameData.DEATHBOUND, 52),
                personaSkill(SkillNameData.REBELLION, 54),
                personaSkill(SkillNameData.CHARGE, 55)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FORTRESSBELT),
                skillCardList.find(s => s.skillName === SkillNameData.REBELLION && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Bad Beat Ally', 1, 3),
                drop(skillCardList, 'Rising Slash Ally', 4, 6),
                drop(skillCardList, 'Rebellion Ally', 7, 9),
                drop(accessoryList, ItemNameData.FORTRESSBELT, 10, 12),
                drop(skillCardList, 'Rebellion Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(skillCardList, 'Bad Beat Ally', 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NARCISSUS,
            Arcana.Lovers,
            50,
            [0, 0, 67.5, 90, 72.5, 87.5, 75],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.NOCTURNALFLASH, 0),
                personaSkill(SkillNameData.ENERGYDROP, 0),
                personaSkill(SkillNameData.MAGARUDYNE, 0),
                personaSkill(SkillNameData.GROWTH2, 52), // Intentionally Changed
                personaSkill(SkillNameData.DIZZYBOOST, 53),
                personaSkill(SkillNameData.DIAGA, 54), // Intentionally Changed
                personaSkill(SkillNameData.AMBIENTAID, 55)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DAFFODILS),
                skillCardList.find(s => s.skillName === SkillNameData.NOCTURNALFLASH && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 6),
                drop(skillCardList, 'Energy Drop Main', 7, 9),
                drop(skillCardList, 'Nocturnal Flash Ally', 10, 12),
                drop(skillCardList, 'Growth 2 Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.SOURYOGURT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SARASVATI,
            Arcana.Priestess,
            50,
            [0, 0, 85, 87.5, 80, 82.5, 67.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MEPATRA, 0),
                personaSkill(SkillNameData.DIAGA, 0),
                personaSkill(SkillNameData.TENTARAFOO, 0),
                personaSkill(SkillNameData.NULLSLEEP, 51),
                personaSkill(SkillNameData.DEKAJA, 52),
                personaSkill(SkillNameData.MATARUNDA, 53),
                personaSkill(SkillNameData.MEDIAGA, 54) // Intentionally Changed
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.NULLSLEEP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Me Patra Main', 1, 3),
                drop(skillCardList, 'Dekaja Main', 4, 6),
                drop(skillCardList, 'Mediarama Main', 7, 9),
                drop(skillCardList, 'Matarunda Main', 10, 12),
                drop(skillCardList, 'Null Sleep Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 17, 18),
                drop(skillCardList, 'Dekaja Ally', 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.TSUKIYOMI,
            Arcana.Moon,
            50,
            [0, 0, 95, 80, 82.5, 92.5, 42.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Repel],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.ABSORBCURSE, 0),
                personaSkill(SkillNameData.LIFEDRAIN, 0),
                personaSkill(SkillNameData.MAEIGAON, 0),
                personaSkill(SkillNameData.MYRIADSLASHES, 0),
                personaSkill(SkillNameData.CURSEBOOST, 53),
                personaSkill(SkillNameData.HEATWAVE, 55),
                personaSkill(SkillNameData.ARMSMASTER, 56)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.MIDNIGHTRING),
                skillCardList.find(s => s.skillName === SkillNameData.ARMSMASTER && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SNUFFSOUL, 1, 4),
                drop(skillCardList, 'Life Drain Main', 5, 9),
                drop(accessoryList, ItemNameData.MIDNIGHTRING, 10, 12),
                drop(skillCardList, 'Arms Master Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.SNUFFSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SET,
            Arcana.Tower,
            51,
            [0, 0, 80, 87.5, 75, 87.5, 70],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.FIREBREAK, 0),
                personaSkill(SkillNameData.ONESHOTKILL, 53),
                personaSkill(SkillNameData.CRIPPLE, 54),
                personaSkill(SkillNameData.FORTIFYSPIRIT, 56)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.IGNISRING),
                skillCardList.find(s => s.skillName === SkillNameData.FIREBREAK && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                emptyDrop
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.IDATENOFUDA, 17, 18),
                drop(accessoryList, ItemNameData.IGNISRING, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            'Should never be negotiable'
        ),
        new Persona(
            PersonaeNameData.BARONG,
            Arcana.Emperor,
            52,
            [0, 0, 82.5, 87.5, 82.5, 92.5, 62.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.ELECBREAK, 0),
                personaSkill(SkillNameData.WAGEWAR, 0),
                personaSkill(SkillNameData.ZIODYNE, 0),
                personaSkill(SkillNameData.INVIGORATE2, 54),
                personaSkill(SkillNameData.NULLELEC, 55),
                personaSkill(SkillNameData.MAZIODYNE, 57)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ZIODYNE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SNUFFSOUL, 1, 4),
                drop(skillCardList, 'Ziodyne Ally', 5, 9),
                drop(skillCardList, 'Null Elec Ally', 10, 12),
                drop(skillCardList, 'Ziodyne Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.RANCIDSOUL, 17, 18),
                drop(consumableList, ItemNameData.SNUFFSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GARUDA,
            Arcana.Star,
            52,
            [0, 0, 75, 90, 72.5, 97.5, 72.5],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AMRITASHOWER, 0),
                personaSkill(SkillNameData.GARUDYNE, 0),
                personaSkill(SkillNameData.HEATWAVE, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 54),
                personaSkill(SkillNameData.EVADEELEC, 55),
                personaSkill(SkillNameData.MAGARUDYNE, 57),
                personaSkill(SkillNameData.WINDAMP, 59)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ASTRA),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.GARUDYNE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.IDATENOFUDA, 1, 4),
                drop(skillCardList, 'Amrita Shower Ally', 5, 9),
                drop(skillCardList, 'Garudyne Ally', 10, 12),
                drop(weaponList, ItemNameData.ASTRA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.IDATENOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NORN,
            Arcana.Fortune,
            52,
            [0, 0, 75, 95, 82.5, 85, 70],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.NOCTURNALFLASH, 0),
                personaSkill(SkillNameData.GARUDYNE, 0),
                personaSkill(SkillNameData.ZIODYNE, 0),
                personaSkill(SkillNameData.DIAGA, 54), // Intentionally Changed
                personaSkill(SkillNameData.AMRITADROP, 55),
                personaSkill(SkillNameData.TETRAJA, 56),
                personaSkill(SkillNameData.SAMARECARM, 57)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.FATE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DIAGA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOMUNCULUS, 1, 4),
                drop(skillCardList, 'Amrita Drop Main', 5, 9),
                drop(skillCardList, 'Diaga Ally', 10, 12),
                drop(weaponList, ItemNameData.FATE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.HOMUNCULUS, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GANESHA,
            Arcana.Sun,
            53,
            [0, 0, 97.5, 77.5, 92.5, 82.5, 65],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MEGATONRAID, 0), // Intentionally Changed
                personaSkill(SkillNameData.FATEDPUNCH, 0), // Intentionally Changed
                personaSkill(SkillNameData.REBELLION, 0),
                personaSkill(SkillNameData.TETRAJA, 55),
                personaSkill(SkillNameData.ENDURE, 56),
                personaSkill(SkillNameData.MASUKUNDA, 57),
                personaSkill(SkillNameData.CHARGE, 60)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ELEPHANTTRUNK),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MASUKUNDA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOMUNCULUS, 1, 7),
                drop(consumableList, ItemNameData.BEAD, 8, 9),
                drop(skillCardList, 'Masukunda Ally', 10, 11),
                drop(skillCardList, 'Masukunda Main', 12, 12),
                drop(weaponList, ItemNameData.ELEPHANTTRUNK, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(consumableList, ItemNameData.SPICYBREAD, 17, 18),
                drop(consumableList, ItemNameData.HOMUNCULUS, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            // Swapped Black Rider and Pale Rider with some changes to accomodate the reversal
            PersonaeNameData.BLACKRIDER,
            Arcana.Tower,
            53,
            [0, 0, 85, 85, 82.5, 97.5, 65],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null, ElemResist.Weak,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.FLASHBOMB, 0),
                personaSkill(SkillNameData.EIGAON, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.AMBIENTAID, 54),
                personaSkill(SkillNameData.BLOODBATH, 55),
                personaSkill(SkillNameData.GHASTLYWAIL, 57),
                personaSkill(SkillNameData.MEGIDOLA, 58)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.CHEETAHSOCKS),
                skillCardList.find(s => s.skillName === SkillNameData.GHASTLYWAIL && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(skillCardList, 'Flash Bomb Ally', 5, 9),
                drop(accessoryList, ItemNameData.CHEETAHSOCKS, 10, 12),
                drop(skillCardList, 'Ghastly Wail Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.STRAWDOLL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CERBERUS,
            Arcana.Chariot,
            55,
            [0, 0, 97.5, 87.5, 80, 97.5, 67.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.REBELLION, 56),
                personaSkill(SkillNameData.HIGHCOUNTER, 57),
                personaSkill(SkillNameData.REGENERATE2, 58),
                personaSkill(SkillNameData.ENDURINGSOUL, 60)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.THREEHEADED),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.AGIDYNE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(skillCardList, 'Agidyne Ally', 10, 12),
                drop(weaponList, ItemNameData.THREEHEADED, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.RAJANAGA,
            Arcana.Temperance,
            55,
            [0, 0, 82.5, 92.5, 90, 87.5, 77.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ELECBREAK, 0),
                personaSkill(SkillNameData.TENTARAFOO, 0),
                personaSkill(SkillNameData.ZIODYNE, 0),
                personaSkill(SkillNameData.SHOCKBOOST, 57),
                personaSkill(SkillNameData.MAKARAKARN, 58),
                personaSkill(SkillNameData.MAZIODYNE, 59),
                personaSkill(SkillNameData.EVADEWIND, 60)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ARMADABELT),
                skillCardList.find(s => s.skillName === SkillNameData.SHOCKBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.MYSTERYMEAT, 1, 4),
                drop(consumableList, ItemNameData.MAGICALOINTMENT, 5, 9),
                drop(accessoryList, ItemNameData.ARMADABELT, 10, 12),
                drop(skillCardList, 'Shock Boost Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.DISCHARGESTONE, 17, 18),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SKADI,
            Arcana.Priestess,
            55,
            [0, 0, 87.5, 97.5, 85, 85, 75],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.EVILTOUCH, 0),
                personaSkill(SkillNameData.BUFUDYNE, 0), // Intentionally Changed
                personaSkill(SkillNameData.NULLDESPAIR, 0),
                personaSkill(SkillNameData.GHASTLYWAIL, 51),
                personaSkill(SkillNameData.MABUFUDYNE, 52), // Intentionally Changed
                personaSkill(SkillNameData.SPIRITDRAIN, 54),
                personaSkill(SkillNameData.REPELICE, 55)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SNOWQUEENSSKI),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.BUFUDYNE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Evil Touch Ally', 1, 4),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 5, 8),
                drop(skillCardList, 'Bufudyne Ally', 9, 11),
                drop(skillCardList, 'Bufudyne Main', 12, 12),
                drop(weaponList, ItemNameData.SNOWQUEENSSKI, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.STONESOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ASTERIUS,
            Arcana.Fortune,
            56,
            [0, 0, 107.5, 107.5, 80, 80, 62.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                // Intentionally Changed
                personaSkill(SkillNameData.BURNBOOST, 0),
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.MARAGIDYNE, 0),
                personaSkill(SkillNameData.GODOFWAR, 57),
                personaSkill(SkillNameData.FIREAMP, 59),
                personaSkill(SkillNameData.TETRAKARN, 60),
                personaSkill(SkillNameData.VORPALBLADE, 62)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.BUFFANKLET),
                skillCardList.find(s => s.skillName === SkillNameData.BURNBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 1, 4),
                drop(skillCardList, 'Agidyne Ally', 5, 7),
                drop(skillCardList, 'Fire Amp Ally', 8, 9),
                drop(accessoryList, ItemNameData.BUFFANKLET, 10, 12),
                drop(skillCardList, 'Burn Boost Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(consumableList, ItemNameData.THAWSTONE, 17, 19),
                drop(accessoryList, ItemNameData.BUFFANKLET, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KURAMATENGU,
            Arcana.Hermit,
            56,
            [0, 0, 85, 95, 85, 105, 67.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.BRAINBUSTER, 0),
                personaSkill(SkillNameData.HEATWAVE, 0),
                personaSkill(SkillNameData.MASUKUNDA, 0),
                personaSkill(SkillNameData.GARUDYNE, 57),
                personaSkill(SkillNameData.GROWTH3, 58),
                personaSkill(SkillNameData.MAGARUDYNE, 60)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.TENGUCLAW),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAGARUDYNE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(skillCardList, 'Garudyne Main', 5, 9),
                drop(skillCardList, 'Magarudyne Ally', 10, 11),
                drop(skillCardList, 'Magarudyne Main', 12, 12),
                drop(weaponList, ItemNameData.TENGUCLAW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 17, 18),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PARVATI,
            Arcana.Lovers,
            56,
            [0, 0, 82.5, 97.5, 82.5, 97.5, 77.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak],
            [
                // Healing spells adjusted
                personaSkill(SkillNameData.DIAGA, 0),
                personaSkill(SkillNameData.HAMAON, 0),
                personaSkill(SkillNameData.PSIODYNE, 0),
                personaSkill(SkillNameData.ENERGYSHOWER, 57),
                personaSkill(SkillNameData.MEDIAGA, 58),
                personaSkill(SkillNameData.MAPSIODYNE, 59),
                personaSkill(SkillNameData.HAMABOOST, 61)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.RUNEAMULET),
                skillCardList.find(s => s.skillName === SkillNameData.HAMABOOST && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Diaga Ally', 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(accessoryList, ItemNameData.RUNEAMULET, 10, 12),
                drop(skillCardList, 'Hama Boost Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 7, 16),
                drop(skillCardList, 'Energy Shower Main', 17, 19),
                drop(accessoryList, ItemNameData.RUNEAMULET, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.TITANIA,
            Arcana.Empress,
            56,
            [0, 0, 80, 100, 87.5, 95, 75],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.FREIDYNE, 0),
                personaSkill(SkillNameData.LULLABY, 0),
                personaSkill(SkillNameData.MAKARASMASH, 0),
                personaSkill(SkillNameData.MAFREIDYNE, 58),
                personaSkill(SkillNameData.NUKEAMP, 60),
                personaSkill(SkillNameData.MEDIAGA, 61)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DIAMONDRING),
                skillCardList.find(s => s.skillName === SkillNameData.LULLABY && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 3),
                drop(skillCardList, 'Freidyne Main', 4, 5),
                drop(skillCardList, 'Nuke Amp Ally', 6, 7),
                drop(skillCardList, 'Lullaby Main', 8, 9),
                drop(accessoryList, ItemNameData.DIAMONDRING, 10, 12),
                drop(skillCardList, 'Mafreidyne Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 19),
                drop(skillCardList, 'Mediaga Ally', 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),

        new Persona(
            PersonaeNameData.YATAGARASU,
            Arcana.Sun,
            57,
            [0, 0, 87.5, 102.5, 75, 100, 80],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.DEKUNDA, 0),
                personaSkill(SkillNameData.MAKARASMASH, 0),
                personaSkill(SkillNameData.MEDIAGA, 59),
                personaSkill(SkillNameData.PRESSINGSTANCE, 60),
                personaSkill(SkillNameData.WINDBREAK, 61),
                personaSkill(SkillNameData.NULLWIND, 62)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.GALERING),
                skillCardList.find(s => s.skillName === SkillNameData.DEKUNDA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.LIFESTONE, 1, 4),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 5, 6),
                drop(skillCardList, 'Dekunda Ally', 7, 9),
                drop(accessoryList, ItemNameData.GALERING, 10, 12),
                drop(skillCardList, 'Dekunda Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 7, 16),
                drop(consumableList, ItemNameData.LIFESTONE, 17, 18),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BAPHOMET,
            Arcana.Devil,
            58,
            [0, 0, 85, 105, 90, 95, 77.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.BURNBOOST, 0),
                personaSkill(SkillNameData.EVADEFIRE, 0),
                personaSkill(SkillNameData.BUFUDYNE, 59),
                personaSkill(SkillNameData.ZIODYNE, 61),
                personaSkill(SkillNameData.SHOCKBOOST, 62),
                personaSkill(SkillNameData.FREEZEBOOST, 63)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.CURSEDGUARD),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.FREEZEBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(armorList, ItemNameData.CURSEDGUARD, 1, 3),
                drop(skillCardList, 'Shock Boost Ally', 4, 6),
                drop(skillCardList, 'Freeze Boost Ally', 7, 9),
                drop(skillCardList, 'Burn Boost Ally', 10, 12),
                drop(skillCardList, 'Evade Fire Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 17, 18),
                drop(armorList, ItemNameData.CURSEDGUARD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            // See note on Black Rider
            PersonaeNameData.PALERIDER,
            Arcana.Death,
            59,
            [0, 0, 95, 107.5, 92.5, 112.5, 75],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.ABYSMALSURGE, 0),
                personaSkill(SkillNameData.MAEIGAON, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.MEGIDOLA, 54),
                personaSkill(SkillNameData.EVADEBLESS, 55),
                personaSkill(SkillNameData.MAMUDOON, 57),
                personaSkill(SkillNameData.DEATHBOUND, 58)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PALESCYTHE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAMUDOON && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(skillCardList, 'Mamudoon Ally', 10, 10),
                drop(skillCardList, 'Evade Bless Main', 11, 11),
                drop(skillCardList, 'Mamudoon Main', 12, 12),
                drop(weaponList, ItemNameData.PALESCYTHE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.STRAWDOLL, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SURT,
            Arcana.Magician,
            59,
            [0, 0, 92.5, 100, 97.5, 87.5, 82.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.AGIDYNE, 0),
                personaSkill(SkillNameData.FIREBREAK, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.MARAGIDYNE, 60),
                personaSkill(SkillNameData.HIGHCOUNTER, 61),
                personaSkill(SkillNameData.AGIRA, 64) // Need to be added fire spell
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.VOLCANO),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.AGIRA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(skillCardList, 'Maragidyne Ally', 5, 7),
                drop(skillCardList, 'Maragidyne Main', 8, 9),
                drop(skillCardList, 'Agira Ally', 10, 12),
                drop(weaponList, ItemNameData.VOLCANO, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.STONESOUL, 17, 18),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.TRUMPETER,
            Arcana.Judgement,
            59,
            [0, 0, 82.5, 105, 100, 95, 77.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Null],
            [
                personaSkill(SkillNameData.ABYSMALSURGE, 0),
                personaSkill(SkillNameData.BRAINBUSTER, 0),
                personaSkill(SkillNameData.FREIRA, 0), // Intentionally Changed
                personaSkill(SkillNameData.FORTIFYSPIRIT, 61),
                personaSkill(SkillNameData.CRIPPLE, 62),
                personaSkill(SkillNameData.LIFEAID, 64),
                personaSkill(SkillNameData.DEBILITATE, 65)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.VENETIANSHIELD),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.LIFEAID && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                emptyDrop
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 7, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(consumableList, ItemNameData.BALMOFLIFE, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LILITH,
            Arcana.Moon,
            60,
            [0, 0, 82.5, 107.5, 92.5, 97.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                // Spells Upgraded
                personaSkill(SkillNameData.BUFURA, 0),
                personaSkill(SkillNameData.MAKARASMASH, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.GARURA, 62),
                personaSkill(SkillNameData.SPIRITDRAIN, 63),
                personaSkill(SkillNameData.MAMUDOON, 64),
                personaSkill(SkillNameData.AGIRA, 65)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SUCCUBUSCROSSBOW),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.NIGHTSTALKER),
                skillCardList.find(s => s.skillName === SkillNameData.MAKARASMASH && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(skillCardList, 'Makara Smash Ally', 5, 9),
                drop(skillCardList, 'Makara Smash Main', 10, 12),
                drop(weaponList, ItemNameData.SUCCUBUSCROSSBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.RANCIDSOUL, 17, 18),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MELCHIZEDEK,
            Arcana.Justice,
            60,
            [0, 0, 92.5, 95, 102.5, 97.5, 80],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Null],
            [
                personaSkill(SkillNameData.HAMAON, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.HAMABOOST, 61),
                personaSkill(SkillNameData.REVOLUTION, 62),
                personaSkill(SkillNameData.MAHAMAON, 64),
                personaSkill(SkillNameData.AMRITADROP, 65),
                personaSkill(SkillNameData.GODSHAND, 67)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.PALADINCREST),
                skillCardList.find(s => s.skillName === SkillNameData.MAHAMAON && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Amrita Drop Main', 1, 4),
                drop(skillCardList, 'Mahamaon Ally', 5, 9),
                drop(accessoryList, ItemNameData.PALADINCREST, 10, 12),
                drop(skillCardList, 'Mahamaon Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 19),
                drop(accessoryList, ItemNameData.PALADINCREST, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MOLOCH,
            Arcana.Hanged,
            60,
            [0, 0, 80, 112.5, 105, 77.5, 92.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Weak, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.EVILSMILE, 0),
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.STAGNANTAIR, 0),
                personaSkill(SkillNameData.AGIRA, 62),
                personaSkill(SkillNameData.GHASTLYWAIL, 63),
                personaSkill(SkillNameData.ABSORBFIRE, 64),
                personaSkill(SkillNameData.NUKEAMP, 65)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SACRIFICIALBULL),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FORTUNECHARM),
                skillCardList.find(s => s.skillName === SkillNameData.EVILSMILE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(skillCardList, 'Evil Smile Ally', 5, 7),
                drop(skillCardList, 'Evil Smile Main', 8, 9),
                drop(accessoryList, ItemNameData.FORTUNECHARM, 10, 12),
                drop(weaponList, ItemNameData.SACRIFICIALBULL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 17, 18),
                drop(accessoryList, ItemNameData.FORTUNECHARM, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.DIONYSUS,
            Arcana.Fool,
            61,
            [0, 0, 87.5, 102.5, 95, 100, 90],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.ABYSMALSURGE, 0),
                personaSkill(SkillNameData.HEATWAVE, 0),
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.THERMOPYLAE, 62),
                personaSkill(SkillNameData.AILMENTBOOST, 63),
                personaSkill(SkillNameData.MARAGIRA, 65),
                personaSkill(SkillNameData.AMRITASHOWER, 66)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.THYRSUSWHIP),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.THERMOPYLAE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Amrita Shower Main', 1, 5),
                drop(skillCardList, 'Abysmal Surge Ally', 6, 7),
                drop(skillCardList, 'Abysmal Surge Main', 8, 9),
                drop(skillCardList, 'Thermopylae Ally', 10, 11),
                drop(skillCardList, 'Thermopylae Main', 12, 12),
                drop(weaponList, ItemNameData.THYRSUSWHIP, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(skillCardList, 'Amrita Shower Ally', 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KINGFROST,
            Arcana.Emperor,
            61,
            [0, 0, 95, 97.5, 112.5, 82.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFURA, 0),
                personaSkill(SkillNameData.ICEBREAK, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.FREEZEBOOST, 62),
                personaSkill(SkillNameData.GODOFWAR, 64),
                personaSkill(SkillNameData.NULLDESPAIR, 65),
                personaSkill(SkillNameData.ICEAMP, 67)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.LORDLYROBES),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ICEAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(skillCardList, 'Null Despair Ally', 3, 5),
                drop(skillCardList, 'God of War Ally', 6, 7),
                drop(skillCardList, 'Ice Amp Ally', 8, 9),
                drop(armorList, ItemNameData.LORDLYROBES, 10, 12),
                drop(skillCardList, 'Ice Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MORDRED,
            Arcana.Tower,
            61,
            [0, 0, 112.5, 100, 95, 100, 60],
            [ElemResist.Resist, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.BRAINBUSTER, 0),
                personaSkill(SkillNameData.DEADLYFURY, 0),
                personaSkill(SkillNameData.EIGAONA, 0),
                personaSkill(SkillNameData.POWERUP, 62),
                personaSkill(SkillNameData.WAGEWAR, 64),
                personaSkill(SkillNameData.ARMSMASTER, 66),
                personaSkill(SkillNameData.CHARGE, 67)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CLARENT),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.POWERUP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(skillCardList, 'Wage War Ally', 5, 6),
                drop(skillCardList, 'Wage War Main', 7, 9),
                drop(skillCardList, 'Power Up Ally', 10, 11),
                drop(skillCardList, 'Power Up Main', 12, 12),
                drop(weaponList, ItemNameData.CLARENT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(consumableList, ItemNameData.DEMONDRINK, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CHERNOBOG,
            Arcana.Death,
            62,
            [0, 0, 100, 92.5, 97.5, 95, 97.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Weak, ElemResist.Absorb, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.BLOODBATH, 0),
                personaSkill(SkillNameData.DEADLYFURY, 0),
                personaSkill(SkillNameData.MUDOON, 0),
                personaSkill(SkillNameData.STAGNANTAIR, 63),
                personaSkill(SkillNameData.DEATHBOUND, 64),
                personaSkill(SkillNameData.FEARBOOST, 66),
                personaSkill(SkillNameData.MYRIADSLASHES, 67)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BLOODIEDATHAME),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.STAGNANTAIR && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(skillCardList, 'Stagnant Air Ally', 5, 9),
                drop(skillCardList, 'Stagnant Air Main', 10, 12),
                drop(weaponList, ItemNameData.BLOODIEDATHAME, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 17, 18),
                drop(consumableList, ItemNameData.STRAWDOLL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.NEBIROS,
            Arcana.Devil,
            62,
            [0, 0, 97.5, 100, 105, 90, 90],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.EIGAONA, 0),
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.MARINKARIN, 0),
                personaSkill(SkillNameData.MAEIGAONA, 64),
                personaSkill(SkillNameData.CURSEAMP, 65),
                personaSkill(SkillNameData.EVADEBLESS, 66),
                personaSkill(SkillNameData.MEGIDOLAON, 68)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.OPALRING),
                skillCardList.find(s => s.skillName === SkillNameData.EIGAONA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(skillCardList, 'Eigaona Ally', 4, 5),
                drop(skillCardList, 'Curse Amp Ally', 6, 7),
                drop(skillCardList, 'Eigaona Main', 8, 9),
                drop(accessoryList, ItemNameData.OPALRING, 10, 12),
                drop(skillCardList, 'Maeigaona Ally', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.CHEWINGSOUL, 17, 19),
                drop(accessoryList, ItemNameData.OPALRING, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SEIRYU,
            Arcana.Temperance,
            62,
            [0, 0, 95, 102.5, 107.5, 92.5, 85],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFURA, 0),
                personaSkill(SkillNameData.DIAGA, 0),
                personaSkill(SkillNameData.MARAKUKAJA, 0),
                personaSkill(SkillNameData.REPELNUKE, 63),
                personaSkill(SkillNameData.MABUFURA, 65),
                personaSkill(SkillNameData.AMRITADROP, 66),
                personaSkill(SkillNameData.MAKARAKARN, 67)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.DRAGONMAIL),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MARAKUKAJA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.KONGOUOFUDA, 1, 4),
                drop(skillCardList, 'Bufura Ally', 5, 6),
                drop(skillCardList, 'Bufura Main', 7, 7),
                drop(skillCardList, 'Mabufura Ally', 8, 9),
                drop(armorList, ItemNameData.DRAGONMAIL, 10, 12),
                drop(skillCardList, 'Marakukaja Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 17, 19),
                drop(consumableList, ItemNameData.MAGICALOINTMENT, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FORNEUS,
            Arcana.Hierophant,
            63,
            [0, 0, 102.5, 97.5, 100, 105, 85],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MARINKARIN, 0),
                personaSkill(SkillNameData.MASUKUNDA, 0),
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.SURVIVALTRICK, 65),
                personaSkill(SkillNameData.STAGNANTAIR, 66),
                personaSkill(SkillNameData.MAPSIONRA, 67),
                personaSkill(SkillNameData.EVADEPSY, 68)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ICERING),
                skillCardList.find(s => s.skillName === SkillNameData.PSIONRA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Masukunda Main', 1, 4),
                drop(skillCardList, 'Marin Karin Main', 5, 7),
                drop(skillCardList, 'Psionra Ally', 8, 9),
                drop(accessoryList, ItemNameData.ICERING, 10, 12),
                drop(skillCardList, 'Psionra Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 19),
                drop(accessoryList, ItemNameData.ICERING, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.QUETZALCOATL,
            Arcana.Sun,
            63,
            [0, 0, 95, 105, 102.5, 102.5, 85],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.HEATWAVE, 0), // Intentionally Changed
                personaSkill(SkillNameData.GARURA, 0),
                personaSkill(SkillNameData.MAGARURA, 0),
                personaSkill(SkillNameData.GROWTH3, 65),
                personaSkill(SkillNameData.REGENERATE3, 66),
                personaSkill(SkillNameData.WINDAMP, 68),
                personaSkill(SkillNameData.PANTARHEI, 69)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.TOURNESOL),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAGARURA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(skillCardList, 'Garura Ally', 5, 7),
                drop(skillCardList, 'Garura Main', 8, 9),
                drop(skillCardList, 'Wind Amp Ally', 10, 11),
                drop(skillCardList, 'Magarura Main', 12, 12),
                drop(weaponList, ItemNameData.TOURNESOL, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.RANCIDGRAVY, 17, 19),
                drop(consumableList, ItemNameData.BEAD, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HANUMAN,
            Arcana.Star,
            64,
            [0, 0, 107.5, 95, 100, 100, 95],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MATARUNDA, 0),
                personaSkill(SkillNameData.REVOLUTION, 0),
                personaSkill(SkillNameData.MYRIADSLASHES, 0), // Intentionally Changed
                personaSkill(SkillNameData.DEATHBOUND, 65),
                personaSkill(SkillNameData.TETRASMASH, 67),
                personaSkill(SkillNameData.REGENERATE3, 69)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.RESISTBELT),
                skillCardList.find(s => s.skillName === SkillNameData.REVOLUTION && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(skillCardList, 'Revolution Ally', 5, 9),
                drop(accessoryList, ItemNameData.RESISTBELT, 10, 12),
                drop(skillCardList, 'Revolution Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(accessoryList, ItemNameData.RESISTBELT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.THOR,
            Arcana.Chariot,
            64,
            [0, 0, 110, 97.5, 107.5, 95, 87.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.HIGHCOUNTER, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.ZIONRA, 0),
                personaSkill(SkillNameData.ELECAMP, 66),
                personaSkill(SkillNameData.MAZIONRA, 67),
                personaSkill(SkillNameData.HEATUP, 68),
                personaSkill(SkillNameData.ATTACKMASTER, 70)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.GIGASPLATE),
                accessoryList.find(a => a.name === ItemNameData.GIANTSANKLET),
                skillCardList.find(s => s.skillName === SkillNameData.ZIONRA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 3),
                drop(consumableList, ItemNameData.BEAD, 4, 6),
                drop(accessoryList, ItemNameData.GIANTSANKLET, 7, 9),
                drop(armorList, ItemNameData.GIGASPLATE, 10, 12),
                drop(skillCardList, 'Zionra Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 17, 18),
                drop(accessoryList, ItemNameData.GIANTSANKLET, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.YAMATANOOROCHI,
            Arcana.Judgement,
            64,
            [0, 0, 110, 95, 120, 90, 82.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.DEATHBOUND, 0),
                personaSkill(SkillNameData.MABUFURA, 0),
                personaSkill(SkillNameData.BLOODBATH, 0), // Intentionally Changed
                personaSkill(SkillNameData.REPELFIRE, 66),
                personaSkill(SkillNameData.ADVERSERESOLVE, 67),
                personaSkill(SkillNameData.UNSHAKENWILL, 69)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.KUSANAGI),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MABUFURA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STONEBREAD, 1, 4),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 5, 9),
                drop(skillCardList, 'Mabufura Main', 10, 12),
                drop(weaponList, ItemNameData.KUSANAGI, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 7, 16),
                drop(consumableList, ItemNameData.STONEBREAD, 17, 18),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.THANATOS,
            Arcana.Death,
            65,
            [0, 0, 107.5, 122.5, 102.5, 95, 77.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.MAEIGAONA, 0),
                personaSkill(SkillNameData.DEATHSTOUCH, 0),
                personaSkill(SkillNameData.CURSEAMP, 66),
                personaSkill(SkillNameData.ONESHOTKILL, 68),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 69),
                personaSkill(SkillNameData.ENDURINGSOUL, 70)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DEATHSTARE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SPIRITCHOKER),
                skillCardList.find(s => s.skillName === SkillNameData.CURSEAMP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 1, 4),
                drop(accessoryList, ItemNameData.SPIRITCHOKER, 5, 9),
                drop(skillCardList, 'Curse Amp Ally', 10, 12),
                drop(weaponList, ItemNameData.DEATHSTARE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(accessoryList, ItemNameData.SPIRITCHOKER, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CHARLEMAGNE,
            Arcana.Hierophant,
            65,
            [0, 0, 115, 90, 110, 90, 90],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.FATEDPUNCH, 0),
                personaSkill(SkillNameData.DEADLYFURY, 0),
                personaSkill(SkillNameData.KOUGAONA, 0),
                personaSkill(SkillNameData.HEARTYCONSTITUTION, 66),
                personaSkill(SkillNameData.MAKOUGAONA, 68),
                personaSkill(SkillNameData.HEATRISER, 69),
                personaSkill(SkillNameData.TETRASMASH, 70)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.JOYEUSE),
                armorList.find(a => a.name === ItemNameData.KINGSARMOR),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(armorList, ItemNameData.MAXIMILLIAN, 10, 12),
                drop(weaponList, ItemNameData.JOYEUSE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 5, 16),
                drop(consumableList, ItemNameData.ODDMORSEL, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ENKIDU,
            Arcana.Chariot,
            65,
            [0, 0, 125, 90, 77.5, 125, 80],
            [ElemResist.Resist, ElemResist.Weak, ElemResist.Resist, ElemResist.Resist, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.HEATWAVE, 0),
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.REBELLION, 0),
                personaSkill(SkillNameData.MEGATONRAID, 66),
                personaSkill(SkillNameData.MAPSIONRA, 67),
                personaSkill(SkillNameData.DEBILITATE, 68),
                personaSkill(SkillNameData.GODSHAND, 70)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.WILDFIST),
                armorList.find(a => a.name === ItemNameData.GENJISHIELD),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOURYOGURT, 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(armorList, ItemNameData.ENSANGUINEDSHIELD, 10, 12),
                drop(weaponList, ItemNameData.WILDFIST, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 5, 16),
                drop(consumableList, ItemNameData.SOURYOGURT, 17, 18),
                drop(consumableList, ItemNameData.BEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.PERSEUS,
            Arcana.Sun,
            66,
            [0, 0, 100, 100, 100, 100, 100],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.ZIONRA, 0),
                personaSkill(SkillNameData.SHOCKBOOST, 0),
                personaSkill(SkillNameData.NULLBLESS, 67),
                personaSkill(SkillNameData.VORPALBLADE, 69),
                personaSkill(SkillNameData.SPEEDMASTER, 70),
                personaSkill(SkillNameData.BRAVEBLADE, 72)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PERSEUSSCYTHE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.REFLECTIONGEM),
                skillCardList.find(s => s.skillName === SkillNameData.NULLBLESS && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(armorList, ItemNameData.AEGISSHIELD, 5, 9),
                drop(accessoryList, ItemNameData.REFLECTIONGEM, 10, 12),
                drop(weaponList, ItemNameData.PERSEUSSCYTHE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(armorList, ItemNameData.AEGISSHIELD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OBERON,
            Arcana.Emperor,
            66,
            [0, 0, 100, 110, 107.5, 107.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BRAINJACK, 0),
                personaSkill(SkillNameData.HEATWAVE, 0),
                personaSkill(SkillNameData.ZIONRA, 0),
                personaSkill(SkillNameData.MATARUKAJA, 68),
                personaSkill(SkillNameData.MAZIONRA, 69),
                personaSkill(SkillNameData.PSYWALL, 70),
                personaSkill(SkillNameData.SAMARECARM, 71),
                personaSkill(SkillNameData.ELECAMP, 72)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CALIBURN),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ELECAMP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(skillCardList, 'Elec Amp Ally', 10, 12),
                drop(weaponList, ItemNameData.CALIBURN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(skillCardList, 'Elec Amp Ally', 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BISHAMONTEN,
            Arcana.Hierophant,
            67,
            [0, 0, 122.5, 92.5, 105, 112.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.DIARAHAN, 0),
                personaSkill(SkillNameData.FREIRA, 0),
                personaSkill(SkillNameData.DEADLYFURY, 68),
                personaSkill(SkillNameData.MAFREIRA, 69),
                personaSkill(SkillNameData.NUKEAMP, 71),
                personaSkill(SkillNameData.TETRAKARN, 72),
                personaSkill(SkillNameData.GODSHAND, 73)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BLADEOFMERCY),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.VIGORSASH),
                skillCardList.find(s => s.skillName === SkillNameData.GODSHAND && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 5, 9),
                drop(accessoryList, ItemNameData.VIGORSASH, 10, 12),
                drop(weaponList, ItemNameData.BLADEOFMERCY, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 19),
                drop(accessoryList, ItemNameData.VIGORSASH, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BLACKFROST,
            Arcana.Fool,
            67,
            [0, 0, 110, 115, 102.5, 105, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Absorb, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MABUFURA, 0),
                personaSkill(SkillNameData.FATEDPUNCH, 0),
                personaSkill(SkillNameData.ONESHOTKILL, 0),
                personaSkill(SkillNameData.ICEAMP, 70),
                personaSkill(SkillNameData.REPELFIRE, 71),
                personaSkill(SkillNameData.DIAMONDDUST, 72)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BLACKQUEENSWHIP),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DIAMONDDUST && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(skillCardList, 'Diamond Dust Ally', 5, 9),
                drop(weaponList, ItemNameData.BLACKQUEENSWHIP, 10, 12),
                drop(skillCardList, 'Diamond Dust Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 5, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CUCHULAINN,
            Arcana.Star,
            67,
            [0, 0, 117.5, 90, 110, 117.5, 85],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.DEADLYFURY, 0),
                personaSkill(SkillNameData.ICEWALL, 0),
                personaSkill(SkillNameData.BLOODBATH, 0), // Intentionally Changed
                personaSkill(SkillNameData.MATARUKAJA, 69),
                personaSkill(SkillNameData.DEKUNDA, 70),
                personaSkill(SkillNameData.CHARGE, 71),
                personaSkill(SkillNameData.ENDURINGSOUL, 72)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GAEBOLG),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SONICSOCKS),
                skillCardList.find(s => s.skillName === SkillNameData.CHARGE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(skillCardList, 'Charge Ally', 5, 9),
                drop(accessoryList, ItemNameData.SONICSOCKS, 10, 12),
                drop(weaponList, ItemNameData.GAEBOLG, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(accessoryList, ItemNameData.SONICSOCKS, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BELIAL,
            Arcana.Devil,
            68,
            [0, 0, 112.5, 102.5, 115, 107.5, 90],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null],
            [
                personaSkill(SkillNameData.AGIRA, 0),
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.MATARUNDA, 0),
                personaSkill(SkillNameData.SURVIVALTRICK, 70),
                personaSkill(SkillNameData.MARAGIRA, 71),
                personaSkill(SkillNameData.HEATUP, 72),
                personaSkill(SkillNameData.DEADLYFURY, 74)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HELLWALKER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MYRIADSLASHES && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(consumableList, ItemNameData.REVIVALBEAD, 5, 9),
                drop(skillCardList, 'Myriad Slashes Ally', 10, 12),
                drop(weaponList, ItemNameData.HELLWALKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.REVIVALBEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.DOMINION,
            Arcana.Justice,
            68,
            [0, 0, 115, 117.5, 112.5, 120, 100],
            [ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Null, ElemResist.Resist],
            [
                personaSkill(SkillNameData.NOCTURNALFLASH, 0),
                personaSkill(SkillNameData.HAMAON, 0),
                personaSkill(SkillNameData.KOUGAONA, 0),
                personaSkill(SkillNameData.MAKOUGAONA, 70),
                personaSkill(SkillNameData.HAMABOOST, 71),
                personaSkill(SkillNameData.MAHAMAON, 72),
                personaSkill(SkillNameData.EVADECURSE, 73)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ASCALON),
                armorList.find(a => a.name === ItemNameData.WHITEROBES),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.KOUGAONA && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 4),
                drop(armorList, ItemNameData.WHITEROBES, 5, 9),
                drop(skillCardList, 'Kougaona Main', 10, 12),
                drop(weaponList, ItemNameData.ASCALON, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 5, 16),
                drop(armorList, ItemNameData.WHITEROBES, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.VASUKI,
            Arcana.Hanged,
            68,
            [0, 0, 102.5, 115, 112.5, 105, 92.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak],
            [
                personaSkill(SkillNameData.BRAINJACK, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.ONESHOTKILL, 0),
                personaSkill(SkillNameData.EVADEWIND, 70),
                personaSkill(SkillNameData.TRIGGERHAPPY, 71),
                personaSkill(SkillNameData.BRAINWASHBOOST, 72),
                personaSkill(SkillNameData.MAKARAKARN, 73)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SUDARSHANA),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TRIGGERHAPPY && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 4),
                drop(skillCardList, 'Trigger Happy Ally', 5, 9),
                drop(skillCardList, 'Trigger Happy Main', 10, 12),
                drop(weaponList, ItemNameData.SUDARSHANA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 5, 16),
                drop(consumableList, ItemNameData.SOMA, 17, 18),
                drop(skillCardList, 'Trigger Happy Ally', 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SIEGFRIED,
            Arcana.Strength,
            69,
            [0, 0, 127.5, 92.5, 117.5, 120, 77.5],
            [ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.HIGHCOUNTER, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.CHARGE, 70),
                personaSkill(SkillNameData.GODOFWAR, 72),
                personaSkill(SkillNameData.VORPALBLADE, 74)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BALMUNG),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HEROEYEPATCH),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 9),
                drop(accessoryList, ItemNameData.HEROEYEPATCH, 10, 12),
                drop(weaponList, ItemNameData.BALMUNG, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(accessoryList, ItemNameData.HEROEYEPATCH, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KUBERA,
            Arcana.Fortune,
            69,
            [0, 0, 100, 120, 110, 107.5, 87.5],
            [ElemResist.Neutral, ElemResist.Null, ElemResist.Resist, ElemResist.Weak, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Weak, ElemResist.Weak, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.AGIRA, 0),
                personaSkill(SkillNameData.ZIONRA, 0),
                personaSkill(SkillNameData.GARURA, 0),
                personaSkill(SkillNameData.MARAGIRA, 70),
                personaSkill(SkillNameData.MAZIONRA, 71),
                personaSkill(SkillNameData.MAGARURA, 72),
                personaSkill(SkillNameData.SPELLMASTER, 74)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DHANUSHA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.KARMACHARM),
                skillCardList.find(s => s.skillName === SkillNameData.SPELLMASTER && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(accessoryList, ItemNameData.KARMACHARM, 10, 12),
                drop(weaponList, ItemNameData.DHANUSHA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 19),
                drop(accessoryList, ItemNameData.KARMACHARM, 20, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OGIER,
            Arcana.Strength,
            70,
            [0, 0, 135, 95, 115, 130, 85],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Resist, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MEGATONRAID, 0),
                personaSkill(SkillNameData.HIGHCOUNTER, 0),
                personaSkill(SkillNameData.CHARGE, 0),
                personaSkill(SkillNameData.MATARUKAJA, 71),
                personaSkill(SkillNameData.ARMSMASTER, 72),
                personaSkill(SkillNameData.BRAVEBLADE, 75)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CORTANA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HEROSMEDAL),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 9),
                drop(accessoryList, ItemNameData.HEROSMEDAL, 10, 12),
                drop(weaponList, ItemNameData.CORTANA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 5, 16),
                drop(consumableList, ItemNameData.SOMA, 17, 18),
                drop(accessoryList, ItemNameData.HEROSMEDAL, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MERLIN,
            Arcana.Magician,
            70,
            [0, 0, 90, 132.5, 95, 110, 92.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null, ElemResist.Null,
            ElemResist.Null, ElemResist.Neutral, ElemResist.Weak, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.AGIRA, 0),
                personaSkill(SkillNameData.MARAGIRA, 0),
                personaSkill(SkillNameData.SPELLMASTER, 0),
                personaSkill(SkillNameData.CONCENTRATE, 72),
                personaSkill(SkillNameData.INFERNO, 73),
                personaSkill(SkillNameData.FIREAMP, 75),
                personaSkill(SkillNameData.BLAZINGHELL, 76)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CARNWENNAN),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SORCERERAMULET),
                skillCardList.find(s => s.skillName === SkillNameData.FIREAMP && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(accessoryList, ItemNameData.SORCERERAMULET, 10, 12),
                drop(weaponList, ItemNameData.CARNWENNAN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.SOULFOOD, 17, 19),
                drop(accessoryList, ItemNameData.SORCERERAMULET, 20, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANGRAMAINYU,
            Arcana.Hanged,
            70,
            [0, 0, 100, 125, 112.5, 110, 95],
            [ElemResist.Repel, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb],
            [
                personaSkill(SkillNameData.EIGAONA, 0),
                personaSkill(SkillNameData.MAEIGAONA, 0),
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.MUDOBOOST, 71),
                personaSkill(SkillNameData.DEMONICSHADE, 72),
                personaSkill(SkillNameData.DEATHSTOUCH, 73),
                personaSkill(SkillNameData.CURSEAMP, 75)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.AVENGINGHAND),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DEMONICSHADE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 5, 9),
                drop(skillCardList, 'Demonic Shade Ally', 10, 12),
                drop(weaponList, ItemNameData.AVENGINGHAND, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.STRAWDOLL, 17, 18),
                drop(consumableList, ItemNameData.PHYSICALOINTMENT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.THRONE,
            Arcana.Justice,
            71,
            [0, 0, 105, 122.5, 117.5, 115, 90],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Null, ElemResist.Weak],
            [
                personaSkill(SkillNameData.HAMABOOST, 0),
                personaSkill(SkillNameData.INVIGORATE3, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.MAKOUGAONA, 73),
                personaSkill(SkillNameData.BLESSAMP, 74),
                personaSkill(SkillNameData.EVADECURSE, 75),
                personaSkill(SkillNameData.GODOFTHEHEARTH, 76)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SILVERBULLET),
                armorList.find(a => a.name === ItemNameData.GLIMMERINGROBES),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(armorList, ItemNameData.GLIMMERINGROBES, 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 17, 18),
                drop(consumableList, ItemNameData.SACREMENTALBREAD, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MOT,
            Arcana.Death,
            72,
            [0, 0, 107.5, 127.5, 120, 105, 97.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MATARUKAJA, 0),
                personaSkill(SkillNameData.MAZIONRA, 0),
                personaSkill(SkillNameData.MEGIDOLAON, 0),
                personaSkill(SkillNameData.CONCENTRATE, 74),
                personaSkill(SkillNameData.MEGIDOLAON, 76),
                personaSkill(SkillNameData.REPELELEC, 77)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.IRE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.CONCENTRATE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(skillCardList, 'Concentrate Ally', 10, 12),
                drop(weaponList, ItemNameData.IRE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 5, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CYBELE,
            Arcana.Priestess,
            73,
            [0, 0, 110, 120, 112.5, 127.5, 95],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MAKOUGAONA, 0),
                personaSkill(SkillNameData.MEDIARAHAN, 0),
                personaSkill(SkillNameData.SAMARECARM, 0),
                personaSkill(SkillNameData.BLESSAMP, 74),
                personaSkill(SkillNameData.GODOFTHEHEARTH, 76),
                personaSkill(SkillNameData.ABSORBBLESS, 77),
                personaSkill(SkillNameData.SALVATION, 79)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SABAZIOS),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MEDIARAHAN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(skillCardList, 'Mediarahan Ally', 10, 12),
                drop(weaponList, ItemNameData.SABAZIOS, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 5, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(consumableList, ItemNameData.BALMOFLIFE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MARA,
            Arcana.Tower,
            73,
            [0, 0, 117.5, 115, 122.5, 112.5, 97.5],
            [ElemResist.Neutral, ElemResist.Null, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MARAGIRA, 0),
                personaSkill(SkillNameData.ONESHOTKILL, 0),
                personaSkill(SkillNameData.TETRASMASH, 0),
                personaSkill(SkillNameData.CHARGE, 74),
                personaSkill(SkillNameData.MAEIGAONA, 76),
                personaSkill(SkillNameData.HEATUP, 77),
                personaSkill(SkillNameData.FIRMSTANCE, 79)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.EUNUCHBLADE),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.TOUGHBELT),
                skillCardList.find(s => s.skillName === SkillNameData.ONESHOTKILL && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(accessoryList, ItemNameData.TOUGHBELT, 5, 9),
                drop(skillCardList, 'One Shot Kill Main', 10, 12),
                drop(weaponList, ItemNameData.EUNUCHBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(accessoryList, ItemNameData.TOUGHBELT, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ROLAND,
            Arcana.Hanged,
            74,
            [0, 0, 130, 115, 130, 100, 95],
            [ElemResist.Null, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak],
            [
                personaSkill(SkillNameData.VORPALBLADE, 0),
                personaSkill(SkillNameData.REPELPHYS, 0),
                personaSkill(SkillNameData.ARMSMASTER, 0),
                personaSkill(SkillNameData.REGENERATE3, 74),
                personaSkill(SkillNameData.BRAVEBLADE, 76),
                personaSkill(SkillNameData.FASTHEAL, 77),
                personaSkill(SkillNameData.POWERUP, 79)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DURENDAL),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.POWERUP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(consumableList, ItemNameData.BEADCHAIN, 5, 9),
                drop(skillCardList, 'Power Up Main', 10, 12),
                drop(weaponList, ItemNameData.DURENDAL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ABADDON,
            Arcana.Judgement,
            74,
            [0, 0, 127.5, 95, 145, 107.5, 97.5],
            [ElemResist.Absorb, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Weak, ElemResist.Neutral, ElemResist.Absorb],
            [
                personaSkill(SkillNameData.BRAINBUSTER, 0),
                personaSkill(SkillNameData.MAKARAKARN, 0),
                personaSkill(SkillNameData.SPIRITDRAIN, 0),
                personaSkill(SkillNameData.SURVIVALTRICK, 77),
                personaSkill(SkillNameData.ABSORBPHYS, 79),
                personaSkill(SkillNameData.GIGANTOMACHIA, 80)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.SCOURGEOFGOD),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.BRAINBUSTER && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(skillCardList, 'Brain Buster Ally', 10, 12),
                drop(weaponList, ItemNameData.SCOURGEOFGOD, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.OGMIOS,
            Arcana.Lovers,
            75,
            [0, 0, 115, 115, 100, 112.5, 95],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BRAINBUSTER, 0),
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.BRAINJACK, 0),
                personaSkill(SkillNameData.MAPSIONRA, 76),
                personaSkill(SkillNameData.BRAINWASHBOOST, 78),
                personaSkill(SkillNameData.PSYCHOFORCE, 79),
                personaSkill(SkillNameData.SOULCHAIN, 80)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.OGMIOS),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SOULCHAIN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(skillCardList, 'Soul Chain Ally', 10, 12),
                drop(weaponList, ItemNameData.OGMIOS, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BAAL,
            Arcana.Emperor,
            75,
            [0, 0, 120, 125, 117.5, 117.5, 100],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.MAGARURA, 0),
                personaSkill(SkillNameData.MATARUKAJA, 0),
                personaSkill(SkillNameData.REVOLUTION, 0),
                personaSkill(SkillNameData.PANTARHEI, 77),
                personaSkill(SkillNameData.TETRAJA, 78),
                personaSkill(SkillNameData.CHARGE, 79),
                personaSkill(SkillNameData.AYAMUR, 80)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.YAGRUSH),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.AYAMUR && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOMUNCULUS, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(skillCardList, 'Ayamur Ally', 10, 12),
                drop(weaponList, ItemNameData.YAGRUSH, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.HOMUNCULUS, 17, 18),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ONGYOKI,
            Arcana.Hermit,
            75,
            [0, 0, 140, 105, 117.5, 120, 97.5],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MAKAJAMAON, 0),
                personaSkill(SkillNameData.PRESSINGSTANCE, 0),
                personaSkill(SkillNameData.DEADLYFURY, 0),
                personaSkill(SkillNameData.GODOFTHEFORGE, 77),
                personaSkill(SkillNameData.REGENERATE3, 78),
                personaSkill(SkillNameData.FIRMSTANCE, 79),
                personaSkill(SkillNameData.AGNEYASTRA, 81)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PENITENCE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.AGNEYASTRA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(consumableList, ItemNameData.BEADCHAIN, 5, 9),
                drop(skillCardList, 'Agneyastra Ally', 10, 12),
                drop(weaponList, ItemNameData.PENITENCE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SANDALPHON,
            Arcana.Moon,
            75,
            [0, 0, 115, 127.5, 122.5, 120, 95],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Null],
            [
                personaSkill(SkillNameData.AMRITASHOWER, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.SAMARECARM, 0),
                personaSkill(SkillNameData.ANGELICGRACE, 77),
                personaSkill(SkillNameData.REPELCURSE, 78),
                personaSkill(SkillNameData.SWORDDANCE, 80)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BRIONAC),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ANGELICGRACE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Angelic Grace Ally', 10, 12),
                drop(weaponList, ItemNameData.BRIONAC, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ASURA,
            Arcana.Sun,
            76,
            [0, 0, 130, 120, 127.5, 122.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ATOMICFLARE, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.MARAKUKAJA, 0),
                personaSkill(SkillNameData.GODOFWAR, 78),
                personaSkill(SkillNameData.COSMICFLARE, 79),
                personaSkill(SkillNameData.HIGHCOUNTER, 80),
                personaSkill(SkillNameData.UNSHAKENWILL, 81)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ASURASWRATH),
                armorList.find(a => a.name === ItemNameData.BRAVESUIT),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.KONGOUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 5, 9),
                drop(consumableList, ItemNameData.BEADCHAIN, 10, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 17, 18),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FUTSUNUSHI,
            Arcana.Magician,
            76,
            [0, 0, 135, 120, 117.5, 122.5, 92.5],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ALIDANCE, 0),
                personaSkill(SkillNameData.MATARUKAJA, 0),
                personaSkill(SkillNameData.VORPALBLADE, 0),
                personaSkill(SkillNameData.CHARGE, 78),
                personaSkill(SkillNameData.REGENERATE3, 79),
                personaSkill(SkillNameData.APTPUPIL, 80),
                personaSkill(SkillNameData.FIRMSTANCE, 81),
                personaSkill(SkillNameData.SWORDDANCE, 82) // Intentionally Changed
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.HAGOROMO),
                accessoryList.find(a => a.name === ItemNameData.RINGOFRENEWAL),
                skillCardList.find(s => s.skillName === SkillNameData.CHARGE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.BEADCHAIN, 5, 9),
                drop(skillCardList, 'Charge Main', 10, 12),
                drop(accessoryList, ItemNameData.RINGOFRENEWAL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.KONGOUOFUDA, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GABRIEL,
            Arcana.Temperance,
            77,
            [0, 0, 107.5, 127.5, 120, 135, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.MABUFURA, 0),
                personaSkill(SkillNameData.MAZIONRA, 0),
                personaSkill(SkillNameData.DIVINEJUDGEMENT, 78),
                personaSkill(SkillNameData.ALIDANCE, 79),
                personaSkill(SkillNameData.EVADECURSE, 80),
                personaSkill(SkillNameData.TOUCHNGO, 81),
                personaSkill(SkillNameData.ICEAMP, 82),
                personaSkill(SkillNameData.SALVATION, 83)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SAGESRING),
                skillCardList.find(s => s.skillName === SkillNameData.DIVINEJUDGEMENT && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Divine Judgement Ally', 10, 12),
                drop(accessoryList, ItemNameData.SAGESRING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.BEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.GILGAMESH,
            Arcana.Emperor,
            77,
            [0, 0, 140, 117.5, 122.5, 130, 80],
            [ElemResist.Neutral, ElemResist.Null, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.MEGIDOLAON, 0),
                personaSkill(SkillNameData.GODOFTHEFORGE, 0),
                personaSkill(SkillNameData.LIFECHAIN, 78),
                personaSkill(SkillNameData.ENDURINGSOUL, 79),
                personaSkill(SkillNameData.SWORDDANCE, 80),
                personaSkill(SkillNameData.BLACKWINGS, 82),
                personaSkill(SkillNameData.ALMIGHTYBOOST, 84)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.EA),
                armorList.find(a => a.name === ItemNameData.BABREBAYAN),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.BALMOFLIFE, 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(consumableList, ItemNameData.BEADCHAIN, 10, 12),
                drop(accessoryList, ItemNameData.ROLANDMEDAL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(consumableList, ItemNameData.BALMOFLIFE, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LAKSHMI,
            Arcana.Fortune,
            77,
            [0, 0, 110, 132.5, 117.5, 125, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFURA, 0),
                personaSkill(SkillNameData.DIARAHAN, 0),
                personaSkill(SkillNameData.LULLABY, 0),
                personaSkill(SkillNameData.MEDIARAHAN, 78),
                personaSkill(SkillNameData.CLIMATEDECORUM, 79),
                personaSkill(SkillNameData.AMRITASHOWER, 80),
                personaSkill(SkillNameData.LIFEAID, 82)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LOTUS),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.TYCHECHARM),
                skillCardList.find(s => s.skillName === SkillNameData.LIFEAID && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Life Aid Ally', 10, 12),
                drop(accessoryList, ItemNameData.TYCHECHARM, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 5, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KALI,
            Arcana.Empress,
            77,
            [0, 0, 132.5, 112.5, 115, 132.5, 102.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.PSIONRA, 0),
                personaSkill(SkillNameData.TENTARAFOO, 0),
                personaSkill(SkillNameData.VORPALBLADE, 0),
                personaSkill(SkillNameData.EVADEICE, 79),
                personaSkill(SkillNameData.HIGHCOUNTER, 80),
                personaSkill(SkillNameData.MAPSIONRA, 81),
                personaSkill(SkillNameData.ABSORBNUKE, 82)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SKANDASOCKS),
                skillCardList.find(s => s.skillName === SkillNameData.VORPALBLADE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(accessoryList, ItemNameData.SKANDASOCKS, 8, 11),
                drop(skillCardList, 'Vorpal Blade Main', 11, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.REVIVALBEAD, 17, 18),
                drop(consumableList, ItemNameData.BEAD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.RAPHAEL,
            Arcana.Lovers,
            78,
            [0, 0, 142.5, 112.5, 122.5, 137.5, 87.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.DEKAJA, 0),
                personaSkill(SkillNameData.CHARGE, 0),
                personaSkill(SkillNameData.HEATRISER, 80),
                personaSkill(SkillNameData.GROWTH3, 81),
                personaSkill(SkillNameData.ADVERSERESOLVE, 82),
                personaSkill(SkillNameData.GODOFWAR, 83)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SOULFONT),
                skillCardList.find(s => s.skillName === SkillNameData.GODOFWAR && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.DRINKINGSOUL, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'God of War Ally', 10, 12),
                drop(accessoryList, ItemNameData.SOULFONT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LUGH,
            Arcana.Moon,
            78,
            [0, 0, 135, 115, 120, 112.5, 100],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Null, ElemResist.Weak, ElemResist.Repel, ElemResist.Resist, ElemResist.Resist],
            [
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.MAZIONRA, 0),
                personaSkill(SkillNameData.GODOFWAR, 0),
                personaSkill(SkillNameData.SHOCKBOOST, 79),
                personaSkill(SkillNameData.THUNDERREIGN, 80),
                personaSkill(SkillNameData.BLOODSUCKER, 81),
                personaSkill(SkillNameData.REPELPHYS, 83)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LUGHSCHAIN),
                armorList.find(a => a.name === ItemNameData.DUBAN),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.THUNDERREIGN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(consumableList, ItemNameData.BEADCHAIN, 5, 9),
                drop(skillCardList, 'Thunder Reign Ally', 10, 12),
                drop(skillCardList, 'Thunder Reign Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.YOSHITSUNE,
            Arcana.Tower,
            79,
            [0, 0, 145, 117.5, 112.5, 132.5, 102.5],
            [ElemResist.Null, ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.CHARGE, 0),
                personaSkill(SkillNameData.ZIONRA, 0),
                personaSkill(SkillNameData.PRESSINGSTANCE, 81),
                personaSkill(SkillNameData.FASTHEAL, 82),
                personaSkill(SkillNameData.ELECAMP, 84),
                personaSkill(SkillNameData.HASSOUTOBI, 86)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.GENJIARMOR),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ELECAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(consumableList, ItemNameData.HIRANYA, 5, 9),
                drop(skillCardList, 'Elec Amp Ally', 10, 12),
                drop(skillCardList, 'Elec Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 5, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 17, 18),
                drop(consumableList, ItemNameData.HIRANYA, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MOTHERHARLOT,
            Arcana.Empress,
            80,
            [0, 0, 137.5, 120, 115, 122.5, 122.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Null],
            [
                personaSkill(SkillNameData.MABUFURA, 0),
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.MUDOBOOST, 0),
                personaSkill(SkillNameData.ICEAGE, 81),
                personaSkill(SkillNameData.ICEAMP, 82),
                personaSkill(SkillNameData.NULLBLESS, 83),
                personaSkill(SkillNameData.DEBILITATE, 85)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.JACKAL),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ICEAGE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOLYWATER, 1, 4),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 5, 9),
                drop(skillCardList, 'Ice Age Ally', 10, 12),
                drop(skillCardList, 'Ice Age Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 17, 18),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SRAOSHA,
            Arcana.Star,
            80,
            [0, 0, 117.5, 140, 112.5, 140, 107.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Weak],
            [
                personaSkill(SkillNameData.HAMABOOST, 0),
                personaSkill(SkillNameData.KOUGAONA, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.HOLYFURY, 74),
                personaSkill(SkillNameData.ANGELICGRACE, 76),
                personaSkill(SkillNameData.AMRITASHOWER, 77),
                personaSkill(SkillNameData.DEBILITATE, 79)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.VELIFICATIO),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DEBILITATE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(skillCardList, 'Debilitate Ally', 10, 12),
                drop(skillCardList, 'Debilitate Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KRONOS,
            Arcana.Strength,
            80,
            [0, 0, 150, 90, 120, 110, 92.5],
            [ElemResist.Null, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.ATTACKMASTER, 0),
                personaSkill(SkillNameData.REGENERATE3, 82),
                personaSkill(SkillNameData.HUNKERDOWN, 83),
                personaSkill(SkillNameData.FORTIFYSPIRIT, 84),
                personaSkill(SkillNameData.PHOENIXASH, 85)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.KRONUS),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HERCULEANANKLET),
                skillCardList.find(s => s.skillName === SkillNameData.HUNKERDOWN && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.RASETSUOFUDA, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(skillCardList, 'Hunker Down Ally', 10, 12),
                drop(accessoryList, ItemNameData.HERCULEANANKLET, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.RASETSUOFUDA, 17, 18),
                drop(consumableList, ItemNameData.BALMOFLIFE, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ZAOUGONGEN,
            Arcana.Strength,
            80,
            [0, 0, 142.5, 112.5, 125, 140, 97.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.ABYSMALSURGE, 0),
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.MARAGIRA, 0),
                personaSkill(SkillNameData.EVADEPHYS, 82),
                personaSkill(SkillNameData.PHOENIXASH, 83),
                personaSkill(SkillNameData.CRIPPLE, 84),
                personaSkill(SkillNameData.BLAZINGHELL, 86)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HACHIMANBELT),
                skillCardList.find(s => s.skillName === SkillNameData.CRIPPLE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Cripple Ally', 10, 12),
                drop(accessoryList, ItemNameData.HACHIMANBELT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MESSIAH,
            Arcana.Judgement,
            81,
            [0, 0, 125, 125, 125, 125, 125],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Resist, ElemResist.Resist, ElemResist.Repel, ElemResist.Weak],
            [
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.MEGIDOLAON, 0),
                personaSkill(SkillNameData.ORATORIO, 0),
                personaSkill(SkillNameData.REGENERATE3, 82),
                personaSkill(SkillNameData.PHOENIXASH, 83),
                personaSkill(SkillNameData.INVIGORATE3, 84),
                personaSkill(SkillNameData.ABSORBPHYS, 85),
                personaSkill(SkillNameData.ALMIGHTYAMP, 87)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.DISPELRING),
                skillCardList.find(s => s.skillName === SkillNameData.ALMIGHTYAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(skillCardList, 'Oratorio Main', 5, 9),
                drop(accessoryList, ItemNameData.DISPELRING, 10, 12),
                drop(skillCardList, 'Almighty Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 5, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.URIEL,
            Arcana.Justice,
            81,
            [0, 0, 125, 135, 122.5, 137.5, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Repel, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.REPELNUKE, 83),
                personaSkill(SkillNameData.MEGIDOLAON, 84),
                personaSkill(SkillNameData.ANGELICGRACE, 85),
                personaSkill(SkillNameData.SPELLMASTER, 86)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.HEAVENRING),
                skillCardList.find(s => s.skillName === SkillNameData.ANGELICGRACE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(accessoryList, ItemNameData.HEAVENRING, 5, 9),
                drop(skillCardList, 'Angelic Grace Ally', 10, 12),
                drop(skillCardList, 'Angelic Grace Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(accessoryList, ItemNameData.HEAVENRING, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ATTIS,
            Arcana.Hanged,
            82,
            [0, 0, 140, 125, 120, 127.5, 120],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Repel, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak],
            [
                personaSkill(SkillNameData.MARAGIRA, 0),
                personaSkill(SkillNameData.SALVATION, 0),
                personaSkill(SkillNameData.THERMOPYLAE, 0),
                personaSkill(SkillNameData.PHOENIXASH, 84),
                personaSkill(SkillNameData.SAMARECARM, 85),
                personaSkill(SkillNameData.ABSORBCURSE, 86),
                personaSkill(SkillNameData.BLAZINGHELL, 88)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.THESTAMPEDE),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.THERMOPYLAE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.BALMOFLIFE, 5, 9),
                drop(skillCardList, 'Thermopylae Ally', 10, 12),
                drop(skillCardList, 'Thermopylae Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.BALMOFLIFE, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ODIN,
            Arcana.Emperor,
            82,
            [0, 0, 132.5, 130, 135, 130, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Repel],
            [
                personaSkill(SkillNameData.MARAKUKAJA, 0),
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.THUNDERREIGN, 0),
                personaSkill(SkillNameData.WILDTHUNDER, 84),
                personaSkill(SkillNameData.CONCENTRATE, 85),
                personaSkill(SkillNameData.FASTHEAL, 86),
                personaSkill(SkillNameData.ELECAMP, 87)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GUNGNIR),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.ODINSAMULET),
                skillCardList.find(s => s.skillName === SkillNameData.WILDTHUNDER && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(skillCardList, 'Fast Heal Ally', 5, 9),
                drop(skillCardList, 'Wild Thunder Ally', 10, 12),
                drop(accessoryList, ItemNameData.ODINSAMULET, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SHIVA,
            Arcana.Judgement,
            82,
            [0, 0, 137.5, 135, 132.5, 132.5, 95],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.ENDURINGSOUL, 0),
                personaSkill(SkillNameData.MAZIONRA, 0),
                personaSkill(SkillNameData.PSYCHOFORCE, 0),
                personaSkill(SkillNameData.RIOTGUN, 85),
                personaSkill(SkillNameData.BLACKWINGS, 86),
                personaSkill(SkillNameData.GODOFWAR, 87),
                personaSkill(SkillNameData.PSYCHOBLAST, 88)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.CHENTU),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.PSYCHRING),
                skillCardList.find(s => s.skillName === SkillNameData.PSYCHOBLAST && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 6),
                drop(accessoryList, ItemNameData.PSYCHRING, 7, 12),
                drop(skillCardList, 'Psycho Blast Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 5, 16),
                drop(consumableList, ItemNameData.SOMA, 17, 18),
                drop(accessoryList, ItemNameData.PSYCHRING, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ALUCARD,
            Arcana.Death,
            83,
            [0, 0, 130, 130, 130, 130, 110],
            [ElemResist.Null, ElemResist.Null, ElemResist.Weak, ElemResist.Resist, ElemResist.Resist,
            ElemResist.Null, ElemResist.Absorb, ElemResist.Weak, ElemResist.Weak, ElemResist.Absorb],
            [
                personaSkill(SkillNameData.BRAVEBLADE, 0),
                personaSkill(SkillNameData.RIOTGUN, 0),
                personaSkill(SkillNameData.SOULVAMPIRE, 0),
                personaSkill(SkillNameData.DEMONICSHADE, 84),
                personaSkill(SkillNameData.BLACKWINGS, 86),
                personaSkill(SkillNameData.CURSEAMP, 87),
                personaSkill(SkillNameData.DEVILSWINGS, 89)
            ], // skills
            [
                emptyItem,
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SOULVAMPIRE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(skillCardList, 'Demonic Shade Ally', 5, 9),
                drop(skillCardList, 'Demonic Shade Main', 10, 12),
                drop(skillCardList, 'Soul Vampire Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.VISHNU,
            Arcana.Fool,
            83,
            [0, 0, 140, 127.5, 122.5, 142.5, 107.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Absorb, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.ALIDANCE, 0),
                personaSkill(SkillNameData.MAGARURA, 0),
                personaSkill(SkillNameData.BLACKWINGS, 0),
                personaSkill(SkillNameData.VACUUMWAVE, 85),
                personaSkill(SkillNameData.CHARGE, 86),
                personaSkill(SkillNameData.REPELFIRE, 87),
                personaSkill(SkillNameData.WINDAMP, 88),
                personaSkill(SkillNameData.RIOTGUN, 90)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GUNSLINGER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.WINDAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Wind Amp Ally', 10, 12),
                drop(skillCardList, 'Wind Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARDHA,
            Arcana.Temperance,
            84,
            [0, 0, 135, 140, 137.5, 135, 100],
            [ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Null,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.COSMICFLARE, 0),
                personaSkill(SkillNameData.GODSHAND, 0),
                personaSkill(SkillNameData.INVIGORATE3, 0),
                personaSkill(SkillNameData.AGNEYASTRA, 87),
                personaSkill(SkillNameData.MESSENGERGOD, 88),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 89),
                personaSkill(SkillNameData.SALVATION, 90)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BAKUYA),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.GAIABELT),
                skillCardList.find(s => s.skillName === SkillNameData.MESSENGERGOD && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Messenger God Ally', 10, 12),
                drop(accessoryList, ItemNameData.GAIABELT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.BEADCHAIN, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.BEELZEBUB,
            Arcana.Devil,
            84,
            [0, 0, 137.5, 150, 135, 140, 85],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.EVILSMILE, 0),
                personaSkill(SkillNameData.MAEIGAONA, 0),
                personaSkill(SkillNameData.MAMUDOON, 0),
                personaSkill(SkillNameData.CURSEAMP, 85),
                personaSkill(SkillNameData.CONCENTRATE, 86),
                personaSkill(SkillNameData.DEMONICDECREE, 87),
                personaSkill(SkillNameData.REPELICE, 88),
                personaSkill(SkillNameData.BLACKWINGS, 89)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.MERCILESS),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DEMONICDECREE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.MYSTERYMEAT, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(skillCardList, 'Demonic Decree Ally', 10, 12),
                drop(skillCardList, 'Demonic Decree Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ISHTAR,
            Arcana.Lovers,
            85,
            [0, 0, 120, 147.5, 122.5, 145, 120],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null,
            ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.ABSORBWIND, 0),
                personaSkill(SkillNameData.MEDIARAHAN, 0),
                personaSkill(SkillNameData.SAMARECARM, 0),
                personaSkill(SkillNameData.INSTAHEAL, 87),
                personaSkill(SkillNameData.WILDTHUNDER, 88),
                personaSkill(SkillNameData.GODOFMAGIC, 89),
                personaSkill(SkillNameData.SALVATION, 90)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.DEATHSDOMAIN),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.SALVATION && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Salvation Ally', 10, 12),
                drop(skillCardList, 'Salvation Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 2, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MADA,
            Arcana.Tower,
            85,
            [0, 0, 130, 127.5, 145, 140, 112.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.INFERNO, 0),
                personaSkill(SkillNameData.BURNBOOST, 0),
                personaSkill(SkillNameData.FIREAMP, 0),
                personaSkill(SkillNameData.UNSHAKENWILL, 86),
                personaSkill(SkillNameData.BLAZINGHELL, 87),
                personaSkill(SkillNameData.AMRITASHOWER, 88),
                personaSkill(SkillNameData.PHOENIXASH, 90),
                personaSkill(SkillNameData.GODOFMAGIC, 91)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GIANTSLAYER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.FIREAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HIRANYA, 1, 4),
                drop(consumableList, ItemNameData.SOULFOOD, 5, 9),
                drop(skillCardList, 'Fire Amp Ally', 10, 12),
                drop(skillCardList, 'Fire Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 2, 11),
                drop(lootList, ItemNameData.BLACKKOGATANA, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.DRINKINGSOUL, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ANAT,
            Arcana.Priestess,
            86,
            [0, 0, 137.5, 140, 125, 135, 100],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Neutral, ElemResist.Resist],
            [
                personaSkill(SkillNameData.ATOMICFLARE, 0),
                personaSkill(SkillNameData.MEDIARAHAN, 0),
                personaSkill(SkillNameData.MARAKUKAJA, 0),
                personaSkill(SkillNameData.BRAVEBLADE, 87),
                personaSkill(SkillNameData.NUKEAMP, 88),
                personaSkill(SkillNameData.ATOMICFLARE, 89),
                personaSkill(SkillNameData.EVADEPSY, 90),
                personaSkill(SkillNameData.LIFEREAPER, 91)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.UMBRA),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.COSMICFLARE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(skillCardList, 'Mediarahan Main', 5, 9),
                drop(skillCardList, 'Cosmic Flare Ally', 10, 12),
                drop(skillCardList, 'Cosmic Flare Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.HIRANYA, 17, 18),
                drop(consumableList, ItemNameData.BEAD, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.CHIYOU,
            Arcana.Chariot,
            86,
            [0, 0, 135, 140, 132.5, 130, 125],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.PSYCHOFORCE, 0),
                personaSkill(SkillNameData.REPELPHYS, 0),
                personaSkill(SkillNameData.FORTIFYSPIRIT, 88),
                personaSkill(SkillNameData.PSYCHOBLAST, 89),
                personaSkill(SkillNameData.ABSORBPSY, 90),
                personaSkill(SkillNameData.CONCENTRATE, 92)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.KANSHOU),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.MASTERSRING),
                emptyItem
            ], // transmu
            [
                drop(skillCardList, 'Concentrate Ally', 1, 4),
                drop(consumableList, ItemNameData.BEAD, 5, 9),
                drop(skillCardList, 'Psycho Force Ally', 10, 12),
                drop(accessoryList, ItemNameData.MASTERSRING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(skillCardList, 'Concentrate Ally', 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.KOHRYUU,
            Arcana.Hierophant,
            87,
            [0, 0, 127.5, 152.5, 140, 150, 110],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Null, ElemResist.Null, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.PSYCHOFORCE, 0),
                personaSkill(SkillNameData.MEDIARAHAN, 0),
                personaSkill(SkillNameData.PSYCHOBLAST, 0),
                personaSkill(SkillNameData.LIFEAID, 88),
                personaSkill(SkillNameData.CONCENTRATE, 89),
                personaSkill(SkillNameData.PSYAMP, 90),
                personaSkill(SkillNameData.GODOFMAGIC, 98)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.PUFFTHEMAGICDRAGON),
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.SAGESRING),
                skillCardList.find(s => s.skillName === SkillNameData.PSYCHOBLAST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Mediarahan Main', 1, 4),
                drop(consumableList, ItemNameData.BEADCHAIN, 5, 9),
                drop(skillCardList, 'Psycho Blast Ally', 10, 12),
                drop(accessoryList, ItemNameData.SAGESRING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 2, 11),
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(skillCardList, 'Mediarahan Ally', 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.MICHAEL,
            Arcana.Judgement,
            87,
            [0, 0, 142.5, 135, 137.5, 140, 115],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel, ElemResist.Null],
            [
                personaSkill(SkillNameData.DEBILITATE, 0),
                personaSkill(SkillNameData.DIVINEJUDGEMENT, 0),
                personaSkill(SkillNameData.DIAMONDDUST, 0),
                personaSkill(SkillNameData.SWORDDANCE, 89),
                personaSkill(SkillNameData.MAHAMAON, 90),
                personaSkill(SkillNameData.BLACKWINGS, 91),
                personaSkill(SkillNameData.COSMICFLARE, 92)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.VELIFICATIO),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.DEBILITATE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.HOLYWATER, 1, 4),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 5, 9),
                drop(skillCardList, 'Debilitate Ally', 10, 12),
                drop(skillCardList, 'Debilitate Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 4, 16),
                drop(consumableList, ItemNameData.HOLYWATER, 17, 18),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 19, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ALICE,
            Arcana.Death,
            88,
            [0, 0, 130, 180, 115, 145, 120],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Resist, ElemResist.Resist, ElemResist.Weak, ElemResist.Repel],
            [
                personaSkill(SkillNameData.DEKUNDA, 0),
                personaSkill(SkillNameData.DEATHSTOUCH, 0),
                personaSkill(SkillNameData.MUDOBOOST, 0),
                personaSkill(SkillNameData.DIEFORME, 89),
                personaSkill(SkillNameData.MORNINGSTAR, 90),
                personaSkill(SkillNameData.CONCENTRATE, 91),
                personaSkill(SkillNameData.SURVIVALTRICK, 92)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.REAPER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MUDOBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.STRAWDOLL, 1, 4),
                drop(skillCardList, 'Survival Trick Ally', 5, 9),
                drop(skillCardList, 'Mudo Boost Ally', 10, 12),
                drop(skillCardList, 'Mudo Boost Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 5, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 17, 18),
                drop(consumableList, ItemNameData.STRAWDOLL, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.METATRON,
            Arcana.Justice,
            89,
            [0, 0, 135, 152.5, 150, 155, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak,
            ElemResist.Repel, ElemResist.Absorb, ElemResist.Absorb, ElemResist.Neutral, ElemResist.Weak],
            [
                personaSkill(SkillNameData.SWORDDANCE, 0),
                personaSkill(SkillNameData.MAHAMAON, 0),
                personaSkill(SkillNameData.HOLYFURY, 0),
                personaSkill(SkillNameData.BLACKWINGS, 91),
                personaSkill(SkillNameData.HAMABOOST, 92),
                personaSkill(SkillNameData.CONCENTRATE, 93),
                personaSkill(SkillNameData.BLESSAMP, 94),
                personaSkill(SkillNameData.DIVINEJUDGEMENT, 95)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LANCEOFLONGINUS),
                armorList.find(a => a.name === ItemNameData.VELIFICATIO),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(skillCardList, 'Divine Judgement Ally', 5, 9),
                drop(skillCardList, 'Divine Judgement Main', 10, 12),
                drop(armorList, ItemNameData.VELIFICATIO, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 5, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.HEKATE,
            Arcana.Hermit,
            89,
            [0, 0, 120, 160, 140, 125, 105],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Null, ElemResist.Weak, ElemResist.Resist,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.INFERNO, 0),
                personaSkill(SkillNameData.CONCENTRATE, 0),
                personaSkill(SkillNameData.SAMARECARM, 0),
                personaSkill(SkillNameData.FIREAMP, 90),
                personaSkill(SkillNameData.GODOFMAGIC, 91),
                personaSkill(SkillNameData.BLAZINGHELL, 92),
                personaSkill(SkillNameData.EVADEICE, 93),
                personaSkill(SkillNameData.SOULCHAIN, 95)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HADESLASH),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.BLAZINGHELL && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(skillCardList, 'Inferno Main', 1, 4),
                drop(skillCardList, 'Blazing Hell Ally', 5, 9),
                drop(skillCardList, 'Blazing Hell Main', 10, 12),
                drop(skillCardList, 'Fire Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(consumableList, ItemNameData.SOULFOOD, 17, 18),
                drop(skillCardList, 'Inferno Ally', 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARTHUR,
            Arcana.Emperor,
            90,
            [0, 0, 170, 100, 150, 135, 125],
            [ElemResist.Null, ElemResist.Null, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral, ElemResist.Null, ElemResist.Null],
            [
                personaSkill(SkillNameData.SWORDDANCE, 0),
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.CHARGE, 0),
                personaSkill(SkillNameData.GODOFWAR, 91),
                personaSkill(SkillNameData.POWERUP, 92),
                personaSkill(SkillNameData.HUNKERDOWN, 93),
                personaSkill(SkillNameData.GODOFTHEFORGE, 95)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.EXCALIBUR),
                armorList.find(a => a.name === ItemNameData.PRYDWEN),
                accessoryList.find(a => a.name === ItemNameData.MASTERSRING),
                emptyItem
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEAD, 1, 4),
                drop(skillCardList, 'God of the Forge Main', 5, 9),
                drop(accessoryList, ItemNameData.MASTERSRING, 10, 12),
                drop(armorList, ItemNameData.PRYDWEN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 3, 16),
                drop(consumableList, ItemNameData.WARDINGTALISMAN, 17, 18),
                drop(consumableList, ItemNameData.BEAD, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.FAFNIR,
            Arcana.Strength,
            90,
            [0, 0, 200, 100, 140, 117.5, 95],
            [ElemResist.Resist, ElemResist.Repel, ElemResist.Absorb, ElemResist.Resist, ElemResist.Neutral,
            ElemResist.Weak, ElemResist.Absorb, ElemResist.Resist, ElemResist.Weak, ElemResist.Absorb],
            [
                personaSkill(SkillNameData.DRAGONCLAW, 0),
                personaSkill(SkillNameData.SURVIVALTRICK, 0),
                personaSkill(SkillNameData.HEALINGFACTOR, 0),
                personaSkill(SkillNameData.CHARGE, 91),
                personaSkill(SkillNameData.DRAGONTHRASH, 92),
                personaSkill(SkillNameData.HEATRISER, 93),
                personaSkill(SkillNameData.INSTAHEAL, 95)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.GRAM),
                armorList.find(a => a.name === ItemNameData.FAFNIRMAIL),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.HEALINGFACTOR && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.MYSTERYMEAT, 1, 4),
                drop(skillCardList, 'Heat Riser Main', 5, 9),
                drop(skillCardList, 'Healing Factor Ally', 10, 12),
                drop(armorList, ItemNameData.FAFNIRMAIL, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKKOGATANA, 4, 18),
                drop(consumableList, ItemNameData.MYSTERYMEAT, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.AHURAMAZDA,
            Arcana.Sun,
            90,
            [0, 0, 150, 175, 110, 140, 107.5],
            [ElemResist.Null, ElemResist.Null, ElemResist.Absorb, ElemResist.Weak, ElemResist.Absorb,
            ElemResist.Resist, ElemResist.Absorb, ElemResist.Weak, ElemResist.Absorb, ElemResist.Weak],
            [
                personaSkill(SkillNameData.INFERNO, 0),
                personaSkill(SkillNameData.SALVATION, 0),
                personaSkill(SkillNameData.THUNDERREIGN, 0),
                personaSkill(SkillNameData.PSYCHOFORCE, 91),
                personaSkill(SkillNameData.DIVINELIGHT, 92),
                personaSkill(SkillNameData.CONCENTRATE, 93),
                personaSkill(SkillNameData.MAGICBOOST, 95)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HANDOFGOD),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAGICBOOST && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 4),
                drop(skillCardList, 'Divine Light Ally', 5, 9),
                drop(skillCardList, 'Magic Boost Ally', 10, 12),
                drop(skillCardList, 'Magic Boost Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.IRONSAND, 2, 11),
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(consumableList, ItemNameData.SOULFOOD, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.ARTEMIS,
            Arcana.Moon,
            90,
            [0, 0, 165, 140, 125, 160, 105],
            [ElemResist.Neutral, ElemResist.Absorb, ElemResist.Resist, ElemResist.Absorb, ElemResist.Weak,
            ElemResist.Absorb, ElemResist.Absorb, ElemResist.Resist, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.RIOTGUN, 0),
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.PSYCHOFORCE, 0),
                personaSkill(SkillNameData.ARTEMISARROW, 91),
                personaSkill(SkillNameData.GODOFTHEHEARTH, 92),
                personaSkill(SkillNameData.THERMOPYLAE, 94),
                personaSkill(SkillNameData.INVIGORATE3, 96)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.ARTEMIS),
                armorList.find(a => a.name === ItemNameData.BRAVESUIT),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.THERMOPYLAE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(skillCardList, 'Thermopylae Ally', 5, 9),
                drop(armorList, ItemNameData.BRAVESUIT, 10, 12),
                drop(skillCardList, 'Thermopylae Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 3, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.SOULFOOD, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.APOLLO,
            Arcana.Magician,
            91,
            [0, 0, 100, 200, 120, 160, 115],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Absorb, ElemResist.Weak, ElemResist.Absorb,
            ElemResist.Absorb, ElemResist.Weak, ElemResist.Absorb, ElemResist.Absorb, ElemResist.Weak],
            [
                personaSkill(SkillNameData.COSMICFLARE, 0),
                personaSkill(SkillNameData.VACUUMWAVE, 0),
                personaSkill(SkillNameData.GODOFMAGIC, 0),
                personaSkill(SkillNameData.DIVINELIGHT, 92),
                personaSkill(SkillNameData.INFERNO, 93),
                personaSkill(SkillNameData.CONCENTRATE, 94),
                personaSkill(SkillNameData.MAGICAMP, 96)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.APOLLO),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.MAGICAMP && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 9),
                drop(skillCardList, 'Magic Amp Ally', 10, 12),
                drop(skillCardList, 'Magic Amp Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 4, 16),
                drop(consumableList, ItemNameData.BEADCHAIN, 17, 18),
                drop(consumableList, ItemNameData.SOMA, 19, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SATAN,
            Arcana.Judgement,
            92,
            [0, 0, 155, 147.5, 137.5, 130, 137.5],
            [ElemResist.Neutral, ElemResist.Resist, ElemResist.Neutral, ElemResist.Repel, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Repel],
            [
                personaSkill(SkillNameData.DIAMONDDUST, 0),
                personaSkill(SkillNameData.ICEAGE, 0),
                personaSkill(SkillNameData.REGENERATE3, 0),
                personaSkill(SkillNameData.BLACKWINGS, 94),
                personaSkill(SkillNameData.INVIGORATE3, 95),
                personaSkill(SkillNameData.FORTIFYSPIRIT, 96),
                personaSkill(SkillNameData.CONCENTRATE, 97),
                personaSkill(SkillNameData.ABSORBICE, 98)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HELLSTYPEWRITER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.ICEAGE && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOULFOOD, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Invigorate 3 Ally', 10, 12),
                drop(skillCardList, 'Ice Age Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.ALUMINUMSHEETS, 2, 16),
                drop(consumableList, ItemNameData.SOULFOOD, 17, 20)
            ], // drops
            false,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.LUCIFER,
            Arcana.Star,
            93,
            [0, 0, 152.5, 147.5, 147.5, 140, 127.5],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.GIGANTOMACHIA, 0),
                personaSkill(SkillNameData.BLAZINGHELL, 0),
                personaSkill(SkillNameData.MORNINGSTAR, 94),
                personaSkill(SkillNameData.GODOFMAGIC, 95),
                personaSkill(SkillNameData.HEATRISER, 96),
                personaSkill(SkillNameData.FORTIFIEDMOXY, 97),
                personaSkill(SkillNameData.INSTAHEAL, 98),
                personaSkill(SkillNameData.ABSORBPHYS, 99)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LIGHTBRINGER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.INSTAHEAL && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(consumableList, ItemNameData.BEADCHAIN, 1, 4),
                drop(consumableList, ItemNameData.SOMA, 5, 9),
                drop(skillCardList, 'Insta-heal Ally', 10, 12),
                drop(skillCardList, 'Insta-heal Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 4, 16),
                drop(consumableList, ItemNameData.BEAD, 17, 18),
                drop(consumableList, ItemNameData.BEADCHAIN, 19, 20)
            ], // drops
            true,
            true,
            false,
            false,
            ''
        ),
        new Persona(
            PersonaeNameData.SATANAEL,
            Arcana.Fool,
            95,
            [0, 0, 157.5, 150, 142.5, 140, 140],
            [ElemResist.Resist, ElemResist.Resist, ElemResist.Resist, ElemResist.Resist, ElemResist.Resist,
            ElemResist.Resist, ElemResist.Resist, ElemResist.Resist, ElemResist.Null, ElemResist.Absorb],
            [
                personaSkill(SkillNameData.DEVILSWINGS, 0),
                personaSkill(SkillNameData.MORNINGSTAR, 0),
                personaSkill(SkillNameData.RIOTGUN, 0),
                personaSkill(SkillNameData.SURVIVALTRICK, 0),
                personaSkill(SkillNameData.COSMICFLARE, 96),
                personaSkill(SkillNameData.HEATRISER, 97),
                personaSkill(SkillNameData.UNSHAKENWILL, 98),
                personaSkill(SkillNameData.VICTORYCRY, 99)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.BOUNTYHUNTER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.VICTORYCRY && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(consumableList, ItemNameData.SOMA, 1, 9),
                drop(skillCardList, 'Morning Star Ally', 10, 12),
                drop(skillCardList, 'Devil\'s Wings Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 1, 10),
                drop(consumableList, ItemNameData.SOMA, 11, 20)
            ], // drops
            true,
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
