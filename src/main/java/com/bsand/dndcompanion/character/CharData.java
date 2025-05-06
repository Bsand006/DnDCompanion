package com.bsand.dndcompanion.character;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
	/*
	 * Class to hold character data.
	 * 
	 * @author Brian Sand
	 */
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private boolean useAverageHP;
	private boolean useOptionalFeatures;
	private boolean useXP;
	private boolean use2024Rules;
	private String name;
	private int hp;
	private int hitDice;
	private String race;
	
	@ElementCollection
	private List<String> selectedRaceDetails;
	
	private String className;
	private String subclass;
	private int level;
	
	@ElementCollection
	private List<String> abilities;
	
	@ElementCollection
	private List<String> selectedChoices;
	
	
}
