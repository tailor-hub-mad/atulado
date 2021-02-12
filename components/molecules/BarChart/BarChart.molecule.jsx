import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { SCBarChart, SCItemLegend } from "./BarChart.styled";
import { SCTextXSMedium, SCTextXSLight } from "../../atoms/Text/TextXS.styled";

const ItemLegend = ({ children, color, info, index }) => {
  return (
    <SCItemLegend color={color}>
      {children && (
        <div className="place-wrapper">
          <div className="wrapper-color" />
          <SCTextXSMedium color="black" uppercase>
            {children}
          </SCTextXSMedium>
        </div>
      )}

      <div className="info-wrapper">
        {index && <SCTextXSLight color="black">{info[index]}</SCTextXSLight>}
      </div>
    </SCItemLegend>
  );
};

export const BarChart = ({
  dataChart = [],
  dataInfo = [],
  keys,
  indexBy,
  action,
}) => {
  const [infoIndex, setInfoIndex] = useState(dataInfo);

  const handleOnClick = ({ indexValue }) => {
    action(indexValue);
  };

  const handleOnHover = ({ indexValue }) => {
    setInfoIndex(indexValue);
  };

  return (
    <SCBarChart>
      <div className="legend-wrapper">
        {dataInfo.map((element, index) => {
          return (
            <ItemLegend
              key={index}
              color={element?.color}
              info={element?.info}
              index={infoIndex}
            >
              {element?.place}
            </ItemLegend>
          );
        })}
      </div>
      <ResponsiveBar
        data={dataChart}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 15, right: -20, bottom: 55, left: -20 }}
        padding={0.9}
        colors={(element) => {
          return element.data[`${element.id}_color`];
        }}
        borderRadius={2}
        borderWidth={7}
        borderColor={{ from: "color", modifiers: [["opacity", "3"]] }}
        enableGridY={false}
        enableGridX={false}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 11,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -60,
        }}
        isInteractive={false}
        onClick={(data) => handleOnClick(data)}
        onMouseEnter={(data) => handleOnHover(data)}
        onMouseLeave={() => setInfoIndex()}
      />
    </SCBarChart>
  );
};
