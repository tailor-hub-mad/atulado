import Link from 'next/link'
import React from 'react'
import { Logo } from '../../atoms/Logo/Logo.atom'
import { SCTextL } from '../../atoms/Text/TextL.styled'
import { SCTextM } from '../../atoms/Text/TextM.styled'
import Footer from '../../Footer/Footer'
import { Navbar } from '../../molecules/Navbar/Navbar.molecule'
import SCAvisoLegal from './AvisoLegal.styled'

export default function AvisoLegalTemplate() {
  return (
    <SCAvisoLegal>
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
      <div className="content">
        <div className="text">
          <SCTextL as="h2">INFORMACIÓN CORPORATIVA</SCTextL>
          <SCTextM color="black">En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de información y de comercio electrónico, por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL le informa que es titular del sitio web: www.atuladoenergia.com de acuerdo con la exigencia del artículo 10 de la mencionada Ley, por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL , notifica los siguientes datos: el titular de esta página web es por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL con CIF:B82773888 y domicilio social: CALLE SIRIO Nº24, Código Postal: 28007, Localidad MADRID, Provincia: MADRID. La dirección de correo electrónico de contacto con la empresa es:  clientes@atuladoenergia.com</SCTextM>
        </div>
        <div className="">
          <SCTextL as="h2">USUARIO Y RÉGIMEN DE RESPONSABILIDADES</SCTextL>
          <SCTextM color="black">La navegación por, acceso y uso de los sitios web de por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL otorga la condición de usuario, por la que se aceptan, al navegar por la página de por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL, todas las condiciones de uso que se establecen aquí sin perjudicar la aplicación de la correspondiente normativa de obligado cumplimiento legal según el caso. La página web de HIDROELÉCTRICA EL CARMEN ENERGÍA, SL proporciona gran diversidad de información, servicios y datos. El usuario asume su responsabilidad en el uso correcto de los sitios web. Esta responsabilidad se extenderá a: la veracidad y licitud de las informaciones aportadas por el usuario en los formularios emitidos por por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL para acceder a determinados contenidos o servicios ofrecidos por la web. El uso de la información, servicios y datos ofrecidos por por HIDROELÉCTRICA EL CARMEN ENERGÍA, SL contra las disposiciones de estas condiciones, la Ley, la moral, las buenas costumbres o el orden público o que, en otro caso, puedan suponer lesión de los derechos de terceros o del funcionamiento de los sitios web. A tal efecto, el Usuario se abstendrá de utilizar cualquier de los contenidos con fines o efectos ilícitos, prohibidos en este texto, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los contenidos, otros Usuarios o de cualquier usuario de Internet (hardware y software). Los usuarios responderán de los daños y perjuicios de toda naturaleza que la empresa propietaria de la web pueda sufrir, directa o indirectamente, como consecuencia de incumplimiento de cualquier de las obligaciones derivadas del uso de la web, y de esta política de privacidad. En particular, y a título meramente indicativo y no exhaustivo, el Usuario se compromete a no transmitir, difundir o poner a disposición de terceros informaciones, datos, contenidos, mensajes, gráficos, dibujos, archivos de sonido y/o imagen, fotografías de la web.</SCTextM>
        </div>
      </div>
      <Footer className="wrapper" />
    </SCAvisoLegal>
  )
}
