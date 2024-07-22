import { Context } from "hono";
import { PaymentsService, getPaymentsService, updatePaymentsService, createPaymentsService, deletePaymentsService } from "./Payments.service";

export const listPayments = async (c: Context) => {
  const data = await PaymentsService();
  if (data == null || data.length == 0) {
    return c.text("hello Ian user not found", 404);
  }

  return c.json(data, 200);
};

// Getting payments
export const getPayments = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const payment = await getPaymentsService(id);
  if (payment == undefined) {
    return c.text("user not found", 404);
  }
  return c.json(payment, 200);
};

// Creating payments
export const createPayments = async (c: Context) => {
  try {
    const payment = await c.req.json();

     //convert date strings to date objects
     if(payment.payment_date){
      payment.payment_date = new Date(payment.payment_date);
  }
    const createdPayment = await createPaymentsService(payment);
    if (!createdPayment) return c.text("User not created", 404);

    return c.json(createdPayment, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Updating payments
export const updatePayments = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const payment = await c.req.json();
  // Search user
  const searchedPayment = await getPaymentsService(id);
  if (searchedPayment == undefined) return c.text("Payment not found", 404);

  // Get data and update
  const res = await updatePaymentsService(id, payment);

  // Return a success message
  if (!res) return c.text("Payment not updated", 404);
  return c.json({ msg: res }, 201);
};

// Deleting payments
export const deletePayments = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("invalid Id", 400);
  try {
    // Search user
    const payment = await getPaymentsService(id);
    if (payment == undefined) return c.text("Payment not found", 404);
    // Delete user
    const res = await deletePaymentsService(id);
    if (!res) return c.text("Payment not deleted", 404);
    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
