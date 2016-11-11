class Pokemon {
    constructor(level, name) {
        this.level = level;
		this.name = name;
    }
    show() {
		console.log(`${this.name}, ${this.level}`);
    }
	info(){
		return `${this.name}|${this.level}`;
	}
    valueOf() {
        return this.level;
    }
}
module.exports = Pokemon;