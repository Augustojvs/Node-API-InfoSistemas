import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import { Vehicle, vehicleModel } from '../models/vehicles';
import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/utils';

const insertVehicle = async (req: Request, res: Response) => {
  {
    const vehicle = req.body;
    if (!vehicle) {
      return badRequest(res, "Veiculo inválido");
    }
    if (!vehicle.placa) {
      return badRequest(res, "Informe a placa do veículo");
    }
    if (!vehicle.chassi) {
      return badRequest(res, "Informe o chassi do veículo");
    }
    if (!vehicle.renavam) {
      return badRequest(res, "Informe o renavam do veículo");
    }
    if (!vehicle.modelo) {
      return badRequest(res, "Informe o modelo do veículo");
    }
    if (!vehicle.marca) {
      return badRequest(res, "Informe a marca do veículo");
    }
    if (!vehicle.ano) {
      return badRequest(res, "Informe o ano do veículo");
    }
  }

  const vehicle = req.body as Vehicle;
  await vehicleModel.insertVehicle(vehicle)
    .then(vehicle => {
      res.json(vehicle);
    })
    .catch(err => internalServerError(res, err));
}

const listVehicles = (req: Request, res: Response) => {
  vehicleModel.listVehicles()
  .then(vehicles => {
    res.json(vehicles)
  })
  .catch(err => internalServerError(res, err));
}

const getVehicle = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!validateNumber(id)) {
    return badRequest(res, "Id inválido");
  }

  vehicleModel.getVehicle(id)
  .then((vehicle) => {
    if (vehicle) {
      return res.json(vehicle);
    } else {
      return notFound(res);
    }
  })
  .catch(err => internalServerError(res, err));
}

const deleteVehicle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!validateNumber(id)) {
    return badRequest(res, "Id inválido");
  }

  const getVehicle = await vehicleModel.getVehicle(id);
  if (!getVehicle) {
    return notFound(res);
  }

  await vehicleModel.deleteVehicle(id)
  .then(() => ok(res))
  .catch(err => internalServerError(res, err));
}

const updateVehicle = async (req: Request, res: Response) => {
  {
    const id = parseInt(req.params.id);
    const vehicle = req.body;

    if (!validateNumber(id)) {
      return badRequest(res, "Id inválido");
    }
    if (!vehicle) {
      return badRequest(res, "Veiculo inválido");
    }
    if (!vehicle.placa) {
      return badRequest(res, "Informe a placa do veículo");
    }
    if (!vehicle.chassi) {
      return badRequest(res, "Informe o chassi do veículo");
    }
    if (!vehicle.renavam) {
      return badRequest(res, "Informe o renavam do veículo");
    }
    if (!vehicle.modelo) {
      return badRequest(res, "Informe o modelo do veículo");
    }
    if (!vehicle.marca) {
      return badRequest(res, "Informe a marca do veículo");
    }
    if (!vehicle.ano) {
      return badRequest(res, "Informe o ano do veículo");
    }

    const vehicleSaved = await vehicleModel.getVehicle(id);
    if (!vehicleSaved) {
      return notFound(res);
    }
  }

  const vehicle = req.body as Vehicle;
  await vehicleModel.updateVehicle(vehicle)
    .then(vehicle => {
      res.json(vehicle)
    })
    .catch(err => internalServerError(res, err));
}

export const vehicleController = {
  insertVehicle,
  listVehicles,
  getVehicle,
  deleteVehicle,
  updateVehicle
}