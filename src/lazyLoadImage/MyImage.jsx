import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MyImage = (props) => {
  return (
    <div>
      <LazyLoadImage
        // eslint-disable-next-line react/prop-types
        className={props.className}
        // eslint-disable-next-line react/prop-types
        alt={props.alt}
        //   height={image.height}
        // eslint-disable-next-line react/prop-types
        src={props.src} // use normal <img> attributes as props
        //   width={image.width}
        effect="opacity"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: "1s" },
        }}
      />
    </div>
  );
};

export default MyImage;