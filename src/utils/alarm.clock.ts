import axios from 'axios'
import setImmediateInterval from 'set-immediate-interval'

const { NUMBER_OF_UPDATES, SERVER_URL, TIME_TO_UPDATE } = process.env

const reminder = (): void => {
  let attempts = 0
  const intervalId = setImmediateInterval(async () => {
    try {
      await axios({
        url: SERVER_URL as string
      })
      if (++attempts === parseInt(NUMBER_OF_UPDATES as string))
        clearInterval(intervalId)
    } catch (error) {
      console.error(error)
    }
  }, parseInt(TIME_TO_UPDATE as string))
}

export { reminder }
