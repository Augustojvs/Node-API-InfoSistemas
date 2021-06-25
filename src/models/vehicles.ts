import { dbQuery, dbQueryFirst } from "../services/db"

export type Vehicle = {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

const insertVehicle = async (vehicle: Vehicle) => {
  await dbQuery(`INSERT INTO vehicle 
  (placa, chassi, renavam, modelo, marca, ano) 
  VALUES(?, ?, ?, ?, ?, ?)`, 
  [
    vehicle.placa, 
    vehicle.chassi, 
    vehicle.renavam, 
    vehicle.modelo, 
    vehicle.marca, 
    vehicle.ano
  ])

  let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'vehicle'`);
  return getVehicle(retorno[0].Id);
}

const listVehicles = async () => {
  const retorno = await dbQuery(`SELECT * from vehicle`);
  return retorno as Vehicle[];
}

const getVehicle = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM vehicle WHERE id = ?`, [id]);
  return retorno as Vehicle | undefined;
}

const deleteVehicle = async (id: number) => {
  await dbQueryFirst(`DELETE FROM vehicle WHERE id = ?`, [id]);
}

const updateVehicle = async (vehicle: Vehicle) => {
  await dbQuery(`UPDATE vehicle SET 
  placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ?`, 
  [
    vehicle.placa, 
    vehicle.chassi, 
    vehicle.renavam, 
    vehicle.modelo, 
    vehicle.marca, 
    vehicle.ano
  ])

  return getVehicle(vehicle.id);
}

export const vehicleModel = {
  insertVehicle,
  listVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle
}