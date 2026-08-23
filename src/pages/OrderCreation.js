import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { CssBaseline, Container, Paper, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { SiHackthebox } from "react-icons/si";
import { FormProvider } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { FaLongArrowAltLeft } from "react-icons/fa";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ConsigneeDetails from "../components/OrderForm/ConsigneeDetails";
import OrderDetails from "../components/OrderForm/OrderDetails";
import PickupDetails from "../components/OrderForm/PickupDetails";
import PackageDetails from "../components/OrderForm/PackageDetails";
import BulkOrder from "../components/OrderForm/BulkOrder";
import { useGetOrderQuery } from "../Redux/Action";
const steps = [
  "Consignee Details",
  "Order Details",
  "Pickup Details",
  "Package Details",
];
const stepsslug = steps.map((elem, index) => {
  return elem.toLowerCase().replace(" ", "-");
});
console.log("stepsslug", stepsslug);
//linear stepper outer function
const useStyles = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

const StepperSx = {
  "& .MuiStepConnector-root": {
    left: "calc(-50% + 40px)",
    right: "calc(50% + 40px)",
  },
  "& .MuiStepConnector-line": {
    marginTop: "22px",
  },
};

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 38,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <LocalShippingIcon />,
    2: <MenuBookIcon />,
    3: <LocalShippingIcon />,
    4: <SiHackthebox />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function getStepContent(
  slug,
  orderid,
  navigate,
  isLoading,
  isSuccess,
  isError,
  data,
  error
) {
  // console.log(step, warehouseId, slug, 'Action trigger');
  switch (slug) {
    case undefined:
      if (slug === undefined) {
        return <ConsigneeDetails />;
      }
    case "consignee-details":
      return (
        <ConsigneeDetails
          Loading={isLoading}
          Success={isSuccess}
          Error={isError}
          Data={data}
          Errors={error}
          slug={slug}
          id={orderid}
        />
      );
    case "order-details":
      return (
        <OrderDetails
          Loading={isLoading}
          Success={isSuccess}
          Error={isError}
          Data={data}
          Errors={error}
          slug={slug}
          id={orderid}
        />
      );
    case "pickup-details":
      return (
        <PickupDetails
          Loading={isLoading}
          Success={isSuccess}
          Error={isError}
          Data={data}
          Errors={error}
          slug={slug}
          id={orderid}
        />
      );
    case "package-details":
      return (
        <PackageDetails
          Loading={isLoading}
          Success={isSuccess}
          Error={isError}
          Data={data}
          Errors={error}
          slug={slug}
          id={orderid}
        />
      );
  }
}

const OrderCreation = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { orderid, slug } = useParams();
  const obj = { orderid, slug };
  const navigate = useNavigate();
  console.log("orderid and slug", orderid, slug);
  const { isLoading, isSuccess, isError, data, error } = useGetOrderQuery(obj, {
    skip: orderid === undefined || slug === undefined,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [stepError, setStepError] = useState("error message Display");
  const [Order, setOrder] = useState("single");
  const theme = useTheme();
  const isStepFailed = (step) => {
    // return step === activeStep
  };

  useEffect(() => {
    const index = stepsslug.findIndex((elem) => elem === slug);
    console.log("index", index);
    if (index === -1) {
      navigate("/order/ordercreate");
    }
    setActiveStep(index === -1 ? 0 : index);
  }, [slug]);

  const manageOrder = () => {
    if (Order === "single") {
      setOrder("bulk");
    } else if (Order === "bulk") {
      setOrder("single");
    }
  };

  useEffect(() => {
    if (isError === true && Object.keys(error).length > 0) {
      navigate("/order/ordercreate");
    }
  }, [error]);
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="w-[100%] m-3 lg:text-xl text-gray-900  font-semibold lg:w-[90%] m-[auto] lg:pl-10">
        <div className="py-4 flex justify-between">
          {" "}
          <span className="flex gap-4 items-center text-[20px] cursor-pointer">
            <FaLongArrowAltLeft
              className="text-[25px]"
              onClick={() => navigate(-1)}
            />
            <span>Add Order</span>
          </span>
          <span className="font-normal text-[15px] flex gap-2 items-center">
            Bulk Order
            <Switch
              {...label}
              checked={Order === "single" ? true : false}
              onClick={manageOrder}
            />
            Single Order
          </span>
        </div>

        <>
          <CssBaseline />
          <Container p={4} style={{ padding: "0px" }}>
            <Paper p={3} style={{ padding: "0px" }} className="">
              {Order === "single" ? (
                <>
                  <Stack
                    sx={{
                      width: "100%",
                      paddingBottom: "52px",
                      paddingTop: "52px",
                    }}
                    spacing={4}
                  >
                    <Stepper
                      alternativeLabel
                      activeStep={activeStep}
                      sx={StepperSx}
                      connector={<ColorlibConnector />}
                    >
                      {steps.map((label, index) => {
                        const labelProps = {};
                        if (isStepFailed(index)) {
                          labelProps.optional = (
                            <Typography variant="caption" color="error">
                              {stepError}
                            </Typography>
                          );

                          labelProps.error = true;
                        }

                        return (
                          <Step key={label}>
                            <Typography align="center">{label}</Typography>
                            {Object.keys(labelProps).length > 0 ? (
                              <>
                                <StepLabel {...labelProps}></StepLabel>
                              </>
                            ) : (
                              <>
                                <StepLabel
                                  {...labelProps}
                                  StepIconComponent={ColorlibStepIcon}
                                ></StepLabel>
                              </>
                            )}
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Stack>
                  {activeStep === steps.length ? (
                    <Typography variant="h3" align="center">
                      Thank You
                    </Typography>
                  ) : (
                    <>
                      {/* {data?.isPending ? <SpinnerLoader /> : null} */}

                      <FormProvider>
                        {getStepContent(
                          slug,
                          orderid,
                          navigate,
                          isLoading,
                          isSuccess,
                          isError,
                          data,
                          error
                        )}

                        {/* {warehouseId ? warehouseId : 'dddddd'} */}
                        {/* {slug ? slug : 'yuyu'} */}
                      </FormProvider>
                    </>
                  )}
                </>
              ) : (
                <BulkOrder />
              )}
            </Paper>
          </Container>
        </>
      </div>
      {console.log("orders", Order)}
      {console.log("params checking", orderid, slug)}
    </section>
  );
};

export default OrderCreation;
