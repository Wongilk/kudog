import { React, useEffect, useState } from "react";
import ImageSlider from "../../../utils/ImageSlider";
import axios from "axios";
import Card from "antd/lib/card/Card";
import { Row, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import RadioBoxes from "./Section/RadioBoxes";
import { brands, categories, genders } from "./Section/Datas";
import SearchByWords from "./Section/SearchByWords";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    brand: [],
    category: [],
    gender: [],
  });
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    getproducts(body);
  }, []);

  const getproducts = (body) => {
    axios.post("/api/products/getproducts", body).then((response) => {
      if (response.data.success) {
        if (body.loadmore)
          setProducts([...products, ...response.data.productInfo]);
        else setProducts(response.data.productInfo);
        setPostSize(response.data.postSize);
      } else alert("상품을 가져오지 못했습니다.");
    });
  };

  const loadmoreHandler = () => {
    let Skip = skip + limit;

    let body = {
      skip: Skip,
      limit: limit,
      loadmore: true,
    };
    getproducts(body);
    setSkip(Skip);
  };

  const showFilteredResult = (filters) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filters,
    };
    getproducts(body);
    setSkip(0);
  };
  //filters의 id들을 이름으로 바꿔주는 함수 ex) [1,2]=>[MEN,OUTER]
  const changefilter = (filters) => {
    let newfilter = {};
    for (let key in brands) {
      if (brands[key]._id === filters.brand)
        newfilter["brand"] = brands[key].name;
    }
    for (let key in categories) {
      if (categories[key]._id === filters.category)
        newfilter["category"] = categories[key].name;
    }
    for (let key in genders) {
      if (genders[key]._id === filters.gender)
        newfilter["gender"] = genders[key].name;
    }
    console.log(newfilter);
    return newfilter;
  };

  const handlefilter = (filters, type) => {
    const newfilters = { ...Filters };
    //Filters는 체크된 것들의 id 집합

    //radiobox에서 넘어온 id들을 넣어줌 ex) brands : [1,2,3] , category : [1]
    newfilters[type] = filters;

    console.log(newfilters);
    const changedFilters = changefilter(newfilters);
    //결과 값을 보여줄 때만 바꿔서 전달하고, filters에는 id 값을 유지
    showFilteredResult(changedFilters);
    setFilters(newfilters);
  };

  const refreshSearch = (newSearchWord) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: Filters,
      searchWord: newSearchWord,
    };
    setSearchWord(newSearchWord);
    getproducts(body);
    setSkip(0);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.brand} />
          <Meta title={product.title} description={product.price + " stamps"} />
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      {/*filter*/}
      <Row gutter={(16, 16)}>
        <Col lg={8} xs={24}>
          <RadioBoxes
            handlefilter={(filters) => handlefilter(filters, "gender")}
            type={"gender"}
          />
        </Col>
        <Col lg={8} xs={24}>
          <RadioBoxes
            handlefilter={(filters) => handlefilter(filters, "category")}
            type={"category"}
          />
        </Col>
        <Col lg={8} xs={24}>
          <RadioBoxes
            handlefilter={(filters) => handlefilter(filters, "brand")}
            type={"brand"}
          />
        </Col>
      </Row>
      <br />
      {/*search*/}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem,auto",
        }}
      >
        <SearchByWords
          refreshSearch={(newSearchWord) => refreshSearch(newSearchWord)}
        />
      </div>
      {/*cards*/}
      <Row gutter={(16, 16)}>{renderCards}</Row>
      <br />
      {postSize >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadmoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
