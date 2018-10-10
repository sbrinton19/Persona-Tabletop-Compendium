package com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums;

/**
 * Enables casting byte enums for use in ambiguous contexts
 * 
 * @author Stefan
 *
 */
public interface ByteValueEnum<T> {

	/**
	 * @return The {@code byte} representation of this enum
	 */
	public byte getValue();

	/**
	 * Retrieve the enum associated with the given value
	 * 
	 * @param value
	 *            The value of the desired enum as an {@code int}
	 * @return The enum associated with that value, {@code null} if no enum
	 *         exists with that value
	 */
	public T fromInt(int value);

	/**
	 * Retrieve the enum associated with the given value
	 * 
	 * @param value
	 *            The value of the desired enum as a {@code byte}
	 * @return The enum associated with that value, {@code null} if no enum
	 *         exists with that value
	 */
	public T fromByte(byte value);
}
