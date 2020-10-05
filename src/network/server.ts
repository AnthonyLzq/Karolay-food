import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import { cronJob } from '../utils/crontab.job'
import { reminder } from '../utils/alarm.clock'

class Server {
  public app: express.Application
  private _foods: string[]

  constructor () {
    this.app = express()
    // eslint-disable-next-line no-extra-parens
    this._foods = (process.env.FOODS as string).split(':')
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

  private async _mail (): Promise<void> {
    this._foods.forEach((food: string) => {
      cronJob(0, food)
    })
  }

  public start (): void {
    this._config()
    this.app.listen(this.app.get('port'), () =>
      console.log(`Server running at port ${this.app.get('port')}`)
    )
    this._mail()
    // reminder()
  }
}

const server = new Server()

export { server as Server }
