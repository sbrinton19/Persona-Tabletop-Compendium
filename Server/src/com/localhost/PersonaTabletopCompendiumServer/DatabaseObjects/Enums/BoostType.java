package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various types of boosts
 * 
 * @author Stefan
 *
 */
public enum BoostType implements ByteValueEnum<BoostType> {
	BOOST(25), AMP(50), AILMENT(2), SPECIAL(0);

	private final byte value;

	private BoostType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public BoostType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public BoostType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static BoostType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static BoostType fromByteStatic(byte value) {
		for (BoostType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
}
