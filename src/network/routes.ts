import { Application } from 'express'
import { Home } from '../routes/home'

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
}

export { applyRoutes }
