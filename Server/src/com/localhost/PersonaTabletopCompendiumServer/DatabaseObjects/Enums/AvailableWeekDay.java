package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

import java.util.ArrayList;

/**
 * An enum for the days of the week an activity can be done
 * represented with a byte
 * 
 * @author Stefan
 *
 */
public enum AvailableWeekDay implements ByteValueEnum<AvailableWeekDay> {
	MONDAY(1), TUESDAY(2), WEDNESDAY(4), THURSDAY(8), FRIDAY(16), SATURDAY(32), SUNDAY(64), ANY(127), NONE(0);

	private final byte value;

	private AvailableWeekDay(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Converts the byte availableWeekDays field to the AvailableWeekDays for that availableWeekDays value
	 * 
	 * @param availableWeekDays
	 *            The availableWeekDays field of an activity
	 * @return An array of the AvailableWeekDays for that activity
	 */
	public static AvailableWeekDay[] getAvailableWeekDays(byte availableWeekDays) {
		ArrayList<AvailableWeekDay> construct = new ArrayList<AvailableWeekDay>();
		for (AvailableWeekDay type : values()) {
			if ((availableWeekDays & type.getValue()) != 0) {
				construct.add(type);
			}
		}
		AvailableWeekDay[] ret = new AvailableWeekDay[construct.size()];
		construct.toArray(ret);
		return ret;
	}

	/**
	 * Retrieve the AvailableWeekDay associated with the given value
	 * 
	 * @param value
	 *            The value of the desired AvailableWeekDay as an {@code int}
	 * @return The AvailableWeekDay associated with that value, {@code null} if no
	 *         AvailableWeekDay exists with that value
	 */
	public static AvailableWeekDay fromIntStatic(int value) {
		return AvailableWeekDay.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the AvailableWeekDay associated with the given value
	 * 
	 * @param value
	 *            The value of the desired AvailableWeekDay as a {@code byte}
	 * @return The AvailableWeekDay associated with that value, {@code null} if no
	 *         AvailableWeekDay exists with that value
	 */
	public static AvailableWeekDay fromByteStatic(byte value) {
		for (AvailableWeekDay type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public AvailableWeekDay fromInt(int value) {
		return AvailableWeekDay.fromByteStatic((byte) value);
	}

	@Override
	public AvailableWeekDay fromByte(byte value) {
		return AvailableWeekDay.fromByteStatic(value);
	}
}
