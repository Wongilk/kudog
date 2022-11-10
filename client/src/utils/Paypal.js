import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
let amount = 0;
export default function Paypal({ totalCost, onSuccess }) {
  amount = totalCost;
  return (
    <div style={{ maxWidth: "300px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "Abht-PKpVkWxHgsdX_euxPRll5iqBHJtWDQi4JDnnWU-MZ3j5CZQe8rcpLDuZQmW-SLIWBoYPeUWrLXL",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
          onSuccess={onSuccess}
        />
      </PayPalScriptProvider>
    </div>
  );
}
// This values are the props in the UI

const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, onSuccess }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ color: "blue" }}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            onSuccess(data);
          });
        }}
      />
    </>
  );
};
