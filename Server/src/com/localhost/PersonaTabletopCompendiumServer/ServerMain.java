package com.localhost.PersonaTabletopCompendiumServer;

import java.io.IOException;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;

import org.java_websocket.server.WebSocketServer;

public class ServerMain {
	public static void main(String[] args) throws IOException, InterruptedException {
		String host = "localhost";
		try (final DatagramSocket socket = new DatagramSocket()) {
			socket.connect(InetAddress.getByName("8.8.8.8"), 10002);
			host = socket.getLocalAddress().getHostAddress();
		}
		int port = 1992;
		WebSocketServer server = new Server(new InetSocketAddress(host, port));
		server.run();
	}
}
