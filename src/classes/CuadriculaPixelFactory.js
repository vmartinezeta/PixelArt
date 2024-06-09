import Color from "./Color"
import CuadriculaPixel from "./CuadriculaPixel"
import Fila from "./Fila"
import Pixel from "./Pixel"
import Punto from "./Punto"
import Ubicacion from "./Ubicacion"


class CuadriculaPixelFactory {
    constructor(filas, columnas) {
        this.filas = filas || 20
        this.columnas = columnas || 20
        this.filaArray = []
        let color = new Color()
        for (let i = 0; i < this.filas; i++) {
            const pixelArray = []
            for (let j = 0; j < this.columnas; j++) {
                const area = new Punto(40, 40)
                const ubicacion = new Ubicacion(new Punto(i, j), new Punto(area.getX()*i, area.getY()*j))
                pixelArray.push(new Pixel(color, ubicacion, area))
                color = color.newInstance()
                color.intercambiarBase()
            }
            color.intercambiarBase()
            this.filaArray.push(new Fila(pixelArray))
        }
    }

    crearCuadricula() {
        return new CuadriculaPixel(this.filaArray)
    }

}

export default CuadriculaPixelFactory