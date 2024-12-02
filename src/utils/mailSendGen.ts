import { SentMessageInfo, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { parseEmailList } from './mailStrings';

export type SendMailGenConfig = { defaultFromName: string, user: string, commaSeparatedToAddresses?: string; commaSeparatedAdminAddresses?: string; transporter: Transporter };

export const mailSendGen = ({ defaultFromName, user, commaSeparatedToAddresses, commaSeparatedAdminAddresses, transporter }: SendMailGenConfig) => {
  return async function mailSend(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    const finalMailOptions = {
      from: `"${defaultFromName}️" <${user}>`,
      to: (commaSeparatedToAddresses && parseEmailList(commaSeparatedToAddresses)) || undefined,
      bcc: (commaSeparatedAdminAddresses && parseEmailList(commaSeparatedAdminAddresses)) || undefined,
      ...mailOptions,
    };
    try {
      return await new Promise((resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
        transporter.sendMail(finalMailOptions, function (err, info) {
          if (err) reject(err);
          resolve(info);
        });
      });
    } catch (e) {
      throw e;
    }
  }
}

export type SendMailGenerator = typeof mailSendGen;
export type SendMail = ReturnType<SendMailGenerator>;

export default mailSendGen;