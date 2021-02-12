export const getMonthByPosition = (month) => {
  switch (month) {
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
    default:
      return null;
  }
};

export const getCodeMonthByPosition = (month) => {
  switch (month) {
    case 0:
      return "Ene";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Abr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Ago";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dic";
    default:
      return null;
  }
};

export const getPositionMonthByCode = (month) => {
  switch (month) {
    case "Ene":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Abr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Ago":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dic":
      return 11;
    default:
      return null;
  }
};

export const codeMonthObject = {
  Ene: [],
  Feb: [],
  Mar: [],
  Abr: [],
  May: [],
  Jun: [],
  Jul: [],
  Ago: [],
  Sep: [],
  Oct: [],
  Nov: [],
  Dic: [],
};
