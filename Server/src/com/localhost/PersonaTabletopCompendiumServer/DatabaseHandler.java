package com.localhost.PersonaTabletopCompendiumServer;

import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.*;
import com.localhost.PersonaTabletopCompendiumServer.DatabaseObjects.Enums.*;
import com.mysql.cj.jdbc.MysqlDataSource;

/**
 * A singleton utility class for accessing the database It should be the only
 * accessor of the connection to the database
 * 
 * @author Stefan
 *
 */
public class DatabaseHandler {
	private static DatabaseHandler singleton;
	private Connection conn = null;
	private String user;
	private String pass;

	private DatabaseHandler() {
		initDB();
	}

	public static DatabaseHandler getHandler() {
		if (singleton == null) {
			singleton = new DatabaseHandler();
		}
		return singleton;
	}

	/**
	 * Performs a trivial SQL query to check if the database connection is still
	 * open if it fails we dispose the current connection and open a new one
	 */
	public void refreshConnection() {
		try {
			this.conn.prepareStatement("SELECT 1 FROM item");
		} catch (Exception e) {
			this.conn = null;
			while (this.conn == null) {
				MysqlDataSource ds = new MysqlDataSource();
				ds.setUser(this.user);
				ds.setPassword(this.pass);
				ds.setServerName("localhost");
				ds.setPortNumber(9129);
				ds.setDatabaseName("persona_tabletop_compendium");
				try {
					this.conn = ds.getConnection();
				} catch (SQLException e2) {
					e2.printStackTrace();
					this.conn = null;
				}
			}
		}
	}

	// Quick and dirty DB connection initializer
	private void initDB() {
		Scanner scanner = new Scanner(System.in);
		while (this.conn == null) {
			System.out.println("Please input DB username");
			this.user = scanner.nextLine();
			System.out.println("Please input DB password");
			this.pass = scanner.nextLine();
			MysqlDataSource ds = new MysqlDataSource();
			ds.setUser(this.user);
			ds.setPassword(this.pass);
			ds.setServerName("localhost");
			ds.setPortNumber(9129);
			ds.setDatabaseName("persona_tabletop_compendium");
			try {
				this.conn = ds.getConnection();
			} catch (SQLException e) {
				e.printStackTrace();
				this.conn = null;
			}
		}
		scanner.close();
	}

	/**
	 * Appends IN with an array of ids as a comma-separated list to the given
	 * {@link StringBuilder} for using with a SQL IN clause
	 * 
	 * @param ids
	 *            the ids to append
	 * @param sb
	 *            the StringBuilder to append to
	 */
	private void idsToInClause(int[] ids, StringBuilder sb) {
		sb.append(" IN (");
		for (int i = 0; i < ids.length - 1; i++) {
			sb.append(ids[i]);
			sb.append(",");
		}
		sb.append(ids[ids.length - 1]);
		sb.append(")");
	}

	/**
	 * Generic getter to retrieve {@link FlatPersona}, or any of its subclasses,
	 * from the database
	 * 
	 * @param clazz
	 *            The desired Persona Class to retrieve
	 * @param ids
	 *            The ids of the personae to add, null or an empty area to
	 *            retrieve them all
	 * @return An array of the desired Persona Class objects
	 */
	public <T> T[] getPersonae(Class<T> clazz, int[] ids) {
		if (ids == null) {
			ids = new int[0];
		}
		ArrayList<T> personaList = new ArrayList<T>();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM persona");
		if (ids.length > 0) {
			sb.append(" WHERE persona.id ");
			idsToInClause(ids, sb);
		}
		try {
			PreparedStatement search = conn.prepareStatement(sb.toString());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				personaList.add(clazz.getConstructor(ResultSet.class).newInstance(rs));
			}
			@SuppressWarnings("unchecked")
			T[] temp = (T[]) Array.newInstance(clazz, personaList.size());
			personaList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Adds a {@link FlatPersona} or any of its valid subclasses to the database
	 * 
	 * @param persona
	 *            The persona to add to the database
	 * @return True if the operation was successful with no errors; otherwise,
	 *         false
	 * 
	 */
	public boolean addPersona(FlatPersona persona) {
		if (persona == null)
			return false;
		ResultSet rs;
		try {
			rs = persona.databaseSelectPersona(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return persona.databaseInsert(conn);
			} else {
				return persona.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * Retrieve all skills with their composed descriptions
	 * 
	 * @return An array of all skills as {@link FlatSkill FlatSkills}
	 */
	public FlatSkill[] getAllSkills() {
		ArrayList<FlatSkill> skillList = new ArrayList<FlatSkill>();
		try {
			FlatSkill[] damages = this.getSkills(FlatDamageSkill.class, null);
			for (FlatSkill damage : damages) {
				damage.getCompiledDescription(true);
				skillList.add(new FlatSkill(damage));
			}
			FlatSkill[] damageAilments = this.getSkills(FlatDamageAilmentSkill.class, null);
			for (FlatSkill damageAilment : damageAilments) {
				damageAilment.getCompiledDescription(true);
				skillList.add(new FlatSkill(damageAilment));
			}
			FlatSkill[] supports = this.getSkills(FlatSupportSkill.class, null);
			for (FlatSkill support : supports) {
				support.getCompiledDescription(true);
				skillList.add(new FlatSkill(support));
			}
			FlatSkill[] ailments = this.getSkills(FlatAilmentSkill.class, null);
			for (FlatSkill ailment : ailments) {
				ailment.getCompiledDescription(true);
				skillList.add(new FlatSkill(ailment));
			}
			FlatSkill[] passives = this.getSkills(FlatPassiveSkill.class, null);
			for (FlatSkill passive : passives) {
				passive.getCompiledDescription(true);
				skillList.add(new FlatSkill(passive));
			}
			FlatSkill[] temp = new FlatSkill[skillList.size()];
			skillList.sort(new FlatSkill());
			skillList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Get the given ids as the given skill class
	 * 
	 * @param clazz
	 *            The class of skills to get
	 * @param ids
	 *            The ids of the skills to retrieve. An empty or null array
	 *            retrieves all skills of the given class
	 * @return An array of the requested Skill class
	 */
	public <T> T[] getSkills(Class<T> clazz, int[] ids) {
		if (ids == null) {
			ids = new int[0];
		}
		ArrayList<T> skillList = new ArrayList<T>();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM ");
		if (clazz == FlatDamageSkill.class) {
			sb.append("(SELECT * FROM skill ");
			if (ids.length == 0) {
				sb.append(
						"LEFT JOIN ailment_skill ON skill.id=ailment_skill.skillId WHERE ailment_skill.skillId IS NULL) no_ailments INNER JOIN damage_skill ON no_ailments.id=damage_skill.skillId");

			} else {
				sb.append("WHERE skill.id ");
				idsToInClause(ids, sb);
				sb.append(") skill INNER JOIN damage_skill ON skill.id=damage_skill.skillId");
			}
		} else if (clazz == FlatDamageAilmentSkill.class) {
			sb.append("(SELECT * FROM");
			if (ids.length != 0) {
				sb.append("(SELECT * FROM skill WHERE skill.id ");
				idsToInClause(ids, sb);
				sb.append(")");
			}
			sb.append(
					" skill INNER JOIN ailment_skill ON skill.id=ailment_skill.skillId) ailment INNER JOIN damage_skill ON ailment.id=damage_skill.skillId");
		} else if (clazz == FlatAilmentSkill.class) {
			sb.append("(SELECT * FROM skill WHERE skill.");
			if (ids.length == 0) {
				sb.append("element=");
				sb.append(Element.AILMENT.getValue());
			} else {
				sb.append("id ");
				idsToInClause(ids, sb);
			}
			sb.append(") skill INNER JOIN ailment_skill ON skill.id=ailment_skill.skillId");
		} else if (clazz == FlatSupportSkill.class) {
			if (ids.length != 0) {
				sb.append("(SELECT * FROM skill WHERE skill.id ");
				idsToInClause(ids, sb);
				sb.append(") ");
			}
			sb.append("skill INNER JOIN support_skill ON skill.id=support_skill.skillId");
		} else if (clazz == FlatPassiveSkill.class) {
			if (ids.length != 0) {
				sb.append("(SELECT * FROM skill WHERE skill.id ");
				idsToInClause(ids, sb);
				sb.append(") ");
			}
			sb.append("skill INNER JOIN passive_skill ON skill.id=passive_skill.skillId");
		}
		try {
			PreparedStatement search = conn.prepareStatement(sb.toString());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				skillList.add(clazz.getConstructor(ResultSet.class).newInstance(rs));
			}
			@SuppressWarnings("unchecked")
			T[] temp = (T[]) Array.newInstance(clazz, skillList.size());
			skillList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Add a {@link FlatSkill} or any of its valid subclasses to the database
	 * 
	 * @param skill
	 *            the skill to add
	 * @return True if the operation completed successfully, false otherwise
	 */
	public boolean addSkill(FlatSkill skill) {
		if (skill == null)
			return false;
		try {
			ResultSet rs = skill.databaseSelectSkill(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return skill.databaseInsert(conn);
			} else {
				return skill.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	

	/**
	 * Get the given ids as the given item class
	 * 
	 * @param clazz
	 *            The class of items to get
	 * @param ids
	 *            The ids of items to retrieve, if the array is null or empty
	 *            retrieve all items of the given class
	 * @return An array of the given item class
	 */
	public <T> T[] getItems(Class<T> clazz, int[] ids) {
		if (ids == null) {
			ids = new int[0];
		}
		ArrayList<T> itemList = new ArrayList<T>();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM ");
		if (ids.length != 0) {
			sb.append("(SELECT * FROM item WHERE item.id ");
			idsToInClause(ids, sb);
			sb.append(") ");
		}
		if (clazz == FlatWeapon.class) {
			if (ids.length == 0) {
				sb.append(
						"(SELECT * FROM weapon WHERE weapon.magSize IS NULL) unranged INNER JOIN item ON unranged.itemid=item.id");
			} else {
				sb.append("item INNER JOIN weapon ON item.id=weapon.itemid");
			}
		} else if (clazz == FlatRangedWeapon.class) {
			if (ids.length == 0) {
				sb.append(
						"(SELECT * FROM weapon WHERE weapon.magSize IS NOT NULL) unranged INNER JOIN item ON unranged.itemid=item.id");
			} else {
				sb.append("item INNER JOIN weapon ON item.id=weapon.itemid");
			}
		} else if (clazz == FlatArmor.class) {
			sb.append("item INNER JOIN armor ON item.id=armor.itemid");
		} else if (clazz == FlatLoot.class) {
			sb.append("item INNER JOIN loot ON item.id=loot.itemid");
		} else if (clazz == FlatAccessory.class) {
			if (ids.length == 0) {
				sb.append("item WHERE item.type = ");
				sb.append(ItemType.ACCESSORY.getValue());
			}
		} else if (clazz == FlatConsumable.class) {
			if (ids.length == 0) {
				sb.append("item WHERE item.type = ");
				sb.append(ItemType.CONSUMABLE.getValue());
			}
		} else if (clazz == FlatSkillCard.class) {
			if (ids.length == 0) {
				sb.append("item WHERE item.type = ");
				sb.append(ItemType.SKILLCARD.getValue());
			}
		} else if (clazz == FlatStatBoostItem.class) {
			if (ids.length == 0) {
				sb.append("item WHERE item.type = ");
				sb.append(ItemType.STATBOOST.getValue());
			}
		} else if (clazz == FlatTraitBoostItem.class) {
			if (ids.length == 0) {
				sb.append("item WHERE item.type = ");
				sb.append(ItemType.TRAITBOOST.getValue());
			}
		}
		try {
			PreparedStatement search = conn.prepareStatement(sb.toString());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				itemList.add(clazz.getConstructor(ResultSet.class).newInstance(rs));
			}
			@SuppressWarnings("unchecked")
			T[] temp = (T[]) Array.newInstance(clazz, itemList.size());
			itemList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Add {@link FlatItem} or any of its valid subclasses to the database
	 * 
	 * @param item
	 *            The item to add to the database
	 * @return True if the operation succeeds; false otherwise
	 */
	public boolean addItem(FlatItem item) {
		if (item == null)
			return false;
		try {
			ResultSet rs = item.databaseSelectItem(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return item.databaseInsert(conn);
			} else {
				return item.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Get the given ids as the given activity class
	 * 
	 * @param clazz
	 *            The class of activities to get
	 * @param ids
	 *            The ids of activities to retrieve, if the array is null or empty
	 *            retrieve all activities of the given class
	 * @return An array of the given activity class
	 */
	public <T> T[] getActivities(Class<T> clazz, int[] ids) {
		if (ids == null) {
			ids = new int[0];
		}
		ArrayList<T> activityList = new ArrayList<T>();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM activity");
		if (ids.length != 0) {
			sb.append(" WHERE activity.id ");
			idsToInClause(ids, sb);
		}
		try {
			PreparedStatement search = conn.prepareStatement(sb.toString());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				activityList.add(clazz.getConstructor(ResultSet.class).newInstance(rs));
			}
			@SuppressWarnings("unchecked")
			T[] temp = (T[]) Array.newInstance(clazz, activityList.size());
			activityList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Add {@link FlatActivity} or any of its valid subclasses to the database
	 * 
	 * @param activity
	 *            The activity to add to the database
	 * @return True if the operation succeeds; false otherwise
	 */
	public boolean addActivity(FlatActivity activity) {
		if (activity == null)
			return false;
		try {
			ResultSet rs = activity.databaseSelectActivity(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return activity.databaseInsert(conn);
			} else {
				return activity.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * Add {@link FlatVendor} or any of its valid subclasses to the database
	 * 
	 * @param vendor
	 *            The vendor to add to the database
	 * @return True if the operation succeeds; false otherwise
	 */
	public boolean addVendor(FlatVendor vendor) {
		if (vendor == null)
			return false;
		try {
			ResultSet rs = vendor.databaseSelectVendor(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return vendor.databaseInsert(conn);
			} else {
				return vendor.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Add {@link FlatVendorItem} or any of its valid subclasses to the database
	 * 
	 * @param vendor
	 *            The vendorItem to add to the database
	 * @return True if the operation succeeds; false otherwise
	 */
	public boolean addVendorItem(FlatVendorItem vendorItem) {
		if (vendorItem == null)
			return false;
		try {
			ResultSet rs = vendorItem.databaseSelectVendorItem(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return vendorItem.databaseInsert(conn);
			} else {
				return vendorItem.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Get the given ids as the given restriction class
	 * 
	 * @param clazz
	 *            The class of restriction to get
	 * @param ids
	 *            The ids of restrictions to retrieve, if the array is null or empty
	 *            retrieve all restrictions of the given class
	 * @return An array of the given restriction class
	 */
	public <T> T[] getRestrictions(Class<T> clazz, int[] ids) {
		if (ids == null) {
			ids = new int[0];
		}
		ArrayList<T> restrictionList = new ArrayList<T>();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT * FROM restriction");
		if (ids.length != 0) {
			sb.append(" WHERE restriction.id ");
			idsToInClause(ids, sb);
		}
		try {
			PreparedStatement search = conn.prepareStatement(sb.toString());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				restrictionList.add(clazz.getConstructor(ResultSet.class).newInstance(rs));
			}
			@SuppressWarnings("unchecked")
			T[] temp = (T[]) Array.newInstance(clazz, restrictionList.size());
			restrictionList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Get the restrictions for the given activityId
	 * 
	 * @param activityId
	 *            The id of the activity to get the restrictions of
	 * @return An array of restrictions
	 */
	public Restriction[] getRestrictionsForActivity(int activityId) {
		return getBoundRestrictionsAsRestrictions(activityId, BoundType.ACTIVITY);
	}
	
	/**
	 * Get the restrictions for the given vendorItem id
	 * 
	 * @param itemId
	 *            The id of the vendorItem to get the restrictions of
	 * @return An array of restrictions
	 */
	public Restriction[] getRestrictionsForItem(int vendorItemId) {
		return getBoundRestrictionsAsRestrictions(vendorItemId, BoundType.ITEM);
	}
	
	/**
	 * Get the bound restrictions of an object as simple restrictions
	 * 
	 * @param bindingId
	 * 			The id of the object the restrictions are bound to
	 * @param bindingType
	 * 			The type of object the id belongs to
	 * @return An array of Restrictions
	 */
	private Restriction[] getBoundRestrictionsAsRestrictions(int bindingId, BoundType bindingType) {
		ArrayList<Restriction> restrictionList = new ArrayList<Restriction>();
		try {
			PreparedStatement search = conn
					.prepareStatement("SELECT * FROM (SELECT restrictionid FROM bound_restriction WHERE boundid=? AND type=?) binded INNER JOIN restriction ON binded.restrictionid=restriction.id");
			search.setInt(1, bindingId);
			search.setByte(2, bindingType.getValue());
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				restrictionList.add(new Restriction(rs));
			}
			Restriction[] temp = new Restriction[restrictionList.size()];
			restrictionList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;		
	}
	
	/**
	 * Add a {@link Restriction} to the database
	 * 
	 * @param restriction
	 *            The restriction to add
	 * @return True if the operation succeeded; false otherwise
	 */
	public boolean addRestriction(Restriction restriction) {
		if (restriction == null)
			return false;
		try {
			ResultSet rs = restriction.databaseSelectRestriction(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return restriction.databaseInsert(conn);
			} else {
				return restriction.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Add a {@link BoundRestriction} to the database
	 * 
	 * @param boundRestriction
	 *            The bound restriction to add
	 * @return True if the operation succeeded; false otherwise
	 */
	public boolean addBoundRestriction(BoundRestriction boundRestriction) {
		if (boundRestriction == null)
			return false;
		try {
			ResultSet rs = boundRestriction.databaseSelectBoundRestriction(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return boundRestriction.databaseInsert(conn);
			} else {
				return boundRestriction.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * @return Get all of the special recipes from the database
	 */
	public Recipe[] getSpecialRecipes() {
		ArrayList<Recipe> special = new ArrayList<Recipe>();
		try {
			PreparedStatement findRecipe = conn.prepareStatement("SELECT * FROM recipe");
			ResultSet recipes = findRecipe.executeQuery();
			while (recipes.next()) {
				PreparedStatement getPersonaRef = conn.prepareStatement(
						"SELECT persona.name, persona.level, persona.arcana FROM persona WHERE persona.id=?");
				int resultid = recipes.getInt("result");
				getPersonaRef.setInt(1, resultid);
				ResultSet resultResult = getPersonaRef.executeQuery();
				resultResult.next();
				String resultName = resultResult.getString("name");
				byte resultLevel = resultResult.getByte("level");
				byte resultArcana = resultResult.getByte("arcana");
				PersonaReference result = new PersonaReference(resultid, resultName, resultLevel, resultArcana);
				PersonaReference[] source = new PersonaReference[7];
				for (int i = 1; i < 8; i++) {
					int personaid = recipes.getInt("sources" + i);
					if (recipes.wasNull()) {
						break;
					} else {
						getPersonaRef.setInt(1, personaid);
						ResultSet nameResult = getPersonaRef.executeQuery();
						nameResult.next();
						String personaname = nameResult.getString("name");
						byte personalevel = nameResult.getByte("level");
						byte personaArcana = nameResult.getByte("arcana");
						source[i - 1] = new PersonaReference(personaid, personaname, personalevel, personaArcana);
					}
				}
				special.add(new Recipe(result, source));
			}
			Recipe[] temp = new Recipe[special.size()];
			special.toArray(temp);
			return temp;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Get the {@link LeveledSkill LevelSkills} for a specified persona
	 * 
	 * @param personaid
	 *            The id of the persona to get LeveledSkills for
	 * @return An array of LeveledSkills
	 */
	public LeveledSkill[] getLeveledSkills(int personaid) {
		ArrayList<LeveledSkill> skillList = new ArrayList<LeveledSkill>();
		try {
			// Get the actual skills
			PreparedStatement search = conn.prepareStatement(
					"SELECT persona_skill.skillid, persona_skill.level FROM persona_skill WHERE persona_skill.personaid = ? ORDER BY persona_skill.level ASC");
			search.setInt(1, personaid);
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				int skillid = rs.getInt("skillid");
				byte level = rs.getByte("level");
				// The class of a skill is ambiguous because of DamageSkill &
				// DamageAilmentSkill
				// But any skill with an ailment_skill entry that is not an
				// ailment
				// skill is a DamageAilmentSkill
				// This removes the ambiguity and lets us get all of a skill's
				// data correctly
				PreparedStatement skillTypeSearch = conn.prepareStatement(
						"SELECT skill.element, ailment_skill.skillId FROM (SELECT skill.element FROM skill WHERE skill.id=?) skill LEFT JOIN ailment_skill ON ?=ailment_skill.skillid");
				skillTypeSearch.setInt(1, skillid);
				skillTypeSearch.setInt(2, skillid);
				ResultSet skillTypeResult = skillTypeSearch.executeQuery();
				if (skillTypeResult.isBeforeFirst()) {
					skillTypeResult.next();
					Element skillElement = Element.fromByteStatic(skillTypeResult.getByte("element"));
					skillTypeResult.getInt("skillId");
					boolean hasAilment = !skillTypeResult.wasNull();
					FlatSkill skill;
					if (skillElement != Element.AILMENT && hasAilment) {
						// DamageAilmentSkill
						skill = getSkills(FlatDamageAilmentSkill.class, new int[] { skillid })[0];
					} else if (skillElement == Element.SUPPORT) {
						skill = getSkills(FlatSupportSkill.class, new int[] { skillid })[0];
					} else if (skillElement == Element.AILMENT) {
						skill = getSkills(FlatAilmentSkill.class, new int[] { skillid })[0];
					} else if (skillElement == Element.PASSIVE) {
						skill = getSkills(FlatPassiveSkill.class, new int[] { skillid })[0];
					} else {
						skill = getSkills(FlatDamageSkill.class, new int[] { skillid })[0];
					}
					skill.getCompiledDescription(true);
					skillList.add(new LeveledSkill(skill, level));
				} else {
					System.err.println(String.format("Unable to find a table entry for skillid %d", skillid));
				}
			}
			LeveledSkill[] temp = new LeveledSkill[skillList.size()];
			skillList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Add a {@link PersonaSkill} to the database
	 * 
	 * @param personaSkill
	 *            The PersonaSkill to add
	 * @return True if the operation succeeds; false otherwise
	 */
	public boolean addPersonaSkill(PersonaSkill personaSkill) {
		if (personaSkill == null)
			return false;
		try {
			ResultSet rs = personaSkill.databaseSelectPersonaSkill(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return personaSkill.databaseInsert(conn);
			} else {
				return personaSkill.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Get the drops and negotiates for a persona
	 * 
	 * @param personaid
	 *            The id of the persona to get drops and negotiates for
	 * @return A double-array, outer array index 0 is drops, outer array index 1
	 *         is negotiates
	 */
	public DropReference[][] getBothDrops(int personaid) {
		DropReference[][] bothDrops = new DropReference[2][];
		ArrayList<DropReference> dropList = new ArrayList<DropReference>();
		ArrayList<DropReference> negotList = new ArrayList<DropReference>();
		try {
			PreparedStatement search = conn.prepareStatement(
					"SELECT item.id, item.name, drop_table.low, drop_table.high, drop_table.isDrop FROM (SELECT * FROM drop_table WHERE drop_table.personaid=?) drop_table INNER JOIN item ON drop_table.itemid=item.id ORDER BY drop_table.low ASC");
			search.setInt(1, personaid);
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				boolean isDrop = rs.getBoolean("isDrop");
				if (isDrop) {
					dropList.add(new DropReference(rs));
				} else {
					negotList.add(new DropReference(rs));
				}
			}
			DropReference[] temp = new DropReference[dropList.size()];
			dropList.toArray(temp);
			bothDrops[0] = temp;
			temp = new DropReference[negotList.size()];
			negotList.toArray(temp);
			bothDrops[1] = temp;
			return bothDrops;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Add a {@link Drop} to the database
	 * 
	 * @param drop
	 *            The drop to add
	 * @return True if the operation succeeded; false otherwise
	 */
	public boolean addDrop(Drop drop) {
		if (drop == null)
			return false;
		try {
			ResultSet rs = drop.databaseSelectDrop(conn);
			if (!rs.isBeforeFirst()) {
				// No data so blind insert
				return drop.databaseInsert(conn);
			} else {
				return drop.databaseUpdate(conn);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * Get the transmutes of a persona
	 * 
	 * @param personaid
	 *            The id of the persona to get the transmutes of
	 * @return An array of size 4 containing the transmutes of the requested
	 *         persona of the order [Weapon, Armor, Accessory, SkillCard]. If
	 *         one does not exist for the persona, it uses a dummy entry to fill
	 *         out the array
	 */
	public ItemReference[] getTransmutes(int personaid) {
		ItemReference empty = new ItemReference(0, "-");
		ItemReference[] transmutes = new ItemReference[] { empty, empty, empty, empty };
		try {
			PreparedStatement search = conn
					.prepareStatement("SELECT item.id, item.name, item.type FROM item WHERE item.transmuteId=?");
			search.setInt(1, personaid);
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				ItemType type = ItemType.fromByteStatic(rs.getByte("type"));
				ItemReference item = new ItemReference(rs);
				switch (type) {
				case WEAPON:
					transmutes[0] = item;
					break;
				case ARMOR:
					transmutes[1] = item;
					break;
				case ACCESSORY:
					transmutes[2] = item;
					break;
				case SKILLCARD:
					transmutes[3] = item;
					break;
				default:
					System.err.println("When attempting to retreive transmutes for " + personaid
							+ " found a transmute of unexpected type " + type.toString());
					break;
				}
			}
			return transmutes;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Get the full version of the requested skills
	 * 
	 * @param ids
	 *            An array of skillids to retrieve
	 * @return An array of the {@link FullSkill} representations of the
	 *         requested skills
	 */
	public FullSkill[] getFullSkills(int ids[]) {
		ArrayList<FullSkill> skillList = new ArrayList<FullSkill>();
		if (ids == null) {
			ids = new int[0];
		}
		try {
			StringBuilder sb = new StringBuilder();
			sb.append(
					"SELECT skill.id, skill.element, ailment_skill.skillId FROM (SELECT skill.id, skill.element FROM skill");
			if (ids.length != 0) {
				sb.append(" WHERE skill.id ");
				idsToInClause(ids, sb);
			}
			sb.append(") skill LEFT JOIN ailment_skill ON skill.id=ailment_skill.skillid");
			// The class of a skill is ambiguous because of DamageSkill &
			// DamageAilmentSkill
			// But any skill with an ailment_skill entry that is not an
			// ailment
			// skill is a DamageAilmentSkill
			// This removes the ambiguity and lets us get all of a skill's
			// data correctly
			PreparedStatement skillTypeSearch = conn.prepareStatement(sb.toString());
			ResultSet skillTypeResult = skillTypeSearch.executeQuery();
			while (skillTypeResult.next()) {
				Element skillElement = Element.fromByteStatic(skillTypeResult.getByte("element"));
				int skillid = skillTypeResult.getInt("id");
				skillTypeResult.getInt("skillId");
				boolean hasAilment = !skillTypeResult.wasNull();
				FlatSkill skill;
				if (skillElement != Element.AILMENT && hasAilment) {
					// DamageAilmentSkill
					skill = getSkills(FlatDamageAilmentSkill.class, new int[] { skillid })[0];
				} else if (skillElement == Element.SUPPORT) {
					skill = getSkills(FlatSupportSkill.class, new int[] { skillid })[0];
				} else if (skillElement == Element.AILMENT) {
					skill = getSkills(FlatAilmentSkill.class, new int[] { skillid })[0];
				} else if (skillElement == Element.PASSIVE) {
					skill = getSkills(FlatPassiveSkill.class, new int[] { skillid })[0];
				} else {
					skill = getSkills(FlatDamageSkill.class, new int[] { skillid })[0];
				}
				skill.getCompiledDescription(true);
				PreparedStatement persona = conn.prepareStatement(
						"SELECT persona_skill.level, persona.id, persona.name FROM (SELECT persona_skill.personaid, persona_skill.level FROM persona_skill WHERE persona_skill.skillid=?) persona_skill INNER JOIN persona ON persona_skill.personaid=persona.id");
				persona.setInt(1, skillid);
				ResultSet learningPersonae = persona.executeQuery();
				ArrayList<PersonaReference> refs = new ArrayList<PersonaReference>();
				while (learningPersonae.next()) {
					int id = learningPersonae.getInt("id");
					String name = learningPersonae.getString("name");
					byte level = learningPersonae.getByte("level");
					refs.add(new PersonaReference(id, name, level, (byte) 0));
				}
				PersonaReference[] refTemp = new PersonaReference[refs.size()];
				refs.toArray(refTemp);
				skillList.add(new FullSkill(skill, refTemp));
			}
			FullSkill[] temp = new FullSkill[skillList.size()];
			skillList.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Get the vendors for a shopping activity
	 * 
	 * @param activityId
	 *            The id of the activity to get the vendors for
	 * @return An array of FullVendors
	 */
	public FullVendor[] getShoppingVendors(int activityId) {
		ArrayList<FullVendor> vendors = new ArrayList<FullVendor>();
		try {
			PreparedStatement search = conn
					.prepareStatement("SELECT * FROM vendor WHERE activityId=?");
			search.setInt(1, activityId);
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				vendors.add(new FullVendor(rs));
			}
			FullVendor[] temp = new FullVendor[vendors.size()];
			vendors.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Get the items sold for a vendor
	 * 
	 * @param vendorId
	 *            The id of the vendor to get the list of items sold
	 * @return An array of VendorItemReferences
	 */
	public VendorItemReference[] getItemsForVendor(int vendorId) {
		ArrayList<VendorItemReference> vendorItems = new ArrayList<VendorItemReference>();
		try {
			PreparedStatement search = conn
					.prepareStatement("SELECT vendorItem.id as vendorItemId, vendorItem.cost as cost, item.id as id, item.name as name FROM (SELECT * FROM vendor_item WHERE vendor_item.vendorId=?) vendorItem INNER JOIN item ON vendorItem.itemId= item.id");
			search.setInt(1, vendorId);
			ResultSet rs = search.executeQuery();
			while (rs.next()) {
				int vendorItemId = rs.getInt("vendorItemId");
				Restriction[] restricts = this.getRestrictionsForItem(vendorItemId);
				vendorItems.add(new VendorItemReference(rs, restricts));
			}
			VendorItemReference[] temp = new VendorItemReference[vendorItems.size()];
			vendorItems.toArray(temp);
			return temp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
