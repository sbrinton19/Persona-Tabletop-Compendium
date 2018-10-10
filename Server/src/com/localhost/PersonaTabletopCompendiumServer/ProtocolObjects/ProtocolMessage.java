package com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects;

import com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects.Enums.ProtocolCommand;

/**
 * A class for representing the messages sent to this server
 * 
 * @author Stefan
 *
 */
public class ProtocolMessage {
	private final ProtocolCommand command;
	private final String responseClass;
	private final String payload;
	private Class<?> resolvedClass = null;

	public ProtocolMessage(ProtocolCommand command, String clazz, String payload) {
		this.command = command;
		this.responseClass = clazz;
		this.payload = payload;
	}

	public ProtocolMessage(String message) {
		String[] orders = message.split("\\|");
		this.command = ProtocolCommand.fromStringStatic(orders[0]);
		// All classes sent as an expected response payload should be
		// DatabaseObjects
		this.responseClass = "com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects." + orders[1];
		this.payload = orders[2];
	}

	/**
	 * @return the command for the given message in the "protocol"
	 */
	public ProtocolCommand getCommand() {
		return command;
	}

	protected String getResponseClass() {
		return responseClass;
	}

	private boolean resolveClass() {
		try {
			this.resolvedClass = Class.forName(responseClass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Class<?> getResolvedClass() {
		if (this.resolvedClass == null) {
			if (!resolveClass()) {
				return null;
			}
		}
		return this.resolvedClass;
	}

	/**
	 * @return the payload
	 */
	public String getPayload() {
		return payload;
	}
}
