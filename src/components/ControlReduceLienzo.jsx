import { useEffect, useState } from "react"
import DeltaY from "../classes/DeltaY"
import DeltaX from "../classes/DeltaX"
import Punto from "../classes/Punto"
import { usePixelArt } from "../context/PixelArtStore"



export default function ControlReduceLienzo() {
    const { capa, redimensionarLienzo } = usePixelArt()
    const [area, setArea] = useState(new Punto(0, 0))

    useEffect(() => {
        setArea(capa.cuadriculaPixel.getArea())
    }, [capa])


    const onUpX = () => {
        if (area.getY() >= 30) {
            return
        }
        redimensionarLienzo({
            filas: area.getX(),
            delta: new DeltaY(area.getY(), area.getY() + 1)
        })
        area.setY(area.getY() + 1)
        setArea(area.newInstance())
    }

    const onDownX = () => {
        if (area.getY() <= 20) {
            return
        }
        redimensionarLienzo({
            filas: area.getX(),
            delta: new DeltaY(area.getY(), area.getY() - 1)
        })
        area.setY(area.getY() - 1)
        setArea(area.newInstance())
    }

    const onDownY = () => {
        if (area.getX() <= 20) {
            return
        }
        redimensionarLienzo({
            columnas: area.getY(),
            delta: new DeltaX(area.getX(), area.getX() - 1)
        })
        area.setX(area.getX() - 1)
        setArea(area.newInstance())
    }

    const onUpY = () => {
        if (area.getX() >= 30) {
            return
        }
        redimensionarLienzo({
            columnas: area.getY(),
            delta: new DeltaX(area.getX(), area.getX() + 1)
        })
        area.setX(area.getX() + 1)
        setArea(area.newInstance())
    }


    return <div className="control">
        <div className="control-columna">
            <h1 className="control-columna control-columna__h1">{area.getX()}</h1>
            <div className="boton-columna">
                <button className="boton-columna boton-columna__button" onClick={onUpY}>+</button>
                <button className="boton-columna boton-columna__button " onClick={onDownY}>-</button>
            </div>
        </div>
        <div className="control-columna">
            <h1 className="control-columna control-columna__h1">{area.getY()}</h1>
            <div className="boton-columna">
                <button className="boton-columna boton-columna__button" onClick={onUpX}>+</button>
                <button className="boton-columna boton-columna__button" onClick={onDownX}>-</button>
            </div>
        </div>
    </div>
}