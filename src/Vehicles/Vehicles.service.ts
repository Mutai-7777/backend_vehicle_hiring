import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIVehicle, TSVehicle } from '../drizzle/schema';
import { VehiclesTable } from '../drizzle/schema';

export const VehiclesService = async (): Promise<TSVehicle[] | null> => {
  return await db.query.VehiclesTable.findMany();
};

export const getVehiclesService = async (id: number): Promise<TIVehicle | undefined> => {
  return await db.query.VehiclesTable.findFirst({
    where: eq(VehiclesTable.vehicleSpec_id, id)
  });
};

// Creating a new vehicle
export const createVehiclesService = async (vehicle: TIVehicle) => {
  await db.insert(VehiclesTable).values(vehicle);
  return { msg: "User created successfully" };
};

// Updating vehicle
export const updateVehiclesService = async (id: number, vehicle: TIVehicle) => {
  await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleSpec_id, id));
  return { msg: "User updated successfully" };
};

// Deleting vehicle
export const deleteVehiclesService = async (id: number) => {
  await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleSpec_id, id));
  return { msg: "User deleted successfully" };
};



///vehicle with other tables


export const VehicleTableWithOtherTables = async()=>{

  return await db.query.VehiclesTable.findMany({

    with:{
      
    }
  })
}