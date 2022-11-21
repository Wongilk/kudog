import React, { useState } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import DoUpload from "../../../../utils/DoUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { brands } from "../../LandingPage/Section/Datas";
import { categories } from "../../LandingPage/Section/Datas";

const { Title } = Typography;
const { TextArea } = Input;

const UploadPage = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onSizeChange = (e) => {
    const sizeList = e.target.value
      .replace(/ /g, "")
      .split(",")
      .map((item) => {
        return item.toUpperCase();
      });
    setSize(sizeList);
  };
  const onCategoryChange = (value) => {
    let values = [...category, value];
    if (values.length > 2) {
      if (!["MEN", "WOMEN"].includes(value)) {
        values = [values[0], value];
      } else values = [value, values[1]];
    }
    if (values.length === 2) {
      if (!["MEN", "WOMEN"].includes(values[0]))
        [values[1], values[0]] = [values[0], values[1]];
    }
    setCategory(values);
    console.log(values);
  };
  const onBrandChange = (value) => {
    setBrand(value);
    console.log(value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (e) => {
    console.log(category);
    e.preventDefault();
    if (
      !brand ||
      !title ||
      !description ||
      !price ||
      !size ||
      !images ||
      !category
    )
      alert("모든 항목을 기입해주세요");
    else {
      const body = {
        writer: user.current,
        brand: brand,
        title: title,
        description: description,
        price: price,
        size: size,
        category: category,
        images: images,
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
        <label>사이즈</label>
        <Input
          type="text"
          value={size}
          onChange={onSizeChange}
          placeholder="ex) xs, m , xl 모든 사이즈 기입"
        />
        <br />
        <br />
        <label>카테고리</label>
        <br />
        <Select onChange={onCategoryChange} style={{ width: "50%" }}>
          {categories.map((item, index) =>
            index > 1 ? (
              ""
            ) : (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            )
          )}
        </Select>
        <Select onChange={onCategoryChange} style={{ width: "50%" }}>
          {categories.map((item, index) =>
            index > 1 ? (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ) : (
              ""
            )
          )}
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
