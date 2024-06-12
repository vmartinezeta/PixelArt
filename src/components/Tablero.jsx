import Celda from "./Celda"
import Fila from "./Fila"


export default function Tablero({cuadriculaPixel}) {

    return <div className="tablero tablero__escala">
        {
            cuadriculaPixel.toArray().map((filaPixel, fila) => {
                return <Fila key={fila}>
                    {filaPixel.map((pixel, i) => <Celda key={i} pixel={pixel} disabled={true} />)}
                </Fila>
            })
        }
    </div>
}