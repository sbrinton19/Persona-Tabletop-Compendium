package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various restriction types represented with a byte
 * 
 * @author Stefan
 *
 */
public enum RestrictionType implements ByteValueEnum<RestrictionType> {
	DATE(1), WEEKDAY(2), WEATHER(4), CONFIDANT(8), TRAIT(16);

	private final byte value;

	private RestrictionType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the RestrictionType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired RestrictionType as an {@code int}
	 * @return The RestrictionType associated with that value, {@code null} if no
	 *         RestrictionType exists with that value
	 */
	public static RestrictionType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the RestrictionType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired RestrictionType as a {@code byte}
	 * @return The RestrictionType associated with that value, {@code null} if no
	 *         RestrictionType exists with that value
	 */
	public static RestrictionType fromByteStatic(byte value) {
		for (RestrictionType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public RestrictionType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public RestrictionType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this RestrictionType
	 */
	public String asString() {
		switch (this) {
		case DATE:
		case WEEKDAY:
		case WEATHER:
		case CONFIDANT:
		case TRAIT:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
