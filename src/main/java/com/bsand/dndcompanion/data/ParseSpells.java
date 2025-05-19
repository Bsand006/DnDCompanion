package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

/**
 * Class to parse the spell JSON file and return a list of spells based on a search query.
 * 
 * @author Brian Sand
 */

public class ParseSpells {

	File file = new File("src/main/resources/data/spell.json"); // Path to the JSON spell file

	/**
	 * Method to get a list of spells based on a search query.
	 * 
	 * @param query The search query for the spell name.
	 * 
	 * @return A list of spells matching the search query.
	 * 
	 * @author Brian Sand
	 */

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getSpell(String query) {

		ObjectMapper objectMapper = new ObjectMapper();

		Set<String> spellSet = new HashSet<String>();
		List<Map<String, Object>> spellMap = new ArrayList<Map<String, Object>>();

		try {
			JsonNode root = objectMapper.readTree(file);

			ArrayNode spells = (ArrayNode) root.get("spells");

			int count = 0;

			for (JsonNode spell : spells) {
				if (count == 5) { // Limit the number of results to 5
					break;
				}

				// Check if the spell name contains the query string (case insensitive)
				// and if the spell name is not already in the set (So no duplicates are added)
				if (spell.get("name").asText().toLowerCase().contains(query.toLowerCase())
						&& !spellSet.contains(spell.get("name").asText())) {
					spellMap.add(objectMapper.convertValue(spell, Map.class));
					spellSet.add(spell.get("name").asText());
					count++;
				}

			}

			return spellMap;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
