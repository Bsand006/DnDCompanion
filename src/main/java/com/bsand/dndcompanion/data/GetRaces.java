package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class GetRaces {

	File file = new File("src/main/resources/data/races.json");

	public Map<String, Object> getRaces(List<String> sources) {

		ObjectMapper objectMapper = new ObjectMapper();

		try {
			JsonNode root = objectMapper.readTree(file);

			ArrayNode races = (ArrayNode) root.get("race");

			for (JsonNode race : races) {
				System.out.println(race.get("name").asText() + " + " + race.get("source").asText());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}

}
