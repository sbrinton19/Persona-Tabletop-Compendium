import { Persona, Arcana, ElemResist } from '../Classes/Persona';
import { Drop, SkillCardType, Item } from '../Classes/Item';
import { emptyItem, weaponList, armorList, lootList, recoveryList, accessoryList, skillCardList } from './ItemData';
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
                drop(recoveryList, ItemNameData.SOULDROP, 16, 20)  // Soul Drop
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(recoveryList, ItemNameData.SOULDROP, 7, 12),
                drop(weaponList, ItemNameData.PUMPKINCANNON, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16), // Cork Wood
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 20)  // Devil Fruit
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 8),
                drop(accessoryList, ItemNameData.CALMINGMASK, 9, 12),
                drop(skillCardList, 'Dia Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 19),
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 5, 9),
                drop(armorList, ItemNameData.LEATHERBREASTPLATE, 10, 12),
                drop(skillCardList, 'Energy Drop Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 20),
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.STONEBREAD, 5, 8),
                drop(armorList, ItemNameData.BRONZESHIELD, 9, 12),
                drop(skillCardList, 'Zio Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 20)
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.ODDMORSEL, 5, 8),
                drop(weaponList, ItemNameData.HORNBILL, 12, 12),
                drop(skillCardList, 'Garu Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 20)
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(recoveryList, ItemNameData.SOULDROP, 7, 10),
                drop(skillCardList, 'Eiha Ally', 11, 12),
                drop(skillCardList, 'Eiha Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 19),
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
            [80, 50, 12.5, 12.5, 12.5, 15, 10],
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(accessoryList, ItemNameData.BRAINGUARD, 7, 11),
                drop(skillCardList, 'Terror Claw Ally', 12, 12),
                drop(weaponList, ItemNameData.GREENWHIP, 10, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 19),
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
            [0, 0, 10, 15, 12.5, 15, 10],
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 6),
                drop(recoveryList, ItemNameData.BITTERSOUL, 7, 12),
                drop(skillCardList, 'Rakukaja Main', 13, 13)
            ], // negot
            [
                drop(lootList, 'Plant Balm', 3, 14),
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
            [0, 0, 10, 17.5, 10, 12.5, 12.5],
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 16, 20)
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
                drop(recoveryList, ItemNameData.HOLYWATER, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 8),
                drop(armorList, ItemNameData.CHROMEDLEATHERS, 9, 11),
                drop(skillCardList, 'Marin Karin Main', 12, 12),
                drop(weaponList, ItemNameData.BRAINBREAKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.HOLYWATER, 16, 17),
                drop(recoveryList, ItemNameData.SOULDROP, 18, 19),
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
                drop(recoveryList, ItemNameData.SPICYBREAD, 1, 4),
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
                drop(recoveryList, ItemNameData.DEMONDRINK, 1, 4),
                drop(weaponList, ItemNameData.SPEAR, 5, 8),
                drop(armorList, ItemNameData.BRONZEARMOR, 9, 12),
                drop(skillCardList, 'Cleave Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.DEMONDRINK, 17, 19),
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
                drop(recoveryList, ItemNameData.THAWSTONE, 16, 19),
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
                drop(recoveryList, ItemNameData.SOURYOGURT, 1, 7),
                drop(armorList, ItemNameData.KILIMWEAVESHIRT, 8, 9),
                drop(weaponList, ItemNameData.BOWGUN, 10, 12),
                drop(weaponList, ItemNameData.STONECROSSBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.SOURYOGURT, 17, 19),
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
                armorList.find(a => a.name === ItemNameData.SHERPHERDSBOLERO),
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(weaponList, ItemNameData.KOPIS, 5, 9),
                drop(armorList, ItemNameData.SHERPHERDSBOLERO, 12, 12),
                drop(weaponList, ItemNameData.ZOMBIEKARAMBIT, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 16, 20)
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
                drop(recoveryList, ItemNameData.REVIVALBEAD, 1, 6),
                drop(weaponList, ItemNameData.BROADSWORD, 7, 9),
                drop(lootList, ItemNameData.BLACKKOGATANA, 10, 12),
                drop(weaponList, ItemNameData.MARQUISESTOC, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 16, 19),
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
                drop(recoveryList, ItemNameData.STONEBREAD, 1, 8),
                drop(weaponList, ItemNameData.COLTARMY, 9, 11),
                drop(skillCardList, 'Headbutt Main', 12, 12),
                drop(weaponList, ItemNameData.REVOLTINGREVOLVER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.STONEBREAD, 17, 19),
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 1, 6),
                drop(weaponList, ItemNameData.M1GARAND, 7, 9),
                drop(weaponList, ItemNameData.ICESHOT, 10, 12),
                drop(skillCardList, 'Ice Wall Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 17, 19),
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 9),
                drop(skillCardList, 'Mabufu Ally', 10, 12),
                drop(skillCardList, 'Freeze Boost Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 15, 18),
                drop(recoveryList, ItemNameData.SOULDROP, 19, 20)
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 1, 6),
                drop(weaponList, ItemNameData.BAZOOKA, 7, 9),
                drop(skillCardList, 'Magaru Ally', 11, 12),
                drop(weaponList, ItemNameData.FORESTSWRATH, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 16, 20)
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(recoveryList, ItemNameData.SOURYOGURT, 5, 9),
                drop(skillCardList, 'Growth 1 Ally', 10, 12),
                drop(skillCardList, 'Growth 1 Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 16, 18),
                drop(recoveryList, ItemNameData.SOURYOGURT, 19, 20)
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
                drop(recoveryList, ItemNameData.HOLYWATER, 1, 5),
                drop(recoveryList, ItemNameData.SACREMENTALBREAD, 6, 9),
                drop(weaponList, ItemNameData.WEBLEY, 10, 11),
                drop(skillCardList, 'Kouha Main', 12, 12),
                drop(weaponList, ItemNameData.HEAVENSMESSENGER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.HOLYWATER, 17, 19),
                drop(recoveryList, ItemNameData.SACREMENTALBREAD, 20, 20)
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
                drop(recoveryList, ItemNameData.THAWSTONE, 1, 6),
                drop(weaponList, ItemNameData.ICEPICK, 7, 11),
                drop(skillCardList, 'Confuse Boost Ally', 12, 12),
                drop(weaponList, ItemNameData.MINDCARVER, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.THAWSTONE, 17, 18),
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
                personaSkill(SkillNameData.RAMPAGE, 15),
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
                drop(recoveryList, ItemNameData.SOURYOGURT, 1, 4),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 5, 7),
                drop(accessoryList, ItemNameData.ARMYSOCKS, 7, 10),
                drop(weaponList, ItemNameData.DIRK, 11, 12),
                drop(weaponList, ItemNameData.SPIRITTANTO, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.SOURYOGURT, 17, 18),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 19, 20)
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
                drop(recoveryList, ItemNameData.HIRANYA, 1, 4),
                drop(recoveryList, ItemNameData.PHYSICALOINTMENT, 5, 6),
                drop(accessoryList, ItemNameData.STRENGTHBELT, 7, 9),
                drop(skillCardList, 'Media Ally', 10, 12),
                drop(skillCardList, 'Media Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.HIRANYA, 17, 19),
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
                drop(recoveryList, ItemNameData.ODDMORSEL, 1, 4),
                drop(recoveryList, ItemNameData.MAGICALOINTMENT, 5, 7),
                drop(accessoryList, ItemNameData.CUTEPLUSHIE, 8, 11),
                drop(skillCardList, 'Makajama Ally', 12, 12),
                drop(skillCardList, 'Makajama Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.ODDMORSEL, 17, 19),
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
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 4),
                drop(recoveryList, ItemNameData.SACREMENTALBREAD, 5, 6),
                drop(accessoryList, ItemNameData.POWERANKLET, 7, 8),
                drop(skillCardList, 'Hama Ally', 9, 11),
                drop(skillCardList, 'Hama Main', 12, 12),
                drop(weaponList, ItemNameData.CRUSADERSCROSSBOW, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 19),
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
                drop(recoveryList, ItemNameData.DEMONDRINK, 8, 10),
                drop(weaponList, ItemNameData.SPONTOON, 11, 12),
                drop(weaponList, ItemNameData.HELLSPARTISAN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.DEMONDRINK, 17, 19),
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
                drop(recoveryList, ItemNameData.RANCIDSOUL, 1, 4),
                drop(armorList, ItemNameData.WIZARDSROBES, 5, 9),
                drop(skillCardList, 'Diarama Ally', 10, 11),
                drop(lootList, ItemNameData.BLACKCARD, 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.RANCIDSOUL, 17, 18),
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
                //Intentionally Changed
                personaSkill(SkillNameData.COUNTER, 0),
                personaSkill(SkillNameData.DIARAMA, 0),
                personaSkill(SkillNameData.KOUGA, 0),
                personaSkill(SkillNameData.DIVINEGRACE, 17),
                personaSkill(SkillNameData.AMRITADROP, 18),
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
                drop(recoveryList, ItemNameData.HIRANYA, 1, 4),
                drop(recoveryList, ItemNameData.LIFESTONE, 4, 6),
                drop(armorList, ItemNameData.CHANTERSDJELLABA, 7, 10),
                drop(armorList, ItemNameData.MAGESHABIT, 11, 12),
                drop(skillCardList, 'Diarama Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.HIRANYA, 17, 18),
                drop(recoveryList, ItemNameData.LIFESTONE, 19, 20)
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 1, 4),
                drop(recoveryList, ItemNameData.LIFESTONE, 5, 9),
                drop(accessoryList, ItemNameData.DEMONMASK, 10, 12),
                drop(skillCardList, 'Mazio Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 17, 19),
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
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 1, 4),
                drop(accessoryList, ItemNameData.MAGICAMULET, 5, 9),
                drop(accessoryList, ItemNameData.WITCHAMULET, 10, 12),
                drop(weaponList, ItemNameData.CATONINE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 17, 18),
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
                drop(recoveryList, ItemNameData.HOLYWATER, 1, 4),
                drop(skillCardList, 'Maragi Ally', 5, 9),
                drop(armorList, ItemNameData.RINGMAIL, 10, 12),
                drop(armorList, ItemNameData.WINDBREAKER, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.SPICYBREAD, 17, 18),
                drop(recoveryList, ItemNameData.HOLYWATER, 19, 20)
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 3),
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
                drop(recoveryList, ItemNameData.RANCIDSOUL, 17, 19),
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
                personaSkill(SkillNameData.TEMPESTSLASH, 20), //Intentionally Changed
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
                drop(recoveryList, ItemNameData.SOURYOGURT, 1, 7),
                drop(lootList, ItemNameData.BLACKKOGATANA, 8, 11),
                drop(skillCardList, 'Sukukaja Main', 12, 12),
                drop(weaponList, ItemNameData.ESPADA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.SOURYOGURT, 17, 18),
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
                drop(recoveryList, ItemNameData.STONEBREAD, 1, 9),
                drop(weaponList, ItemNameData.HEAVYGRIP, 10, 12),
                drop(weaponList, ItemNameData.ONIPOUND, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.STONEBREAD, 17, 18),
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
                drop(skillCardList, 'Giant Slice Ally', 1, 4),
                drop(lootList, ItemNameData.BLACKCARD, 5, 7),
                drop(accessoryList, ItemNameData.YELLOWBAND, 8, 10),
                drop(accessoryList, ItemNameData.CITRINERING, 11, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.ODDMORSEL, 17, 18),
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
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 4),
                drop(lootList, ItemNameData.BLACKROBE, 5, 9),
                drop(skillCardList, 'Makouha Ally', 10, 12),
                drop(skillCardList, 'Makouha Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
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
                drop(recoveryList, ItemNameData.STRAWDOLL, 1, 6),
                drop(accessoryList, ItemNameData.BLACKBAND, 7, 9),
                drop(skillCardList, 'Mudo Ally', 10, 11),
                drop(skillCardList, 'Mudo Main', 12, 12),
                drop(weaponList, ItemNameData.CHIMERASLING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.STRAWDOLL, 17, 19),
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
                drop(recoveryList, ItemNameData.ODDMORSEL, 1, 4),
                drop(weaponList, ItemNameData.KAMA, 5, 9),
                drop(skillCardList, 'Hysterical Slap Ally', 10, 11),
                drop(weaponList, ItemNameData.TEMPTRESSBLADE, 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.ODDMORSEL, 17, 20)
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
                drop(recoveryList, ItemNameData.RASETSUOFUDA, 7, 7),
                drop(accessoryList, ItemNameData.THIEFMASK, 8, 12),
                drop(skillCardList, 'Agilao Main', 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(accessoryList, ItemNameData.RUBYRING, 17, 18),
                drop(recoveryList, ItemNameData.RASETSUOFUDA, 19, 19),
                drop(accessoryList, ItemNameData.THIEFMASK, 20, 20)
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
                drop(recoveryList, ItemNameData.SPICYBREAD, 1, 4),
                drop(recoveryList, ItemNameData.HOLYWATER, 5, 9),
                drop(weaponList, ItemNameData.KONGSBERGM1914, 10, 12),
                drop(weaponList, ItemNameData.PAPERCANNON, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(lootList, ItemNameData.BLACKROCK, 17, 18),
                drop(recoveryList, ItemNameData.HOLYWATER, 19, 20)
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
                drop(recoveryList, ItemNameData.REVIVALBEAD, 1, 4),
                drop(recoveryList, ItemNameData.BALMOFLIFE, 5, 7),
                drop(accessoryList, ItemNameData.ZODIACCHARM, 8, 10),
                drop(skillCardList, 'Recarm Ally', 11, 12),
                drop(skillCardList, 'Recarm Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 19, 20)
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
                drop(recoveryList, ItemNameData.TETRAHAMMER, 1, 4),
                drop(skillCardList, 'Magaru Main', 5, 9),
                drop(accessoryList, ItemNameData.GREENBAND, 10, 12),
                drop(skillCardList, 'Garula Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.TETRAHAMMER, 17, 19),
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
                drop(recoveryList, ItemNameData.DEMONDRINK, 1, 4),
                drop(recoveryList, ItemNameData.KONGOUOFUDA, 5, 9),
                drop(accessoryList, ItemNameData.YELLOWBAND, 10, 12),
                drop(skillCardList, 'Zionga Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.DEMONDRINK, 17, 18),
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
                personaSkill(SkillNameData.VICIOUSSTRIKE, 27),// Intenionally changed
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
                drop(recoveryList, ItemNameData.DEMONDRINK, 1, 4),
                drop(accessoryList, ItemNameData.RESILIENTBELT, 5, 9),
                drop(skillCardList, 'Tarukaja Main', 10, 12),
                drop(skillCardList, 'Adverse Resolve Ally', 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.DEMONDRINK, 17, 18),
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
                drop(recoveryList, ItemNameData.STONESOUL, 1, 4),
                drop(recoveryList, ItemNameData.SNUFFSOUL, 5, 9),
                drop(accessoryList, ItemNameData.ALARMCLOCK, 10, 12),
                drop(skillCardList, 'Dormina Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.STONESOUL, 17, 19),
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
                personaSkill(SkillNameData.MABUFULA, 28),
                personaSkill(SkillNameData.DODGEFIRE, 29)
            ], // skills
            [
                emptyItem,
                emptyItem,
                accessoryList.find(a => a.name === ItemNameData.FIREMASK),
                skillCardList.find(s => s.skillName === SkillNameData.BUFULA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Mabufu Main', 5, 9),
                drop(accessoryList, ItemNameData.FIREMASK, 10, 12),
                drop(skillCardList, 'Bufula Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(recoveryList, ItemNameData.RANCIDSOUL, 5, 7),
                drop(accessoryList, ItemNameData.WINDMASK, 8, 11),
                drop(skillCardList, 'Garula Main', 12, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 17, 18),
                drop(recoveryList, ItemNameData.RANCIDSOUL, 19, 20)
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
                drop(recoveryList, ItemNameData.SNUFFSOUL, 17, 19),
                drop(lootList, ItemNameData.BLACKKOGATANA, 20, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
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
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 1, 4),
                drop(skillCardList, 'Memory Blow Ally', 5, 9),
                drop(skillCardList, 'Memory Blow Main', 10, 10),
                drop(accessoryList, ItemNameData.BOLDEYEPATCH, 11, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 19, 20)
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
                personaSkill(SkillNameData.NEGATIVEPILE, 30), // Intenionally Changed
                personaSkill(SkillNameData.COUNTERSTRIKE, 31)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.GOLDENARMOR),
                accessoryList.find(a => a.name === ItemNameData.STRENGTHANKLET),
                emptyItem
            ], // transmu
            [
                drop(recoveryList, ItemNameData.STONEBREAD, 1, 5),
                drop(accessoryList, ItemNameData.STRENGTHANKLET, 6, 9),
                drop(armorList, ItemNameData.GOLDENARMOR, 10, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.STONEBREAD, 17, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),
// DATA Checked Line
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
                drop(recoveryList, ItemNameData.HOMUNCULUS, 1, 6),
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
                drop(recoveryList, ItemNameData.MAKARAHAMMER, 1, 4),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 5, 9),
                drop(skillCardList, 'Makarakarn Ally', 10, 12),
                drop(skillCardList, 'Makarakarn Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.MAKARAHAMMER, 17, 18),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 19, 20)
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
                personaSkill(SkillNameData.ASSAULTDIVE, 0),// Intentionally Changed
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 4),
                drop(recoveryList, ItemNameData.ODDMORSEL, 5, 9),
                drop(accessoryList, ItemNameData.THERMOS, 10, 12),
                drop(skillCardList, 'Ominous Words Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 18),
                drop(recoveryList, ItemNameData.ODDMORSEL, 19, 20)
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 4),
                drop(recoveryList, ItemNameData.REVIVALBEAD, 5, 9),
                drop(recoveryList, ItemNameData.BALMOFLIFE, 10, 12),
                drop(skillCardList, 'Cadenza Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 18),
                drop(recoveryList, ItemNameData.LIFESTONE, 19, 20)
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 4),
                drop(recoveryList, ItemNameData.STONESOUL, 5, 9),
                drop(accessoryList, ItemNameData.ELECMASK, 10, 12),
                drop(skillCardList, 'Life Drain Ally', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROBE, 12, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 18),
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
                drop(recoveryList, ItemNameData.DEMONDRINK, 1, 4),
                drop(skillCardList, 'Counter Main', 5, 9),
                drop(weaponList, ItemNameData.BARDICHE, 10, 12),
                drop(weaponList, ItemNameData.HOUNDOFCULAINN, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.DEMONDRINK, 17, 19),
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
                drop(recoveryList, ItemNameData.BITTERSOUL, 1, 4),
                drop(weaponList, ItemNameData.SABRE, 5, 9),
                drop(skillCardList, 'Divine Grace Ally', 10, 12),
                drop(weaponList, ItemNameData.DAWNBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 19),
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
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 4),
                drop(recoveryList, ItemNameData.STONEBREAD, 5, 9),
                drop(accessoryList, ItemNameData.SPIRITBELT, 10, 12),
                drop(skillCardList, 'Evil Touch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKROCK, 12, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
                drop(recoveryList, ItemNameData.STONEBREAD, 19, 20)
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
                personaSkill(SkillNameData.DREAMNEEDLE, 0),
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
                drop(recoveryList, ItemNameData.STRAWDOLL, 1, 4),
                drop(accessoryList, ItemNameData.JETRING, 5, 9),
                drop(skillCardList, 'Mamudo Ally', 10, 11),
                drop(skillCardList, 'Mamudo Main', 12, 12),
                drop(weaponList, ItemNameData.DEMONMAW, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.STONEBREAD, 17, 18),
                drop(recoveryList, ItemNameData.STRAWDOLL, 19, 20)
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 4),
                drop(accessoryList, ItemNameData.WHITEBAND, 5, 9),
                drop(weaponList, ItemNameData.GAUNTLETS, 10, 12),
                drop(weaponList, ItemNameData.SCEPTERFIST, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 18),
                drop(recoveryList, ItemNameData.RANCIDSOUL, 19, 20)
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
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 4),
                drop(skillCardList, 'Elec Break Ally', 5, 9),
                drop(accessoryList, ItemNameData.RUBBERGLOVES, 10, 12),
                drop(skillCardList, 'Elec Break Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 18),
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
                drop(recoveryList, ItemNameData.ODDMORSEL, 1, 4),
                drop(recoveryList, ItemNameData.STONESOUL, 5, 9),
                drop(skillCardList, 'Miracle Punch Ally', 10, 12),
                drop(skillCardList, 'Miracle Punch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(recoveryList, ItemNameData.ODDMORSEL, 17, 18),
                drop(recoveryList, ItemNameData.STONESOUL, 19, 20)
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
                drop(recoveryList, ItemNameData.SOULDROP, 1, 4),
                drop(accessoryList, ItemNameData.CAMEOBELT, 5, 8),
                drop(skillCardList, 'Invigorate 1 Ally', 9, 11),
                drop(skillCardList, 'Invigorate 1 Main', 12, 12),
                drop(weaponList, ItemNameData.CATNAP, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 19),
                drop(weaponList, ItemNameData.UPSILON, 20, 20)
            ], // drops
            true,
            false,
            false,
            false,
            ''
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
                drop(recoveryList, ItemNameData.LIFESTONE, 1, 6),
                drop(skillCardList, 'Freila Ally', 7, 11),
                drop(skillCardList, 'Freila Main', 12, 12),
                drop(weaponList, ItemNameData.RAGINGSTORM, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.LIFESTONE, 17, 19),
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
                personaSkill(SkillNameData.TERRORCLAW, 32),
                personaSkill(SkillNameData.SHARPSTUDENT, 33),
                personaSkill(SkillNameData.RESISTFEAR, 34),
                personaSkill(SkillNameData.SWIFTSTRIKE, 35),
                personaSkill(SkillNameData.ATTACKMASTER, 36)
            ], // skills
            [
                emptyItem,
                armorList.find(a => a.name === ItemNameData.BRIGANDINE),
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TERRORCLAW && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(armorList, ItemNameData.SURVIVALVEST, 1, 8),
                drop(armorList, ItemNameData.BRIGANDINE, 9, 11),
                drop(skillCardList, 'Terror Claw Ally', 12, 12),
                drop(skillCardList, 'Terror Claw Main', 13, 13),
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
                accessoryList.find(a => a.name === ItemNameData.REDBAND),,
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
                personaSkill(SkillNameData.FLASHBOMB, 0),
                personaSkill(SkillNameData.GARULA, 0),
                personaSkill(SkillNameData.MASUKUKAJA, 0),
                personaSkill(SkillNameData.DODGEPSY, 33),
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
                drop(recoveryList, ItemNameData.SOURYOGURT, 1, 4),
                drop(recoveryList, ItemNameData.IDATENOFUDA, 5, 7),
                drop(skillCardList, 'Masukukaja Ally', 8, 9),
                drop(accessoryList, ItemNameData.PSYCHICMASK, 10, 12),
                drop(weaponList, ItemNameData.SAMSARA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.REDPHOSPHORUS, 7, 16),
                drop(recoveryList, ItemNameData.SOURYOGURT, 16, 18),
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
                drop(recoveryList, ItemNameData.BITTERSOUL, 1, 4),
                drop(skillCardList, 'Bufula Main', 5, 9),
                drop(accessoryList, ItemNameData.HAMAYAMASK, 10, 12),
                drop(weaponList, ItemNameData.BEGUILINGNIGHT, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 17, 19),
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
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 1, 3),
                drop(recoveryList, ItemNameData.SOURYOGURT, 4, 7),
                drop(accessoryList, ItemNameData.PEARLRING, 8, 9),
                drop(skillCardList, 'Kouga Ally', 10, 11),
                drop(skillCardList, 'Makouga Ally', 12, 12),
                drop(weaponList, ItemNameData.RULEBREAKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(recoveryList, ItemNameData.WARDINGTALISMAN, 17, 19),
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
                personaSkill(SkillNameData.SKULLCRACKER, 0),
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 5, 6),
                drop(accessoryList, ItemNameData.SPINELRING, 7, 10),
                drop(skillCardList, 'Mazionga Ally', 11, 11),
                drop(skillCardList, 'Mazionga Main', 12, 12),
                drop(weaponList, ItemNameData.BEASTANTENNA, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 17, 19),
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
                drop(recoveryList, ItemNameData.KONGOUOFUDA, 1, 6),
                drop(skillCardList, 'Mabufula Main', 7, 9),
                drop(accessoryList, ItemNameData.BLUEBAND, 10, 12),
                drop(weaponList, ItemNameData.MEASURINGBLADE, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.MERCURYVIAL, 7, 16),
                drop(recoveryList, ItemNameData.KONGOUOFUDA, 17, 19),
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
                drop(recoveryList, ItemNameData.STONESOUL, 1, 4),
                drop(recoveryList, ItemNameData.MAGICALOINTMENT, 5, 9),
                drop(armorList, ItemNameData.DEMONMAIL, 10, 11),
                drop(skillCardList, 'Spirit Drain Ally', 12, 12),
                drop(weaponList, ItemNameData.PENETRATOR, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.STONESOUL, 17, 18),
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
                drop(recoveryList, ItemNameData.STONEBREAD, 1, 4),
                drop(accessoryList, ItemNameData.TURQUOISERING, 5, 9),
                drop(skillCardList, 'Mapsio Ally', 11, 11),
                drop(skillCardList, 'Mapsio Main', 12, 12),
                drop(weaponList, ItemNameData.YELLOWKING, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.STONEBREAD, 17, 19),
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
            [0, 0, 52.5, 65, 52.5, 60, 52.5],
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
                drop(recoveryList, ItemNameData.SPICYBREAD, 1, 4),
                drop(skillCardList, 'Mafreila Ally', 5, 9),
                drop(armorList, ItemNameData.DIAMONDSHIELD, 10, 12),
                drop(skillCardList, 'Mafreila Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.BLACKCARD, 12, 16),
                drop(recoveryList, ItemNameData.SPICYBREAD, 17, 19),
                drop(armorList, ItemNameData.DIAMONDSHIELD, 20, 20)
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
            32,
            [0, 0, 42.5, 57.5, 45, 62.5, 50],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.DODGEICE, 0),
                personaSkill(SkillNameData.RAKUNDA, 30),
                personaSkill(SkillNameData.FIREWALL, 30),
                personaSkill(SkillNameData.MABUFU, 30),
                personaSkill(SkillNameData.FIREWALL, 30),
                personaSkill(SkillNameData.MABUFU, 30)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LONGSWORD),
                armorList.find(a => a.name === ItemNameData.SCALEARMOR),
                accessoryList.find(a => a.name === ItemNameData.DIAMONDARMLET),
                skillCardList.find(s => s.skillName === SkillNameData.BUFU && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 5, 9),
                drop(weaponList, ItemNameData.BOWGUN, 10, 12),
                drop(weaponList, ItemNameData.STONECROSSBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(weaponList, ItemNameData.BOWGUN, 17, 18),
                drop(armorList, ItemNameData.KILIMWEAVESHIRT, 19, 20)
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
