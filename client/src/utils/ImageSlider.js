import React from "react";
import { Carousel } from "antd";
const ImageSlider = (images) => {
  return (
    <Carousel>
      {images.images.map((image, index) => {
        return (
          <div key={index}>
            <img
              alt="images"
              src={`http://localhost:5000/${image}`}
              style={{ width: "100%", maxHeight: "150px" }}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
