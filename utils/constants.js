require("dotenv").config();

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";
export const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID || "1";
export const API_USER_TOKEN = process.env.NEXT_PUBLIC_API_USER_TOKEN;
export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";

// EXTERNAL LINK
export const EXTERNAL_LINK_PROXIMA_WEB =
  process.env.NEXT_PUBLIC_EXTERNAL_LINK_PROXIMA_WEB;

// VALIDATE FORM
export const VALIDATE_FORM_DEFAULT = "El campo es inválido.";
export const VALIDATE_FORM_REQUIRED = "El campo es obligario.";

// PLACEHOLDER FORM
export const PLACEHOLDER_FORM_CUP = "ESXXXXXXXXXXXXXXXXXXX";

// ERRORS
export const GENERAL_ERROR = "Ha ocurrido un erorr. Vuelve a intenarlo.";

// MESSAGE
export const CONDITIONS_1 =
  "PRÓXIMA trasladará al Cliente la totalidad de costes de adquisición de energía y peajes y cargos regulados en que incurra para el suministro a las Instalaciones. A los referidos costes se les añadirá una retribución por gestión, en concepto de contraprestación por los servicios de intermediación en el mercado, fijada en 0,005 €/MWh.";
export const CONDITIONS_2 =
  "Esta retribución, aplicable, en su caso, a la medida registrada por el contador, incluye los sobrecostes que se pudieran producir por las desviaciones entre previsión de consumo de energía, elaborada por PRÓXIMA, y el consumo real. A la misma le será de aplicación el IVA.";
export const CONDITIONS_3 =
  "Los costes en los que actualmente se incurre para el suministro de energía eléctrica se dividen en dos componentes: mercado y peajes. Para obtener el componente de mercado es preciso, en primer lugar, afectar la medida de energía entrante del contador por un coeficiente, fijado reglamentariamente, que recoge las pérdidas de energía en las redes de transporte y distribución. Esta medida, denominada “en barras de central” es la que se multiplica por el precio del mercado mayorista, obtenido como suma de los siguientes componentes: precio horario del mercado diario, sobrecostes del sistema, pagos por capacidad, retribución de los operadores y servicio de interrumpibilidad. Adicionalmente, se facturará el importe correspondiente a la aportación al Fondo Nacional de Eficiencia Energética, fijado reglamentariamente, cuyo precio se aplica a la medida registrada en contador, antes de aplicar pérdidas.";

export const PASSWORD_MUST_HAVE =
  "La contraseña debe contener como mínimo 6 caracteres, un valor no alfanumerico, un dígito y una letra mayúscula.";

export const UPDATED_USER =
  "Te informamos que tus cambios están siendo procesados. Recibirás un correo cuando los cambios se hayan hecho efectivos.";

export const SEND_RECOVER_PASSWORD =
  "Se ha enviado un correo con el enlace de recuperación de contraseña";

export const NOT_ALLOWED_RECOVER_PASSWORD =
  "Lo sentimos. No es posible recuperar la contraseña en estos momentos.";

export const PASSWORD_MUST_BE_EQUAL = "Las contraseñas deben coincidir.";

export const PRIVACY_POLICY =
  "GEOATLANTER, SL. como responsable del tratamiento recaba sus datos personales con la finalidad de gestionar las dudas y consultas que lleguen a través del formulario. La base de legitimación para el tratamiento de sus datos es su consentimiento. Le informamos que sus datos serán únicamente tratados por GEOATLANTER. Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad en la dirección contacto@geaotlanter.com. Puede consultar más información en nuestra Política de Privacidad";
