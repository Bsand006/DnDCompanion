package com.bsand.dndcompanion;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bsand.dndcompanion.character.CharData;
import com.bsand.dndcompanion.data.GetBackgrounds;
import com.bsand.dndcompanion.data.GetClassInfo;
import com.bsand.dndcompanion.data.GetRaces;
import com.bsand.dndcompanion.data.ParseSpells;

/*
 * Controller class to handle incoming requests and return data.
 * 
 * @author Brian Sand
 */

@RestController
public class Controller {

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
	
	@PostMapping("/api/save-sheet")
	public ResponseEntity<Void> saveCharacterSettings(@RequestBody CharData settings) {
	    System.out.println("Received character: " + settings.getName());
	    return ResponseEntity.ok().build();
	}
}
