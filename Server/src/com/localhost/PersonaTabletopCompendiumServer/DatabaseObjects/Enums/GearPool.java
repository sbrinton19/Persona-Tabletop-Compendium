package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum representing the Generic "dirty" gear an armor can be obtained from
 * via washing represented by a byte
 * 
 * @author Stefan
 *
 */
public enum GearPool implements ByteValueEnum<GearPool> {
	REVELER(1), SHOUZOKU(2), PRISONER(3), UNIFORM(4), PATIENT(5), SCRUBS(6), STUDENT(7), 
	GOWN(8), SERVANT(9), TUXEDO(10), SLAVE(11), ANCIENT(12), SPIRIT(13), DESECRATED(14);

	private final byte value;

	private GearPool(int value) {
		this.value = (byte) value;
	}

	@Override
	public byte getValue() {
		return value;
	}

	/**
	 * Retrieve the GearPool associated with the given value
	 * 
	 * @param value
	 *            The value of the desired GearPool as an {@code int}
	 * @return The GearPool associated with that value, {@code null} if no
	 *         GearPool exists with that value
	 */
	public static GearPool fromIntStatic(int value) {
		return GearPool.fromByteStatic((byte) value);
	}

	/**
	 * Retrieve the GearPool associated with the given value
	 * 
	 * @param value
	 *            The value of the desired GearPool as an {@code byte}
	 * @return The GearPool associated with that value, {@code null} if no
	 *         GearPool exists with that value
	 */
	public static GearPool fromByteStatic(byte value) {
		for (GearPool type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public GearPool fromInt(int value) {
		return GearPool.fromByteStatic((byte) value);
	}

	@Override
	public GearPool fromByte(byte value) {
		return GearPool.fromByteStatic(value);
	}
	
	public String asString() {
		switch (this) {
		case REVELER:
			return "Reveler's Clothing";
		case SHOUZOKU:
			return "Burned Shouzoku";
		case PRISONER:
			return "Prisoner's Jumpsuit";
		case UNIFORM:
			return "Grimy Guard Uniform";
		case PATIENT:
			return "Patient's Gown";
		case SCRUBS:
			return "Bloodstained Scrubs";
		case STUDENT:
			return "Student's Uniform";
		case GOWN:
			return "Sticky Gown";
		case SERVANT:
			return "Servant's Clothes";
		case TUXEDO:
			return "Smokestained Tuxedo";
		case SLAVE:
			return "Slave's Rags";
		case ANCIENT:
			return "Ancient Armor";
		case SPIRIT:
			return "Spirit's Robe";
		case DESECRATED:
			return "Desecrated Armor";
		default:
			return "";
		}
	}
}
