package com.localhost.PersonaTabletopCompendiumServer;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.util.Calendar;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.localhost.PersonaTabletopCompendiumServer.Common.FusionCalculator;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.*;
import com.localhost.PersonaTabletopCompendiumServer.JsonAdapters.*;
import com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects.ProtocolMessage;
import com.localhost.PersonaTabletopCompendiumServer.ProtocolObjects.Enums.ProtocolCommand;

/**
 * The primary Server class for servicing Persona Database Requests
 * 
 * @author Stefan
 *
 */
public class Server extends WebSocketServer {
	private DatabaseHandler _dbh;
	private Gson _gson;

	/**
	 * Make a Server to service database requests
	 * @param address The address this server should listen on
	 */
	public Server(InetSocketAddress address) {
		super(address);
		_dbh = DatabaseHandler.getHandler();
		GsonBuilder gsonB = new GsonBuilder();
		gsonB
			.registerTypeAdapter(FlatPersona.class, new FlatPersonaTypeAdapter())
			.registerTypeAdapter(FlatSkill.class, new FlatSkillTypeAdapter())
			.registerTypeAdapter(FlatDamageSkill.class, new FlatDamageSkillTypeAdapter())
			.registerTypeAdapter(FlatDamageAilmentSkill.class, new FlatDamageAilmentSkillTypeAdapter())
			.registerTypeAdapter(FlatSupportSkill.class, new FlatSupportSkillTypeAdapter())
			.registerTypeAdapter(FlatAilmentSkill.class, new FlatAilmentSkillTypeAdapter())
			.registerTypeAdapter(FlatPassiveSkill.class, new FlatPassiveSkillTypeAdapter())
			.registerTypeAdapter(FlatItem.class, new FlatItemTypeAdapter())
			.registerTypeAdapter(FlatWeapon.class, new FlatWeaponTypeAdapter())
			.registerTypeAdapter(FlatRangedWeapon.class, new FlatRangedWeaponTypeAdapter())
			.registerTypeAdapter(FlatArmor.class, new FlatArmorTypeAdapter())
			.registerTypeAdapter(FlatAccessory.class, new FlatAccessoryTypeAdapter())
			.registerTypeAdapter(FlatConsumable.class, new FlatConsumableTypeAdapter())
			.registerTypeAdapter(FlatLoot.class, new FlatLootTypeAdapter())
			.registerTypeAdapter(FlatSkillCard.class, new FlatSkillCardTypeAdapter())
			.registerTypeAdapter(FlatStatBoostItem.class, new FlatStatBoostItemTypeAdapter())
			.registerTypeAdapter(FlatTraitBoostItem.class, new FlatTraitBoostItemTypeAdapter())
			.registerTypeAdapter(FlatActivity.class, new FlatActivityTypeAdapter())
			.registerTypeAdapter(FlatVendor.class, new FlatVendorTypeAdapter())
			.registerTypeAdapter(FlatVendorItem.class, new FlatVendorItemTypeAdapter())
			.registerTypeAdapter(Restriction.class, new RestrictionTypeAdapter())
			.registerTypeAdapter(BoundRestriction.class, new BoundRestrictionTypeAdapter())
			.registerTypeAdapter(FullPersona.class, new FullPersonaTypeAdapter())
			.registerTypeAdapter(PersonaSkill.class, new PersonaSkillTypeAdapter())
			.registerTypeAdapter(Drop.class, new DropTypeAdapter())
			.registerTypeAdapter(FullSkill.class, new FullSkillTypeAdapter())
			.registerTypeAdapter(FullActivity.class, new FullActivityTypeAdapter())
			.setPrettyPrinting();
		_gson = gsonB.create();
		FusionCalculator.getCalculator();
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		System.out.println("Recieved new connection on: " + conn.getRemoteSocketAddress());
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		System.out.println(
				"closed " + conn.getRemoteSocketAddress() + " with exit code " + code + " additional info: " + reason);
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		System.out.println("received message from " + conn.getRemoteSocketAddress() + ": " + message);
		ProtocolMessage pMess = new ProtocolMessage(message);
		_dbh.refreshConnection();
		if (pMess.getCommand() == ProtocolCommand.GET) {
			int[] ids = (int[]) _gson.fromJson(pMess.getPayload(), int[].class);
			// An empty array signifies a request for all entries
			if (FlatPersona.class.isAssignableFrom(pMess.getResolvedClass())) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getPersonae(pMess.getResolvedClass(), ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;

			} else if (pMess.getResolvedClass() == FullSkill.class) {
				int retry = 0;
				FullSkill[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getFullSkills(ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, "FullSkill[]", _gson.toJson(result));
				}
				return;
			} else if (pMess.getResolvedClass() == FlatSkill.class) {
				int retry = 0;
				FlatSkill[] result = null;
				if (ids.length == 0) {
					while (result == null && retry++ < 5) {
						result = _dbh.getAllSkills();
					}
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, "FlatSkill[]", _gson.toJson(result));
				}
				return;
			} else if (FlatSkill.class.isAssignableFrom(pMess.getResolvedClass())) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getSkills(pMess.getResolvedClass(), ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;
			} else if (FullItem.class == pMess.getResolvedClass()) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getFullItems(ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;
			} else if (FlatItem.class.isAssignableFrom(pMess.getResolvedClass())) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getItems(pMess.getResolvedClass(), ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;
			} else if (FlatActivity.class.isAssignableFrom(pMess.getResolvedClass())) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getActivities(pMess.getResolvedClass(), ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;
			} else if (Restriction.class == pMess.getResolvedClass()) {
				int retry = 0;
				Object[] result = null;
				while (result == null && retry++ < 5) {
					result = _dbh.getRestrictions(pMess.getResolvedClass(), ids);
				}
				if (result == null) {
					conn.send("Failed to read database");
				} else {
					Server.sendResponseWithPayload(conn, pMess.getResolvedClass().getSimpleName() + "[]",
							_gson.toJson(result));
				}
				return;
			}
		}
		// Post Get
		if (pMess.getResolvedClass() == FlatPersona.class) {
			FlatPersona persona = _gson.fromJson(pMess.getPayload(), FlatPersona.class);
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addPersona(persona);
			}
		} else if (FlatSkill.class.isAssignableFrom(pMess.getResolvedClass())) {
			FlatSkill skill = (FlatSkill) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addSkill(skill);
			}
		} else if (FlatItem.class.isAssignableFrom(pMess.getResolvedClass())) {
			FlatItem item = (FlatItem) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addItem(item);
			}
		} else if (FlatActivity.class.isAssignableFrom(pMess.getResolvedClass())) {
			FlatActivity activity = (FlatActivity) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addActivity(activity);
			}
		} else if (FlatVendor.class.isAssignableFrom(pMess.getResolvedClass())) {
			FlatVendor vendor = (FlatVendor) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addVendor(vendor);
			}
		} else if (FlatVendorItem.class.isAssignableFrom(pMess.getResolvedClass())) {
			FlatVendorItem vendorItem = (FlatVendorItem) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addVendorItem(vendorItem);
			}
		} else if (pMess.getResolvedClass() == Restriction.class) {
			Restriction restriction = (Restriction) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addRestriction(restriction);
			}
		} else if (pMess.getResolvedClass() == BoundRestriction.class) {
			BoundRestriction boundRestriction = (BoundRestriction) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addBoundRestriction(boundRestriction);
			}
		} else if (pMess.getResolvedClass() == Drop.class) {
			Drop drop = (Drop) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addDrop(drop);
			}
		} else if (pMess.getResolvedClass() == PersonaSkill.class) {
			PersonaSkill personaSkill = (PersonaSkill) _gson.fromJson(pMess.getPayload(), pMess.getResolvedClass());
			if (pMess.getCommand() == ProtocolCommand.ADD) {
				_dbh.addPersonaSkill(personaSkill);
			}
		}
	}

	@Override
	public void onMessage(WebSocket conn, ByteBuffer message) {
		System.out.println("received ByteBuffer from " + conn.getRemoteSocketAddress());
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		System.err.println("an error occured on connection " + conn.getRemoteSocketAddress() + ":" + ex);
	}

	@Override
	public void onStart() {
		System.out.println("server started successfully");
	}

	/**
	 * Quick and dirty method to wrap the JSON payload with an outer object for
	 * identifying the inner payload's type
	 * 
	 * @param conn
	 * @param payloadType
	 * @param jsonifiedObject
	 */
	private static void sendResponseWithPayload(WebSocket conn, String payloadType, String jsonifiedObject) {
		StringBuilder sb = new StringBuilder();
		sb.append("{ \"PayloadType\": ");
		sb.append("\"");
		sb.append(payloadType);
		sb.append("\", \"Payload\": ");
		sb.append(jsonifiedObject);
		sb.append(" }");
		String resp = sb.toString();
		logResponse(resp);
		conn.send(resp);
	}

	/**
	 * Quick and dirty append file logging
	 * 
	 * @param resp
	 */
	private static void logResponse(String resp) {
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(
				"ResponseLog" + Calendar.getInstance().get(Calendar.YEAR) + Calendar.getInstance().get(Calendar.MONTH)
						+ Calendar.getInstance().get(Calendar.DAY_OF_MONTH) + ".txt",
				true))) {
			writer.write(resp);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
