class Ubicacion {
    constructor(puntoAbstracto, puntoConcreto) {
        this.puntoAbstracto = puntoAbstracto
        this.puntoConcreto = puntoConcreto
    }

    setPuntoAbstracto(puntoAbstracto) {
        this.puntoAbstracto = puntoAbstracto
    }

    getPuntoAbstracto() {
        return this.puntoAbstracto
    }

    setPuntoConcreto(puntoConcreto) {
        this.puntoConcreto = puntoConcreto
    }

    getPuntoConcreto() {
        return this.puntoConcreto
    }

    newInstance() {
        return new Ubicacion(this.puntoAbstracto, this.puntoConcreto)
    }
    
}

export default Ubicacion