package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for skill elements/types represented by a byte
 * 
 * @author Stefan
 *
 */
public enum Element implements ByteValueEnum<Element> {
	PHYSICAL(0), GUN(1), FIRE(2), ICE(3), ELEC(4), WIND(5), PSY(6), NUKE(7), BLESS(8), CURSE(9), ALMIGHTY(10), HEALING(
			11), SUPPORT(12), AILMENT(13), PASSIVE(14), MAGIC(15), ALLDAMAGE(16);

	private final byte value;

	private Element(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the Element associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Element as an {@code int}
	 * @return The Element associated with that value, {@code null} if no
	 *         Element exists with that value
	 */
	public static Element fromIntStatic(int value) {
		return Element.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the Element associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Element as an {@code byte}
	 * @return The Element associated with that value, {@code null} if no
	 *         Element exists with that value
	 */
	public static Element fromByteStatic(byte value) {
		for (Element type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public Element fromInt(int value) {
		return Element.fromByteStatic((byte) value);
	}

	@Override
	public Element fromByte(byte value) {
		return Element.fromByteStatic(value);
	}

	public String asString() {
		switch (this) {
		case ELEC:
			return "Electric";
		case NUKE:
			return "Nuclear";
		case PSY:
			return "Psychic";
		case ALLDAMAGE:
			return "any damage";
		case AILMENT:
		case ALMIGHTY:
		case BLESS:
		case CURSE:
		case FIRE:
		case GUN:
		case HEALING:
		case ICE:
		case MAGIC:
		case PASSIVE:
		case PHYSICAL:
		case SUPPORT:
		case WIND:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}
}
