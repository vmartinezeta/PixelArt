import Tablero from "./Tablero";

export default function VistaPrevia() {
    return <div className="preview">
        <h1 className="preview__title">Vista previa</h1>
        <div className="preview__scale">
            <Tablero escala="tablero__escala" disabled={true} />
        </div>
    </div>
}