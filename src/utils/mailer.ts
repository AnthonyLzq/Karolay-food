import nodemailer from 'nodemailer'

const {
  EMAIL_RECEPTOR_1,
  EMAIL_RECEPTOR_2,
  EMAIL_SENDER,
  PASSWORD
} = process.env

const mailer = async (
  isForKarolay : boolean,
  food         : string,
  message      : string | null,
  messageNumber: number | null = null
): Promise<void> => {
  let subject: string
  const transporter = nodemailer.createTransport({
    auth: {
      pass: PASSWORD as string,
      user: EMAIL_SENDER as string
    },
    service: 'Gmail'
  })

  switch (food) {
    case 'breakfast':
      subject = `BREAKFAST TIME! REMINDER ${messageNumber}/4!`
      break
    case 'lunch':
      subject = `LUNCH TIME! REMINDER ${messageNumber}/4!`
      break
    case 'dinner':
      subject = `DINNER TIME! REMINDER ${messageNumber}/4!`
      break
    default:
      subject = 'Mail delivered to Karolay'
  }

  let mailOptions: Record<string, unknown>

  if (isForKarolay)
    mailOptions = {
      from  : `Your bbsito <${EMAIL_SENDER as string}>`,
      sender: EMAIL_SENDER as string,
      subject,
      text  : message,
      to    : EMAIL_RECEPTOR_1 as string
    }
  else
    mailOptions = {
      from  : `Heroku server <${EMAIL_SENDER as string}>`,
      sender: EMAIL_SENDER as string,
      subject,
      text  : `Food: ${food}.\nAttempt: ${messageNumber}.`,
      to    : EMAIL_RECEPTOR_2 as string
    }

  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('Everything went ok')
    console.log(result)
  } catch (err) {
    console.error(err)
    throw new Error('Error while sending the email.')
  }
}

export { mailer }
