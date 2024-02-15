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
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.name.split(' ')[0];
    this.#to = user.email;
    this.#from = `Codevo <admin@admin.com>`;
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
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
    try {
      // Generate HTML template based on the template string
      const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
        firstName: this.#firstName,
        subject,
        url: this.url,
      });

      // Create mailOptions
      const mailOptions = {
        from: this.#from,
        to: this.#to,
        subject,
        text: convert(html),
        html,
      };

      // Send email
      const info = await this.newTransport().sendMail(mailOptions);
      console.log(nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Error during send mail :', error);
    }
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
