package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the various mastery types represented with a byte
 * 
 * @author Stefan
 *
 */
public enum MasteryType implements ByteValueEnum<MasteryType> {
	TARUKAJA(2), RAKUKAJA(4), SUKUKAJA(6), HP(1), SP(3);

	private final byte value;

	private MasteryType(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the MasteryType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired MasteryType as an {@code int}
	 * @return The MasteryType associated with that value, {@code null} if no
	 *         MasteryType exists with that value
	 */
	public static MasteryType fromIntStatic(int value) {
		return fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the MasteryType associated with the given value
	 * 
	 * @param value
	 *            The value of the desired MasteryType as a {@code byte}
	 * @return The MasteryType associated with that value, {@code null} if no
	 *         MasteryType exists with that value
	 */
	public static MasteryType fromByteStatic(byte value) {
		for (MasteryType type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public MasteryType fromInt(int value) {
		return fromByteStatic((byte) value);
	}

	@Override
	public MasteryType fromByte(byte value) {
		return fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this MasteryType
	 */
	public String asString() {
		if (this.value % 2 == 1) {
			return this.toString();
		} else {
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}

}
