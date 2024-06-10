
class FullLineaPixel {
    constructor(pixelArray) {
        this.pixelArray = pixelArray
    }

    toArray() {
        return this.pixelArray
    }

    getPrimero() {
        return this.pixelArray[0]
    }

    getUltimo() {
        return this.pixelArray[this.pixelArray.length - 1]
    }

    agregar(pixel) {
        this.pixelArray.push(pixel)
    }

    actualizar(pixel) {
        const { puntoAbstracto: p } = pixel.getUbicacion()
        const index = this.pixelArray.findIndex(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto.toString() === p.toString())
        this.pixelArray[index] = pixel
    }

    existe(pixel) {
        return this.pixelArray.find(px => {
            const { puntoAbstracto: p1 } = pixel.getUbicacion()
            const { puntoAbstracto: p2 } = px.getUbicacion()
            return p1.toString() === p2.toString()
        }) !== undefined
    }

    getSize() {
        return this.pixelArray.length
    }

    newInstance() {
        return new FullLineaPixel(this.pixelArray)
    }

}

export default FullLineaPixel