package com.bsand.dndcompanion.character;

import jakarta.persistence.Column;
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

	@Column(name = "char_name") // This should match the database column name
	private String charName;

	@Column(name = "charhp")
	private int charHP;

	@Column(name = "charhd")
	private String charHD;

	@Column(name = "char_race")
	private String charRace;

	@Column(name = "char_class")
	private String charClass;

	@Column(name = "char_level")
	private int charLevel;

	@ManyToOne
	@JoinColumn(name = "userID", nullable = false)
	private User user;

}
