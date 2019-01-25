package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various types of passive skills
 * represented with a byte
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

	/**
	 * Retrieve the PassiveType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired PassiveType as an {@code int}
	 * @return The PassiveType associated with that value, {@code null} if no
	 *         PassiveType exists with that value
	 */
	public static PassiveType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the PassiveType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired PassiveType as a {@code byte}
	 * @return The PassiveType associated with that value, {@code null} if no
	 *         PassiveType exists with that value
	 */
	public static PassiveType fromByteStatic(byte value) {
		for (PassiveType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public PassiveType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public PassiveType fromByte(byte value) {
		return fromByteStatic(value);
	}
}
