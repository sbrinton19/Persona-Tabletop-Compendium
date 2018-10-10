package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various types of reductions
 * 
 * @author Stefan
 *
 */
public enum ReductionType implements ByteValueEnum<ReductionType> {
	SPECIAL(0), RESISTELEMENT(1), RESISTAILMENT(2), NULLELEMENT(3), NULLAILMENT(4), REPEL(5), ABSORB(6);

	private final byte value;

	private ReductionType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	@Override
	public ReductionType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public ReductionType fromByte(byte value) {
		return fromByteStatic(value);
	}

	public static ReductionType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	public static ReductionType fromByteStatic(byte value) {
		for (ReductionType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
}
