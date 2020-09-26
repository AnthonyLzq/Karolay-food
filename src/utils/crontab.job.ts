/* eslint-disable default-case */
/* eslint-disable no-extra-parens */
import { CronJob } from 'cron'
import moment from 'moment-timezone'
import { mailer } from './mailer'

const TIMEZONE = process.env.TIMEZONE as string
const breakfastTimeValues = (process.env.TIME_BREAKFAST as string).split(':')
const lunchTimeValues = (process.env.TIME_LUNCH as string).split(':')
const dinnerTimeValues = (process.env.TIME_DINNER as string).split(':')

const breakfastTime = moment().set({
  hour        : parseInt(breakfastTimeValues[0]),
  milliseconds: parseInt(breakfastTimeValues[3]),
  minute      : parseInt(breakfastTimeValues[1]),
  second      : parseInt(breakfastTimeValues[2])
})

const lunchTime = moment().set({
  hour        : parseInt(lunchTimeValues[0]),
  milliseconds: parseInt(lunchTimeValues[3]),
  minute      : parseInt(lunchTimeValues[1]),
  second      : parseInt(lunchTimeValues[2])
})

const dinnerTime = moment().set({
  hour        : parseInt(dinnerTimeValues[0]),
  milliseconds: parseInt(dinnerTimeValues[3]),
  minute      : parseInt(dinnerTimeValues[1]),
  second      : parseInt(dinnerTimeValues[2])
})

const foodSelector = (food: string): moment.Moment | undefined => {
  switch (food) {
    case 'breakfast':
      return breakfastTime
    case 'lunch':
      return lunchTime
    case 'dinner':
      return dinnerTime
    default:
      return undefined
  }
}

const suitableCronJob = (
  selectedFoodTime: moment.Moment,
  food            : string,
  message         : string | null,
  attempts        : number
): CronJob => {
  new CronJob(
    moment(selectedFoodTime.format()).add(30, 'seconds'),
    async () => {
      try {
        await mailer(false, food, null, attempts)
      } catch (error) {
        console.error(error)
      }
    }
  ).start()

  console.log(TIMEZONE)
  console.log(selectedFoodTime)

  return new CronJob(
    selectedFoodTime,
    async () => {
      try {
        await mailer(true, food, message, attempts)
      } catch (error) {
        console.error(error)
      }
    },
    null,
    false,
    TIMEZONE
  )
}

const cronJob = (attempts: number, food: string): void => {
  const selectedFoodTime = foodSelector(food) as moment.Moment
  if (selectedFoodTime > moment())
    switch (attempts) {
      case 0:
        suitableCronJob(
          selectedFoodTime,
          food,
          `Hey honey, don't forget to have your ${food}!`,
          attempts + 1
        ).start()
        selectedFoodTime.add(15, 'minutes')
        cronJob(1, food)
        break
      case 1:
        suitableCronJob(
          selectedFoodTime,
          food,
          `Hey honey, have you eaten your ${food}? Time is running!`,
          attempts + 1
        ).start()
        selectedFoodTime.add(15, 'minutes')
        cronJob(2, food)
        break
      case 2:
        suitableCronJob(
          selectedFoodTime,
          food,
          `Hey honey! It's almost time, are you having ${food}?`,
          attempts + 1
        ).start()
        selectedFoodTime.add(15, 'minutes')
        cronJob(3, food)
        break
      case 3:
        suitableCronJob(
          selectedFoodTime,
          food,
          `Hey honey! You should be eating your ${food} right now, I hope your are, I love you.`,
          attempts + 1
        ).start()
    }
}

export { cronJob }
