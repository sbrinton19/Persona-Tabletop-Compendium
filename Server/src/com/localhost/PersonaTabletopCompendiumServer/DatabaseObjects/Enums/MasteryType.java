package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various mastery types
 * 
 * @author Stefan
 *
 */
public enum MasteryType implements ByteValueEnum<MasteryType> {
	TARUKAJA(2), RAKUKAJA(4), SUKUKAJA(6), HP(1), SP(3);

	private final byte value;

	private MasteryType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public MasteryType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public MasteryType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static MasteryType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static MasteryType fromByteStatic(byte value) {
		for (MasteryType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	public String asString() {
		if (this.value % 2 == 1) {
			return this.toString();
		} else {
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
