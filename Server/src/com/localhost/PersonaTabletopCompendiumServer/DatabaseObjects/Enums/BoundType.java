package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various activity types represented with a byte
 * 
 * @author Stefan
 *
 */
public enum BoundType implements ByteValueEnum<BoundType> {
	ACTIVITY(1), ITEM(2), NONE(0);

	private final byte value;

	private BoundType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}
	
	/**
	 * Retrieve the BoundType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BoundType as an {@code int}
	 * @return The BoundType associated with that value, {@code null} if no
	 *         BoundType exists with that value
	 */
	public static BoundType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the BoundType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired BoundType as a {@code byte}
	 * @return The BoundType associated with that value, {@code null} if no
	 *         BoundType exists with that value
	 */
	public static BoundType fromByteStatic(byte value) {
		for (BoundType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public BoundType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public BoundType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this BoundType
	 */
	public String asString() {
		switch (this) {
		case ACTIVITY:
		case ITEM:
		case NONE:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
