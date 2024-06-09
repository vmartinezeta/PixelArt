import { usePixelArt } from "../context/PixelArtStore"
import VentanaCapa from "./VentanaCapa"

export default function VistaPreviaCapas() {
    const { pilaCapa, agregarCapa } = usePixelArt()

    const onAgregar = () => {
        agregarCapa()
    }

    return <div className="capas">
        {pilaCapa.toArray().map((capa, i) => {
            return <VentanaCapa capa={capa} key={i} />
        })}
        {!pilaCapa.isCompletado() && <button onClick={onAgregar}
            className="boton-agregar">+</button>}
    </div>
}