import Punto from "./Punto"

export class SistemaReferencia {
    constructor(vector, izq, der) {
        this.vector = vector 
        this.punto1 = izq.getPuntoAbstracto()
        this.punto2 = der.getPuntoAbstracto()
        this.vectores = [new Punto(0,1)]
    }

    estaMismaDireccion() {
        return this.vector.toString()===this.vectores[0].toString() && this.punto2.getY() < this.punto1.getY()
    }
}