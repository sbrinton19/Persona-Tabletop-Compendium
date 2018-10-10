package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various types of passive skills
 * 
 * @author Stefan
 *
 */
public enum PassiveType implements ByteValueEnum<PassiveType> {
	BOOST(0), REDUCTION(1), DODGE(2), COUNTER(3), RECOVER(4), MASTER(5), KILL(6), POST(7), GROWTH(8), CHAIN(9),
	IRREGULAR(10);

	private final byte value;

	private PassiveType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public PassiveType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public PassiveType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static PassiveType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static PassiveType fromByteStatic(byte value) {
		for (PassiveType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
}
