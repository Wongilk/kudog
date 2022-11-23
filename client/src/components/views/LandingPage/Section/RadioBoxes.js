import React, { useState } from "react";
import { Collapse, Radio } from "antd";
import { brands, categories, genders } from "./Datas";
const { Panel } = Collapse;
const RadioBoxes = ({ handlefilter, type }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
    handlefilter(e.target.value);
  };
  return (
    <div>
      {type === "brand" ? ( //Radio.Group의 value와 Radio의 value가 같아야 함
        <div>
          <Collapse defaultActiveKey={["0"]}>
            <Panel header="Brands" key="1">
              <Radio.Group value={value} onChange={onChange}>
                {brands.map((item) => (
                  <React.Fragment key={item._id}>
                    <Radio value={item._id}>{item.name}</Radio>
                  </React.Fragment>
                ))}
              </Radio.Group>
            </Panel>
          </Collapse>
        </div>
      ) : type === "gender" ? (
        <div>
          <Collapse defaultActiveKey={["0"]}>
            <Panel header="Gender" key="1">
              <Radio.Group value={value} onChange={onChange}>
                {genders.map((item) => (
                  <React.Fragment key={item._id}>
                    <Radio value={item._id}>{item.name}</Radio>
                  </React.Fragment>
                ))}
              </Radio.Group>
            </Panel>
          </Collapse>
        </div>
      ) : (
        <div>
          <Collapse defaultActiveKey={["0"]}>
            <Panel header="Category" key="1">
              <Radio.Group value={value} onChange={onChange}>
                {categories.map((item) => (
                  <React.Fragment key={item._id}>
                    <Radio value={item._id}>{item.name}</Radio>
                  </React.Fragment>
                ))}
              </Radio.Group>
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default RadioBoxes;
