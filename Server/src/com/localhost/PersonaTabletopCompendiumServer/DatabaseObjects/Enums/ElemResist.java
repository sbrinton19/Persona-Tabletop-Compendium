package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the damage multiplier against a persona for a given
 * element represented with a byte
 * 
 * @author Stefan
 *
 */
public enum ElemResist implements ByteValueEnum<ElemResist> {
	WEAK(0), NEUTRAL(1), RESIST(2), NULL(3), REPEL(4), ABSORB(5);

	private final byte value;

	private ElemResist(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the ElemResist associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ElemResist as an {@code int}
	 * @return The ElemResist associated with that value, {@code null} if no
	 *         ElemResist exists with that value
	 */
	public static ElemResist fromIntStatic(int value) {
		return ElemResist.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the ElemResist associated with the given value
	 * 
	 * @param value
	 *            The value of the desired ElemResist as a {@code byte}
	 * @return The ElemResist associated with that value, {@code null} if no
	 *         ElemResist exists with that value
	 */
	public static ElemResist fromByteStatic(byte value) {
		for (ElemResist type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public ElemResist fromInt(int value) {
		return ElemResist.fromByteStatic((byte) value);
	}

	@Override
	public ElemResist fromByte(byte value) {
		return ElemResist.fromByteStatic(value);
	}
	
	/**
	 * @return The display string representation of this ElemResist
	 */
	public String asString() {
		switch (this) {
		case WEAK:
		case NEUTRAL:
		case RESIST:
		case NULL:
		case REPEL:
		case ABSORB:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}
}
