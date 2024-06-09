class PilaCapa {
    constructor(array) {
        this.array = array
    }

    isCompletado() {
        return this.array.length > 8
    }

    toArray() {
        return this.array
    }

    newInstance() {
        return new PilaCapa(this.array)
    }

}

export default PilaCapa