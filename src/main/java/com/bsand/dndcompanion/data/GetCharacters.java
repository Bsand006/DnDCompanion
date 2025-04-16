package com.bsand.dndcompanion.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

/*
 * Class to connect to the MySQL database and retrieve character data based on the user ID.
 * 
 * @author Brian Sand
 */

public class GetCharacters {

	/*
	 * Method to establish a connection to the MySQL database using environment
	 * variables.
	 * 
	 * @param None
	 * 
	 * @return Connection object to the MySQL database
	 */

	public Connection connect() {
		String url = System.getenv("MYSQL_URL");
		String user = System.getenv("MYSQL_USERNAME");
		String password = System.getenv("MYSQL_PASSWORD");

		try {
			return DriverManager.getConnection(url, user, password);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/*
	 * Method to retrieve character data from the database based on the user ID.
	 * 
	 * @param userID The ID of the user whose characters are to be retrieved
	 * 
	 * @return A JSON string containing the character data
	 */
	
	public String getCharacters(int userID) {
		Connection conn = connect();

		List<Map<String, Object>> characters = new ArrayList<>(); // List to hold characters

		if (conn != null) { // Check if the connection is not null
			String query = "SELECT * FROM characters WHERE user_id = ?";

			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setInt(1, userID);

				try (ResultSet rs = pstmt.executeQuery()) {
					while (rs.next()) {
						Map<String, Object> character = new HashMap<>(); // Map to hold character data
						character.put("charID", rs.getInt("charID"));
						character.put("name", rs.getString("name"));
						characters.add(character);
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				try {
					conn.close(); // Close the connection
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}

		try { // Convert the list of characters to JSON string
			ObjectMapper objectMapper = new ObjectMapper();
			return objectMapper.writeValueAsString(characters);
		} catch (Exception e) {
			e.printStackTrace();
			return "[]";
		}

	}

}
