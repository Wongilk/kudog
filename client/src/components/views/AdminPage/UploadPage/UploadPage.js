import React, { useState } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import DoUpload from "../../../../utils/DoUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { brands } from "../../LandingPage/Section/Datas";
import { categories, genders } from "../../LandingPage/Section/Datas";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.userData);
  let arr = [];
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onSizeAndQuantityChange = (e) => {
    let temp = e.target.value
      .replace(/ /g, "")
      .split(",")
      .map((item) => {
        return item.toUpperCase();
      });
    setSizeAndQuantity(temp);
  };
  const changeSizeAndQuantity = () => {
    for (let i = 0; i < sizeAndQuantity.length; i++) {
      let obj = {};
      if (i % 2 === 0) {
        obj = {
          size: sizeAndQuantity[i],
          quantity: parseInt(sizeAndQuantity[i + 1]),
        };
        arr.push(obj);
      }
    }
  };
  const onCategoryChange = (value) => {
    setCategory(value);
  };
  const onGenderChange = (value) => {
    setGender(value);
  };
  const onBrandChange = (value) => {
    setBrand(value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    changeSizeAndQuantity();
    e.preventDefault();
    if (
      !brand ||
      !title ||
      !description ||
      !price ||
      !sizeAndQuantity ||
      !images ||
      !category ||
      !gender
    )
      alert("?????? ????????? ??????????????????");
    else {
      const body = {
        writer: user._id,
        brand: brand,
        title: title,
        description: description,
        price: price,
        sizeAndQuantity: arr,
        category: category,
        images: images,
        gender: gender,
      };

      axios.post("/api/products", body).then((response) => {
        if (response.data.success) {
          alert("?????? ????????? ?????????????????????.");
          navigate("/");
        } else {
          alert("?????? ????????? ?????????????????????.");
        }
      });
    }
  };
  return (
    //level : ?????? ??????, 1??? ?????? ???
    <div className="w-50">
      <Title className="mb-3" level={3}>
        ?????? ?????? ?????????
      </Title>

      <DoUpload updateImages={updateImages} />

      <Form className="mt-3">
        <label>?????????</label>
        <br />
        <Select onChange={onBrandChange} style={{ width: "100%" }}>
          {brands.map((brand, index) => (
            <option key={index} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </Select>
        <br />
        <br />
        <label>?????????</label>
        <Input type="text" value={title} onChange={onTitleChange} />
        <br />
        <br />
        <label>??????</label>
        <TextArea
          type="text"
          value={description}
          onChange={onDescriptionChange}
        />
        <br />
        <br />
        <label>?????? (Stamp)</label>
        <Input type="text" value={price} onChange={onPriceChange} />
        <br />
        <br />
        <label>???????????? ??????</label>
        <Input
          type="text"
          value={sizeAndQuantity}
          onChange={onSizeAndQuantityChange}
          placeholder="ex) s,1,m,2"
        />
        <br />
        <br />
        <label>????????????</label>
        <br />
        <Select onChange={onGenderChange} style={{ width: "50%" }}>
          {genders.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>

        <Select onChange={onCategoryChange} style={{ width: "50%" }}>
          {categories.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <br />
        <br />
        <Button type="submit" onClick={onSubmit}>
          ??????
        </Button>
      </Form>
    </div>
  );
};

export default UploadPage;
//??????
