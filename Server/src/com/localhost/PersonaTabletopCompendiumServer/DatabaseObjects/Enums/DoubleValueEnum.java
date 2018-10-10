package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * Enables casting double enums for use in ambiguous contexts
 * 
 * @author Stefan
 *
 */
public interface DoubleValueEnum<T> {
	/**
	 * @return The {@code double} representation of this enum
	 */
	public double getValue();

	/**
	 * Retrieve the enum associated with the given value
	 * 
	 * @param value
	 *            The value of the desired enum as a {@code double}
	 * @return The enum associated with that value, {@code null} if no enum
	 *         exists with that value
	 */
	public T fromDouble(double value);
	
	/**
	 * @return the double value of the enum as a pretty String,
	 * it will have no trailing zeros
	 */
	public String getPrettyString();
}