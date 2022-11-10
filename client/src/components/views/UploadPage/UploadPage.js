import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import DoUpload from "../../../utils/DoUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const onCategoryChange = (e) => {
    const categoryList = e.target.value
      .replace(/ /g, "")
      .split(",")
      .map((item) => {
        return item.toUpperCase();
      });
    setCategory(categoryList);
  };
  const onBrandChange = (e) => {
    setBrand(e.target.value.toUpperCase());
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (e) => {
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
        <Input type="text" value={brand} onChange={onBrandChange} />
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
        <Input
          type="text"
          value={size}
          onChange={onSizeChange}
          placeholder="ex) xs, m , xl 모든 사이즈 기입"
        />
        <br />
        <br />
        <Input
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="ex) Men , Outer or Women , Bottom"
        />
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
