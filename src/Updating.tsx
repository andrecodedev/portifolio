import React from 'react'
import './Updating.css'

export default function Updating() {
  return (
    <div className="updating-container">
      <h1>🚧 Portfólio em Atualização 🚧</h1>
      <p>Estou reconstruindo meu portfólio com novas tecnologias:</p>
      <ul>
        <li><s>HTML</s> → React</li>
        <li><s>CSS</s> → TailwindCSS</li>
        <li><s>JavaScript</s> → TypeScript</li>
        <li><s>Bootstrap</s> → Vite + componentes personalizados</li>
      </ul>
      <p>Volte em breve para ver o novo visual! 😄</p>
    </div>
  )
}
