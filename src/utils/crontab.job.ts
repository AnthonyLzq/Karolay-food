/* eslint-disable no-extra-parens */
// import { CronJob } from 'cron'
import moment from 'moment-timezone'

const breakfastTimeValues = (process.env.TIME_BREAKFAST as string).split(':')
const lunchTimeValues = (process.env.TIME_LUNCH as string).split(':')
const dinnerTimeValues = (process.env.TIME_DINNER as string).split(':')

moment.tz.setDefault('America/Lima')

const breakfastTime = moment()
  .set({
    hour        : parseInt(breakfastTimeValues[0]),
    milliseconds: parseInt(breakfastTimeValues[3]),
    minute      : parseInt(breakfastTimeValues[1]),
    second      : parseInt(breakfastTimeValues[2])
  })

const lunchTime = moment()
  .set({
    hour        : parseInt(lunchTimeValues[0]),
    milliseconds: parseInt(lunchTimeValues[3]),
    minute      : parseInt(lunchTimeValues[1]),
    second      : parseInt(lunchTimeValues[2])
  })

const dinnerTime = moment()
  .set({
    hour        : parseInt(dinnerTimeValues[0]),
    milliseconds: parseInt(dinnerTimeValues[3]),
    minute      : parseInt(dinnerTimeValues[1]),
    second      : parseInt(dinnerTimeValues[2])
  })

console.log(breakfastTime)
console.log(lunchTime)
console.log(dinnerTime)

// const crontabJobs = () => {
//   const breakfast = new CronJob()
// }

// export { crontabJobs }
