import { useEffect } from "react";
import { useFormikContext } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const PickupAutoFillFromPincode = () => {
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

  useEffect(() => {
    if (values.pincode && values.pincode.toString().length === 6) {
      pincodeToLocation();
    }
  }, [values.pincode, setFieldValue]);

  return null;
};

export default PickupAutoFillFromPincode;
