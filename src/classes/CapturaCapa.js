 export default class CapturaCapa {
    constructor(id, pixeles) {
        this.id = id
        this.pixeles = pixeles || []
        this.actual = null
    }

    agregar(pixel) {
        this.pixeles.push(pixel)
    }

    quitarFinal() {
        if (this.isVacio()) {
            throw new TypeError("Está vacia")
        }
        this.actual = this.pixeles.pop()
    }

    getActual() {
        if (this.actual === null) {
            throw new TypeError("No se borrado ninguno")
        }
        return this.actual
    }

    isVacio() {
        return this.pixeles.length === 0
    }

    toString() {
        return this.id
    }

    newInstance() {
        return new CapturaCapa(this.id, this.pixeles)
    }

 }