package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various types of reductions represented with a byte
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

	/**
	 * Retrieve the ReductionType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ReductionType as an {@code int}
	 * @return The ReductionType associated with that value, {@code null} if no
	 *         ReductionType exists with that value
	 */
	public static ReductionType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ReductionType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ReductionType as a {@code byte}
	 * @return The ReductionType associated with that value, {@code null} if no
	 *         ReductionType exists with that value
	 */
	public static ReductionType fromByteStatic(byte value) {
		for (ReductionType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public ReductionType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public ReductionType fromByte(byte value) {
		return fromByteStatic(value);
	}
}
