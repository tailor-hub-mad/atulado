import React from 'react'
import { Logo } from '../../atoms/Logo/Logo.atom'
import { SCTextL } from '../../atoms/Text/TextL.styled'
import { SCTextM } from '../../atoms/Text/TextM.styled'
import { SCTextXL } from '../../atoms/Text/TextXL.styled'
import Footer from '../../Footer/Footer'
import { Navbar } from '../../molecules/Navbar/Navbar.molecule'
import SCPoliticaPrivacidad from './PoliticaPrivacidad.styled'

export default function PoliticaPrivacidadTemplate() {
  return (
    <SCPoliticaPrivacidad>
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
          <SCTextM>
            <a href="">Tarifas</a>
          </SCTextM>
          <SCTextM>
            <a href="">Contratar</a>
          </SCTextM>
          <SCTextM>
            <a href="">Área cliente</a>
          </SCTextM>
        </div>
      </nav>
      <div className="content">
        <div className="text">
          <SCTextXL as="h1">Política de privacidad</SCTextXL>
          <SCTextXL as="h2">Datos Personales</SCTextXL>
          <SCTextM color="black">Bienvenido/a a la Política de Privacidad de HIDROELÉCTRICA EL CARMEN ENERGÍA. En este documento encontrarás información de tu interés en relación a cómo HIDROELÉCTRICA EL CARMEN ENERGÍA trata tus datos personales y los derechos que te asisten en virtud del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD) y la Ley Orgánica 3/2018 de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) y la Ley 34/2002 de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSICE)</SCTextM>
        </div>
        <div className="text-item">
          <SCTextL as="h2">Identificación y datos de contacto del Responsable</SCTextL>
          <SCTextM color="black">HIDROELÉCTRICA EL CARMEN ENERGÍA, S.L. con NIF: B82773888 y domicilio social en calle Sirio Nº24, 9ºD, 28007, localidad Madrid, provincia Madrid e inscrita en el Registro Mercantil de Madrid, Tomo 15709, Folio 84, Sección 8, número M-264742.</SCTextM>
          <SCTextM color="black">Puede contactar con HIDROELÉCTRICA EL CARMEN ENERGÍA en la dirección postal indicada anteriormente, a través del formulario de contacto de su Sitio Web, en el Tel.: 900 264 267.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Información de los tratamientos realizados por HIDROELÉCTRICA EL CARMEN ENERGÍA</SCTextL>
          <SCTextM color="black">HIDROELÉCTRICA EL CARMEN ENERGÍA dispone de un Registro de Actividades de Tratamiento donde se detallan cada uno de los tratamientos realizados en su condición de responsable de tratamiento, entre ellos:</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">· Clientes persona física y potenciales clientes:</SCTextM> Las finalidades de los tratamientos son: la gestión de los servicios solicitados por los clientes y potenciales clientes, comunicaciones y cobro y el envío de publicidad y prospección comercial. La base jurídica que legitima el tratamiento de datos de clientes es la existencia de una relación contractual y el consentimiento y para el caso de los potenciales clientes, la base que legitima el tratamiento es la aplicación de medidas precontractuales a petición del interesado y el consentimiento.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">· Clientes persona jurídica y potenciales clientes(personas de contacto):</SCTextM> Gestión de los servicios solicitados por los clientes y potenciales clientes, comunicaciones y cobro y envío de publicidad y prospección comercial.La base jurídica que legitima el tratamiento es la relación contractual, el consentimiento y el interés legítimo del Responsable del Tratamiento.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">· Contactos proveedores:</SCTextM> Gestión administrativa, contable y de evaluación de proveedores.La base jurídica que legitima el tratamiento de los datos es la existencia de la relación contractual.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">· Videovigilancia:</SCTextM> Grabación mediante cámaras del perímetro de las instalaciones de las plantas fotovoltaicas.La base jurídica que legitima este tratamiento es el interés legítimo.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">· Contactos web:</SCTextM> Gestionar las dudas y consultas que lleguen a través del formulario web de contacto.La base jurídica que legitima el tratamiento de estos datos es su consentimiento.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Veracidad de los datos del usuario y carácter obligatorio de la información facilitada</SCTextL>
          <SCTextM color="black">El interesado garantiza la autenticidad de todos aquellos datos que comunique y mantendrá actualizada la información que facilite a HIDROELÉCTRICA EL CARMEN ENERGÍA de forma que responda, en todo momento, a su situación real, siendo el único responsable de las manifestaciones falsas o inexactas que realice y de los perjuicios que cause por ello a HIDROELÉCTRICA EL CARMEN ENERGÍA o a terceros.</SCTextM>
          <SCTextM color="black">Los campos señalados como obligatorios en el formulario de contacto de la página web a cumplimentar por el interesado, así como cualquier otro formulario que tuviera que rellenar el interesado, son estrictamente necesarios para atender a su petición.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Destinatarios</SCTextL>
          <SCTextM color="black">Podemos compartir tus datos con empresas del grupo, terceros proveedores de servicios que tratan datos en nombre de HIDROELÉCTRICA EL CARMEN ENERGÍA con los que hemos establecido las condiciones y requisitos para utilizar los datos personales en un contrato y con las Administraciones Públicas para cumplir con obligaciones legales que afectan a determinados tratamientos.</SCTextM>
          <SCTextM color="black">Fuera de esos supuestos, no compartiremos datos con terceros salvo obligación legal.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Derechos del interesado</SCTextL>
          <SCTextM color="black"><SCTextM color="primary" as="span">a. </SCTextM>Derecho de acceso a tus datos personales para saber cuáles están siendo objeto de tratamiento y las operaciones de tratamiento llevadas a cabo con ellos.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">b. </SCTextM>Derecho de rectificación de cualquier dato personal inexacto</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">c. </SCTextM>Derecho de supresión de tus datos personales, cuando esto sea posible</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">d. </SCTextM>Derecho de oposición al tratamiento de tus datos personales.La materialización del derecho de oposición conlleva la supresión de tus datos salvo que HIDROELÉCTRICA EL CARMEN ENERGÍA tenga un interés legítimo imperioso o para la formulación, el ejercicio o la defensa de reclamaciones.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">e. </SCTextM>Derecho a solicitar la limitación del tratamiento de tus datos personales cuando la exactitud, la legalidad o la necesidad del tratamiento de los datos resulte dudosa, en cuyo caso, podremos conservar los datos para el ejercicio o la defensa de reclamaciones.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">f. </SCTextM>Derecho a la portabilidad de tus datos, siempre y cuando la base legal que nos habilite para su tratamiento sea la existencia de una relación contractual o tu consentimiento.</SCTextM>
          <SCTextM color="black"><SCTextM color="primary" as="span">g. </SCTextM>Derecho a revocar el consentimiento otorgado a HIDROELÉCTRICA EL CARMEN ENERGÍA.</SCTextM>
          <SCTextM color="black">En cualquier momento el interesado puede ejercer sus derechos mediante correo electrónico a contacto@geoatlanter.com aportando una copia de su D.N.I.</SCTextM>
          <SCTextM color="black">Adicionalmente, puedes dirigirte a la Agencia Española de Protección de Datos www.agpd.es si no estás de acuerdo con la atención recibida respecto a tus derechos.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Seguridad</SCTextL>
          <SCTextM color="black">HIDROELÉCTRICA EL CARMEN ENERGÍA como parte y compromiso en la seguridad y confidencialidad de la información, ha adoptado las medidas técnicas, jurídicas y organizativas necesarias para evitar la destrucción accidental o ilícita o su pérdida accidental, la alteración, divulgación o acceso no autorizados de los datos personales.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Conservación de los datos</SCTextL>
          <SCTextM color="black">Los datos personales que puedas proporcionarnos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y, en los casos en que hubiera otras posibles responsabilidades, se conservarán el tiempo estrictamente necesario según la base que legitima esos tratamientos y en cualquier caso durante el tiempo estrictamente necesario para cumplir con las leyes aplicables.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Transferencias internacionales</SCTextL>
          <SCTextM color="black">No tenemos previsto realizar transferencias internacionales de tus datos personales.</SCTextM>
        </div>

        <div className="text-item">
          <SCTextL as="h2">Modificación de la presente Política de Privacidad</SCTextL>
          <SCTextM color="black">Es posible que esta Política de Privacidad deba ser actualizada; por ello es conveniente que la revises periódicamente, y si es posible cada vez que accedas al Sitio Web con el objetivo de estar adecuadamente informado sobre el tipo de información recopilada y su tratamiento. No obstante, lo anterior, te comunicaremos cualquier modificación de la presente Política de Privacidad que afecte concretamente al tratamiento de tus datos personales.</SCTextM>
        </div>

      </div>
      <Footer className="wrapper" />
    </SCPoliticaPrivacidad>
  )
}