addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('p', 16)) mult = mult.times(upgradeEffect('p', 16))
        if (hasUpgrade('p', 17)) mult = mult.times(upgradeEffect('p', 17))
        if (hasUpgrade('i', 11)) mult = mult.times(upgradeEffect('i',11))
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i',14))
        if (hasUpgrade('r', 11)) mult = mult.times(upgradeEffect('r',11))
        if (hasUpgrade('e', 11)) mult = mult.times(upgradeEffect('e',11))
        if (hasUpgrade('e', 12)) mult = mult.times(upgradeEffect('e',12))
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e',13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The beginning",
            description: "Double your points!",
            cost: new Decimal(1),
        },
        12: {
            title: "Multiplier",
            description: "Points are boosted by prestige points!",
            effect() {
                return player.p.points.add(1)
            },
            effectDisplay() { return format(upgradeEffect('p', 12))+"x" }, // Add formatting to the effect
            cost: new Decimal(3),
        },
        13: {
            title: "Prestige boost I",
            description: "Prestige point gain is boosted by your points!",
            effect() {
                return player.points.pow(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(50),
        },
        14: {
            title: "Self Synergy I",
            description: "Points boost themselves!",
            effect() {
                return player.points.pow(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(250),
        },
        15: {
            title: "Self Synergy II",
            description: "Prestige points boost themselves!",
            effect() {
                return player.p.points.pow(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(2000),
        },
        16: {
            title: "Prestige boost II",
            description: "Prestige points boost themselves... yet again but stronger!",
            effect() {
                return player.p.points.pow(0.15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(1e4),
        },
        17: {
            title: "And off to infinity!",
            description: "Prestige point gain boosted by 1e300x",
            effect() {
                return new Decimal(1e300)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            cost: new Decimal(5e5),
        },
    }
})
addLayer("i", {
    name: "infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF66",
    requires: new Decimal("1.79e308"), // Can be a function that takes requirement increases into account
    resource: "infinity points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 12)) mult = mult.times(upgradeEffect('i',12))
        if (hasUpgrade('i', 13)) mult = mult.times(upgradeEffect('i',13))
        if (hasUpgrade('r', 12)) mult = mult.times(upgradeEffect('r',12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for infinity points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The beginning again",
            description: "Prestige point gain is boosted by infinity points",
            effect() {
                return player.i.points.add(1).add(player.i.points.pow(5))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Infinity boost!",
            description: "3x infinity points!",
            effect() {
                return new Decimal(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
        },
        13: {
            title: "Self Synergy III",
            description: "Infinity points boost themselves!",
            effect() {
                return player.i.points.pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(10),
        },
        14: {
            title: "Super boost!",
            description: "Prestige points go up!",
            effect() {
                return player.i.points.pow(1000000).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(100),
        },
    
    }
})
addLayer("r", {
    name: "replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF66",
    requires: new Decimal("e1e36"), // Can be a function that takes requirement increases into account
    resource: "replicanti points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Reset for replicanti points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The beginning of replication",
            description: "Prestige point gain is boosted by replicanti points!",
            effect() {
                return player.r.points.add(1).add(player.r.points.pow(1e12))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Googolplex",
            description: "Replicanti boosts infinity points!",
            effect() {
                return player.r.points.add(1).add(player.r.points.pow(1e21))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
        },
    
    }
})
addLayer("e", {
    name: "eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A020F0",
    requires: new Decimal("e1.79e308"), // Can be a function that takes requirement increases into account
    resource: "eternity points", // Name of prestige currency
    baseResource: "infinity points", // Name of resource prestige is based on
    baseAmount() {return player.i.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for eternity points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The beginning of eternity",
            description: "Prestige point gain is boosted by eternity points!",
            effect() {
                return player.e.points.add(1).add(player.e.points.tetrate(25))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Eternal upgrades",
            description: "Tetrates points by 100 million!",
            effect() {
                return player.e.points.add(1).add(player.e.points.tetrate(1e8))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(22313232),
        },
        13: {
            title: "The end",
            description: "Tetrates points by 179 uncentillion!",
            effect() {
                let cost = new Decimal(10)
                return cost.tetrate(1.78e308)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(103434242),
        }
    
    }
})



