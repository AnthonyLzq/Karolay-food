import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import { mailer } from '../utils/mailer'

class Server {
  public app: express.Application

  constructor () {
    this.app = express()
  }

  public start (): void {
    this._config()
    this._mail()
  }

  private _config (): void {
    this.app.set('port', process.env.PORT as string || '3000')
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        next()
      }
    )
    applyRoutes(this.app)
  }

  // private async _cron () {

  // }


  // eslint-disable-next-line class-methods-use-this
  private async _mail (): Promise<void> {
    try {
      await mailer(true, 'test', 'this is a test')
    } catch (error) {
      console.error(error)
    }
  }
}

const server = new Server()

export { server as Server }
