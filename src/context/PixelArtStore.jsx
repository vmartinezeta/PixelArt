import { createContext, useContext, useState } from "react"
import CuadriculaPixelFactory from "../classes/CuadriculaPixelFactory"
import CapturaCapa from "../classes/CapturaCapa"
import GrupoCapa from "../classes/GrupoCapa"


const PixelArtContext = createContext()

export const usePixelArt = () => {
    const context = useContext(PixelArtContext)
    if (!context) {
        throw new TypeError()
    }
    return context
}


const factory = new CuadriculaPixelFactory()
const cuadriculaPixel = factory.crearCuadricula()

const grupo = new GrupoCapa()
grupo.crearCapa(cuadriculaPixel, true)

let capaSelected = null
try {
    capaSelected = grupo.getActiva()
} catch (error) {}

let capturaCapa = new CapturaCapa(capaSelected)
const capturasCapa = [capturaCapa]


const PixelArtProvider = ({ children }) => {
    const [color, setColor] = useState("#0817e2")
    const [capa, setCapa] = useState(capaSelected)
    const [arrastre, setArrastre] = useState({anterior:true, actual:false})
    const [pilaCapa, setPilaCapa] = useState(grupo.toPilaCapa())



    const cambiarColor = color => {
        setColor(color)
    }

    const actualizarPixel = pixel => {
        capaSelected = capa.newInstance()
        capturaCapa.agregar(pixel)
        const actual = pixel.getColor()
        actual.setHexadecimal(color)
        pixel.setColor(actual)
        const cuadricula = capaSelected.cuadriculaPixel
        cuadricula.actualizarPixel(pixel)
        setCapa(capaSelected)
    }

    const redimensionarLienzo = diferencia => {  
        capaSelected = capaSelected.newInstance()
        const cuadricula = capaSelected.cuadriculaPixel
        cuadricula.redimensionar(diferencia)
        capaSelected.setCuadriculaPixel(cuadricula)
        setCapa(capaSelected)
    }

    const agregarCapa = () => {
        const factory = new CuadriculaPixelFactory()
        const cuadricula = factory.crearCuadricula()
        grupo.crearCapa(cuadricula)
        setPilaCapa(grupo.toPilaCapa())
    }

    const borrarCapa = id => {        
        grupo.eliminar(id)
        setPilaCapa(grupo.toPilaCapa())
    }

    const activarCapa = capa => {
        if (capa.isActiva()) return
        grupo.setActiva(capa.id)    
        setPilaCapa(grupo.toPilaCapa())
        capaSelected = capa.newInstance()
        setCapa(capaSelected)
    }

    const deshacer = () => {
        const capturaCapa = capturasCapa.find(captura => captura.capa.id === capaSelected.id)
        try {
            capturaCapa.quitarFinal()
        } catch (e) {
            return
        }

        const pixel = capturaCapa.getActual()
        const color = pixel.getColor()
        color.reset()
        capaSelected = capa.newInstance()
        const cuadricula = capaSelected.cuadriculaPixel
        cuadricula.actualizarPixel(pixel)
        setCapa(capaSelected)
    }

    const excluirPixelSeleccionados = () => {
        capturaCapa.excluirSeleccionados()
        capaSelected = capa.newInstance()
        setCapa(capaSelected)
    }


    return <PixelArtContext.Provider
        value={{
            color,
            cambiarColor,
            actualizarPixel,
            arrastre,
            setArrastre,
            capa,
            redimensionarLienzo,
            activarCapa,
            borrarCapa,
            pilaCapa,
            agregarCapa,
            deshacer,
            excluirPixelSeleccionados
        }}
    >
        {children}
    </PixelArtContext.Provider>
}


export default PixelArtProvider