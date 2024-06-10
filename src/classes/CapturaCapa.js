import Punto from "./Punto"

export default class CapturaCapa {
    constructor(id, pixeles) {
        this.id = id
        this.pixeles = pixeles || []
        this.actual = null
    }

    agregar(pixel) {
        if (this.pixeles.map(p => p.toString()).includes(pixel.toString())) {
            return
        }
        this.pixeles.push(pixel)
    }

    quitarFinal() {
        if (this.isVacio()) {
            throw new TypeError("CapturaCapa.quitarFinal(), No hay mas pixeles por eliminar")
        }
        this.actual = this.pixeles.pop()
    }

    getActual() {
        if (this.actual === null) {
            throw new TypeError("CapturaCapa.getActual(), no se ha borrado ningun pixel")
        }
        return this.actual
    }

    isVacio() {
        return this.pixeles.length === 0
    }

    toString() {
        return this.id
    }

    formaLineaSolida() {
        return this.pixeles.length> 0 && (this.isPuntoContiguo(new Punto(1, 0))
            || this.isPuntoContiguo(new Punto(0, -1)))
    }

    isPuntoContiguo(vector) {
        let ok = false
        let i = 0
        let origen = this.pixeles[i].getUbicacion().getPuntoAbstracto()
        while (!ok) {
            i++
            if (i > this.pixeles.length-1) {
                ok = true
                break
            }
            const pixel = this.pixeles[i]
            const punto = pixel.getUbicacion().getPuntoAbstracto()
            const siguiente = this.siguientePunto(origen, vector)
            if (punto.toString() !== siguiente.toString()) {
                ok = true
                break
            }
            origen = punto
        }
        return i > this.pixeles.length - 1 && ok
    }

    siguientePunto(origen, vector) {
        const x = origen.getX() + vector.getX()
        const y = origen.getY() + vector.getY()
        return new Punto(x, y)
    }

    newInstance() {
        return new CapturaCapa(this.id, this.pixeles)
    }

}