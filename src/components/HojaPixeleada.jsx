import { usePixelArt } from "../context/PixelArtStore"
import Celda from "./Celda"
import Fila from "./Fila"


export default function HojaPixeleada() {
    const { capa, arrastre, setArrastre } = usePixelArt()


    return <div className="tablero"
        style={{
            cursor:"pointer"
        }}
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
                    {filaPixel.map((pixel, i) => <Celda key={i} pixel={pixel} disabled={false} />)}
                </Fila>
            })
        }
    </div>
}