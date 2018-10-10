package com.localhost.PersonaTabletopCompendiumServer;

import java.io.IOException;
import java.net.InetSocketAddress;

import org.java_websocket.server.WebSocketServer;

public class ServerMain {
	public static void main(String[] args) throws IOException, InterruptedException {
		String host = "localhost";
		int port = 1992;
		WebSocketServer server = new Server(new InetSocketAddress(host, port));
		server.run();
	}
}
