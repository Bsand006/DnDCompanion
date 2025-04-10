package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class ParseSpells {

	File file = new File("src/main/resources/data/spell.json");

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getSpell(String query) {

		ObjectMapper objectMapper = new ObjectMapper();

		List<Map<String, Object>> spellMap = new ArrayList<Map<String, Object>>();

		try {
			JsonNode root = objectMapper.readTree(file);

			ArrayNode spells = (ArrayNode) root.get("spells");

			int count = 0;

			for (JsonNode spell : spells) {
				if (count == 5) {
					break;
				}

				if (spell.get("name").asText().toLowerCase().contains(query.toLowerCase())) {
					spellMap.add(objectMapper.convertValue(spell, Map.class));
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
