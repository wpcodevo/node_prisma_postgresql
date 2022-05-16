import nodemailer from 'nodemailer';
import config from 'config';
import pug from 'pug';
import { convert } from 'html-to-text';
import { Prisma } from '@prisma/client';

const smtp = config.get<{
  host: string;
  port: number;
  user: string;
  pass: string;
}>('smtp');

export default class Email {
<<<<<<< HEAD
  firstName: string;
  to: string;
  from: string;
  constructor(public user: Prisma.UserCreateInput, public url: string) {
    this.firstName = user.name.split(' ')[0];
    this.to = user.email;
    this.from = `Codevo ${config.get<string>('emailFrom')}`;
=======
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.name.split(' ')[0];
    this.#to = user.email;
    this.#from = `Codevo <admin@admin.com>`;
>>>>>>> jwt_auth_verify_email
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
<<<<<<< HEAD
    //   console.log('Hello')
=======
>>>>>>> jwt_auth_verify_email
    // }

    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
<<<<<<< HEAD
      firstName: this.firstName,
=======
      firstName: this.#firstName,
>>>>>>> jwt_auth_verify_email
      subject,
      url: this.url,
    });
    // Create mailOptions
    const mailOptions = {
<<<<<<< HEAD
      from: this.from,
      to: this.to,
=======
      from: this.#from,
      to: this.#to,
>>>>>>> jwt_auth_verify_email
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
