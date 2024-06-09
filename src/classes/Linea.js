class Linea {
    constructor(orientacion, pixeles){
        this.orientacion = orientacion
        this.pixeles = pixeles
    }

    getPixeles() {
        return this.pixeles
    }

    isVertical() {
        return this.orientacion === "VERTICAL"
    }

    isHorizontal() {
        return this.orientacion === "HORIZONTAL"
    }

    isDiagonal() {
        return this.orientacion === "DIAGONAL"
    }

    getOrientacion() {
        return this.orientacion
    }

}

export default Linea