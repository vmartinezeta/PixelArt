class Pixel {
    constructor(color, ubicacion, area) {
        this.color = color
        this.ubicacion = ubicacion
        this.area = area
    }

    setColor(color) {
        this.color = color
    }

    getColor() {
        return this.color
    }

    setUbicacion(ubicacion) {
        this.ubicacion = ubicacion
    }

    getUbicacion() {
        return this.ubicacion
    }

    setArea(area) {
        this.area = area
    }

    getArea() {
        return this.area
    }

    toString() {
        return this.ubicacion.getPuntoConcreto().toString()
    }

    newInstance() {
        return new Pixel(this.color, this.ubicacion, this.area)
    }
    
}

export default Pixel