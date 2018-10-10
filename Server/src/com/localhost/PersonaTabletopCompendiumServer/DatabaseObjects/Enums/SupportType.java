package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various types of support magic
 * 
 * @author Stefan
 *
 */
public enum SupportType implements ByteValueEnum<SupportType> {
	LOWER(0), INCREASE(1), WALL(2), BREAK(3), SPECIAL(4);

	private final byte value;

	private SupportType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public SupportType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public SupportType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static SupportType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static SupportType fromByteStatic(byte value) {
		for (SupportType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	public String asString() {
		switch (this) {
		case SPECIAL:
			return "";
		case LOWER:
		case INCREASE:
		case WALL:
		case BREAK:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
