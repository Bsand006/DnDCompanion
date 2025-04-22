package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class GetClassInfo {

	public Map<String, Object> getClass(String query) {

		File file = new File("src/main/resources/data/class/class-" + query.toLowerCase()); // Path to the JSON class
																							// file

		ObjectMapper objectMapper = new ObjectMapper();

		Map<String, Object> classMap = new HashMap<String, Object>();

		try {
			JsonNode root = objectMapper.readTree(file);
			ArrayNode classArray = (ArrayNode) root.get("class");

			classMap.put(query, classArray);

			return classMap;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}

}
