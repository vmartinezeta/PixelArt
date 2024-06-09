import { usePixelArt } from "../context/PixelArtStore"
import Celda from "./Celda"
import Fila from "./Fila"


export default function Tablero({escala, disabled}) {
    const { capa, arrastre, setArrastre } = usePixelArt()

    const estado = ["tablero"]
    if (escala) {
        estado.push(escala)
    }

    return <div className={estado.join(" ")}
        onPointerDown={() => {
            arrastre.anterior = arrastre.actual
            arrastre.actual = true
            setArrastre(arrastre)
        }}

        onPointerUp={() => {
            arrastre.anterior = false
            arrastre.actual = false
            setArrastre(arrastre)
        }}
    >
        {
            capa.getCuadriculaPixel().toArray().map((filaPixel, fila) => {
                return <Fila key={fila}>
                    {filaPixel.map((pixel, i) => <Celda key={i} pixel={pixel} disabled={disabled} />)}
                </Fila>
            })
        }
    </div>
}