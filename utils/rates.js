import Car from "../components/icons/Car";
import Moon from "../components/icons/Moon";
import Tension from "../components/icons/Tension";

export const rates = {
  state1: [
    {
      name: "Tarifa milenial",
      icon: <Tension />,
      description: "Con nuestra tarifa milenial tienes el mejor precio fijo en un único periodo. Disfruta de las ventajas de la tarifa nocturna, pero sin cambiar tus hábitos nocturnos.",
      rates: [
        {
          name: "Milenial",
          data: [
            "Tarifa 1 periodo",
            "hasta 10kw"
          ],
          info:
          {
            "Precio potencia": "38,043426 €/kw",
            "Precio energía": "0,069668 €/kw"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
        {
          name: "Milenial +10",
          data: [
            "Tarifa 1 periodo",
            "de 10kw hasta 15kw"
          ],
          info:
          {
            "Precio potencia": "44,44471 €/kw",
            "Precio energía": "0,106788 €/kw"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        }
      ]
    },
    {
      name: "Tarifa nocturna",
      icon: <Moon />,
      description: "Un precio muy bajo para la energía que consumes en horario valle (14 horas) y un precio más elevado para la energía que consumes en horario punta (10 horas). La tarifa de luz perfecta para quienes pueden realizar la mayor parte del consumo de electricidad en las horas valle.",
      hours: [
        {
          name: "Invierno",
          values: [
            "Punta: de 13h a 23h",
            "Valle: de 23h a 13h"
          ]
        },
        {
          name: "Verano",
          values: [
            "Punta: de 12h a 22h",
            "Valle: de 22h a 12h"
          ]
        }
      ],
      rates: [
        {
          name: "Nocturna",
          data: [
            "Tarifa 2 periodos",
            "hasta 10kw"
          ],
          info:
          {
            "Consumo Punta": "38,043426 €/kw",
            "Consumo Valle": "0,069668 €/kw",
            "Potencia": "0,115187 €kw día"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
        {
          name: "Nocturna +10",
          data: [
            "Tarifa 2 periodos",
            "de 10kw hasta 15kw"
          ],
          info:
          {
            "Consumo Punta": "38,043426 €/kw",
            "Consumo Valle": "0,069668 €/kw",
            "Potencia": "0,115187 €kw día"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
      ]
    },
    {
      name: "Vehículo Eléctrico",
      icon: <Car />,
      description: "La tarifa de luz recomendada para quienes pueden realizar una mayor porcentaje de su consumo en horario llano y valle (ej. familias que pasan la mayor parte del día fuera de casa, usuarios que cargan su vehículo eléctrico por las noches, ...)",
      hours: [
        {
          name: "Invierno",
          values: [
            "Punta: de 13h a 23h",
            "Llano: de 23h a 13h",
            "Valle: de 1 a 7h"
          ]
        },
        {
          name: "Verano",
          values: [
            "Punta: de 12h a 22h",
            "Llano: de 22h a 12h",
            "Super Valle: de 1 a 7h"
          ]
        }
      ],
      rates: [
        {
          name: "Vehículo eléctrico",
          data: [
            "Tarifa 3 periodos",
            "hasta 10kw"
          ],
          info:
          {
            "Consumo Punta": "0,147655 €/kw",
            "Consumo Llano": "0,080723 €/kw",
            "Consumo Valle": "0,070997 €/kw",
            "Potencia": "0,115187 €kw día"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
        {
          name: "Vehículo eléctrico + 10",
          data: [
            "Tarifa 3 periodos",
            "más de 10kw"
          ],
          info:
          {
            "Consumo Punta": "38,043426 €/kw",
            "Consumo Llano": "0,069668 €/kw",
            "Consumo Valle": "0,069668 €/kw",
            "Potencia": "0,115187 €kw día"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
      ]
    }
  ],
  state2: [
    {
      name: "Baja Tensión",
      icon: <Tension />,
      description: "Tarifa de luz con discriminación horaria para instalaciones con potencia mayor de 15 kW. La tarifa de acceso 3.0 es una tarifa de luz con discriminación horaria de 3 periodos, para instalaciones con potencia contratada superior a 15 kW en, al menos, uno de los tres periodos.",
      hours: [
        {
          name: "Invierno y verano",
          values: [
            "Punta: de 00h a 08h",
            "Valle: de 08h a 11h – 15h a 00h",
            "Super Valle: de 11h a 15h"
          ]
        },
      ],
      rates: [
        {
          name: "BAJA TENSIÓN",
          data: [
            "Tarifa 3 periodos (3.0A)",
            "más de 15kw"
          ],
          info:
          {
            "Consumo Punta": "0,101569 €/kw",
            "Consumo Valle": "0,087634 €/kw",
            "Consumo Super Valle": "0,066154 €/kw",
            "Potencia Punta": "0,111586 €/kw día",
            "Potencia Valle": "0,066952 €/kw día",
            "Potencia Super Valle": "0,044634 €/kw día"
          }
          ,
          button: {
            name: "CONTRATAR",
            link: "/alta"
          }
        },
      ]
    },
    {
      name: "Alta Tensión",
      icon: <Tension />,
      description: "La tarifa de luz totalmente personalizada y a medida para las instalaciones de luz de alta tensión. Sabemos que cada instalación de Alta Tensión es un caso especial, con sus particularidades y necesidades.\nNuestra Tarifa de Luz a Medida se adapta a las necesidades de cada instalación y de cada cliente, tanto para instalaciones que ya tienen luz como para nuevas instalaciones de Alta Tensión",
      hours: [
        {
          name: "Invierno y verano",
          values: [
            "Punta: de 00h a 08h",
            "Valle: de 08h a 11h – 15h a 00h",
            "Super Valle: de 11h a 15h"
          ]
        },
      ],
      rates: [
        {
          name: "ALTA TENSIÓN",
          data: [
            "Tarifa 3 periodos (3.0A)",
            "más de 15kw"
          ],
          info:
          {
            "Oferta totalmente personalizada para instalaciones de alta tensión. LLámanos y te informamos.": "",
          }
          ,
          button: {
            name: "LLÁMANOS",
            link: "/"
          }
        },
      ]
    },
  ]
}
