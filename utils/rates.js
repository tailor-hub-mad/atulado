import Car from "../components/icons/Car";
import Moon from "../components/icons/Moon";
import Tension from "../components/icons/Tension";

export const rates = {
  state1: [
    {
      name: "Tarifa milenial",
      icon: <Tension />,
      description:
        "Con nuestra tarifa milenial tienes el mejor precio fijo en un único periodo. Disfruta de las ventajas de la tarifa nocturna, pero sin cambiar tus hábitos nocturnos.",
      rates: [
        {
          name: "Milenial",
          data: ["Tarifa 1 periodo", "hasta 10kW"],
          info: {
            "Precio potencia": "0,1042286 €/kW día",
            "Precio energía": "0,109751 €/kWh",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=6",
          },
        },
        {
          name: "Milenial +10",
          data: ["Tarifa 1 periodo", "de 10kW hasta 15kW"],
          info: {
            "Precio potencia": "0,1217663  €/kW día",
            "Precio energía": "0,136935946 €/kWh",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=5",
          },
        },
      ],
    },
    {
      name: "Tarifa nocturna",
      icon: <Moon />,
      description:
        "Un precio muy bajo para la energía que consumes en horario valle (14 horas) y un precio más elevado para la energía que consumes en horario punta (10 horas). La tarifa de luz perfecta para quienes pueden realizar la mayor parte del consumo de electricidad en las horas valle.",
      // hours: [
      //   {
      //     name: "Invierno",
      //     values: ["Punta: de 13h a 23h", "Valle: de 23h a 13h"],
      //   },
      //   {
      //     name: "Verano",
      //     values: ["Punta: de 12h a 22h", "Valle: de 22h a 12h"],
      //   },
      // ],
      rates: [
        {
          name: "Nocturna",
          data: ["Tarifa 2 periodos", "hasta 10kW"],
          info: {
            "Consumo en Punta": "0,145837 €/kWh",
            "Consumo en Valle": "0,073664 €/kWh",
            Potencia: "0,1042286 €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=3",
          },
        },
        {
          name: "Nocturna +10",
          data: ["Tarifa 2 periodos", "de 10kW hasta 15kW"],
          info: {
            "Consumo en Punta": "0,156648088 €/kWh",
            "Consumo en Valle": "0,082869209 €/kWh",
            Potencia: "0,1217663 €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=4",
          },
        },
      ],
    },
    {
      name: "Vehículo Eléctrico",
      icon: <Car />,
      description:
        "La tarifa de luz recomendada para quienes pueden realizar una mayor porcentaje de su consumo en horario llano y valle (ej. familias que pasan la mayor parte del día fuera de casa, usuarios que cargan su vehículo eléctrico por las noches, ...)",
      // hours: [
      //   {
      //     name: "Invierno",
      //     values: [
      //       "Punta: de 13h a 23h",
      //       "Llano: de 23h a 13h",
      //       "Valle: de 1 a 7h",
      //     ],
      //   },
      //   {
      //     name: "Verano",
      //     values: [
      //       "Punta: de 12h a 22h",
      //       "Llano: de 22h a 12h",
      //       "Super Valle: de 1 a 7h",
      //     ],
      //   },
      // ],
      rates: [
        {
          name: "Vehículo eléctrico",
          data: ["Tarifa 3 periodos", "hasta 10kW"],
          info: {
            "Consumo en Punta": "0.146488 €/kWh",
            "Consumo en Valle": "0.080934 €/kWh",
            "Consumo en Supervalle": "0.065616 €/kWh",
            Potencia: "0,1042286  €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=7",
          },
        },
        {
          name: "Vehículo eléctrico + 10",
          data: ["Tarifa 3 periodos", "más de 10kW"],
          info: {
            "Consumo en Punta": "0.156712618 €/kWh",
            "Consumo en Valle": "0.094278981 €/kWh",
            "Consumo en Supervalle": "0.06912799 €/kWh",
            Potencia: "0,1217663 €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=8",
          },
        },
      ],
    },
  ],
  state2: [
    {
      name: "Baja Tensión",
      icon: <Tension />,
      description:
        "Tarifa de luz con discriminación horaria para instalaciones con potencia mayor de 15 kW. La tarifa de acceso 3.0 es una tarifa de luz con discriminación horaria de 3 periodos, para instalaciones con potencia contratada superior a 15 kW en, al menos, uno de los tres periodos.",
      // hours: [
      //   {
      //     name: "Invierno y verano",
      //     values: [
      //       "Punta: de 00h a 08h",
      //       "Valle: de 08h a 11h – 15h a 00h",
      //       "Super Valle: de 11h a 15h",
      //     ],
      //   },
      // ],
      rates: [
        {
          name: "BAJA TENSIÓN",
          data: ["Tarifa 3 periodos (3.0A)", "más de 15kW"],
          info: {
            "Consumo en Punta": "0,100483156 €/kWh",
            "Consumo en Llano": "0,089468724 €/kWh",
            "Consumo Valle": "0,065718589 €/kWh",
            "Potencia en Punta": "0,111586 €/kW día",
            "Potencia en Llano": "0,066952 €/kW día",
            "Potencia en Valle": "0,044634 €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=9",
          },
        },
      ],
    },
    {
      name: "Alta Tensión",
      icon: <Tension />,
      description:
        "Tarifa de luz destinada a empresas o industrias con gran consumo electrico. La tarifa 3.1A es una tarifa de luz para instalaciones conectadas a la red de alta tensión, con potencias  contratadas iguales o inferiores a 450 kW (siempre ascendente) y con discriminación horaria en tres periodos.",
      // hours: [
      //   {
      //     name: "Invierno y verano",
      //     values: [
      //       "Punta: de 00h a 08h",
      //       "Valle: de 08h a 11h – 15h a 00h",
      //       "Super Valle: de 11h a 15h",
      //     ],
      //   },
      // ],
      rates: [
        {
          name: "ALTA TENSIÓN",
          data: ["Tarifa 3 periodos (3.1A)", "hasta 450 kW"],
          info: {
            "Consumo en Punta": "0,090289828 €/kWh",
            "Consumo en Llano": "0,084576905 €/kWh",
            "Consumo Valle": "0.066014752 €/kWh",
            "Potencia en Punta": "0,16211909 €/kW día",
            "Potencia en Llano": "0,09997449 €/kW día",
            "Potencia en Valle": "0,02292529 €/kW día",
          },
          button: {
            name: "CONTRATAR",
            link: "/alta?rateId=10",
          },
        },
      ],
    },
  ],
};
