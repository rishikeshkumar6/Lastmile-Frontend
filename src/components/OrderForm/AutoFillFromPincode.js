import { useEffect } from "react";
import { useFormikContext } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const AutoFillFromPincode = () => {
  const { values, setFieldValue } = useFormikContext();
  console.log(process.env.REACT_APP_DEVELOPEMENT_POSTALCODE_API);
  const pincodeToLocation = async () => {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${values.pincode}`
    );
    console.log("response", response);
    const { Status, Message, PostOffice } = response.data[0];
    if (Status === "Error" && !PostOffice) {
      toast.error(Message, { autoClose: "2000" });
      return;
    }
    const { District, State, Country } = PostOffice[0];
    setFieldValue("city", District);
    setFieldValue("state", State);
    setFieldValue("country", Country);
  };
  const billingPincodeToLocation = async () => {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${values.billing_pincode}`
    );
    console.log("response", response);
    const { Status, Message, PostOffice } = response.data[0];
    if (Status === "Error" && !PostOffice) {
      toast.error(Message, { autoClose: "2000" });
      return;
    }
    const { District, State, Country } = PostOffice[0];
    setFieldValue("billing_city", District);
    setFieldValue("billing_state", State);
    setFieldValue("billing_country", Country);
  };
  useEffect(() => {
    if (values.pincode && values.pincode.toString().length === 6) {
      pincodeToLocation();
    }
    if (
      values.billing_pincode &&
      values.billing_pincode.toString().length === 6
    ) {
      billingPincodeToLocation();
    }
  }, [values.pincode, values.billing_pincode, setFieldValue]);

  return null;
};

export default AutoFillFromPincode;
