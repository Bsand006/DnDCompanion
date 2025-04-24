package com.bsand.dndcompanion.data;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

/*
 * GetClassInfo class to parse the JSON class files and return the data as a Map.
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
				if (feature.get("level").asInt() <= level) {
					featuresList.add(objectMapper.convertValue(feature, Map.class));
				}
			}
			
            classMap.put("classFeature", featuresList);
			classMap.put(query, classArray);

			return classMap;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;

	}

}
