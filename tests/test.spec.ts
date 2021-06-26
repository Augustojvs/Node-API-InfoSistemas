import { assert, expect } from 'chai';
import AppError from '../src/errors/AppError';

import { Vehicle, vehicleModel } from '../src/models/vehicles';

describe('Vehicle CRUD', () => {
  describe('Insert Vehicle', () => {
    it('Should return the vehicle', async () => {
      
      const vehicle = {
        placa: 'ABC-1234',
        chassi: '112233445566778899',
        renavam: '998877665544332211',
        modelo: 'Carro',
        marca: '4 rodas',
        ano: '2030' 
      } as Vehicle;
  
      const newVehicle = await vehicleModel.insertVehicle(vehicle);
  
      expect(newVehicle).to.have.property('id');
    });
    
    it('Should not return the vehicle', async () => {
      const vehicle = {
        placa: 'ABC-1234',
        renavam: '998877665544332211',
        modelo: 'Carro',
        marca: '4 rodas',
        ano: '2030' 
      } as Vehicle;
  
      vehicleModel.insertVehicle(vehicle).catch(err => assert.instanceOf(err, AppError));
    });
  });

  describe('List Vehicles', () => {
    it('Should list the vehicles', async () => {
      const vehicleList = await vehicleModel.listVehicles();

      expect(vehicleList).to.be.an('array');
    })
  })
  
  describe('Get Vehicle', () => {
    it('Should get the vehicle', async () => {

      const vehicle = {
        id: 4,
        placa: 'ABC-1234',
        chassi: '112233445566778899',
        renavam: '998877665544332211',
        modelo: 'Carro',
        marca: '4 rodas',
        ano: '2030' 
      } as Vehicle;

      const getVehicle = await vehicleModel.getVehicle(vehicle.id);

      expect(getVehicle).to.have.property('id').that.is.a('number');
    })
  })
  
  describe('Update Vehicle', () => {
    it('Should update the vehicle', async () => {

      const vehicle = {
        id: 4,
        placa: 'xyz-4321',
        chassi: 'b56d1xsa6c5b16a54x1cb6',
        renavam: 'd146b5165c1s61n6cvn',
        modelo: 'marea',
        marca: 'FIAT',
        ano: '2018' 
      } as Vehicle;

      const getVehicle = await vehicleModel.updateVehicle(vehicle);

      expect(getVehicle).to.have.property('id').that.is.a('number');
    })
  })
  
  describe('Delete Vehicle', () => {
    it('Should remove the vehicle', async () => {

      const vehicle = {
        id: 5
      } as Vehicle;

      const excludedVehicle = await vehicleModel.deleteVehicle(vehicle.id);
      console.log(excludedVehicle)

      expect(excludedVehicle).to.be.undefined;
    })
  })
})