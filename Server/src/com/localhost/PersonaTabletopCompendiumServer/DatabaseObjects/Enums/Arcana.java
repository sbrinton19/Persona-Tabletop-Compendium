package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * Am enum for the Major Tarot Arcana for personae represented with a byte
 * 
 * @author Stefan
 *
 */
public enum Arcana implements ByteValueEnum<Arcana> {
	FOOL(0), MAGICIAN(1), PRIESTESS(2), EMPRESS(3), EMPEROR(4), HIEROPHANT(5), LOVERS(6), 
	CHARIOT(7), STRENGTH(8), HERMIT(9), FORTUNE(10), JUSTICE(11), HANGED(12), DEATH(13),
	TEMPERANCE(14), DEVIL(15), TOWER(16), STAR(17), MOON(18), SUN(19), JUDGEMENT(20);

	private final byte value;

	private Arcana(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the Arcana associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Arcana as an {@code int}
	 * @return The Arcana associated with that value, {@code null} if no
	 *         Arcana exists with that value
	 */
	public static Arcana fromIntStatic(int value) {
		return Arcana.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the Arcana associated with the given value
	 * 
	 * @param value
	 *            The value of the desired Arcana as a {@code byte}
	 * @return The Arcana associated with that value, {@code null} if no
	 *         Arcana exists with that value
	 */
	public static Arcana fromByteStatic(byte value) {
		for (Arcana type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public Arcana fromInt(int value) {
		return Arcana.fromByteStatic((byte) value);
	}

	@Override
	public Arcana fromByte(byte value) {
		return Arcana.fromByteStatic(value);
	}

	/**
	 * @return The display string representation of this Arcana
	 */
	public String asString() {
		switch (this) {
		case PRIESTESS:
			return "High Priestess";
		case FORTUNE:
			return "Wheel of Fortune";
		case HANGED:
			return "Hanged Man";
		case FOOL:
		case MAGICIAN:
		case EMPRESS:
		case EMPEROR:
		case HIEROPHANT:
		case LOVERS:
		case CHARIOT:
		case STRENGTH:
		case HERMIT:
		case JUSTICE:
		case DEATH:
		case TEMPERANCE:
		case DEVIL:
		case TOWER:
		case MOON:
		case SUN:
		case JUDGEMENT:
		default:
			return this.toString().substring(0, 1).toUpperCase() + this.toString().substring(1).toLowerCase();
		}
	}
}
