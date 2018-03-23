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
                accessoryList.find(a => a.name === ItemNameData.BREATHSASH),
                skillCardList.find(s => s.skillName === SkillNameData.DIA && s.cardType === SkillCardType.Ally)
            ],
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 8),
                drop(recoveryList, ItemNameData.LIFESTONE, 9, 12),
                drop(skillCardList, 'Dia Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 19),
                drop(accessoryList, ItemNameData.BREATHSASH, 20, 20),
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
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 5, 8),
                drop(recoveryList, ItemNameData.LIFESTONE, 9, 12),
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
                drop(recoveryList, ItemNameData.LIFESTONE, 9, 12),
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
                drop(recoveryList, ItemNameData.LIFESTONE, 9, 12),
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
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Weak, ElemResist.Resist],
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
                skillCardList.find(s => s.skillName === SkillNameData.DREAMNEEDLE && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 8),
                drop(recoveryList, ItemNameData.SOULDROP, 9, 12),
                drop(skillCardList, 'Dream Needle Main', 13, 13),
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
            [0, 0, 12.5, 12.5, 12.5, 15, 10],
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
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.TERRORCLAW && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 6),
                drop(recoveryList, ItemNameData.LIFESTONE, 7, 12),
                drop(skillCardList, 'Terror Claw Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(recoveryList, ItemNameData.DEVILFRUIT, 16, 20)
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
                drop(lootList, 'Plant Balm', 7, 16),
                drop(accessoryList, ItemNameData.DIAMONDARMLET, 16, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
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
                emptyItem,
                emptyItem
            ], // transmu
            [
                drop(armorList, ItemNameData.SILKENSHIRT, 1, 6),
                drop(skillCardList, 'Bufu Ally', 7, 12),
                drop(weaponList, ItemNameData.ICEGLOVES, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(armorList, ItemNameData.SILKENSHIRT, 16, 20)
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
            ''
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
                emptyItem
            ], // transmu
            [
                drop(armorList, ItemNameData.CHROMEDLEATHERS, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 12),
                drop(weaponList, ItemNameData.BRAINBREAKER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.CONDENSERLENS, 7, 16),
                drop(armorList, ItemNameData.LEATHERCLOTHING, 16, 19),
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
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.LUCKYPUNCH && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.SPICYBREAD, 5, 8),
                drop(weaponList, ItemNameData.STUDDEDKNUCKLEDUSTER, 9, 12),
                drop(skillCardList, 'Lucky Punch Main', 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.THICKPARCHMENT, 7, 16),
                drop(weaponList, ItemNameData.LEATHERKNUCKLEDUSTER, 17, 19),
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
                drop(weaponList, ItemNameData.SPEAR, 17, 19),
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
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.AGILAO && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(skillCardList, 'Agi Ally', 1, 4),
                drop(skillCardList, 'Agi Main', 5, 8),
                drop(skillCardList, 'Agilao Ally', 11, 12),
                drop(weaponList, ItemNameData.SLINGBOW, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(skillCardList, 'Agi Ally', 16, 19),
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
                drop(weaponList, ItemNameData.BOWGUN, 17, 18),
                drop(armorList, ItemNameData.KILIMWEAVESHIRT, 19, 20)
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
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(weaponList, ItemNameData.KOPIS, 5, 9),
                drop(armorList, ItemNameData.SHERPHERDSBOLERO, 12, 12),
                drop(weaponList, ItemNameData.ZOMBIEKARAMBIT, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.CORKWOOD, 7, 16),
                drop(recoveryList, ItemNameData.SOULDROP, 16, 18),
                drop(weaponList, ItemNameData.KOPIS, 19, 20)
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
                drop(recoveryList, ItemNameData.REVIVALBEAD, 1, 8),
                drop(weaponList, ItemNameData.BROADSWORD, 9, 12),
                drop(lootList, ItemNameData.BLACKKOGATANA, 13, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(weaponList, ItemNameData.BROADSWORD, 17, 20)
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
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 1, 8),
                drop(recoveryList, ItemNameData.RANCIDSOUL, 8, 9),
                drop(skillCardList, 'Headbutt Main', 12, 12),
                drop(weaponList, ItemNameData.REVOLTINGREVOLVER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.TINCLASP, 7, 16),
                drop(weaponList, ItemNameData.COLTARMY, 17, 19),
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 1, 4),
                drop(weaponList, ItemNameData.M1GARAND, 5, 9),
                drop(weaponList, ItemNameData.ICESHOT, 10, 12),
                drop(skillCardList, 'Ice Wall Main', 13, 13),
                drop(lootList, 'Dummy', 15, 15),
            ], // negot
            [
                drop(lootList, ItemNameData.PLANTBALM, 7, 16),
                drop(weaponList, ItemNameData.M1GARAND, 17, 19),
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
                drop(recoveryList, ItemNameData.EXTINGUISHORB, 17, 18),
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 1, 4),
                drop(recoveryList, ItemNameData.SOULDROP, 5, 9),
                drop(skillCardList, 'Garu Main', 10, 12),
                drop(skillCardList, 'Magaru Ally', 11, 13)
            ], // negot
            [
                drop(lootList, ItemNameData.TANNEDLEATHER, 7, 16),
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 16, 18),
                drop(weaponList, ItemNameData.BAZOOKA, 19, 20)
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
                drop(recoveryList, ItemNameData.DISCHARGESTONE, 17, 20)
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
                personaSkill(SkillNameData.HAMA, 11),
                personaSkill(SkillNameData.KOUHA, 12),
                personaSkill(SkillNameData.DODGECURSE, 13),
                personaSkill(SkillNameData.DEKUNDA, 14)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.HEAVENSMESSENGER),
                emptyItem,
                emptyItem,
                skillCardList.find(s => s.skillName === SkillNameData.KOUHA && s.cardType === SkillCardType.Ally)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.SOULDROP, 1, 7),
                drop(recoveryList, ItemNameData.BITTERSOUL, 8, 11),
                drop(skillCardList, 'Kouha Main', 12, 12),
                drop(weaponList, ItemNameData.HEAVENSMESSENGER, 13, 13),
            ], // negot
            [
                drop(lootList, ItemNameData.SILKYARN, 7, 16),
                drop(weaponList, ItemNameData.WEBLEY, 17, 18),
                drop(recoveryList, ItemNameData.SOULDROP, 19, 20)
            ], // drops
            false,
            false,
            false,
            false,
            ''
        ),






        new Persona(
            PersonaeNameData.ARSENE,
            Arcana.Fool,
            -50,
            [40, 50, 5, 7.5, 7.5, 10, 10],
            [ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral,
            ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral, ElemResist.Neutral],
            [
                personaSkill(SkillNameData.BUFU, 0),
                personaSkill(SkillNameData.MAKAJAMA, 0),
                personaSkill(SkillNameData.DODGEICE, 11),
                personaSkill(SkillNameData.RAKUNDA, 12),
                personaSkill(SkillNameData.FIREWALL, 13),
                personaSkill(SkillNameData.MABUFU, 14)
            ], // skills
            [
                weaponList.find(w => w.name === ItemNameData.LONGSWORD),
                armorList.find(a => a.name === ItemNameData.SCALEARMOR),
                accessoryList.find(a => a.name === ItemNameData.DIAMONDARMLET),
                skillCardList.find(s => s.skillName === SkillNameData.BUFU && s.cardType === SkillCardType.Main)
            ], // transmu
            [
                drop(recoveryList, ItemNameData.DEVILFRUIT, 1, 4),
                drop(recoveryList, ItemNameData.RANCIDGRAVY, 5, 9),
                drop(weaponList, ItemNameData.BOWGUN, 10, 12),
                drop(weaponList, ItemNameData.STONECROSSBOW, 13, 13),
                drop(lootList, 'Dummy', 15, 15),
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


const dlcPersona = [['Orpheus', 'Orpheus Picaro'], ['Izanagi', 'Izanagi Picaro'], ['Thanatos', 'Thanatos Picaro'],
['Magatsu-Izanagi', 'Magatsu-Izanagi Picaro'], ['Kaguya', 'Kaguya Picaro'], ['Ariadne', 'Ariadne Picaro'],
['Asterius', 'Asterius Picaro'], ['Tsukiyomi', 'Tsukiyomi Picaro'], ['Messiah', 'Messiah Picaro']];
