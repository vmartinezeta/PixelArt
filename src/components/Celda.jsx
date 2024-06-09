import { usePixelArt } from "../context/PixelArtStore"


export default function Celda({ pixel, disabled }) {
    const { seleccionPixelArray, arrastre, actualizarPixel,  setArrastre } = usePixelArt()

    const onPintar = () => {
        actualizarPixel(pixel)
    }

    const onMarcando = evento => {
        if (!arrastre.actual && !arrastre.anterior) {
            arrastre.anterior = true
            setArrastre(arrastre)
            return
        }

        if (arrastre.actual && !arrastre.anterior) {
            const stringArray = seleccionPixelArray.map(p => p.toString())
            if (!stringArray.includes(pixel.toString())) {
                actualizarPixel(pixel)
            }
        }
    }

    const estado = ["tablero", "tablero__celda"]
    if (!disabled) {
        estado.pop()
    }

    return <div className={estado.join(" ")}
        onClick={!disabled?onPintar:undefined}
        onPointerEnter={!disabled?onMarcando:undefined}
        style={{
            "backgroundColor": !disabled || !pixel.getColor().isBase() ? pixel.getColor().getHexadecimal():undefined,
            "width": 20,
            "height": 20
        }}
    />
}