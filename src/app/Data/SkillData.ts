import { Skill, Element } from '../Classes/Skill';
import { SkillNameData } from './NameData';

export const skillList: Skill[] =
[
    // Name, cost, element, Description
    // Physical & Gun
    // TIER0
    new Skill(SkillNameData.LUNGE, 5, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 15); Max 1d4'),
    new Skill(SkillNameData.CLEAVE, 7, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 15); Max 2d4'),
    // TIER1
    new Skill(SkillNameData.LUCKYPUNCH, 6, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 12); Max 2d4; x2 crit mod & +1 crit bonus'),
    new Skill(SkillNameData.TERRORCLAW, 8, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 14); Max 3d4; Fear FV=12'),
    new Skill(SkillNameData.DREAMNEEDLE, 8, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 12); Max 4d4; Sleep FV=12'),
    // TIER2
    new Skill(SkillNameData.SNAP, 9, Element.Gun, 'Take four free shots with your ranged weapon (limited by magazine size) + 20 DMG'),
    new Skill(SkillNameData.SKULLCRACKER, 10, Element.Physical, 'Deals (STR BONUS)d6 + PAB + 16; Max 7d6; Confuse FV=12'),
    // Fire
    new Skill(SkillNameData.AGI, 4, Element.Fire, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Burn FV=18'),
    // Ice
    new Skill(SkillNameData.BUFU, 4, Element.Ice, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Freeze FV=18'),
    new Skill(SkillNameData.MABUFU, 10, Element.Ice, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Freeze FV=18; AoE'),
    // Elec
    new Skill(SkillNameData.ZIO, 4, Element.Elec, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Shock FV=18'),
    // Wind
    new Skill(SkillNameData.GARU, 3, Element.Wind, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6'),
    // Psy
    // Nuke
    // Bless
    // Curse
    new Skill(SkillNameData.EIHA, 4, Element.Curse, 'Deals 1/2((MAG BONUS)d6 + 2(MAG BONUS)); Max 20d6'),
    new Skill(SkillNameData.MUDO, 8, Element.Curse, 'Instakill FV=18'),
    // Almighty
    new Skill(SkillNameData.LIFEDRAIN, 3, Element.Almighty, 'Deal 5d6 damage to target and heal that amount'),
    // Healing
    new Skill(SkillNameData.DIA, 3, Element.Healing, 'Heals (1.5*(MAG BONUS))d10 + 2(MAG BONUS) + 10; Max 3d10'),
    new Skill(SkillNameData.PATRA, 4, Element.Healing, 'Heals Dizzy, Forget, Sleep, & Hunger'),
    new Skill(SkillNameData.ENERGYDROP, 4, Element.Healing, 'Heals Confuse, Fear, Rage, Despair, & Brainwash'),
    new Skill(SkillNameData.BAISUDI, 4, Element.Healing, 'Heals Burn, Freeze, & Shock'),
    // Support
    // Buffs/Debuffs
    new Skill(SkillNameData.TARUKAJA, 8, Element.Support, 'Increases target\'s Damage dealt by 1/3 for 3 turns'),
    new Skill(SkillNameData.TARUNDA, 8, Element.Support, 'Reduces target\'s Damage dealt by 1/3 for 3 turns'),
    new Skill(SkillNameData.RAKUKAJA, 8, Element.Support, 'Increases target\'s Damage Reductions by 1/3 for 3 turns'),
    new Skill(SkillNameData.RAKUNDA, 8, Element.Support, 'Reduces target\'s Damage Reductions by 1/3 for 3 turns'),
    new Skill(SkillNameData.SUKUKAJA, 8, Element.Support, 'Increases target\'s AGI Bonus by 1/3 for 3 turns'),
    new Skill(SkillNameData.SUKUNDA, 8, Element.Support, 'Reduces target\'s AGI Bonus by 1/3 for 3 turns'),
    new Skill(SkillNameData.DEKAJA, 10, Element.Support, 'Remove -kaja buffs from targets; AoE'),
    new Skill(SkillNameData.DEKUNDA, 10, Element.Support, 'Remove -unda debuffs from targets; AoE'),
    new Skill(SkillNameData.REBELLION, 5, Element.Support, '+1 to target\'s Crit mod & bonus'),
    new Skill(SkillNameData.REVOLUTION, 5, Element.Support, '+1 to targets\' Crit mod & bonus; AoE=5'),
    // Walls/Breaks
    new Skill(SkillNameData.FIREWALL, 15, Element.Support, 'Target has immunity to Fire for 3 turns'),
    new Skill(SkillNameData.FIREBREAK, 15, Element.Support, 'Removes all fire resistance except Fire Wall from target for 3 turns'),
    new Skill(SkillNameData.ICEWALL, 15, Element.Support, 'Target has immunity to Ice for 3 turns'),
    new Skill(SkillNameData.ICEBREAK, 15, Element.Support, 'Removes all ice resistance except Ice Wall from target for 3 turns'),
    new Skill(SkillNameData.ELECWALL, 15, Element.Support, 'Target has immunity to Electric for 3 turns'),
    new Skill(SkillNameData.ELECBREAK, 15, Element.Support, 'Removes all electric resistance except Elec Wall from target for 3 turns'),
    new Skill(SkillNameData.WINDWALL, 15, Element.Support, 'Target has immunity to Wind for 3 turns'),
    new Skill(SkillNameData.WINDBREAK, 15, Element.Support, 'Removes all wind resistance except Wind Wall from target for 3 turns'),
    // Ailment
    new Skill(SkillNameData.DAZZLER, 5, Element.Ailment, 'Single Target Dizzy FV=7'),
    new Skill(SkillNameData.MAKAJAMA, 5, Element.Ailment, 'Single Target Forget FV=7'),
    new Skill(SkillNameData.DORMINA, 5, Element.Ailment, 'Single Target Sleep FV=7'),
    new Skill(SkillNameData.PULINPA, 5, Element.Ailment, 'Single Target Confuse FV=7'),
    new Skill(SkillNameData.EVILTOUCH, 5, Element.Ailment, 'Single Target Fear FV=7'),
    new Skill(SkillNameData.TAUNT, 5, Element.Ailment, 'Single Target Rage FV=7'),
    new Skill(SkillNameData.OMINOUSWORDS, 5, Element.Ailment, 'Single Target Despair FV=7'),
    new Skill(SkillNameData.MARINKARIN, 5, Element.Ailment, 'Single Target Brainwash FV=7'),
    // PASSIVE
    // Damage Boosts
    // Damage Amps
    // Ailment Boosts
    new Skill(SkillNameData.BURNBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Burn by 2'),
    new Skill(SkillNameData.FREEZEBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Freeze by 2'),
    new Skill(SkillNameData.SHOCKBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Shock by 2'),
    new Skill(SkillNameData.DIZZYBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Dizzy by 2'),
    new Skill(SkillNameData.FORGETBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Forget by 2'),
    new Skill(SkillNameData.SLEEPBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Sleep by 2'),
    new Skill(SkillNameData.CONFUSEBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Confuse by 2'),
    new Skill(SkillNameData.FEARBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Fear by 2'),
    new Skill(SkillNameData.RAGEBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Rage by 2'),
    new Skill(SkillNameData.DESPAIRBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Despair by 2'),
    new Skill(SkillNameData.BRAINWASHBOOST, 0, Element.Passive, 'Reduce FV for attacks that can inflict Brainwash by 2'),
    // Special Boosts
    // Crit Boosts
    new Skill(SkillNameData.APTPUPIL, 0, Element.Passive, '+1 Crit Mod'),
    new Skill(SkillNameData.ADVERSERESOLVE, 0, Element.Passive, '+2 Crit Mod while flanked'),
    // Damage Resists
    // Ailment Resists
    new Skill(SkillNameData.RESISTDIZZY, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict dizzy'),
    new Skill(SkillNameData.RESISTFORGET, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict forget'),
    new Skill(SkillNameData.RESISTSLEEP, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict sleep'),
    new Skill(SkillNameData.RESISTCONFUSE, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict confuse'),
    new Skill(SkillNameData.RESISTFEAR, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict fear'),
    new Skill(SkillNameData.RESISTRAGE, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict rage'),
    new Skill(SkillNameData.RESISTDESPAIR, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict despair'),
    new Skill(SkillNameData.RESISTBRAINWASH, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict brainwash'),
    // Unusual Resist
    // Dodge Skills
    new Skill(SkillNameData.DODGEPHYS, 0, Element.Passive, 'When targeted by a physical attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEFIRE, 0, Element.Passive, 'When targeted by a fire attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEICE, 0, Element.Passive, 'When targeted by an ice attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEELEC, 0, Element.Passive, 'When targeted by an electric attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEWIND, 0, Element.Passive, 'When targeted by a wind attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEPSY, 0, Element.Passive, 'When targeted by a psychic attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGENUKE, 0, Element.Passive, 'When targeted by a nuclear attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGEBLESS, 0, Element.Passive, 'When targeted by a bless attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.DODGECURSE, 0, Element.Passive, 'When targeted by a curse attack, roll d20, on a 16 or higher you dodge the attack'),
    new Skill(SkillNameData.ANGELICGRACE, 0, Element.Passive, 'When targeted by any attack attack, roll d20, on a 16 or higher you dodge the attack'),
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
    new Skill(SkillNameData.ATTACKMASTER, 0, Element.Passive, 'Grants Tarukaja at battle\'s start'),
    new Skill(SkillNameData.DEFENSEMASTER, 0, Element.Passive, 'Grants Rakukaja at battle\'s start'),
    // Kill Skills
    // Growth Skills
    new Skill(SkillNameData.GROWTH1, 0, Element.Passive, 'Allows 1 active ally skill at no cost'),
    // Irregulars
    new Skill(SkillNameData.SHARPSTUDENT, 0, Element.Passive, '-2 Crit Bonus to attacker'),
];
