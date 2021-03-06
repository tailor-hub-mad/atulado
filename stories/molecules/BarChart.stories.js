import React from "react";
import { BarChart } from "../../components/molecules/BarChart/BarChart.molecule";

export default {
  title: "Molecules/BarChart",
};

export const Deafult = () => (
  <BarChart
    indexBy="month"
    keys={["data_1", "data_2", "data_3"]}
    action={(e) => console.log(e)}
    dataInfo={[
      {
        place: "C/ Toledo",
        info: {
          Ene: "103KW– 38€",
          Feb: "103KW– 38€",
          Mar: "103KW– 38€",
          Abr: "103KW– 38€",
          May: "103KW– 38€",
          Jun: "103KW– 38€",
          Jul: "103KW– 38€",
          Ago: "103KW– 38€",
          Sep: "103KW– 38€",
          Oct: "103KW– 38€",
          Nov: "103KW– 38€",
          Dic: "103KW– 38€",
        },
        color: "#FBB040",
      },
      {
        place: "C/ Viergen del AMPA",
        info: {
          Ene: "155KW– 68€",
          Feb: "155KW– 68€",
          Mar: "155KW– 68€",
          Abr: "155KW– 68€",
          May: "155KW– 68€",
          Jun: "155KW– 68€",
          Jul: "155KW– 68€",
          Ago: "155KW– 68€",
          Sep: "155KW– 68€",
          Oct: "155KW– 68€",
          Nov: "155KW– 68€",
          Dic: "155KW– 68€",
        },
        color: "#39B54A",
      },
      {
        place: "C/ Rodrigo Lamentos",
        info: {
          Ene: "123KW– 18€",
          Feb: "123KW– 18€",
          Mar: "123KW– 18€",
          Abr: "123KW– 18€",
          May: "123KW– 18€",
          Jun: "123KW– 18€",
          Jul: "123KW– 18€",
          Ago: "123KW– 18€",
          Sep: "123KW– 18€",
          Oct: "123KW– 18€",
          Nov: "123KW– 18€",
          Dic: "123KW– 18€",
        },
        color: "#0A75D0",
      },
    ]}
    dataChart={[
      {
        month: "Ene",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Feb",
        data_1: 300,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 100,
        data_3_color: "#0A75D0",
      },
      {
        month: "Mar",
        data_1: 300,
        data_1_color: "#FBB040",
        data_2: 50,
        data_2_color: "#39B54A",
        data_3: 100,
        data_3_color: "#0A75D0",
      },
      {
        month: "Abr",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 500,
        data_3_color: "#0A75D0",
      },
      {
        month: "May",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Jun",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Jul",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 400,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Ago",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Sep",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Oct",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Nov",
        data_1: 400,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 300,
        data_3_color: "#0A75D0",
      },
      {
        month: "Dic",
        data_1: 100,
        data_1_color: "#FBB040",
        data_2: 200,
        data_2_color: "#39B54A",
        data_3: 100,
        data_3_color: "#0A75D0",
      },
    ]}
  ></BarChart>
);
