package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

public class GetRaces {

	File file = new File("src/main/resources/data/races.json");

	@SuppressWarnings("unchecked")
	public Map<String, Object> getRaces(List<String> sources) {

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> raceMap = new HashMap<String, Object>();

		try {
			JsonNode root = objectMapper.readTree(file);

			ArrayNode races = (ArrayNode) root.get("race");

			List<Map<String, Object>> raceList = new ArrayList<>();

			for (JsonNode race : races) {
				// System.out.println(race.get("name").asText() + " + " +
				// race.get("source").asText());
				if (sources.contains(race.get("source").asText())) {
					continue;
				}
				
				raceList.add(objectMapper.convertValue(race, Map.class));

			}

			raceMap.put("raceList", raceList);

			return raceMap; 

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}
	
	public Map<String, Object> getRace(String name, String source) {
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> raceMap = new HashMap<String, Object>();
		
		try {
			JsonNode root = objectMapper.readTree(file);
			
			ArrayNode races = (ArrayNode) root.get("race");
			
			for (JsonNode race : races) {
				if (race.get("name").asText().equals(name) && race.get("source").asText().equals(source)) {
					raceMap.put("race", race);
					return raceMap;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}


}
