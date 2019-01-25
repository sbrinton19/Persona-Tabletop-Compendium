package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the general type of an item represented by a byte
 * 
 * @author Stefan
 *
 */
public enum ItemType implements ByteValueEnum<ItemType> {
	WEAPON(1), ARMOR(2), ACCESSORY(3), CONSUMABLE(4), SKILLCARD(5), LOOT(6), NONE(7);

	private final byte value;

	private ItemType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the ItemType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ItemType as an {@code int}
	 * @return The ItemType associated with that value, {@code null} if no
	 *         ItemType exists with that value
	 */
	public static ItemType fromIntStatic(int value) {
		return ItemType.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ItemType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ItemType as a {@code byte}
	 * @return The ItemType associated with that value, {@code null} if no
	 *         ItemType exists with that value
	 */
	public static ItemType fromByteStatic(byte value) {
		for (ItemType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public ItemType fromInt(int value) {
		return ItemType.fromByteStatic((byte) value);
	}

	@Override
	public ItemType fromByte(byte value) {
		return ItemType.fromByteStatic(value);
	}
}
