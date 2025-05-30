package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

/**
 * GetClassInfo class to parse the JSON class files and return the data as a
 * Map.
 * 
 * @author Brian Sand
 */

public class GetClassInfo {

	@SuppressWarnings("unchecked")
	public Map<String, Object> getClass(String query, int level) {

		File file = new File("src/main/resources/data/class/class-" + query.toLowerCase() + ".json");

		ObjectMapper objectMapper = new ObjectMapper();

		Map<String, Object> classMap = new HashMap<String, Object>();

		try {
			JsonNode root = objectMapper.readTree(file);
			ArrayNode classArray = (ArrayNode) root.get("class");
			ArrayNode classFeaturesText = (ArrayNode) root.get("classFeature");

			List<Map<String, Object>> featuresList = new ArrayList<>();

			for (JsonNode feature : classFeaturesText) { // Put every feature below or equal to the level in the request

				try {
					if (feature.get("level").asInt() <= level && !feature.get("source").asText().equals("XPHB")
							&& !feature.get("source").asText().equals("TCE")) {
						featuresList.add(objectMapper.convertValue(feature, Map.class));
					}
				} catch (NullPointerException e) {
					System.out.println("NullPointerException: " + e.getMessage());
				}
			}

			classMap.put("classFeature", featuresList);
			classMap.put("class", classArray);

			return classMap;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getSubclassFeatures(String className, String subclass) {
		
		File file = new File("src/main/resources/data/class/class-" + className.toLowerCase() + ".json");

		ObjectMapper objectMapper = new ObjectMapper();

		Map<String, Object> subclassMap = new HashMap<String, Object>();

		List<Map<String, Object>> featuresList = new ArrayList<>();

		try {
			JsonNode root = objectMapper.readTree(file);
			ArrayNode subclassArray = (ArrayNode) root.get("subclassFeature");

			for (JsonNode feature : subclassArray) {
				if (!feature.get("source").asText().equals("XPHB")
						&& !feature.get("classSource").asText().equals("XPHB")) {
					if (subclass.contains(feature.get("subclassShortName").asText())
							&& !feature.has("isClassFeatureVariant")) {
						featuresList.add(objectMapper.convertValue(feature, Map.class));
					}
				}
			}

			subclassMap.put("subclassFeature", featuresList);

			return subclassMap;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
}
