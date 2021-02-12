import Head from "next/head";

const Meta = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Próxima Energía</title>
    </Head>
    <style jsx global>
      {`
        @font-face {
          font-family: "Poppins-Regular";
          src: url("/fonts/Poppins-Regular.ttf") format("opentype");
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: "Poppins-Bold";
          src: url("/fonts/Poppins-Bold.ttf") format("opentype");
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }
      `}
    </style>
  </>
);

export default Meta;
