package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the various activity types represented with a byte
 * 
 * @author Stefan
 *
 */
public enum ActivityType implements ByteValueEnum<ActivityType> {
	SHOPPING(1), JOB(2), MINIGAME(4), TRAITBOOST(8), CONFIDANT(16), STATBOOST(32);

	private final byte value;

	private ActivityType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the ActivityType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ActivityType as an {@code int}
	 * @return The ActivityType associated with that value, {@code null} if no
	 *         ActivityType exists with that value
	 */
	public static ActivityType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ActivityType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ActivityType as a {@code byte}
	 * @return The ActivityType associated with that value, {@code null} if no
	 *         ActivityType exists with that value
	 */
	public static ActivityType fromByteStatic(byte value) {
		for (ActivityType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public ActivityType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public ActivityType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this ActivityType
	 */
	public String asString() {
		switch (this) {
		case TRAITBOOST:
			return "Trait Boost";
		case STATBOOST:
			return "Stat Boost";
		case SHOPPING:
		case JOB:
		case MINIGAME:
		case CONFIDANT:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
