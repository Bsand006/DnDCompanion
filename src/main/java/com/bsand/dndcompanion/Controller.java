package com.bsand.dndcompanion;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
   

   

}
