package com.bsand.dndcompanion;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bsand.dndcompanion.data.ParseSpells;

/*
 * Controller class to handle incoming requests and return data.
 * 
 * @author Brian Sand
 */

@RestController
public class Controller {

	/*
	 * Endpoint to get a list of spells based on a search query.
	 * 
	 * @param query The search query for the spell name.
	 * 
	 * @return A list of spells matching the search query.
	 */

	@GetMapping("/api/spells")
	public List<Map<String, Object>> getSpells(@RequestParam String query) {
		ParseSpells parseSpells = new ParseSpells();
		return parseSpells.getSpell(query);
	}
	
	@GetMapping("/me")
    public ResponseEntity<?> currentUser(Authentication auth) {
        if (auth == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(auth.getName());
    }

    @GetMapping("/data")
    public ResponseEntity<String> secureData() {
        return ResponseEntity.ok("This is secured data.");
    }

}
