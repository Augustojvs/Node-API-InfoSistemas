import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import { Vehicle, vehicleModel } from '../models/vehicles';

const insertVehicle = async (req: Request, res: Response) => {
  const vehicle = req.body as Vehicle;

  if (!vehicle) {
    throw new AppError('Veiculo inválido');
  }
  if (!vehicle.placa) {
    throw new AppError('Informe a placa do veículo');
  }
  if (!vehicle.chassi) {
    throw new AppError('Informe o chassi do veículo');
  }
  if (!vehicle.renavam) {
    throw new AppError('Informe o renavam do veículo');
  }
  if (!vehicle.modelo) {
    throw new AppError('Informe o modelo do veículo');
  }
  if (!vehicle.marca) {
    throw new AppError('Informe a marca do veículo');
  }
  if (!vehicle.ano) {
    throw new AppError('Informe o ano do veículo');
  }
  
  try {
    const newVehicle = await vehicleModel.insertVehicle(vehicle);
    return res.json(newVehicle).status(201);
  } catch (error) {
    throw new AppError('Erro ao salvar veiculo', 500);
  }
}

const listVehicles = async (req: Request, res: Response) => {
  
  try { 
    const list = await vehicleModel.listVehicles();
    return res.json(list);
  } catch (error) {
    throw new AppError('Erro ao listar os veiculos', 500);
  }
}

const getVehicle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    throw new AppError('Id inválido');
  }
  
  try { 
    const getOne = await vehicleModel.getVehicle(id);
    return res.json(getOne);
  } catch (error) {
    throw new AppError('Veiculo não encontrado');
  }
  
}

const deleteVehicle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    throw new AppError('Id inválido');
  }
  
  const getVehicle = await vehicleModel.getVehicle(id);
  if (!getVehicle) {
    throw new AppError('Id não encontrado');
  }
  
  try {
    const getVehicle = await vehicleModel.deleteVehicle(id)
    return res.json(getVehicle);
  } catch (error) {
    throw new AppError('Falha ao remover veiculo');
  }
}

const updateVehicle = async (req: Request, res: Response) => {
  
  const id = parseInt(req.params.id);
  const vehicle = req.body as Vehicle;

  if (!id) {
    throw new AppError('Id inválido');
  }
  if (!vehicle) {
    throw new AppError('Veiculo inválido');
  }
  if (!vehicle.placa) {
    throw new AppError('Informe a placa do veículo');
  }
  if (!vehicle.chassi) {
    throw new AppError('Informe o chassi do veículo');
  }
  if (!vehicle.renavam) {
    throw new AppError('Informe o renavam do veículo');
  }
  if (!vehicle.modelo) {
    throw new AppError('Informe o modelo do veículo');
  }
  if (!vehicle.marca) {
    throw new AppError('Informe a marca do veículo');
  }
  if (!vehicle.ano) {
    throw new AppError('Informe o ano do veículo');
  }
  
  const vehicleSaved = await vehicleModel.getVehicle(id);
  if (!vehicleSaved) {
    throw new AppError('Veículo não encontrado');
  }
  
  try {
    const getVehicle = await vehicleModel.updateVehicle(vehicle)
    return res.json(getVehicle);
  } catch (error) {
    throw new AppError('Falha ao atualizar veiculo');
  }
}

export const vehicleController = {
  insertVehicle,
  listVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle
}