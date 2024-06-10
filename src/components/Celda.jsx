import { usePixelArt } from "../context/PixelArtStore"


export default function Celda({ pixel, disabled }) {
    const { arrastre, actualizarPixel, setArrastre } = usePixelArt()
    const estado = ["tablero", "tablero__celda"]
    const color = pixel.getColor()


    const onPintar = () => {
        actualizarPixel(pixel)
    }

    const onMarcando = evento => {
        evento.stopPropagation()
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

    if (!disabled) {
        estado.pop()
    }


    return <div className={estado.join(" ")}
        onClick={!disabled ? onPintar : undefined}
        // onPointerEnter={!disabled ? onMarcando : undefined}
        style={{
            "backgroundColor": !disabled || !color.isBase() ? color.getHexadecimal() : undefined,
            "width": 20,
            "height": 20
        }}
    />
}