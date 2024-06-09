export default class Capa {
    constructor(id, cuadriculaPixel, active) {
        this.id = id
        this.cuadriculaPixel = cuadriculaPixel
        this.active = active || false
    }

    getId () {
        return this.id
    }

    setCuadriculaPixel (cuadriculaPixel) {
        this.cuadriculaPixel = cuadriculaPixel
    }

    getCuadriculaPixel () {
        return this.cuadriculaPixel
    }

    setActiva (active) {
        this.active = active
    }

    isActiva () {
        return this.active
    }

    newInstance () {
        return new Capa(this.id, this.cuadriculaPixel.newInstance(), this.active)
    }
}