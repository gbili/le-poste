import { LoadDictElement } from 'di-why/build/src/DiContainer';
import { Transporter } from 'nodemailer';
import mailSendGen, { SendMail, SendMailGenerator } from '../utils/mailSendGen';
import { MailConfig } from './mailConfig';
import { TransporterConfig } from './mailTransporterConfig';

type MailFactoryParams = { mailConfig: MailConfig }
  & { mailSendGen: SendMailGenerator; }
  & { transporter: Transporter; }
  & { transporterConfig: TransporterConfig; };

const loadDictElement: LoadDictElement<SendMail> = {

  factory: function ({
    transporter,
    mailConfig: { defaultFromName, commaSeparatedToAddresses, commaSeparatedAdminAddresses },
    transporterConfig: { user }
  }: MailFactoryParams) {

    return mailSendGen({
      user: user,
      defaultFromName,
      commaSeparatedToAddresses,
      commaSeparatedAdminAddresses: commaSeparatedAdminAddresses || undefined,
      transporter,
    });

  },

  deps: {
    mailSendGen,
  },

  locateDeps: {
    mailConfig: 'mailConfig',
    transporter: 'mailTransporter',
    transporterConfig: 'mailTransporterConfig',
  },

};

export default loadDictElement;