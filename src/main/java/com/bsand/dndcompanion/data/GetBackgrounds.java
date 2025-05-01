package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

/*
 * Class to parse the background JSON file and return a list of backgroundS.
 * 
 * @author Brian Sand
 */

public class GetBackgrounds {

	File file = new File("src/main/resources/data/backgrounds.json");

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getBackgrounds() {

		/*
		 * Method to get a list of backgrounds based on a search query.
		 *
		 * @return A list of backgrounds.
		 */

		ObjectMapper objectMapper = new ObjectMapper();
		List<Map<String, Object>> backgroundMap = new ArrayList<Map<String, Object>>();

		try {
			JsonNode root = objectMapper.readTree(file);
			ArrayNode backgrounds = (ArrayNode) root.get("background");

			for (JsonNode background : backgrounds) {
				backgroundMap.add(objectMapper.convertValue(background, Map.class));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return backgroundMap;
	}

}
