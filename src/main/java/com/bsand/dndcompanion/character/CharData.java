package com.bsand.dndcompanion.character;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharData {
	
	/**
	 * Class to hold character data.
	 * 
	 * @author Brian Sand
	 */
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long charID;
	
	private String charName;
	private int charHP;
	private int charHD;
	private String charRace;
	private String charClass;
	private String charSubclass;
	private int charLevel;
	
	@ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;
	
	
}
