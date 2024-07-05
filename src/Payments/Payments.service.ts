import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIPayment, TSPayment } from '../drizzle/schema';
import { PaymentsTable } from '../drizzle/schema';

export const PaymentsService = async (): Promise<TSPayment[] | null> => {
  return await db.query.PaymentsTable.findMany();
};

export const getPaymentsService = async (id: number): Promise<TIPayment | undefined> => {
  return await db.query.PaymentsTable.findFirst({
    where: eq(PaymentsTable.payment_id, id),
    with: {
      booking:{
       columns:{
         user_id:true,
         booking_date:true,
         total_amount:true,
         booking_status:true
         
       }
      }
     }
  });
};

// Creating new payments
export const createPaymentsService = async (payment: TIPayment) => {
  await db.insert(PaymentsTable).values(payment);
  return { msg: "Payment created successfully" };
};

// Updating payments
export const updatePaymentsService = async (id: number, payment: TIPayment) => {
  await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.payment_id, id));
  return { msg: "Payment updated successfully" };
};

// Deleting payments
export const deletePaymentsService = async (id: number) => {
  await db.delete(PaymentsTable).where(eq(PaymentsTable.payment_id, id));
  return { msg: "Payment deleted successfully" };
};


//payment with other tables

export const PaymentWithother = async () => {
  return await db.query.PaymentsTable.findMany({
    with: {
     booking:{
      columns:{
        user_id:true,
        booking_date:true,
        total_amount:true,
        booking_status:true
        
      }
     }
    }
  });
}