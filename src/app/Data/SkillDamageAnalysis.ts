/*let playerHP =
         101+6.5*(this.minLevel+20-5); // Sam
        // 83+6.5*(this.minLevel+20-5); // Jalen
        // 91+5.5*(this.minLevel+20-5); // Stefan
        // 69+3.5*(this.minLevel+20-5); // Linda
        // 93+6.5*(this.minLevel+20-5); // David
        if (playerHP > 1000) {
            playerHP = 1000;
        }
        let playerDR = this.element===Element.Gun ?
            (14 + 5.5*(this.minLevel+20-5)/4)/10 // Sam
            // (13 + 3.5*(this.minLevel+20-5)/4)/10 // Jalen
            // (18 + 5.5*(this.minLevel+20-5)/4)/10 // Stefan
            // (12 + 5.5*(this.minLevel+20-5)/4)/10 // Linda
            // (24 + 10.5*(this.minLevel+20-5)/4)/10 // David
            :
            (this.element===Element.Physical ?
            (14 + 5.5*(this.minLevel+20-5)/4)/10 // Sam
            // (13 + 3.5*(this.minLevel+20-5)/4)/10 // Jalen
            // (18 + 5.5*(this.minLevel+20-5)/4)/10 // Stefan
            // (12 + 5.5*(this.minLevel+20-5)/4)/10 // Linda
            // (24 + 10.5*(this.minLevel+20-5)/4)/10 // David
            :
            (7 + 3.5*(this.minLevel+20-5)/4)/10); // Sam
            // (22 + 5.5*(this.minLevel+20-5)/4)/10); // Jalen
            // (20 + 5.5*(this.minLevel+20-5)/4)/10); // Stefan
            // (31 + 10.5*(this.minLevel+20-5)/4)/10); // Linda
            // (18 + 5.5*(this.minLevel+20-5)/4)/10); // David
        if (playerDR > 25) {
            // DR from stats can't exceed 25
            playerDR = 25;
        }

        let multi =
        this.element === Element.Psy ? 1.5 : (this.element === Element.Nuke ? .5 : 1); //Sam
        // this.element === Element.Nuke ? 1.5 : (this.element === Element.Psy ? .5 : 1); //Jalen
        // this.element === Element.Ice ? 1.5 : (this.element === Element.Fire ? .5 : 1); //Stefan
        // this.element === Element.Wind ? 1.5 : (this.element === Element.Elec ? .5 : 1); //Linda
        // this.element === Element.Curse ? 1.5 : (this.element === Element.Bless ? .5 : 1); //David
        let totalMultiplier = multi*this.multiplier;
        let schedule = Math.ceil((this.minLevel+20)/13);
        let mysticArmor = 0;
        let lightArmor = 0;
        let heavyArmor = 0;
        let usingHeavy = false;
        let usingLight = true;
        let usingMystic = false;
        switch (schedule) {
            case 9:
            case 8:
            case 7:
            case 6:
                mysticArmor += 10;
                lightArmor += 12;
                heavyArmor += 14;
            case 5:
                mysticArmor += 9;
                lightArmor += 11;
                heavyArmor += 13;
            case 4:
                mysticArmor += 7;
                lightArmor += 9;
                heavyArmor += 11;
            case 3:
                mysticArmor += 5;
                lightArmor += 7;
                heavyArmor += 9;
            case 2:
                mysticArmor += 4;
                lightArmor += 5;
                heavyArmor += 6;
        }
        if (this.element !== Element.Gun) {
            if (usingHeavy)
                playerDR += heavyArmor;
            else if (usingMystic)
                playerDR += mysticArmor;
            else if (usingLight)
                playerDR += lightArmor;
        }
        if (multi*(this.minDamage - playerDR*this.multiplier) > playerHP) {
            if (multi === 1.5) {
                console.error(`Stefan is weak to this:`);
            }
            let armorDR = Math.ceil((multi*(this.minDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.error(`Required Additional Armor DR to survive ${armorDR}`);
            console.error(`MinDamage for ${this.name} kills Stefan ${this.minDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        }
        if (multi*(this.avgDamage - playerDR*this.multiplier) > playerHP) {
            if (multi === 1.5) {
                console.warn(`Stefan is weak to this:`)
            }
            let armorDR = Math.ceil((multi*(this.avgDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.warn(`Required Additional Armor DR to survive ${armorDR}`);
            console.warn(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        } else if (this.avgDamage * multi < playerDR*totalMultiplier) {
            console.error(`${this.name}`);
            console.error(`Stefan's DR ${playerDR*totalMultiplier} is higher than the avgDamage ${this.avgDamage}`)
        }
        if (multi*(this.maxDamage - playerDR*this.multiplier) > playerHP) {
            if (multi === 1.5) {
                console.log(`Stefan is weak to this:`)
            }
            let armorDR = Math.ceil((multi*(this.maxDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.log(`Required Additional Armor DR to survive ${armorDR}`);
            console.log(`MaxDamage for ${this.name} kills Stefan ${this.maxDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        }

        if (usingHeavy && this.element === Element.Physical) {
            if (multi*(this.minDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are crit attacks");
                let armorDR = Math.ceil((multi*(this.minDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.error(`Required Additional Armor DR to survive ${armorDR}`);
                console.error(`MinDamage for ${this.name} kills Stefan ${this.minDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
            if (multi*(this.avgDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are crit attacks");
                let armorDR = Math.ceil((multi*(this.avgDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.warn(`Required Additional Armor DR to survive ${armorDR}`);
                console.warn(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
            if (multi*(this.maxDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are crit attacks");
                let armorDR = Math.ceil((multi*(this.maxDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.warn(`Required Additional Armor DR to survive ${armorDR}`);
                console.warn(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
        }

        multi = multi *2.5;
        totalMultiplier = totalMultiplier * 2.5;
        if (multi*(this.minDamage - playerDR*this.multiplier) > playerHP) {
            console.warn("These are charged attacks");
            if (multi === 2.5*1.5) {
                console.warn(`Stefan is weak to this:`)
            }
            let armorDR = Math.ceil((multi*(this.minDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.warn(`Required Additional Armor DR to survive ${armorDR}`);
            console.warn(`MinDamage for ${this.name} kills Stefan ${this.minDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        }
        if (multi*(this.avgDamage - playerDR*this.multiplier) > playerHP) {
            console.warn("These are charged attacks");
            if (multi === 2.5*1.5) {
                console.log(`Stefan is weak to this:`)
            }
            let armorDR = Math.ceil((multi*(this.avgDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.log(`Required Additional Armor DR to survive ${armorDR}`);
            console.log(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        } else if (multi*(this.maxDamage - playerDR*this.multiplier) > playerHP) {
            console.warn("These are charged attacks");
            if (multi === 2.5*1.5) {
                console.log(`Stefan is weak to this:`)
            }
            let armorDR = Math.ceil((multi*(this.maxDamage - playerDR*this.multiplier) - playerHP) / totalMultiplier);
            console.log(`Required Additional Armor DR to survive ${armorDR}`);
            console.log(`maxDamage for ${this.name} kills Stefan ${this.maxDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
        }

        if (usingHeavy && this.element === Element.Physical) {
            if (multi*(this.minDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are charged crit attacks");
                let armorDR = Math.ceil((multi*(this.minDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.error(`Required Additional Armor DR to survive ${armorDR}`);
                console.error(`MinDamage for ${this.name} kills Stefan ${this.minDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
            if (multi*(this.avgDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are charged crit attacks");
                let armorDR = Math.ceil((multi*(this.avgDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.warn(`Required Additional Armor DR to survive ${armorDR}`);
                console.warn(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
            if (multi*(this.maxDamage*2 - playerDR*this.multiplier) > playerHP) {
                console.log("These are charged crit attacks");
                let armorDR = Math.ceil((multi*(this.maxDamage*2 - playerDR*this.multiplier) - playerHP) / totalMultiplier);
                console.warn(`Required Additional Armor DR to survive ${armorDR}`);
                console.warn(`AvgDamage for ${this.name} kills Stefan ${this.avgDamage*multi} vs ${playerHP} & ${playerDR*totalMultiplier}`);
            }
        }
        */
