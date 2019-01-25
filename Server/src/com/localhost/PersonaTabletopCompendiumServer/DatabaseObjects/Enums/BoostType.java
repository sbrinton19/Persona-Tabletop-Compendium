package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various types of boosts represented as a byte
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

	/**
	 * Retrieve the BoostType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BoostType as an {@code int}
	 * @return The BoostType associated with that value, {@code null} if no
	 *         BoostType exists with that value
	 */
	public static BoostType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the BoostType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BoostType as a {@code byte}
	 * @return The BoostType associated with that value, {@code null} if no
	 *         BoostType exists with that value
	 */
	public static BoostType fromByteStatic(byte value) {
		for (BoostType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public BoostType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public BoostType fromByte(byte value) {
		return fromByteStatic(value);
	}
}
