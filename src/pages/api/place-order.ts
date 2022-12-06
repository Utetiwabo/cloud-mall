import axios from "axios";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongo";
import Flutterwave from "flutterwave-node-v3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const fw = new Flutterwave();
  interface FWPaymentResponse {
    status: "success" | "failed" | "error";
    message: string;
    data: { link: string };
  }
  const cId = req.body?.customerId?.toString();

  const order_payload = req.body?.order_payload;

  console.log(order_payload);

  const generateOrderId = () => nanoid();
  const generateTxRef = () => nanoid();
  const generateGuestId = () => nanoid();

  if (req.method === "POST") {
    const customerId = cId ? cId : generateGuestId();
    const orderId = generateOrderId();
    const txRef = generateTxRef();
    try {
      const { data } = await axios.post<FWPaymentResponse>(
        "https://api.flutterwave.com/v3/payments",
        {
          tx_ref: txRef,
          amount: order_payload.total,
          currency: "NGN",
          redirect_url: process.env.VERCEL_URL,
          meta: {
            consumer_id: customerId,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: order_payload.shipping_details.email,
            phonenumber: order_payload.shipping_details.phone,
            name: order_payload.shipping_details.firstName,
          },
          customizations: {
            title: "Cloud Mall",
            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );

      console.log("daa", data);

      if (data.status !== "success") {
        const insertOrderResult = await (
          await clientPromise
        )
          .db("the-mall")
          .collection("orders")
          .insertOne({
            customerId,
            txRef,
            orderId,
            ...order_payload,
            dateTime: new Date(),
            status: "failed",
          });
        res.status(400).json({
          paymentRes: { link: null, status: data.status },
          customerId,
          orderIds: { qid: insertOrderResult.insertedId, oid: orderId },
        });
      } else {
        const insertOrderResult = await (
          await clientPromise
        )
          .db("the-mall")
          .collection("orders")
          .insertOne({
            customerId,
            txRef,
            orderId,
            ...order_payload,
            dateTime: new Date(),
            status: "pending",
          });
        res.status(200).json({
          paymentRes: { link: data.data.link, status: data.status },
          customerId,
          orderIds: { qid: insertOrderResult.insertedId, oid: orderId },
        });
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
      console.log(err.response?.body);
    }
  } else res.status(500).json({ error: "post request only" });
}
