import Link from 'next/link'
import React from 'react'
import { SCTextM } from '../atoms/Text/TextM.styled'
import { SCTextSLight } from '../atoms/Text/TextS.styled'
import FooterLogo from '../icons/FooterLogo'
import SCFooter from './Footer.styled'

export default function Footer() {
  return (
    <SCFooter>
      <div className="logo-wrapper">
        <FooterLogo />
      </div>
      <div className="links-container">
        <a href="tel:900 264 267">
          <SCTextM>900 264 267</SCTextM>
        </a>
        <Link href="/login-cliente">
          <a>
            <SCTextM>Área cliente</SCTextM>
          </a>
        </Link>
        <Link href="/tarifas">
          <a>
            <SCTextM>Tarifas</SCTextM>
          </a>
        </Link>
      </div>
      <div className="legal">
        <SCTextSLight>© 2020 Atulado - Hidroeléctrica El Carmen Energía</SCTextSLight>
        <div className="legal-links">
          <Link href="/aviso-legal">
            <a>
              <SCTextSLight>Aviso Legal |  </SCTextSLight>
            </a>
          </Link>
          <Link href="/politica-privacidad">
            <a>
              <SCTextSLight className="special">{" "} Política de privacidad</SCTextSLight>
            </a>
          </Link>
        </div>
      </div>
    </SCFooter>
  )
}
