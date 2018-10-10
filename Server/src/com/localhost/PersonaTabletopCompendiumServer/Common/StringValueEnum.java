package com.localhost.PersonaTabletopCompendiumServer.Common;

/**
 * Enables casting String enums for use in ambiguous contexts
 * @author Stefan
 *
 */
public interface StringValueEnum<T> {
	/**
	 * @return The {@code String} representation of this enum 
	 */
	public String getValue();
	/**
	 * Retrieve the enum associated with the given value
	 * @param value The value of the desired enum as a {@code String}
	 * @return The enum associated with that value, {@code null} if no enum exists with that value
	 */
	public T fromString(String value);
}
