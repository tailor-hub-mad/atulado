import { useState } from "react";
import { rates } from "../../../utils/rates";
import { ChooseButton } from "../../atoms/ChooseButton/ChooseButton.atom";
import { SCTextM } from "../../atoms/Text/TextM.styled";
import { SCTextXL } from "../../atoms/Text/TextXL.styled";
import { SCTextXSLight } from "../../atoms/Text/TextXS.styled";
import Bulb from "../../icons/Bulb";
import DoubleBulb from "../../icons/DoubleBulb";
import { Navbar } from "../../molecules/Navbar/Navbar.molecule";
import RateCard from "../../molecules/RateCard/RateCard.molecule";
import { SCRates } from "./Rates.styled";
import uniqid from "uniqid";
import { useRouter } from "next/router";

export default function RatesTemplate() {
  const router = useRouter();
  const {
    index
  } = router?.query;

  const [tab, setTab] = useState(index ? +index : 1);

  const displayRates = () => {
    return rates[`state${tab}`]?.map((rate) => {
      return <RateCard {...rate} key={uniqid()} />;
    });
  };

  return (
    <SCRates tab={tab}>
      <Navbar
        optionList={[
          { option: "Home", link: "/global" },
          { option: "Contratos", link: "/" },
          { option: "Facturas", link: "/" },
          { option: "Mis datos", link: "/" },
        ]}
        action={(link) => router.push(link)}
        withoutMenu
      />
      <div className="title">
        <SCTextXL>Los mejores precios sin permanencia</SCTextXL>
      </div>

      <div className="rates-wrapper">
        <div className="select-buttons">
          <ChooseButton
            active={tab === 1}
            icon={<Bulb color={tab === 1 ? "white" : "#009845"} />}
            action={() => setTab(1)}
          >
            <SCTextM>MENOR O IGUAL A 15KW</SCTextM>
            <SCTextXSLight>
              Típica para hogares y pequeños negocios
            </SCTextXSLight>
          </ChooseButton>
          <ChooseButton
            active={tab === 2}
            icon={<DoubleBulb color={tab === 2 ? "white" : "#009845"} />}
            action={() => setTab(2)}
          >
            <SCTextM>MÁS DE 15KW</SCTextM>
            <SCTextXSLight>
              Medianas y grandes empresas o comunidades
            </SCTextXSLight>
          </ChooseButton>
        </div>
        <div className="rates-grid">{displayRates()}</div>
      </div>
    </SCRates>
  );
}
