
import { usePixelArt } from '../context/PixelArtStore'
import DescargaImage from './Descarga'

export default function Toolkit() {

    const { deshacer, excluirPixelSeleccionados} = usePixelArt()

    const onInvertirSeleccion = () => {
        excluirPixelSeleccionados()
    }


    return <div className="barra__config">
        <button
            onClick={deshacer}
            className="boton boton__principal">Deshacer ctrl + z</button>
        <button
            onClick={onInvertirSeleccion}
            className="boton boton__principal">Invertir selección</button>
        <DescargaImage />
    </div>
}