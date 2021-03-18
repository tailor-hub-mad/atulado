import Link from 'next/link'
import React from 'react'
import { Parallax } from 'react-scroll-parallax';
import { info } from '../../../utils/info'
import { ChooseButton } from '../../atoms/ChooseButton/ChooseButton.atom'
import InfoItem from '../../atoms/InfoItem/InfoItem.atom'
import { Logo } from '../../atoms/Logo/Logo.atom'
import { SCTextM } from '../../atoms/Text/TextM.styled'
import { SCTextSLight, SCTextSMedium } from '../../atoms/Text/TextS.styled'
import { SCTextXL } from '../../atoms/Text/TextXL.styled'
import { SCTextXSLight } from '../../atoms/Text/TextXS.styled'
import Arrow from '../../icons/Arrow'
import Bulb from '../../icons/Bulb'
import DoubleBulb from '../../icons/DoubleBulb'
import { Navbar } from '../../molecules/Navbar/Navbar.molecule'
import SCHome from './Home.styled'
import uniqid from "uniqid";
import { SCTextL } from '../../atoms/Text/TextL.styled'
import Footer from '../../Footer/Footer'
import { useRouter } from 'next/router'

export default function HomeTemplate() {
  const router = useRouter();
  const displayInfo = () => {
    return info.map((item) => {
      return (
        <InfoItem key={uniqid()} {...item} />
      )
    })
  }
  return (
    <SCHome>
      <div className="home-wrapper">
        <div className="nav-mobile-wrapper">
          <Navbar
            color="#009845"
            optionList={[
              { option: "Tarifas", link: "/tarifas", visible: true },
              { option: "Contratar", link: "/alta", visible: true },
              { option: "Área cliente", link: "/global", visible: true },
            ]}
          />
        </div>

        <nav className="nav-desktop-wrapper">
          <Logo height="15%" width="15%" type="text" />
          <div className="options-wrapper">
            <Link href="/tarifas">
              <a>
                <SCTextM>
                  Tarifas
            </SCTextM>
              </a>
            </Link>
            <Link href="/tarifas">
              <a>
                <SCTextM>
                  Contratar
            </SCTextM>
              </a>
            </Link>
            <Link href="/global">
              <a>
                <SCTextM>
                  Área cliente
            </SCTextM>
              </a>
            </Link>
          </div>
        </nav>
        <div className="home-first-section wrapper">
          <div className="left-section">
            <SCTextXL as="h1">El  mejor precio para tu hogar o empresa</SCTextXL>
            <SCTextXL as="h2">Participa en la nueva energía que ya está cambiando el mundo</SCTextXL>
            <SCTextSMedium>VER TARIFAS</SCTextSMedium>
            <div className="select-buttons">
              <ChooseButton
                icon={<Bulb color={"#009845"} />}
                action={() => router.push("/tarifas")}
              >
                <SCTextM>MENOR O IGUAL A 15KW</SCTextM>
                <SCTextXSLight>
                  Típica para hogares y pequeños negocios
            </SCTextXSLight>
              </ChooseButton>
              <ChooseButton
                icon={<DoubleBulb color={"#009845"} />}
                action={() => router.push("/tarifas")}
              >
                <SCTextM>MÁS DE 15KW</SCTextM>
                <SCTextXSLight>
                  Medianas y grandes empresas o comunidades
            </SCTextXSLight>
              </ChooseButton>
            </div>
          </div>
          <div className="right-section">
            <div className="images-1">
              <Parallax className="custom-class" y={[-90, 30]}>
                <img src="/image/grid-1.jpg" alt="grid-image" />
                <img src="/image/grid-2.jpg" alt="grid-image" />
                <img src="/image/grid-3.jpg" alt="grid-image" />
              </Parallax>
            </div>
            <div className="images-2">
              <Parallax className="custom-class" y={[0, -60]}>
                <img src="/image/grid-4.jpg" alt="grid-image" />
                <img src="/image/grid-5.jpg" alt="grid-image" />
                <img src="/image/grid-6.jpg" alt="grid-image" />
              </Parallax>
            </div>
          </div>
        </div>

        <div className="home-second-section wrapper">
          <SCTextXL as="h3">NUESTA TARIFA MILENIAL NO TIENE RIVAL</SCTextXL>
          <SCTextM>Accede al comparador oficial de la CNMC  y comprueba que nuestra tarifa MILENIAL no tiene rival en el mercado.</SCTextM>
          <SCTextM>Tu luz al mejor precio sin permanencia ni engaños. Con la tranquilidad de que siempre pagarás el mejor precio del mercado.</SCTextM>
          <div className="link-container center-text">
            <Link
              href="/tarifas"
            >
              <a>
                <SCTextM>COMPARADOR OFICIAL</SCTextM>
                <Arrow />
              </a>
            </Link>
          </div>
        </div>

        <div className="home-third-section">
          <div className="left-section">
            <img src="/image/home-info-img.jpg" alt="home-info" />
          </div>
          <div className="right-section wrapper">
            {displayInfo()}
          </div>
        </div>

        <div className="home-fourth-section wrapper">
          <div className="logo-wrapper">
            <Logo type="logo" className="logo" />
          </div>
          <div className="section-titles">
            <SCTextL>Hidroeléctrica El Carmen Energía</SCTextL>
            <SCTextXL>Cien años a tu lado</SCTextXL>
          </div>
          <SCTextM>Más de un siglo resistiendo a los oligopolios energéticos, poniendo por bandera la confianza mutua que nos permite ofrecer el mejor servicio a un precio competitivo.</SCTextM>
          <SCTextM>Nuestros clientes se olvidan de revisar periódicamente sus facturas porque saben que nosotros trabajamos permanentemente para abaratárselas.</SCTextM>
        </div>

        <div className="images-section">
          <img src="/image/home-images-1.jpg" alt="home-images" />
          <img src="/image/home-images-2.jpg" alt="home-images" />
          <img src="/image/home-images-3.jpg" alt="home-images" />
        </div>

        <Footer className="wrapper" />
      </div>
    </SCHome>
  )
}
