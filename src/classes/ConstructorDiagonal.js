import Linea from "./Linea"
import Punto from "./Punto"

class ConstructorDiagonal {
    constructor(cuadriculaPixel, vector) {
        this.cuadriculaPixel = cuadriculaPixel
        this.vector = vector        
    }

    crear() {
        const columna = this.cuadriculaPixel.getPrimeraColumna()
        columna.shift()
        const fila = this.cuadriculaPixel.getUltimaFila()
        fila.pop()
        const parte1 = this.trazarDiagonal(columna)
        const parte2 = this.trazarDiagonal(fila)
        return [...parte1, ...parte2]
    }

    trazarDiagonal(pixelArray) {
        const diagonales = []
        for (let pixel of pixelArray) {
            const pixeles = []
            const ubicacion = pixel.getUbicacion()
            let origen = ubicacion.getPuntoAbstracto()
            while (this.isValidoPunto(origen)) {
                const actual = this.cuadriculaPixel.fromPunto(origen)
                pixeles.push(actual)
                origen = this.siguientePunto(origen, this.vector)
            }
            diagonales.push(new Linea("DIAGONAL", pixeles))
        }
        return diagonales
    }

    siguientePunto(origen, vector) {
        const x = origen.getX() + vector.getX()
        const y = origen.getY() + vector.getY()
        return new Punto(x, y)
    }

    isValidoPunto(punto) {
        const area = this.cuadriculaPixel.getArea()
        return (punto.getX() >= 0 && punto.getX() <= area.getX()) && (punto.getY() >= 0 && punto.getY() <= area.getY())
    }

}

export default ConstructorDiagonal