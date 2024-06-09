import './estilos/estilos.scss'
import Tablero from './components/Tablero'
import PaletaColor from './components/PaletaColor'
import ConfiguracionProyecto from './components/ConfiguracionProyecto'
import ReduceLienzo from './components/ReduceLienzo'
import VistaPrevia from './components/VistaPrevia'
import Footer from './components/Footer'
import Header from './components/Header'
import Columna from './components/Columna'
import VistaPreviaCapas from './components/VistaPreviaCapas'
import PixelArtProvider from './context/PixelArtStore'




function PixelArt() {
    return <PixelArtProvider>
        <div className="pixel-art">
            <Header />
            <div className="barra">
                <Columna className="barra__config">
                    <PaletaColor />
                    <ConfiguracionProyecto />
                </Columna>
                <VistaPreviaCapas />
            </div>
            <div className="main">
                <Columna className="main main__tablero">
                    <Tablero />
                </Columna>
                <Columna className="main__vista-previa">
                    <VistaPrevia />
                    <ReduceLienzo />
                </Columna>
            </div>
            <Footer />
        </div>
    </PixelArtProvider>
}

export default PixelArt