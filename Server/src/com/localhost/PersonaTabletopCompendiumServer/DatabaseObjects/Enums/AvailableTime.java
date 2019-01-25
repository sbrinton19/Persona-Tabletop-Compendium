package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

import java.util.ArrayList;

/**
 * An enum for the times an activity can be done represented with a byte
 * 
 * @author Stefan
 *
 */
public enum AvailableTime implements ByteValueEnum<AvailableTime> {
	EARLYMORNING(1), MORNING(2), MIDDAY(4), AFTERNOON(8), EVENING(16), NIGHT(32), LATENIGHT(64), ALLDAY(127), NONE(0);

	private final byte value;

	private AvailableTime(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Converts the byte availableTimes field to the AvailableTimes for that availableTimes value
	 * 
	 * @param availableTimes
	 *            The availableTimes field of an activity
	 * @return An array of the AvailableTimes for that activity
	 */
	public static AvailableTime[] getAvailableTimes(byte availableTimes) {
		ArrayList<AvailableTime> construct = new ArrayList<AvailableTime>();
		for (AvailableTime type : values()) {
			if ((availableTimes & type.getValue()) != 0) {
				construct.add(type);
			}
		}
		AvailableTime[] ret = new AvailableTime[construct.size()];
		construct.toArray(ret);
		return ret;
	}

	/**
	 * Retrieve the AvailableTime associated with the given value
	 * 
	 * @param value
	 *            The value of the desired AvailableTime as an {@code int}
	 * @return The AvailableTime associated with that value, {@code null} if no
	 *         AvailableTime exists with that value
	 */
	public static AvailableTime fromIntStatic(int value) {
		return AvailableTime.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the AvailableTime associated with the given value
	 * 
	 * @param value
	 *            The value of the desired AvailableTime as a {@code byte}
	 * @return The AvailableTime associated with that value, {@code null} if no
	 *         AvailableTime exists with that value
	 */
	public static AvailableTime fromByteStatic(byte value) {
		for (AvailableTime type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public AvailableTime fromInt(int value) {
		return AvailableTime.fromByteStatic((byte) value);
	}

	@Override
	public AvailableTime fromByte(byte value) {
		return AvailableTime.fromByteStatic(value);
	}
}
