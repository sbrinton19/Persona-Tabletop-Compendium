import { Skill, Element } from '../Classes/Skill';
import { NameData } from './NameData';

export const skillList: Skill[] =
[
    // Name, cost, element, Description
    // Physical
    // TIER0
    new Skill(NameData.LUNGE, 5, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 15); Max 1d4'),
    new Skill(NameData.CLEAVE, 7, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 15); Max 2d4'),
    // TIER1
    new Skill(NameData.DREAMNEEDLE, 8, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 12); Max 4d4; Sleep FV=12'),
    // TIER2
    new Skill(NameData.SKULLCRACKER, 10, Element.Physical, 'Deals (STR BONUS)d6 + PAB + 16; Max 7d6; Confuse FV=12'),
    // Gun
    // Fire
    new Skill(NameData.AGI, 4, Element.Fire, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Burn FV=18'),
    // Ice
    // Elec
    new Skill(NameData.ZIO, 4, Element.Elec, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Shock FV=18'),
    // Wind
    new Skill(NameData.GARU, 3, Element.Wind, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6'),
    // Psy
    // Nuke
    // Bless
    // Curse
    // Almighty
    new Skill(NameData.EIHA, 4, Element.Curse, 'Deals 1/2((MAG BONUS)d6 + 2(MAG BONUS)); Max 20d6'),
    // Healing
    new Skill(NameData.DIA, 3, Element.Healing, 'Heals (1.5*(MAG BONUS))d10 + 2(MAG BONUS) + 10; Max 3d10'),
    new Skill(NameData.ENERGYDROP, 4, Element.Healing, 'Heals Confuse, Fear, Rage, Despair, & Brainwash'),
    new Skill(NameData.PATRA, 4, Element.Healing, 'Heals Dizzy, Forget, Sleep, & Hunger'),
    new Skill(NameData.BAISUDI, 4, Element.Healing, 'Heals Burn, Freeze, & Shock'),
    // Support
    // Buffs/Debuffs
    new Skill(NameData.TARUKAJA, 8, Element.Support, 'Increases target\'s Damage dealt by 1/3 for 3 turns'),
    new Skill(NameData.TARUNDA, 8, Element.Support, 'Reduces target\'s Damage dealt by 1/3 for 3 turns'),
    new Skill(NameData.RAKUKAJA, 8, Element.Support, 'Increases target\'s Damage Reductions by 1/3 for 3 turns'),
    new Skill(NameData.RAKUNDA, 8, Element.Support, 'Reduces target\'s Damage Reductions by 1/3 for 3 turns'),
    new Skill(NameData.SUKUKAJA, 8, Element.Support, 'Increases target\'s AGI Bonus by 1/3 for 3 turns'),
    new Skill(NameData.SUKUNDA, 8, Element.Support, 'Reduces target\'s AGI Bonus by 1/3 for 3 turns'),
    // Walls/Breaks
    new Skill(NameData.FIREWALL, 15, Element.Support, 'Target has immunity to Fire for 3 turns'),
    new Skill(NameData.FIREBREAK, 15, Element.Support, 'Removes all fire resistance except Fire Wall from target for 3 turns'),
    new Skill(NameData.ICEWALL, 15, Element.Support, 'Target has immunity to Ice for 3 turns'),
    new Skill(NameData.ICEBREAK, 15, Element.Support, 'Removes all ice resistance except Ice Wall from target for 3 turns'),
    // Ailment
    new Skill(NameData.DAZZLER, 5, Element.Ailment, 'Single Target Dizzy FV=7'),
    new Skill(NameData.PULINPA, 5, Element.Ailment, 'Single Target Confuse FV=7'),
    // Passive
    // Damage Boosts
    // Damage Amps
    // Status Boosts
    // Special Boosts
    // Crit Boosts
    new Skill(NameData.APTPUPIL, 0, Element.Passive, '+1 Crit Mod'),
    new Skill(NameData.ADVERSERESOLVE, 0, Element.Passive, '+2 Crit Mod while flanked'),
    // Damage Resists
    // Ailment Resists
    new Skill(NameData.RESISTSLEEP, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict sleep'),
    new Skill(NameData.RESISTCONFUSE, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict confuse'),
    // Unusual Resist
    // Dodge Skills
    new Skill(NameData.DODGEELECTRIC, 0, Element.Passive, 'When targeted by an electric attack, roll d20, on a 16 or higher you dodge the attack'),
    // Unusual Dodge
    // Evade Skills
    // Negate Skills
    // Null Skills
    // Unusual Null
    // Counter Skills
    // Repel Skills
    // Absorb Skills
    // Endurance Skills
    // Recovery Skills
    // Master Skills
    // Kill Skills
    // Irregulars
    new Skill(NameData.SHARPSTUDENT, 0, Element.Passive, '-2 Crit Bonus to attacker'),
];
