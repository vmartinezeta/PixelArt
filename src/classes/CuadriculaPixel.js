import DeltaX from "./DeltaX"
import DeltaY from "./DeltaY"
import Fila from "./FullLineaPixel"
import Linea from "./Linea"
import Pixel from "./Pixel"
import Punto from "./Punto"
import Ubicacion from "./Ubicacion"


export default class CuadriculaPixel {
    constructor(lineaArray) {
        this.lineaArray = lineaArray
        this.diferencia = undefined
    }

    toArray() {
        return this.lineaArray.map(fila => fila.toArray())
    }

    toLineaArray() {
        const area = this.getArea()
        let lineaArray = []
        for (let i = 0; i < area.getX(); i++) {
            const pixelsHorizontal = this.lineaArray[i].toArray()
            lineaArray.push(
                new Linea("HORIZONTAL", pixelsHorizontal)
            )
        }
        for (let j = 0; j < area.getY(); j++) {
            const pixelsVertical = []
            for (let i = 0; i < area.getX(); i++) {
                pixelsVertical.push(this.lineaArray[i].toArray()[j])
            }
            lineaArray.push(
                new Linea("VERTICAL", pixelsVertical)
            )
        }

        return lineaArray
    }

    redimensionar(diferencia) {
        if (diferencia === undefined) {
            throw new TypeError("No se puede actualizar el objeto sin un cambio previo")
        }
        this.diferencia = diferencia
        const { delta } = this.diferencia
        if (delta instanceof DeltaY && delta.isExtender()) {
            return this.agregarPixelesHorizontal()
        } else if (delta instanceof DeltaY && delta.isReducir()) {
            return this.eliminarPixelesHorizontal()
        } else if (delta instanceof DeltaX && delta.isExtender()) {
            return this.agregarPixelesVertical()
        } else if (delta instanceof DeltaX && delta.isReducir()) {
            return this.eliminarPixelesVertical()
        }
    }

    isValidoLimite() {
        const { delta } = this.diferencia
        return delta.final >= 20 && delta.final <= 30
    }

    agregarPixelesHorizontal() {
        if (!this.isValidoLimite()) return
        const { filas, delta } = this.diferencia
        for (let i = 0; i < filas; i++) {
            const fila = this.lineaArray[i].newInstance()
            const pixel = fila.getUltimo()
            let color = pixel.getColor()
            color = color.newInstance()
            color.intercambiarBase()
            const area = new Punto(40, 40)
            const ubicacion = new Ubicacion(new Punto(i, delta.inicio), new Punto(area.getX() * i, area.getY() * delta.inicio))
            fila.agregar(new Pixel(color, ubicacion, area))
            this.lineaArray[i] = fila
        }
    }

    agregarPixelesVertical() {
        if (!this.isValidoLimite()) return
        const { delta, columnas } = this.diferencia
        for (let i = delta.inicio; i < delta.final; i++) {
            const n = this.lineaArray.length
            const fila = this.lineaArray[n - 1]
            const pixel = fila.getPrimero()
            let color = pixel.getColor()
            color = color.newInstance()
            color.intercambiarBase()
            const linea = []
            for (let j = 0; j < columnas; j++) {
                const ubicacion = new Ubicacion(new Punto(i, j), new Punto(i, j))
                linea.push(new Pixel(color, ubicacion, new Punto(20, 20)))
                color = color.newInstance()
                color.intercambiarBase()
            }
            this.lineaArray.push(new Fila(linea))
        }
    }

    eliminarPixelesHorizontal() {
        const { filas, delta } = this.diferencia
        for (let i = 0; i < filas; i++) {
            const pixelArray = this.lineaArray[i].toArray()
            pixelArray.splice(delta.final)
            this.lineaArray[i] = new Fila(pixelArray)
        }
    }

    eliminarPixelesVertical() {
        const { delta } = this.diferencia
        const lineaArray = []
        for (let i = 0; i < delta.final; i++) {
            lineaArray.push(this.lineaArray[i])
        }
        this.lineaArray = lineaArray
    }

    actualizarPixel(pixel) {
        this.lineaArray = this.lineaArray.map(fila => {
            if (fila.existe(pixel)) {
                fila.actualizar(pixel)
            }
            return fila
        })
    }

    getArea() {
        if (this.lineaArray.length === 0) {
            throw new TypeError("Vacia la cuadricula")
        }
        const x = this.lineaArray.length
        const y = this.lineaArray[0].getSize()
        return new Punto(x, y)
    }

    getPrimeraColumna() {
        const area = this.getArea()
        const columna = []
        for (let i = 0; i < area.getX(); i++) {
            columna.push(this.lineaArray[i][0])
        }
        return columna
    }

    getUltimaFila() {
        const area = this.getArea()
        const fila = []
        const i = area.getX() - 1
        for (let j = 0; j < area.getY(); j++) {
            fila.push(this.lineaArray[i][j])
        }
        return fila
    }

    newInstance() {
        const lineaArray = this.lineaArray.map(fila => fila.newInstance())
        return new CuadriculaPixel(lineaArray)
    }
}