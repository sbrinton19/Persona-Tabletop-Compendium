package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * An enum for the amount raw damage is multiplied before 
 * damaging an enemy represented as a double
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
	public DamageMultiplier fromDouble(double value) {
		return fromDoubleStatic(value);
	}

	/**
	 * Converts the given double into a pretty formatted string 
	 * @param value The double to format 
	 * @return The pretty formatted string
	 */
	public static String getPrettyString(double value) {
		return value == (long) value ? String.format("%d", (long) value) : String.format("%s", value);
	}
	
	@Override
	public String getPrettyString() {
		return this.value == (long) this.value ? String.format("%d", (long) this.value)
				: String.format("%s", this.value);
	}

}
