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

    newInstance() {
        return new Linea(this.orientacion, this.pixeles.slice())
    }

}

export default Linea