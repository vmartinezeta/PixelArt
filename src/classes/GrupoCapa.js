import Capa from "./Capa"
import PilaCapa from "./PilaCapa"

class GrupoCapa {
    constructor() {
        this.id = 0
        this.capaArray = []
        if (GrupoCapa.instance) {
            return GrupoCapa.instance
        }
        GrupoCapa.instance = this
        return GrupoCapa.instance
    }

    crearCapa(cuadriculaPixel, isActive) {
        this.id++
        this.capaArray.push(new Capa(this.id, cuadriculaPixel, isActive))
    }

    eliminar(id) {
        try {
            const capa = this.getActiva()
            if (capa.id === id) return
            this.capaArray = this.capaArray.filter(capa => capa.id !== id)
        } catch (error) {
        }
    }

    setActiva(id) {
        this.capaArray = this.capaArray.map(actual => {
            if (id === actual.id || actual.isActiva()) {
                actual.setActiva(!actual.isActiva())
            }
            return actual
        })
    }

    getActiva() {
        const capa = this.capaArray.find(capa => capa.isActiva())
        if (!capa) {
            throw new TypeError("Ninguna capa activa")
        }
        return capa
    }

    toPilaCapa() {
        const array = this.capaArray.sort((a, b)=> {
            return a.id < b.id
        })
        return new PilaCapa(array)
    }

}

export default GrupoCapa