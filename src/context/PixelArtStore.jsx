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

const capturaCapa = new CapturaCapa(capaSelected.id)
let capturasXcapa = [capturaCapa]



const PixelArtProvider = ({ children }) => {
    const [color, setColor] = useState("#0817e2")
    const [capa, setCapa] = useState(capaSelected)
    const [seleccionPixelArray, setSeleccionPixelArray] = useState([])
    const [arrastre, setArrastre] = useState({anterior:true, actual:false})
    const [pilaCapa, setPilaCapa] = useState(grupo.toPilaCapa())



    const cambiarColor = color => {
        setColor(color)
    }

    const actualizarPixel = pixel => {
        capaSelected = capa.newInstance()
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
        grupo.setActiva(capa.id)    
        setPilaCapa(grupo.toPilaCapa())
        capaSelected = capa.newInstance()
        setCapa(capaSelected)
    }

    const deshacer = () => {
    }

    return <PixelArtContext.Provider
        value={{
            color,
            cambiarColor,
            actualizarPixel,
            seleccionPixelArray,
            arrastre,
            setArrastre,
            capa,
            redimensionarLienzo,
            activarCapa,
            borrarCapa,
            pilaCapa,
            agregarCapa
        }}
    >
        {children}
    </PixelArtContext.Provider>
}


export default PixelArtProvider