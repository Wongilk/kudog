import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = (detail) => {
  const [image, setImage] = useState([]);
  console.log(detail.detail.images);
  useEffect(() => {
    if (detail.detail.images && detail.detail.images.length > 0) {
      let images = [];
      detail.detail.images.map((item) =>
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        })
      );
      setImage(images);
    }
  }, [detail.detail.images]);
  return (
    <div>
      <ImageGallery items={image} />
    </div>
  );
};

export default ProductImage;
