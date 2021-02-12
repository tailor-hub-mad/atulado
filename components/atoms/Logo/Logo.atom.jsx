import React from "react";

import ProximaImage from "../../../public/image/proxima_image.svg";
import ProximaLogoImage from "../../../public/image/proxima-logo_image.svg";
import ProximaWhiteImage from "../../../public/image/proxima-white_image.svg";
import ProximaLogoWhiteImage from "../../../public/image/proxima-logo-white_image.svg";

export const Logo = ({ width, height, mode, type, ...props }) => {
  return (
    <>
      {mode == "white" ? (
        <>
          {type == "logo" ? (
            <ProximaLogoWhiteImage width={width} height={height} {...props} />
          ) : type == "text" ? (
            <ProximaWhiteImage width={width} height={height} {...props} />
          ) : (
                <>
                  <ProximaWhiteImage width={width} height={height} {...props} />
                  <ProximaLogoWhiteImage width={width} height={height} {...props} />
                </>
              )}
        </>
      ) : (
          <>
            {type == "logo" ? (
              <ProximaLogoImage width={width} height={height} {...props} />
            ) : type == "text" ? (
              <ProximaImage width={width} height={height} {...props} />
            ) : (
                  <>
                    <ProximaImage width={width} height={height} {...props} />
                    <ProximaLogoImage width={width} height={height} {...props} />
                  </>
                )}
          </>
        )}
    </>
  );
};
