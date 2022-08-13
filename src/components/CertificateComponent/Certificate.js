import React from 'react'
import './Certificate.css'
import { Card } from '../CardComponent/Card'

export const Certificate = () => {
  return (
    <section className="certificate-section">
        <div className="certificate-container">
            <h1>Certificates</h1>
            <Card text="CompName" img_url="https://www.w3schools.com/w3css/img_lights.jpg" />
        </div>
    </section>
  )
}