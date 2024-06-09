
import DescargaImage from './Descarga'

export default function ConfiguracionProyecto() {

    return <div className="barra__config">
        <button 
        className="boton boton__principal">Deshacer ctrl + z</button>
        <button  className="boton boton__principal">Invertir selección</button>
        <DescargaImage />
    </div>
}