import { usePixelArt } from "../context/PixelArtStore"

export default function Header() {
    // const {color} = usePixelArt()
    // console.log(color)
    
    return <div className="header">
        <figure className="header__figure">
            <h1 className="header__titulo">Pixel Art</h1>
        </figure>
    </div>
}