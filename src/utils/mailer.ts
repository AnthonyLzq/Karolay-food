/* eslint-disable default-case */
import nodemailer from 'nodemailer'

const {
  EMAIL_RECEPTOR_1,
  EMAIL_RECEPTOR_2,
  EMAIL_SENDER,
  PASSWORD
} = process.env

const mailer = async (
  error  : boolean,
  food   : string,
  message: string
): Promise<void> => {
  let subject = ''
  const transporter = nodemailer.createTransport({
    auth: {
      pass: PASSWORD as string,
      user: EMAIL_SENDER as string
    },
    service: 'Gmail'
  })

  if (error)
    subject = 'Error'
  else
    switch (food) {
      case 'breakfast':
        subject = "BREAKFAST TIME!"
        break
      case 'lunch':
        subject = "LUNCH TIME!"
        break
      case 'dinner':
        subject = "DINNER TIME!"
    }

  const mailOptions = {
    from  : `Tu bbsito <${EMAIL_SENDER as string}>`,
    sender: EMAIL_SENDER as string,
    subject,
    text  : message,
    to    : error ? EMAIL_RECEPTOR_2 as string : EMAIL_RECEPTOR_1 as string
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.error(err)
    throw new Error('Error while sending the email.')
  }
}

export { mailer }
