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
 * GetItems class to retrieve item data from JSON files.
 * 
 * Can retrieve basic weapons and armor, as well as generic items and magic
 * items.
 * 
 * @Author Brian Sand
 */

public class GetItems {

	/**
	 * Get base weapons from JSON file.
	 * 
	 * @param category : the category of the weapon to retrieve(Either simple or
	 *                 martial)
	 * @return a map containing the weapon data
	 */

	@SuppressWarnings("unchecked")
	public Map<String, Object> getBaseWeapons(String category) {

		System.out.println("GetItems.getBaseWeapons() called with category: " + category);

		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> itemMap = new HashMap<String, Object>();
		File file = new File("src/main/resources/data/items-base.json");
		
		List<Map<String, Object>> itemList = new ArrayList<Map<String, Object>>();

		try {
			JsonNode root = objectMapper.readTree(file);
			ArrayNode baseItems = (ArrayNode) root.get("baseitem");

			for (JsonNode item : baseItems) {
				try {
					if (item.get("source").asText().equals("PHB") && item.get("weapon").asBoolean() == true) {
						if (category.equals("simple weapons") 
								&& item.get("weaponCategory").asText().equals("simple")) {
							itemList.add(objectMapper.convertValue(item, Map.class));
						} else if (category.equals("martial weapons")) {
							itemList.add(objectMapper.convertValue(item, Map.class));
						}
					}
				} catch (NullPointerException e) {
					System.out.println("NullPointerException: " + e.getMessage());
				}
			}
			
			itemMap.put("weapons", itemList);
					
			return itemMap;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
}
