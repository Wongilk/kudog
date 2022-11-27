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
      alert("모든 항목을 기입해주세요");
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
          alert("상품 등록이 완료되었습니다.");
          navigate("/");
        } else {
          alert("상품 등록에 실패하였습니다.");
        }
      });
    }
  };
  return (
    //level : 글자 크기, 1이 가장 큼
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginButtom: "2rem" }}>
        <Title level={2}>상품 정보 업로드</Title>
      </div>
      <DoUpload updateImages={updateImages} />
      <Form>
        <label>브랜드</label>
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
        <label>상품명</label>
        <Input type="text" value={title} onChange={onTitleChange} />
        <br />
        <br />
        <label>설명</label>
        <TextArea
          type="text"
          value={description}
          onChange={onDescriptionChange}
        />
        <br />
        <br />
        <label>가격 (Stamp)</label>
        <Input type="text" value={price} onChange={onPriceChange} />
        <br />
        <br />
        <label>사이즈와 수량</label>
        <Input
          type="text"
          value={sizeAndQuantity}
          onChange={onSizeAndQuantityChange}
          placeholder="ex) s,1,m,2"
        />
        <br />
        <br />
        <label>카테고리</label>
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
          확인
        </Button>
      </Form>
    </div>
  );
};

export default UploadPage;
//수정
