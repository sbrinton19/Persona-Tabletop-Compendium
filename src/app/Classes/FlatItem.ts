import { Arcana } from '../Enums/Arcana';
import { PersonaReference } from './PersonaReference';
import { OriginType, getOriginName, getOrigins } from '../Enums/OriginType';
import { GearPool, getGearPoolName } from '../Enums/GearPool';
import { ItemType, getItemTypeName } from '../Enums/ItemType';
import { ArmorClass, getArmorClassName } from '../Enums/ArmorClass';
import { SkillCardType, getSkillCardTypeName } from '../Enums/SkillCardType';
import { ConsumableType, getConsumableTypeName } from '../Enums/ConsumableType';

export class FlatItem {
    readonly id: number;
    readonly name: string;
    readonly schedule: number;
    readonly description: string;
    readonly special: string;
    readonly type: ItemType;
    readonly consumableType: ConsumableType;
    readonly origins: number;
    readonly transmuteId: number;

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, type: ItemType,
        transmuteId: number, consumableType: ConsumableType) {
            this.id = id;
            this.name = name;
            this.schedule = schedule;
            this.origins = origins;
            this.description = description;
            this.special = special;
            this.type = type;
            this.transmuteId = transmuteId;
            this.consumableType = consumableType;
    }

    public static copyConstructor(source: FlatItem): FlatItem {
        return new FlatItem(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.type,
            source.transmuteId, source.consumableType);
    }

    public getTypeName(): string {
        return getItemTypeName(this.type);
    }

    public getConsumableTypeName(): string {
        return getConsumableTypeName(this.consumableType);
    }

    public getOrigins(): OriginType[] {
        return getOrigins(this.origins);
    }

    public getOriginName(origin: OriginType) {
        return getOriginName(origin);
    }

    public isEqual(other: FlatItem): boolean {
        if (!other) {
            return false;
        }
        return (this.id === other.id && this.name === other.name && this.schedule === other.schedule && this.origins === other.origins &&
            this.description === other.description && this.special === other.special && this.type === other.type && this.transmuteId === other.transmuteId &&
            this.consumableType === other.consumableType);
    }
}

export class FullItem {
    readonly item: FlatItem;
    readonly personaSources: PersonaReference[];
    readonly itemClass: string;

    public constructor(item: FlatItem, personaSources: PersonaReference[], itemClass: string) {
        this.item = item;
        this.personaSources = personaSources;
        this.itemClass = itemClass;
    }

    public static copyConstructor(source: FullItem): FullItem {
        const sources: PersonaReference[] = [];
        source.personaSources.forEach(pSource => sources.push(PersonaReference.copyConstructor(pSource)));
        return new FullItem(FlatItem.copyConstructor(source.item), sources, source.itemClass);
    }

    public isEqual(other: FullItem): boolean {
        if (!other) {
            return false;
        }

        if (this.personaSources.length !== other.personaSources.length) {
            return false;
        }
        const refMatch = this.personaSources.every(source => {
            const matcher = other.personaSources.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!refMatch) {
            return false;
        }

        return (this.item.isEqual(other.item) && this.itemClass === other.itemClass);
    }
}

export class FlatWeapon extends FlatItem {
    readonly baseDamage: number;
    readonly maxDamageDice: number;
    readonly damageDie: number;
    readonly minRange: number;
    readonly maxRange: number;
    readonly failValue: number;

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        baseDamage: number, maxDamageDice: number, damageDie: number, minRange: number, maxRange: number, failValue: number) {
            super(id, name, schedule, origins, description, special, ItemType.Weapon, transmuteId, ConsumableType.None);
            this.baseDamage = baseDamage;
            this.maxDamageDice = maxDamageDice;
            this.damageDie = damageDie;
            this.minRange = minRange;
            this.maxRange = maxRange;
            this.failValue = failValue;
    }

    public static copyConstructor(source: FlatWeapon): FlatWeapon {
        if (source.type !== ItemType.Weapon) {
            console.warn(`The weapon ${source.name} with id ${source.id} does not have the type weapon, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The weapon ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatWeapon(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.baseDamage, source.maxDamageDice, source.damageDie, source.minRange, source.maxRange, source.failValue);
    }

    public getRangeString(): string {
        if (this.minRange === this.maxRange) {
            return this.minRange.toString();
        }
        return `${this.minRange}-${this.maxRange}`;
    }

    public isEqual(other: FlatWeapon): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.baseDamage === other.baseDamage && this.maxDamageDice === other.maxDamageDice &&
            this.damageDie === other.damageDie && this.minRange === other.minRange && this.maxRange === other.maxRange && this.failValue === other.failValue);
    }
}

export class FlatRangedWeapon extends FlatWeapon {
    readonly magSize: number;
    readonly magCount: number;

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        baseDamage: number, maxDamageDice: number, damageDie: number, minRange: number, maxRange: number, failValue: number,
        magSize: number, magCount: number) {
            super(id, name, schedule, origins, description, special, transmuteId, baseDamage, maxDamageDice, damageDie, minRange, maxRange, failValue);
            this.magSize = magSize;
            this.magCount = magCount;
    }

    public static copyConstructor(source: FlatRangedWeapon): FlatRangedWeapon {
        return new FlatRangedWeapon(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.baseDamage, source.maxDamageDice, source.damageDie, source.minRange, source.maxRange, source.failValue, source.magSize, source.magCount);
    }

    public isEqual(other: FlatRangedWeapon): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.magSize === other.magSize && this.magCount === other.magCount);
    }
}

export class FlatArmor extends FlatItem {
    readonly armorClass: ArmorClass;
    readonly damageReduction: number;
    readonly moveAimPenalty: number;
    readonly maxDodgeBonus: number;
    readonly dirtyGearPool: GearPool;

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        armorClass: ArmorClass, damageReduction: number, moveAimPenalty: number, maxDodgeBonus: number, dirtyGearPool: GearPool) {
            super(id, name, schedule, origins, description, special, ItemType.Armor, transmuteId, ConsumableType.None);
            this.armorClass = armorClass;
            this.damageReduction = damageReduction;
            this.moveAimPenalty = moveAimPenalty;
            this.maxDodgeBonus = maxDodgeBonus;
            this.dirtyGearPool = dirtyGearPool;
    }

    public static copyConstructor(source: FlatArmor): FlatArmor {
        if (source.type !== ItemType.Armor) {
            console.warn(`The armor ${source.name} with id ${source.id} does not have the type armor, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The armor ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatArmor(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.armorClass, source.damageReduction, source.moveAimPenalty, source.maxDodgeBonus, source.dirtyGearPool);
    }

    public getArmorClassName(): string {
        return getArmorClassName(this.armorClass);
    }

    public getGearPoolName(): string {
        return getGearPoolName(this.dirtyGearPool);
    }

    public isEqual(other: FlatArmor): boolean {
        if (!other) {
            return false;
        }
        return (super.isEqual(other) && this.armorClass === other.armorClass && this.damageReduction === other.damageReduction &&
            this.moveAimPenalty === other.moveAimPenalty && this.maxDodgeBonus === other.maxDodgeBonus && this.dirtyGearPool === other.dirtyGearPool);
    }
}

export class FlatAccessory extends FlatItem {
    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number) {
        super(id, name, schedule, origins, description, special, ItemType.Accessory, transmuteId, ConsumableType.None);
    }

    public static copyConstructor(source: FlatAccessory): FlatAccessory {
        if (source.type !== ItemType.Accessory) {
            console.warn(`The accessory ${source.name} with id ${source.id} does not have the type accessory, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The accessory ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatAccessory(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public isEqual(other: FlatAccessory): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}

export class FlatConsumable extends FlatItem {
    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        consumableType: ConsumableType) {
            super(id, name, schedule, origins, description, special, ItemType.Consumable, transmuteId, consumableType);
    }

    public static copyConstructor(source: FlatConsumable): FlatConsumable {
        if (source.type !== ItemType.Consumable) {
            console.warn(`The consumable ${source.name} with id ${source.id} does not have the type consumable, check its source data`);
        }
        return new FlatConsumable(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.consumableType);
    }

    public isEqual(other: FlatConsumable): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}

export class FlatSkillCard extends FlatItem {
    skillName: string;
    cardType: SkillCardType;

    public constructor(id: number, skillName: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        cardType: SkillCardType) {
            const name = `${skillName} ${getSkillCardTypeName(cardType)}`;
            super(id, name, schedule, origins, description, special, ItemType.SkillCard, transmuteId, ConsumableType.Both);
            this.skillName = skillName;
            this.cardType = cardType;
    }

    public static copyConstructor(source: FlatSkillCard): FlatSkillCard {
        if (source.type !== ItemType.SkillCard) {
            console.warn(`The skill card ${source.name} with id ${source.id} does not have the type skill card, check its source data`);
        } else if (source.consumableType !== ConsumableType.Both) {
            console.warn(`The skill card ${source.name} with id ${source.id} does not have the consumable type both, check its source data`);
        }
        return new FlatSkillCard(source.id, source.skillName, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.cardType);
    }

    public isEqual(other: FlatSkillCard): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}

export class FlatLoot extends FlatItem {
    readonly arcanaSources: Arcana[] = [];

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number,
        arcanaSources: Arcana[]) {
        super(id, name, schedule, origins, description, special, ItemType.Loot, transmuteId, ConsumableType.None);
        this.arcanaSources = arcanaSources;
    }

    public static copyConstructor(source: FlatLoot): FlatLoot {
        if (source.type !== ItemType.Loot) {
            console.warn(`The loot ${source.name} with id ${source.id} does not have the type loot, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The loot ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatLoot(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.arcanaSources);
    }

    public isEqual(other: FlatLoot): boolean {
        if (!other) {
            return false;
        }

        if (this.arcanaSources.length !== other.arcanaSources.length) {
            return false;
        }
        const refMatch: boolean = this.arcanaSources.every(aSource => {
             const matcher = other.arcanaSources.find(otherSource => otherSource === aSource);
             return matcher !== undefined;
        });
        if (!refMatch) {
            return false;
        }

        return super.isEqual(other);
    }
}

export class FlatTraitBoostItem extends FlatItem {

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number) {
        super(id, name, schedule, origins, description, special, ItemType.TraitBoost, transmuteId, ConsumableType.None);
    }

    public static copyConstructor(source: FlatTraitBoostItem): FlatTraitBoostItem {
        if (source.type !== ItemType.TraitBoost) {
            console.warn(`The trait boost item ${source.name} with id ${source.id} does not have the type trait boost, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The trait boost item ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatTraitBoostItem(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public isEqual(other: FlatTraitBoostItem): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}

export class FlatStatBoostItem extends FlatItem {

    public constructor(id: number, name: string, schedule: number, origins: number, description: string, special: string, transmuteId: number) {
        super(id, name, schedule, origins, description, special, ItemType.StatBoost, transmuteId, ConsumableType.None);
    }

    public static copyConstructor(source: FlatStatBoostItem): FlatStatBoostItem {
        if (source.type !== ItemType.TraitBoost) {
            console.warn(`The stat boost item ${source.name} with id ${source.id} does not have the type trait boost, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The stat boost item ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }
        return new FlatStatBoostItem(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public isEqual(other: FlatStatBoostItem): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}
// (this.item.origins & OriginType.Drop) && this.item.name !== '-'
