import ConstructorDiagonal from "./ConstructorDiagonal"
import DeltaX from "./DeltaX"
import DeltaY from "./DeltaY"
import Fila from "./Fila"
import Linea from "./Linea"
import Pixel from "./Pixel"
import Punto from "./Punto"
import Ubicacion from "./Ubicacion"


export default class CuadriculaPixel {
    constructor(filaArray) {
        this.filaArray = filaArray
        this.diferencia = undefined
    }

    toArray() {
        return this.filaArray.map(fila => fila.toArray())
    }

    toLineaArray() {
        const area = this.getArea()
        let lineaArray = []
        for (let i = 0; i < area.getX(); i++) {
            const filaArrayHorizontal = []
            for (let j = 0; j < area.getY(); j++) {
                filaArrayHorizontal.push(this.fromXY(i, j))
            }
            lineaArray.push(
                new Linea("HORIZONTAL", filaArrayHorizontal)
            )
        }
        for (let i = 0; i < area.getY(); i++) {
            const filaArrayVertical = []
            for (let j = 0; j < area.getX(); j++) {
                filaArrayVertical.push(this.fromXY(i, j))
            }
            lineaArray.push(
                new Linea("VERTICAL", filaArrayVertical)
            )
        }

        const vector = new Punto(-1, 1)
        const constructor = new ConstructorDiagonal(this, vector)
        const diagonales = constructor.crear()
        lineaArray = [...lineaArray, ...diagonales]
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
            const fila = this.filaArray[i].newInstance()
            const pixel = fila.getUltimo()
            let color = pixel.getColor()
            color = color.newInstance()
            color.intercambiarBase()
            const area = new Punto(40, 40)
            const ubicacion = new Ubicacion(new Punto(i, delta.inicio), new Punto(area.getX() * i, area.getY() * delta.inicio))
            fila.agregar(new Pixel(color, ubicacion, area))
            this.filaArray[i] = fila
        }
    }

    agregarPixelesVertical() {
        if (!this.isValidoLimite()) return
        const { delta, columnas } = this.diferencia
        for (let i = delta.inicio; i < delta.final; i++) {
            const n = this.filaArray.length
            const fila = this.filaArray[n - 1]
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
            this.filaArray.push(new Fila(linea))
        }
    }

    eliminarPixelesHorizontal() {
        const { filas, delta } = this.diferencia
        for (let i = 0; i < filas; i++) {
            const pixelArray = this.filaArray[i].toArray()
            pixelArray.splice(delta.final)
            this.filaArray[i] = new Fila(pixelArray)
        }
    }

    eliminarPixelesVertical() {
        const { delta } = this.diferencia
        const filaArray = []
        for (let i = 0; i < delta.final; i++) {
            filaArray.push(this.filaArray[i])
        }
        this.filaArray = filaArray
    }

    actualizarPixel(pixel) {
        this.filaArray = this.filaArray.map(fila => {
            if (fila.existe(pixel)) {
                fila.actualizar(pixel)
            }
            return fila
        })
    }

    getArea() {
        if (this.filaArray.length === 0) {
            throw new TypeError("Vacia la cuadricula")
        }
        const x = this.filaArray.length
        const y = this.filaArray[0].getSize()
        return new Punto(x, y)
    }

    getPrimeraColumna() {
        const area = this.getArea()
        const columna = []
        for (let i = 0; i < area.getX(); i++) {
            columna.push(this.filaArray[i][0])
        }
        return columna
    }

    getUltimaFila() {
        const area = this.getArea()
        const fila = []
        const i = area.getX() - 1
        for (let j = 0; j < area.getY(); j++) {
            fila.push(this.filaArray[i][j])
        }
        return fila
    }

    newInstance() {
        const filaArray = this.filaArray.map(fila => fila.newInstance())
        return new CuadriculaPixel(filaArray)
    }
}