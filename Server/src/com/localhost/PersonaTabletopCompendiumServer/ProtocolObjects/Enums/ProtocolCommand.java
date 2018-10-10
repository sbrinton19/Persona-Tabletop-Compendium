package com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects.Enums;

import com.localhost.PersonaTabletopCompendiumServer.Common.StringValueEnum;

public enum ProtocolCommand implements StringValueEnum<ProtocolCommand>{
	ADD("add"),
	GET("get"),
	DELETE("delete");

	private final String value;
	
	private ProtocolCommand(String value){
		this.value = value;
	}
	
	@Override
	public String getValue() {
		return value;
	}

	/**
	 * Retrieve the ProtocolCommand associated with the given value
	 * @param value The value of the desired ProtocolCommand as an {@code byte}
	 * @return The ProtocolCommand associated with that value, {@code null} if no ProtocolCommand exists with that value
	 */
	public static ProtocolCommand fromStringStatic(String value) {
		for(ProtocolCommand type: values()) {
			if(type.getValue().equals(value.toLowerCase())) {
				return type;
			}
		}
		return null;
	}
	
	@Override
	public ProtocolCommand fromString(String value) {
		return ProtocolCommand.fromStringStatic(value);
	}

}
