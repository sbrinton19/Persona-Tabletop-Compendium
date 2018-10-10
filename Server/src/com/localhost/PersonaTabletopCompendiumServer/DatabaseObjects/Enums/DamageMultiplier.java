package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for representing the amount raw damage is multiplied before 
 * damaging an enemy
 * 
 * @author Stefan
 *
 */
public enum DamageMultiplier implements DoubleValueEnum<DamageMultiplier> {
	NONE(0), LIGHT(.5), MEDIUM(1), HEAVY(2), SEVERE(3), COLOSSAL(4);

	private final double value;

	private DamageMultiplier(double value) {
		this.value = value;
	}

	@Override
	public double getValue() {
		return this.value;
	}

	@Override
	public DamageMultiplier fromDouble(double value) {
		return fromDoubleStatic(value);
	}

	/**
	 * Retrieve the DamageMultiplier associated with the given value
	 * 
	 * @param value
	 *            The value of the desired DamageMultiplier as a {@code double}
	 * @return The DamageMultiplier associated with that value, {@code null} if
	 *         no DamageMultiplier exists with that value
	 */
	public static DamageMultiplier fromDoubleStatic(double value) {
		for (DamageMultiplier type : values()) {
			if (type.getValue() == value) {
				return type;
			}
		}
		return null;
	}

	@Override
	public String getPrettyString() {
		return this.value == (long) this.value ? String.format("%d", (long) this.value)
				: String.format("%s", this.value);
	}

	public static String getPrettyString(double value) {
		return value == (long) value ? String.format("%d", (long) value) : String.format("%s", value);
	}
}
