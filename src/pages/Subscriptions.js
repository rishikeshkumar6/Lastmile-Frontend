import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useLazySubscriptionsCreationQuery } from "../Redux/Action";
const Subscriptions = () => {
  console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);
  const [
    subscriptionsCreation,
    { isLoading, isSuccess, isError, data, error },
  ] = useLazySubscriptionsCreationQuery();

  useEffect(() => {
    if (isSuccess && data && data.response?.id) {
      console.log("Subscription Data:", data.response);

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        subscription_id: data.response.id,
        handler: function (response) {
          console.log("Razorpay Response:", response);
        },
      };
      console.log("options checking----", options);
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        console.error("Payment Failed:", response.error);
      });
    } else {
      console.error("Error in useEffect: Data or isSuccess invalid.");
    }
  }, [data, isSuccess]);

  const handleClick = (e) => {
    e.preventDefault();
    subscriptionsCreation();
  };
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="w-[90%] m-[auto]">
        <button onClick={handleClick}>Buy Subscription</button>
      </div>
      {console.log("just check this part", {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
      })}
    </section>
  );
};

export default Subscriptions;
