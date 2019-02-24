import { Arcana } from '../Enums/Arcana';
import { PersonaReference } from './PersonaReference';
import { OriginType, getOriginName, getOrigins } from '../Enums/OriginType';
import { GearPool, getGearPoolName } from '../Enums/GearPool';
import { ItemType, getItemTypeName } from '../Enums/ItemType';
import { ArmorClass, getArmorClassName } from '../Enums/ArmorClass';
import { SkillCardType, getSkillCardTypeName } from '../Enums/SkillCardType';
import { ConsumableType, getConsumableTypeName } from '../Enums/ConsumableType';
import { VendorItemReference } from './ItemReference';

export class FlatItem {
    readonly id: number;
    readonly name: string;
    readonly schedule: number;
    readonly origins: number;
    readonly type: ItemType;
    readonly consumableType: ConsumableType;
    readonly description: string;
    readonly special: string;
    readonly transmuteId: number;

    public constructor(id: number, name: string, schedule: number, origins: number, type: ItemType, consumableType: ConsumableType,
        description: string, special: string, transmuteId: number) {
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
        return new FlatItem(source.id, source.name, source.schedule, source.origins, source.type, source.consumableType,
            source.description, source.special, source.transmuteId);
    }

    public clone(): FlatItem {
        return FlatItem.copyConstructor(this);
    }

    public getOrigins(): OriginType[] {
        return getOrigins(this.origins);
    }

    public getOriginName(origin: OriginType) {
        return getOriginName(origin);
    }

    public getTypeName(): string {
        return getItemTypeName(this.type);
    }

    public getConsumableTypeName(): string {
        return getConsumableTypeName(this.consumableType);
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
    readonly transmute: PersonaReference;
    readonly droppers: PersonaReference[];
    readonly negotiators: PersonaReference[];
    readonly vendorSources: VendorItemReference[];

    public constructor(item: FlatItem, transmute: PersonaReference, droppers: PersonaReference[],
        negotiators: PersonaReference[], vendorSources: VendorItemReference[]) {
        this.item = item;
        this.transmute = transmute;
        this.droppers = droppers;
        this.negotiators = negotiators;
        this.vendorSources = vendorSources;
    }

    public static copyConstructor(source: FullItem): FullItem {
        const droppers: PersonaReference[] = [];
        source.droppers.forEach(pSource => droppers.push(PersonaReference.copyConstructor(pSource)));

        const negotiators: PersonaReference[] = [];
        source.negotiators.forEach(pSource => negotiators.push(PersonaReference.copyConstructor(pSource)));

        const vendors: VendorItemReference[] = [];
        source.vendorSources.forEach(vSource => vendors.push(VendorItemReference.copyConstructor(vSource)));

        return new FullItem(FlatItem.copyConstructor(source.item), PersonaReference.copyConstructor(source.transmute),
            droppers, negotiators, vendors);
    }

    public clone(): FullItem {
        return FullItem.copyConstructor(this);
    }

    public isEqual(other: FullItem): boolean {
        if (!other) {
            return false;
        }

        if (this.droppers.length !== other.droppers.length) {
            return false;
        }
        const refMatch = this.droppers.every(source => {
            const matcher = other.droppers.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!refMatch) {
            return false;
        }

        if (this.negotiators.length !== other.negotiators.length) {
            return false;
        }
        const negotMatch = this.negotiators.every(source => {
            const matcher = other.negotiators.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!negotMatch) {
            return false;
        }

        if (this.vendorSources.length !== other.vendorSources.length) {
            return false;
        }
        const vendorMatch = this.vendorSources.every(source => {
            const matcher = other.vendorSources.find(otherSource => source.isEqual(otherSource));
            return matcher !== undefined;
        });
        if (!vendorMatch) {
            return false;
        }

        return (this.item.isEqual(other.item) && this.transmute.isEqual(other.transmute));
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
            super(id, name, schedule, origins, ItemType.Weapon, ConsumableType.None, description, special, transmuteId);
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

    public clone(): FlatWeapon {
        return FlatWeapon.copyConstructor(this);
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

    public clone(): FlatRangedWeapon {
        return FlatRangedWeapon.copyConstructor(this);
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
            super(id, name, schedule, origins, ItemType.Armor, ConsumableType.None, description, special, transmuteId);
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

    public clone(): FlatArmor {
        return FlatArmor.copyConstructor(this);
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
        super(id, name, schedule, origins, ItemType.Accessory, ConsumableType.None, description, special, transmuteId);
    }

    public static copyConstructor(source: FlatAccessory): FlatAccessory {
        if (source.type !== ItemType.Accessory) {
            console.warn(`The accessory ${source.name} with id ${source.id} does not have the type accessory, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The accessory ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }

        return new FlatAccessory(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public clone(): FlatAccessory {
        return FlatAccessory.copyConstructor(this);
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
            super(id, name, schedule, origins, ItemType.Consumable, consumableType, description, special, transmuteId);
    }

    public static copyConstructor(source: FlatConsumable): FlatConsumable {
        if (source.type !== ItemType.Consumable) {
            console.warn(`The consumable ${source.name} with id ${source.id} does not have the type consumable, check its source data`);
        }

        return new FlatConsumable(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId,
            source.consumableType);
    }

    public clone(): FlatConsumable {
        return FlatConsumable.copyConstructor(this);
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
            super(id, name, schedule, origins, ItemType.SkillCard, ConsumableType.Both, description, special, transmuteId);
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

    public clone(): FlatSkillCard {
        return FlatSkillCard.copyConstructor(this);
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
        super(id, name, schedule, origins, ItemType.Loot, ConsumableType.None, description, special, transmuteId);
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

    public clone(): FlatLoot {
        return FlatLoot.copyConstructor(this);
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
        super(id, name, schedule, origins, ItemType.TraitBoost, ConsumableType.None, description, special, transmuteId);
    }

    public static copyConstructor(source: FlatTraitBoostItem): FlatTraitBoostItem {
        if (source.type !== ItemType.TraitBoost) {
            console.warn(`The trait boost item ${source.name} with id ${source.id} does not have the type trait boost, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The trait boost item ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }

        return new FlatTraitBoostItem(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public clone(): FlatTraitBoostItem {
        return FlatTraitBoostItem.copyConstructor(this);
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
        super(id, name, schedule, origins, ItemType.StatBoost, ConsumableType.None, description, special, transmuteId);
    }

    public static copyConstructor(source: FlatStatBoostItem): FlatStatBoostItem {
        if (source.type !== ItemType.TraitBoost) {
            console.warn(`The stat boost item ${source.name} with id ${source.id} does not have the type trait boost, check its source data`);
        } else if (source.consumableType !== ConsumableType.None) {
            console.warn(`The stat boost item ${source.name} with id ${source.id} does not have the consumable type none, check its source data`);
        }

        return new FlatStatBoostItem(source.id, source.name, source.schedule, source.origins, source.description, source.special, source.transmuteId);
    }

    public clone(): FlatStatBoostItem {
        return FlatStatBoostItem.copyConstructor(this);
    }

    public isEqual(other: FlatStatBoostItem): boolean {
        if (!other) {
            return false;
        }
        return super.isEqual(other);
    }
}
// (this.item.origins & OriginType.Drop) && this.item.name !== '-'
