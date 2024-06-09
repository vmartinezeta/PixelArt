import { usePixelArt } from "../context/PixelArtStore"


export default function VentanaCapa({ capa }) {
    const { activarCapa, borrarCapa } = usePixelArt()

    const onBorrar = () => {
        borrarCapa(capa.id)
    }

    const onActivar = () => {
        activarCapa(capa)
    }

    const estado = ["ventana-capa", " ventana-capa--active"]
    if (!capa.isActiva()) {
        estado.pop()
    }

    return <div className="ventana-capa">
        <div className={estado.join(" ")}
        onClick={onActivar}
    ></div>
    <span className="borrar-capa"
        onClick={onBorrar}
        >X</span>
    </div>
}