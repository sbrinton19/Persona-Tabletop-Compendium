package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various types of recovery represented with a byte
 * 
 * @author Stefan
 *
 */
public enum RecoveryType implements ByteValueEnum<RecoveryType> {
	SPECIAL(0), HP(1), SP(2), HPSP(3), AILMENT(4);

	private final byte value;

	private RecoveryType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the RecoveryType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired RecoveryType as an {@code int}
	 * @return The RecoveryType associated with that value, {@code null} if no
	 *         RecoveryType exists with that value
	 */
	public static RecoveryType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the RecoveryType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired RecoveryType as a {@code byte}
	 * @return The RecoveryType associated with that value, {@code null} if no
	 *         RecoveryType exists with that value
	 */
	public static RecoveryType fromByteStatic(byte value) {
		for (RecoveryType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public RecoveryType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public RecoveryType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this RecoveryType
	 */
	public String asString() {
		switch (this) {
		case HP:
			return "% max health";
		case SP:
			return "SP";
		case HPSP:
			return "";
		case AILMENT:
			return "Ailments last";
		case SPECIAL:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}
	
}
