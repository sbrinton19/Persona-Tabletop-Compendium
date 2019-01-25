package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

import java.util.ArrayList;

/**
 * An enum for the places where an item can be found
 * represented by a byte
 * 
 * @author Stefan
 *
 */
public enum OriginType implements ByteValueEnum<OriginType> {
	CHEST(1), CONFIDANT(2), DROP(4), NEGOTIATE(8), STORE(16), TRANSMUTE(32), ALL(63), ERROR(64), NONE(0);

	private final byte value;

	private OriginType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Converts the byte origins field to the OriginTypes for that origins value
	 * 
	 * @param origins
	 *            The origins field of an item
	 * @return An array of the OriginTypes for that item
	 */
	public static OriginType[] getOrigins(byte origins) {
		ArrayList<OriginType> construct = new ArrayList<OriginType>();
		for (OriginType type : values()) {
			if ((origins & type.getValue()) != 0) {
				construct.add(type);
			}
		}
		OriginType[] ret = new OriginType[construct.size()];
		construct.toArray(ret);
		return ret;
	}

	/**
	 * Retrieve the OriginType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired OriginType as an {@code int}
	 * @return The OriginType associated with that value, {@code null} if no
	 *         OriginType exists with that value
	 */
	public static OriginType fromIntStatic(int value) {
		return OriginType.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the OriginType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired OriginType as a {@code byte}
	 * @return The OriginType associated with that value, {@code null} if no
	 *         OriginType exists with that value
	 */
	public static OriginType fromByteStatic(byte value) {
		for (OriginType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public OriginType fromInt(int value) {
		return OriginType.fromByteStatic((byte) value);
	}

	@Override
	public OriginType fromByte(byte value) {
		return OriginType.fromByteStatic(value);
	}
}
