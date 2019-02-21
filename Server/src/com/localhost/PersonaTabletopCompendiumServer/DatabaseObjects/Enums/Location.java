package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for real world locations represented with a byte
 * 
 * @author Stefan
 *
 */
public enum Location implements ByteValueEnum<Location> {
	ANYWHERE(1), DORMS(2), CAMPUS(3), DOWNTOWN(4), UPTOWN(5), ELECTRICCITY(6),
	SOUTHSIDE(7), GREATTEMPLE(8), CHINATOWN(9), NOWHERE(0);

	private final byte value;

	private Location(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}
	
	/**
	 * Retrieve the Location associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Location as an {@code int}
	 * @return The Location associated with that value, {@code null} if no
	 *         Location exists with that value
	 */
	public static Location fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the Location associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Location as a {@code byte}
	 * @return The Location associated with that value, {@code null} if no
	 *         Location exists with that value
	 */
	public static Location fromByteStatic(byte value) {
		for (Location type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public Location fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public Location fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this Location
	 */
	public String asString() {
		switch (this) {
		case ELECTRICCITY:
			return "Electric City";
		case GREATTEMPLE:
			return "Great Temple";
		case ANYWHERE:
		case DORMS:
		case CAMPUS:
		case DOWNTOWN:
		case UPTOWN:
		case CHINATOWN:
		case NOWHERE:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
