package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * Enum for the player armor classes represented with a byte
 * 
 * @author Stefan
 *
 */
public enum ArmorClass implements ByteValueEnum<ArmorClass> {
	MYSTIC(1), LIGHT(2), HEAVY(3), SHIELD(4);

	private final byte value;

	private ArmorClass(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the ArmorClass associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ArmorClass as an {@code int}
	 * @return The ArmorClass associated with that value, {@code null} if no
	 *         ArmorClass exists with that value
	 */
	public static ArmorClass fromIntStatic(int value) {
		return ArmorClass.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ArmorClass associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ArmorClass as an {@code byte}
	 * @return The ArmorClass associated with that value, {@code null} if no
	 *         ArmorClass exists with that value
	 */
	public static ArmorClass fromByteStatic(byte value) {
		for (ArmorClass type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public ArmorClass fromInt(int value) {
		return ArmorClass.fromByteStatic((byte) value);
	}

	@Override
	public ArmorClass fromByte(byte value) {
		return ArmorClass.fromByteStatic(value);
	}
}
