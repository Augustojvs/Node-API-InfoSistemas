import { Application, Router } from "express";
import { vehicleRouter } from "./vehicles";


export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use('/vehicles', vehicleRouter);

  app.use('/api/info', apiRouter);
}