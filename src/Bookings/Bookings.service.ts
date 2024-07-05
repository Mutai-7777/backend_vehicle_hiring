import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIBooking, TSBooking } from '../drizzle/schema';
import { BookingsTable } from '../drizzle/schema';

export const bookingsService = async (): Promise<TSBooking[] | null> => {
  return await db.query.BookingsTable.findMany();
};

export const getBookingsService = async (id: number): Promise<TIBooking | undefined> => {
  return await db.query.BookingsTable.findFirst({
    where: eq(BookingsTable.booking_id, id),
    with:{
      location:true,
      vehicle:{
        columns:{
          vehicle_id:true
        
          
        }

      }
    }
  });
};

// Creating a new booking
export const createBookingsService = async (booking: TIBooking) => {
  await db.insert(BookingsTable).values(booking);
  return { msg: "User created successfully" };
};


// Updating booking
export const updateBookingsService = async (id: number, booking: TIBooking) => {
  await db.update(BookingsTable).set(booking).where(eq(BookingsTable.booking_id, id));
  return { msg: "User updated successfully" };
};

// Deleting booking
export const deleteBookingsService = async (id: number) => {
  await db.delete(BookingsTable).where(eq(BookingsTable.booking_id, id));
  return { msg: "User deleted successfully" };
};



/////booking with other Tables

export const BookingTableWithOtherTables = async()=>{

  return await db.query.BookingsTable.findMany({

    with:{
      location:true,
      vehicle:{
        columns:{
          vehicle_id:true
        
          
        }

      }
    }
  })
}