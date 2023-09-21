import React from "react";
import styles from "./Test.module.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephoneFill } from "react-icons/bs";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Order Placed",
    description: `Order is placed 10 april 2023.`,
  },
  {
    label: "Order processed",
    description: "Order is processed 10 april 2023",
  },
  {
    label: "Packed",
    description: `Order is being packed.`,
  },
  {
    label: " Shipping",
    description: `Order is being packed.`,
  },
];



function Test() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{ backgroundColor: "#F7FBFF", width: "100%" }}>
      <div className={styles.headingdiv}>
        <h3>Order Id :</h3>
      </div>
      <div className={styles.secondiv}>
        <div className={styles.insidediv}>
          <div className={styles.boxheading}>
            <h3>Customer details</h3>
          </div>
          <hr className={styles.line} />
          <div>
            <div className="flex flex-row ml-3 mt-3">
              <BiSolidUserCircle className="h-5 w-5" />

              <p className="ml-1"> Jonathan james</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <TfiEmail className="h-5 w-5" />

              <p className="ml-1"> Jonathan james</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <BsTelephoneFill className="h-5 w-5" />

              <p className="ml-1"> Jonathan james</p>
            </div>
          </div>
        </div>
        <div className={styles.insidediv}>
          <div className={styles.boxheading}>
            <h3>Shipping address</h3>
          </div>
          <hr className={styles.line} />
          <div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">address</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1"> state</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">pin</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">India</p>
            </div>
          </div>
        </div>
        <div className={styles.insidediv}>
          <div className={styles.boxheading}>
            <h3>Payment details</h3>
          </div>
          <hr className={styles.line} />
          <div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">Transaction:</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1"> Payment method:</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">CardholderName:</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">Card number :</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">Total amount: 1999</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productdetailDiv}>
        <div>
          <p className={styles.boxheading}>Product details</p>
          <table className={styles.table}>
            <tr className="gap-8" style={{ backgroundColor: "white" }}>
              <th className="bg-white">Product</th>
              <th className="ml-5 bg-white">Product Id</th>
              <th className="bg-white">Price</th>
              <th className="bg-white">Quantity</th>
              <th className="bg-white">Total amount</th>
              <tr />
              <tr>
                <td className={styles.table1}>
                  <img
                    src="https://media.istockphoto.com/id/479382464/vector/blue-sport-shoes-for-running.jpg?s=612x612&w=0&k=20&c=v_fkHkodSuuZnH3dswhtKJz8aZmNgwxjfYOQ0ocvOdA="
                    alt=""
                    className="h-10 w-10 mob:hidden"
                  />
                  Addidas men sdfgfgfgvsv ddfv Peter
                </td>
                <td>Griffin</td>
                <td>$100</td>
                <td>$100</td>
                <td>$100</td>
              </tr>
            </tr>
            <hr />
          </table>
        </div>
      </div>

      <div className={styles.four}>
        <div className={styles.logisticdetailsdiv}>
          <p className="ml-3 mt-1 font-bold">Logistic Details</p>

          <div
            style={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalShippingOutlinedIcon
              style={{ fontSize: "70px", color: "green", margin: "auto" }}
            />
          </div>
          <div className="ml-2">
            <h4 className="mt-4">ABX Logistics</h4>
            <p>abc@ gmail.com</p>
            <p>12232323</p>
            <p>id:sdsdfsfv</p>
            <p>Amount charged:43</p>
            <p>Payment method:cash</p>
          </div>
        </div>

        <div className={styles.totalbill}>
          <p className="ml-3 mt-1 font-bold">Total Bill</p>
          <div className="ml-3">
            <div className="flex flex-row">
              <p>Subtotal : </p>
              <p className="ml-16">2323</p>
            </div>

            <div className="flex flex-row">
              <p>Discount : </p>
              <p className="ml-16">2323</p>
            </div>
            <div className="flex flex-row">
              <p>Logistics : </p>
              <p className="ml-16">2323</p>
            </div>
            <div className="flex flex-row">
              <p>tax : </p>
              <p className="ml-28">2323</p>
            </div>

            <div className="flex flex-row mt-3">
              <p className="font-bold">Total Amount : </p>
              <p className="ml-10 font-bold">2323</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.five}>
        <div className={styles.stepper}>
          <p className="font-bold mt-2 ml-2">Order Status</p>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          style={{ backgroundColor: "orange" }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </div>
        <div className={styles.prevOrder}>
          <h1>No previous Order from this customer</h1>
        </div>
      </div>
    </div>
  );
}

export default Test;
