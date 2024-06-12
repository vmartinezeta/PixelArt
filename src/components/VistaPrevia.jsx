import { useEffect, useState } from "react";
import Tablero from "./Tablero";
import { usePixelArt } from "../context/PixelArtStore";

export default function VistaPrevia() {
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const { capa, pilaCapa } = usePixelArt()
    const [cuadricula, setCuadricula] = useState(capa.cuadriculaPixel)

    useEffect(()=> {
        setCuadricula(capa.cuadriculaPixel)
    },[capa])

    useEffect(() => {
        if (!playing) return

        const total = () => {
            return pilaCapa.toArray().length - 1
        }

        const timer = setInterval(() => {
            const siguiente = index + 1
            if (siguiente > total()) {
                setIndex(0)
                return
            }
            setIndex(siguiente)
        }, 100)

        return () => {
            clearInterval(timer)
        }
    }, [index, playing])


    useEffect(() => {
        const array = pilaCapa.newInstance().toArray()
        setCuadricula(array[index].cuadriculaPixel.newInstance())
    }, [index])


    const onPlay = () => {
        setPlaying(true)
    }

    const onStop = () => {
        setPlaying(false)
        setIndex(0)
        setCuadricula(capa.cuadriculaPixel)
    }

    return <div className="preview">
        <h1 className="preview__title">Vista previa</h1>
        <div className="preview__scale">
            <Tablero cuadriculaPixel={cuadricula} disabled={true} />
            <div className="animacion">
                <button
                    onClick={onPlay}
                    className="animacion__play">Play</button>
                <button
                    onClick={onStop}
                    className="animacion__stop">Stop</button>
            </div>
        </div>
    </div>
}