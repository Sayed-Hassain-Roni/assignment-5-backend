import { join } from "path";
import { readFileSync } from "fs";
import { verifyPayment } from "./payment.utils";
import { BookingModel } from "../Order/Order.model";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse);

  let result;
  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await BookingModel.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  return `<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
  <h1 style="color: red;">Payment ${status}</h1>
</div>`;
};

export const paymentServices = {
  confirmationService,
};
