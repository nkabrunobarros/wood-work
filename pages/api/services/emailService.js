import { omit } from 'lodash';
import nodemailer from 'nodemailer';

export async function sendMail (input) {
  const server = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: null
  };

  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    server.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    };
  }

  ;

  const transporter = nodemailer.createTransport(server);

  const message = {
    from: input.remetente,
    to: input.destinatario,
    subject: input.assunto,
    html: input.conteudo
  };

  try {
    const x = await transporter.sendMail(message);

    await this.prisma.email.create({ data: { ...omit(input), enviado: true, mensagem: x.response, messageId: x.messageId } });

    return true;
  } catch (e) {
    await this.prisma.email.create({ data: { ...omit(input), enviado: false, mensagem: e.message } });

    // console.log(e)
    return false;
  }
}
