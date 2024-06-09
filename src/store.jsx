import { createContext, useContext, useReducer } from "react";
import { ClaseAccion } from "./classes/ClaseAccion";
import CuadriculaPixelFactory from "./classes/CuadriculaPixelFactory";
import ConstructorCapaArray from "./classes/ContructorCapaArray";
import PilaCapa from "./classes/PilaCapa";
import CapturaCapa from "./classes/CapturaCapa";





const stateInicial = {
    color: "#0008FF",
    arrastre: {
        actual: false,
        anterior: true
    },
    seleccionPixelArray: [],
    pilaCapa,
    capa,
    capturasXcapa
}


function reducer(state, action) {
    if (action.type === ClaseAccion.ACTUALIZAR_PIXEL) {

        return {
            ...state,
            seleccionPixelArray,
            capturasXcapa,
            capa
        }
    } else if (action.type === ClaseAccion.REDIMENSIONAR_LIENZO) {
        capa = capa.newInstance()
        const cuadricula = capa.cuadriculaPixel
        const diferencia = action.diferencia
        cuadricula.redimensionar(diferencia)
        capa.setCuadriculaPixel(cuadricula)
        return {
            ...state,
            capa
        }
    } else if (action.type === ClaseAccion.ESTA_PINTANDO) {
        const arrastre = action.arrastre
        let seleccionPixelArray = state.seleccionPixelArray.slice()
        if (!arrastre.actual && !arrastre.anterior) {
            seleccionPixelArray = []
        }
        return {
            ...state,
            seleccionPixelArray,
            arrastre: { ...arrastre }
        }
    } else if (action.type === ClaseAccion.NUEVA_CAPA) {
        const factory = new CuadriculaPixelFactory()
        const cuadricula = factory.crearCuadricula()
        constructor.agregar(cuadricula)
        pilaCapa = new PilaCapa(constructor.toCapaArray())
        const reciente = pilaCapa.getUltima().newInstance()
        const capturaCapa = new CapturaCapa(reciente.id)
        const capturas = state.capturasXcapa
        capturas.push(capturaCapa)
        return {
            ...state,
            capturasXcapa:capturas,
            pilaCapa
        }
    } else if (action.type === ClaseAccion.ELIMINAR_CAPA) {
        if (state.pilaCapa.isPrimero() || action.capa.isActiva()) {
            return state
        }

        constructor.eliminar(action.capa)
        pilaCapa = new PilaCapa(constructor.toCapaArray())
        return {
            ...state,
            pilaCapa
        }
    } else if (action.type === ClaseAccion.ACTIVAR_CAPA) {
        pilaCapa = pilaCapa.newInstance()
        pilaCapa.activar(action.capa)
        try {
            capa = pilaCapa.getActiva()
        } catch (e) {
            return state
        }

        return {
            ...state,
            pilaCapa,
            capa
        }
    } else if (action.type === ClaseAccion.DESHACER) {
        const capturaCapa = state.capturasXcapa.find(c => c.id === state.capa.id)
        try {            
            capturaCapa.quitarFinal()
        } catch (e) {
            return state
        }

        const pixel = capturaCapa.getActual()
        const color = pixel.getColor()
        color.reset()
        capa = capa.newInstance()
        const cuadricula = capa.cuadriculaPixel
        cuadricula.actualizarPixel(pixel)
        capa.setCuadriculaPixel(cuadricula)
        return {
            ...state,
            capa
        }
    }
    return state
}