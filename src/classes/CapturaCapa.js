import Punto from "./Punto"

export default class CapturaCapa {
    constructor(capa, isNew) {
        this.capa = capa
        this.pixeles = []
        this.isNew = isNew
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
        return this.pixeles.length > 0
            && (this.isPuntoContiguo(this.pixeles, new Punto(0, 1))
                || this.isPuntoContiguo(this.pixeles, new Punto(1, 0)))
    }

    isPuntoContiguo(pixeles, vector) {
        let ok = false
        let i = 0
        let origen = pixeles[i].getUbicacion().getPuntoAbstracto()
        while (!ok) {
            i++
            if (i > pixeles.length - 1) {
                ok = true
                break
            }
            const pixel = pixeles[i]
            const punto = pixel.getUbicacion().getPuntoAbstracto()
            const siguiente = this.siguientePunto(origen, vector)
            if (punto.toString() !== siguiente.toString()) {
                ok = true
                break
            }
            origen = punto
        }
        return i > pixeles.length - 1 && ok
    }

    siguientePunto(origen, vector) {
        const x = origen.getX() + vector.getX()
        const y = origen.getY() + vector.getY()
        return new Punto(x, y)
    }

    excluirSeleccionados() {
        if (this.formaLineaSolida()) {
            const lineas = this.capa.cuadriculaPixel.toLineaArray()
            if (this.isPuntoContiguo(this.pixeles, new Punto(0,1))) {
                const lines = lineas.filter(l => l.isHorizontal())           
                const line = lines.find(l => this.pertenece(this.pixeles, l))
                const pixeles = this.getPixelesOpuestos(this.pixeles, line)
                console.log(pixeles)
            } else if (this.isPuntoContiguo(this.pixeles, new Punto(1,0))) {
                const lines = lineas.filter(l => l.isVertical())
                console.log(lines)
            }
        }
    }

    getPixelesOpuestos(pixeles, line) {
        const array= []
        const old = line.getPixeles()
        for(let pixel of pixeles) {            
            const index = old.findIndex(p => p.getUbicacion().getPuntoAbstracto().toString()=== pixel.getUbicacion().getPuntoAbstracto().toString())
            old.splice(index, 1)
        }
        return old
    }

    estaEnLinea(pixel, line) {
        return line.getPixeles().find(p => p.getUbicacion().getPuntoAbstracto().toString()===pixel.getUbicacion().getPuntoAbstracto().toString())
    }

    pertenece(pixeles, line) {
        let total = 0
        for(let pixel of pixeles) {
            if (this.estaEnLinea(pixel, line)) {
                total ++
            }
        }
        return total > 0
    }

    newInstance() {       
    }

}