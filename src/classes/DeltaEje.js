class DeltaEje {
    constructor(inicio, final) {
        this.inicio = inicio
        this.final = final
    }

    isExtender() {
        return this.final - this.inicio > 0
    }

    isReducir() {
        return this.final - this.inicio < 0
    }

}

export default DeltaEje