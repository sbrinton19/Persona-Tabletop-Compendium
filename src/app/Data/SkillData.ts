import { Skill, Element } from '../Classes/Skill';
import { NameData } from './NameData';

export const skillList: Skill[] =
[
    // Name, cost, element, Description
    // Physical
    new Skill(NameData.CLEAVE, 7, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 15); Max 2d4'),
    new Skill(NameData.DREAMNEEDLE, 8, Element.Physical, 'Deals 1/2((STR BONUS)d4 + PAB + 12); Max 4d4; Sleep FV=12'),
    // Gun
    // Fire
    new Skill(NameData.AGI, 4, Element.Fire, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Burn FV=18'),
    // Ice
    // Elec
    new Skill(NameData.ZIO, 4, Element.Elec, 'Deals 1/2((MAG BONUS)d6 + 10 + (MAG BONUS)); Max 20d6; Shock FV=18'),
    // Wind
    // Psy
    // Nuke
    // Bless
    // Curse
    // Almighty
    new Skill(NameData.EIHA, 4, Element.Curse, 'Deals 1/2((MAG BONUS)d6 + 2(MAG BONUS)); Max 20d6'),
    // Healing
    new Skill(NameData.DIA, 3, Element.Healing, 'Heals (1.5*(MAG BONUS))d10 + 2(MAG BONUS) + 10; Max 3d10'),
    new Skill(NameData.PATRA, 4, Element.Healing, 'Heals Dizzy, Forget, Sleep, & Hunger'),
    // Support
    new Skill(NameData.TARUKAJA, 8, Element.Support, 'Increases target\'s Damage dealt by 1/3 for 3 turns'),
    new Skill(NameData.RAKUNDA, 8, Element.Support, 'Reduces target\'s Damage Reductions by 1/3 for 3 turns'),
    new Skill(NameData.SUKUNDA, 8, Element.Support, 'Reduces target\'s AGI Bonus by 1/3 for 3 turns'),
    // Ailment
    new Skill(NameData.DAZZLER, 5, Element.Ailment, 'Single Target Dizzy FV=7'),
    // Passive
    new Skill(NameData.ADVERSERESOLVE, 0, Element.Passive, '+2 Crit Mod while flanked'),
    new Skill(NameData.RESISTSLEEP, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict sleep'),
    new Skill(NameData.RESISTCONFUSE, 0, Element.Passive, '+2 to FV to attacker\'s roll to inflict confuse'),
    new Skill(NameData.SHARPSTUDENT, 0, Element.Passive, '-2 Crit Bonus to attacker'),
];
