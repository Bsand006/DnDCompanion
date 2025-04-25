package com.bsand.dndcompanion;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	
	@GetMapping("/api/race")
	public Map<String, Object> getRaceInfo(@RequestParam List<String> sources) {
		GetRaces getRaces = new GetRaces();
		return null;
	}
}
