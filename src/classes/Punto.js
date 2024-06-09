class Punto {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    setX(x){
        this.x = x
    }

    getX() {
        return this.x
    }

    setY(y) {
        this.y = y
    }

    getY() {
        return this.y
    }

    toString() {
        return `${this.x},${this.y}`
    }

    newInstance() {
        return new Punto(this.x, this.y)
    }
}

export default Punto