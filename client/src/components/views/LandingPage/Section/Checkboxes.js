import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import { continents } from "./Datas";
const { Panel } = Collapse;
const Checkboxes = ({ handlefilter }) => {
  const [check, setCheck] = useState([]);
  const onchangeHandler = (value) => {
    const selectedIndex = check.indexOf(value);
    const currentCheck = [...check];
    //없다면 넣어줌
    if (selectedIndex === -1) currentCheck.push(value);
    //이미 있다면 빼주고
    else currentCheck.splice(selectedIndex, 1);
    setCheck(currentCheck);
    handlefilter(currentCheck);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {continents.map((item, index) => (
            <React.Fragment key={index}>
              <Checkbox
                checked={check.indexOf(item._id) === -1 ? false : true}
                onChange={() => onchangeHandler(item._id)}
              />
              <span>{item.name}</span>
            </React.Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Checkboxes;
