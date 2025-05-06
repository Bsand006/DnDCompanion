package com.bsand.dndcompanion;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsand.dndcompanion.character.User;

@Service
public class UserService {
	  private final UserRepository repo;

	    public UserService(UserRepository repo) {
	        this.repo = repo;
	    }

	    @Transactional
	    public void saveIfNew(String username) {
	        repo.findByUsername(username).orElseGet(() -> {
	            User newUser = new User();
	            newUser.setUsername(username);
	            return repo.save(newUser);
	        });
	    }
}
