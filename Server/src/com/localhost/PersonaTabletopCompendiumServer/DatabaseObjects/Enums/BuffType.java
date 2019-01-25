package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various types of buffs represented as a byte
 * 
 * @author Stefan
 *
 */
public enum BuffType implements ByteValueEnum<BuffType> {
	ATTACK(0), DEFENSE(1), AGILITY(2), TRIPLESTAT(3), CRITMOD(4), CRITBONUS(5), CRIT(6);

	private final byte value;

	private BuffType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}
	
	/**
	 * Retrieve the BuffType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BuffType as an {@code int}
	 * @return The BuffType associated with that value, {@code null} if no
	 *         BuffType exists with that value
	 */
	public static BuffType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the BuffType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BuffType as a {@code byte}
	 * @return The BuffType associated with that value, {@code null} if no
	 *         BuffType exists with that value
	 */
	public static BuffType fromByteStatic(byte value) {
		for (BuffType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public BuffType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public BuffType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this BuffType
	 */
	public String asString() {
		switch (this) {
		case ATTACK:
			return "Damage";
		case DEFENSE:
			return "Damage Reduction";
		case AGILITY:
			return "AGI Bonus";
		case CRITMOD:
			return "Crit Mod";
		case CRITBONUS:
			return "Crit Bonus";
		case CRIT:
			return "Crit Mod & Bonus";
		case TRIPLESTAT:
			return "Damage, Damage Reduction, & AGI Bonus";
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
