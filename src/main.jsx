import React from 'react'
import ReactDOM from 'react-dom/client'
import PixelArt from './PixelArt'



document.title = "Pixel art"
const app = document.createElement("div")
document.body.appendChild(app)


ReactDOM.createRoot(app).render(<PixelArt />)