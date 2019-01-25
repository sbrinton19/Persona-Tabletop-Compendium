package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum describing where an item may be consumed represented with a byte
 * 
 * @author Stefan
 *
 */
public enum ConsumableType implements ByteValueEnum<ConsumableType> {
	BATTLE(1), ROAM(2), BOTH(3), NONE(4);

	private final byte value;

	private ConsumableType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the ConsumableType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ConsumableType as an {@code int}
	 * @return The ConsumableType associated with that value, {@code null} if no
	 *         ConsumableType exists with that value
	 */
	public static ConsumableType fromIntStatic(int value) {
		return ConsumableType.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ConsumableType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ConsumableType as a {@code byte}
	 * @return The ConsumableType associated with that value, {@code null} if no
	 *         ConsumableType exists with that value
	 */
	public static ConsumableType fromByteStatic(byte value) {
		for (ConsumableType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public ConsumableType fromInt(int value) {
		return ConsumableType.fromByteStatic((byte) value);
	}

	@Override
	public ConsumableType fromByte(byte value) {
		return ConsumableType.fromByteStatic(value);
	}
}
