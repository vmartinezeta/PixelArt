const ColorBase = {
    BLANCO: "#ffffff",
    GRIS: "#EDEDED"    
}


class Color {
    constructor(hexadecimal, base) {
        this.default = ColorBase.BLANCO
        this.base = base || ColorBase.BLANCO
        this.hexadecimal = hexadecimal || ColorBase.BLANCO
    }

    setHexadecimal(hexadecimal) {
        this.hexadecimal = hexadecimal
    }

    getHexadecimal() {
        return this.hexadecimal
    }

    intercambiarBase() {
        if (this.isBaseBlanco()) {
            this.base = ColorBase.GRIS
        } else if (this.isBaseGris()) {
            this.base = ColorBase.BLANCO
        }
        this.hexadecimal = this.base
    }

    isBase() {
        return this.base === this.hexadecimal
    }

    reset() {
        if (this.isBaseBlanco()) {
            this.hexadecimal = ColorBase.BLANCO
        } else if (this.isBaseGris()) {
            this.hexadecimal = ColorBase.GRIS
        }
    }

    isBaseBlanco() {
        return this.base === ColorBase.BLANCO
    }

    isBaseGris() {
        return this.base === ColorBase.GRIS
    }

    toRgb() {
        let hexadecimal = this.hexadecimal
        if (this.isBase()) {
            hexadecimal = this.default
        }
        hexadecimal = hexadecimal.replace('#', '')
        const [r, g, b] = hexadecimal.match(/.{1,2}/g)
        return [
            parseInt(r, 16),
            parseInt(g, 16),
            parseInt(b, 16)
        ]
    }

    newInstance() {
        return new Color(this.hexadecimal, this.base)
    }

}

export default Color