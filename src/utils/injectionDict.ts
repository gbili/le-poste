import mailConfig from "../loaders/mailConfig";
import mailSend from "../loaders/mailSend";
import mailTransporter from "../loaders/mailTransporter";
import mailTransporterConfig from "../loaders/mailTransporterConfig";

export const mailInjectionDict = {
  mailConfig,
  mailSend,
  mailTransporter,
  mailTransporterConfig,
};

export default mailInjectionDict;