import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: (
        <Typography variant="p" gutterBottom component="div">
          Shipping Details
        </Typography>
      ),
      icon: <LocalShippingIcon />,
    },
    {
      label: (
        <Typography variant="p" gutterBottom component="div">
          Confirm Order
        </Typography>
      ),
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: (
        <Typography variant="p" gutterBottom component="div">
          Payment
        </Typography>
      ),
      icon: <AccountBalanceIcon />,
    },
  ];
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{ color: activeStep >= index ? "#ff324d" : "#333333" }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default CheckOutSteps;
