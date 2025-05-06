package com.bsand.dndcompanion;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bsand.dndcompanion.character.CharData;

/**
 * CharacterController class to handle character-related requests.
 * 
 * @author Brian Sand
 */

@RestController
@RequestMapping("/api/characters")
public class CharacterController {
	
	 private final CharacterService characterService;

	    public CharacterController(CharacterService characterService) {
	        this.characterService = characterService;
	    }

	    @PostMapping
	    public CharData createCharacter(@RequestBody CharData character, Authentication auth) {
	        String username = auth.getName();
	        return characterService.saveCharacter(username, character);
	    }

	    @GetMapping
	    public List<CharData> getCharacters(Authentication auth) {
	        String username = auth.getName();
	        return characterService.getCharactersForUser(username);
	    }

}
