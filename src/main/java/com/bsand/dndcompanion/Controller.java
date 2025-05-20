package com.bsand.dndcompanion;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bsand.dndcompanion.character.CharData;
import com.bsand.dndcompanion.data.GetBackgrounds;
import com.bsand.dndcompanion.data.GetClassInfo;
import com.bsand.dndcompanion.data.GetItems;
import com.bsand.dndcompanion.data.GetRaces;
import com.bsand.dndcompanion.data.ParseSpells;

/**
 * Controller class to handle incoming requests and return data.
 * 
 * @Author Brian Sand
 */

@RestController
public class Controller {

	private final CharacterService characterService;

	public Controller(CharacterService characterService) {
		this.characterService = characterService;
	}

	@GetMapping("/api/spells")
	public List<Map<String, Object>> getSpells(@RequestParam String query) {
		ParseSpells parseSpells = new ParseSpells();
		return parseSpells.getSpell(query);
	}

	@GetMapping("/api/characters")
	public void getCharacters(@RequestParam String userID) {

	}

	@GetMapping("api/class")
	public Map<String, Object> getClassInfo(@RequestParam String className, @RequestParam int level) {
		GetClassInfo getClassInfo = new GetClassInfo();
		return getClassInfo.getClass(className, level);
	}
	
	@GetMapping("api/subclass")
	public Map<String, Object> getSubClassInfo(@RequestParam String className, @RequestParam String subclass) {
		GetClassInfo getClassInfo = new GetClassInfo();
		return getClassInfo.getSubclassFeatures(className, subclass);
	}

	@GetMapping("/api/races")
	public Map<String, Object> getRaceInfo(@RequestParam List<String> sourcelist) {
		GetRaces getRaces = new GetRaces();
		return getRaces.getRaces(sourcelist);
	}

	@GetMapping("/api/race")
	public Map<String, Object> getRaceInfo(@RequestParam String raceName, @RequestParam String source) {
		GetRaces getRaces = new GetRaces();
		return getRaces.getRace(raceName, source);
	}

	@GetMapping("/api/backgrounds")
	public List<Map<String, Object>> getBackgrounds() {
		GetBackgrounds backgrounds = new GetBackgrounds();
		return backgrounds.getBackgrounds();
	}

	@GetMapping("/api/base-weapons")
	public Map<String, Object> getItems(@RequestParam String category) {
		GetItems items = new GetItems();
		return items.getBaseWeapons(category);
	}

	@PostMapping("/api/save-character")
	public CharData createCharacter(@RequestBody CharData character, Authentication auth) {
		String username = auth.getName();
		return characterService.saveCharacter(username, character);
	}

	@GetMapping("/api/get-characters")
	public List<CharData> getCharacters(Authentication auth) {
		String username = auth.getName();
		return characterService.getCharactersForUser(username);
	}
}
