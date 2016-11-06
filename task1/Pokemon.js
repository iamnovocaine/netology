class Pokemon {
    constructor(level, name) {
        this.level = level;
		this.name = name;
    }
    show() {
        console.log(this.level + "|" + this.name);
    }
    valueOf() {
        return this.level;
    }
}
module.exports = Pokemon;