import { useEffect, useState } from "react"
import { usePixelArt } from "../context/PixelArtStore"

export default function DescargaImage() {
  const { capa } = usePixelArt()
  const [url, setUrl] = useState(null)
  const canvas = document.createElement("canvas")
  canvas.width = capa.getCuadriculaPixel().getArea().getY() * 40
  canvas.height = capa.getCuadriculaPixel().getArea().getX() * 40


  useEffect(() => {
    generateImageUrl()
  }, [capa])


  const generateImageUrl = () => {
    borrarLienzo()

    capa.getCuadriculaPixel().toArray()
      .flatMap(pixel => pixel).forEach(pintarPixel)

    canvas.toBlob(blob => {
      const dataUrl = URL.createObjectURL(blob)
      setUrl(new URL(dataUrl))
    })

  }

  const borrarLienzo = () => {
    const area = capa.getCuadriculaPixel().getArea()
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, area.getY() * 40, area.getX() * 40)
  }

  const pintarPixel = pixel => {
    const context = canvas.getContext('2d')
    const area = pixel.getArea()
    const imageData = context.createImageData(area.getY(), area.getX())
    const color = pixel.getColor()
    const [r, g, b] = color.toRgb()
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = r
      imageData.data[i + 1] = g
      imageData.data[i + 2] = b
      imageData.data[i + 3] = 255
    }
    const ubicacion = pixel.getUbicacion()
    const punto = ubicacion.getPuntoConcreto()
    const { x, y } = punto
    context.putImageData(imageData, y, x)
  }


  return <a className="boton-link"
    onClick={generateImageUrl}
    href={url ? url.href : undefined}
    download="spritesheet.png"
  >Descargar</a>
}