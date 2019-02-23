package com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects;

import com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects.Enums.ProtocolCommand;

/**
 * A class for representing the messages sent to this server
 * 
 * @author Stefan
 *
 */
public class ProtocolMessage {
	private final ProtocolCommand _command;
	private final String _responseClass;
	private final String _payload;
	private Class<?> _resolvedClass = null;

	public ProtocolMessage(ProtocolCommand command, String clazz, String payload) {
		this._command = command;
		this._responseClass = clazz;
		this._payload = payload;
	}

	public ProtocolMessage(String message) {
		String[] orders = message.split("\\|");
		this._command = ProtocolCommand.fromStringStatic(orders[0]);
		// All classes sent as an expected response payload should be
		// DatabaseObjects
		this._responseClass = "com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects." + orders[1];
		this._payload = orders[2];
	}

	/**
	 * @return the command for the given message in the "protocol"
	 */
	public ProtocolCommand getCommand() {
		return _command;
	}

	protected String getResponseClass() {
		return _responseClass;
	}

	private boolean resolveClass() {
		try {
			this._resolvedClass = Class.forName(_responseClass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Class<?> getResolvedClass() {
		if (this._resolvedClass == null) {
			if (!resolveClass()) {
				return null;
			}
		}
		return this._resolvedClass;
	}

	/**
	 * @return the payload
	 */
	public String getPayload() {
		return _payload;
	}
}
