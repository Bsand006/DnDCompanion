package com.bsand.dndcompanion.character;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
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
	private List<String> selectedRaceDetails;
	private String className;
	private String subclass;
	private int level;
	private List<String> abilities;
	private List<String> selectedChoices;
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	public boolean isUseAverageHP() {
		return useAverageHP;
	}

	public void setUseAverageHP(boolean useAverageHP) {
		this.useAverageHP = useAverageHP;
	}

	public boolean isUseOptionalFeatures() {
		return useOptionalFeatures;
	}

	public void setUseOptionalFeatures(boolean useOptionalFeatures) {
		this.useOptionalFeatures = useOptionalFeatures;
	}

	public boolean isUseXP() {
		return useXP;
	}

	public void setUseXP(boolean useXP) {
		this.useXP = useXP;
	}

	public boolean isUse2024Rules() {
		return use2024Rules;
	}

	public void setUse2024Rules(boolean use2024Rules) {
		this.use2024Rules = use2024Rules;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getHp() {
		return hp;
	}

	public void setHp(int hp) {
		this.hp = hp;
	}

	public int getHitDice() {
		return hitDice;
	}

	public void setHitDice(int hitDice) {
		this.hitDice = hitDice;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public List<String> getSelectedRaceDetails() {
		return selectedRaceDetails;
	}

	public void setSelectedRaceDetails(List<String> selectedRaceDetails) {
		this.selectedRaceDetails = selectedRaceDetails;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getSubclass() {
		return subclass;
	}

	public void setSubclass(String subclass) {
		this.subclass = subclass;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public List<String> getAbilities() {
		return abilities;
	}

	public void setAbilities(List<String> abilities) {
		this.abilities = abilities;
	}

	public List<String> getSelectedChoices() {
		return selectedChoices;
	}

	public void setSelectedChoices(List<String> selectedChoices) {
		this.selectedChoices = selectedChoices;
	}
}
