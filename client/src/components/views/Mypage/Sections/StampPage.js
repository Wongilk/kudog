import { React, useState } from "react";
import { SmileOutlined, FrownOutlined, MehOutlined } from "@ant-design/icons";
import Paypal from "../../../../utils/Paypal";
import { useDispatch } from "react-redux";
import { OnBuySuccess } from "../../../../_actions/user_actions";
import { Result } from "antd";
const StampPage = () => {
  const [select, setSelect] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (e.target.value === "10개") setSelect([10, 15]);
    else if (e.target.value === "20개") setSelect([20, 30]);
    else setSelect([30, 45]);
  };

  const onSuccess = (paymentData) => {
    //paymentData가 왔다는 것은 approve되었단 뜻 => paid :true
    dispatch(
      OnBuySuccess({
        paymentData: paymentData,
        product: select,
      })
    ).then((response) => {
      if (response.payload.success) {
        console.log("success");
        setShowSuccess(true);
      }
    });
  };
  return (
    <div className="m-1 mr-5 p-5 border" style={{ width: "70%" }}>
      <h1 className="mb-5">Buy Stamp</h1>
      <table style={{ width: "30%", border: "none" }}>
        <thead class="text-center">
          <tr>
            <th className="text-center">
              <FrownOutlined style={{ fontSize: "30px" }} />
            </th>
            <th className="text-center">
              <MehOutlined style={{ fontSize: "30px" }} />
            </th>
            <th className="text-center">
              <SmileOutlined style={{ fontSize: "30px" }} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-bottom">
            <td className="text-center">10개</td>
            <td className="text-center">20개</td>
            <td className="text-center">30개</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center">$15</td>
            <td className="text-center">$30</td>
            <td className="text-center">$45</td>
          </tr>
        </tfoot>
      </table>
      <select
        class="mt-4 mb-5 form-select"
        style={{ width: "20%" }}
        onChange={onChange}
      >
        <option>——</option>
        <option>10개</option>
        <option>20개</option>
        <option>30개</option>
      </select>
      {showSuccess ? (
        <Result status="success" title="Successfully Purchased stamps" />
      ) : (
        <Paypal totalCost={select[1]} onSuccess={onSuccess}></Paypal>
      )}
    </div>
  );
};

export default StampPage;
