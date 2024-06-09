class Mensaje {
    constructor(clase, descripcion) {
        this.clase = clase || ''
        this.descripcion = descripcion || ''
    }

    setClase(clase) {
        this.clase = clase
    }

    getClase() {
        return this.clase
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion
    }

    getDescripcion() {
        return this.descripcion
    }

    isVacio() {
        return this.descripcion === ''
    }

    newInstance() {
        return new Mensaje(this.clase, this.descripcion)
    }
}

export default Mensaje