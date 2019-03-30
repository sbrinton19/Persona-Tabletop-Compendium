package com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects;

public class OperationResult {
	private final boolean _result;
	private final int _id;
	
	public OperationResult(boolean result, int id) {
		this._result = result;
		this._id = id;
	}
	
	public String toJSON() {
		return String.format("{\"result\":%b,\"id\":%d}", this._result, this._id);
	}
}
