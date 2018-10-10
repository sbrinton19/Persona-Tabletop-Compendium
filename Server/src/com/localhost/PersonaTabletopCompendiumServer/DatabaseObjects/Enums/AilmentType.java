package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various ailment types incl. Instakill/Instadeath
 * 
 * @author Stefan
 *
 */
public enum AilmentType implements ByteValueEnum<AilmentType> {
	SLEEP(0), FORGET(1), DIZZY(2), HUNGER(3), PHYSICAL(4), CONFUSE(5), BRAINWASH(6), RAGE(7), FEAR(8), 
	DESPAIR(9), MENTAL(10), BURN(11), FREEZE(12), SHOCK(13), ELEMENTAL(14), ALL(15), INSTAKILL(16);

	private final byte value;

	private AilmentType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public AilmentType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public AilmentType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static AilmentType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static AilmentType fromByteStatic(byte value) {
		for (AilmentType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	public String asString() {
		switch (this) {
		case PHYSICAL:
			return "Dizzy, Forget, Sleep, & Hunger";
		case MENTAL:
			return "Confuse, Fear, Rage, Despair, & Brainwash";
		case ELEMENTAL:
			return "Burn, Freeze, & Shock";
		case ALL:
			return "any non-special ailment";
		case SHOCK:
		case FREEZE:
		case BURN:
		case DESPAIR:
		case FEAR:
		case RAGE:
		case BRAINWASH:
		case CONFUSE:
		case HUNGER:
		case DIZZY:
		case FORGET:
		case SLEEP:
		case INSTAKILL:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
