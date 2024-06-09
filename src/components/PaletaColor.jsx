import { usePixelArt } from "../context/PixelArtStore"


export default function PaletaColor() {
    const { color, cambiarColor } = usePixelArt()

    const  onCambiarColor = evento => {
        const color = evento.target.value
        cambiarColor(color)
    }

    return <div className="paleta-color">
        <label className="paleta-color__label" htmlFor="color">Color actual</label>
        <input className="paleta-color__input" id="color" type="color" value={color}
            onChange={onCambiarColor} />
    </div>
}