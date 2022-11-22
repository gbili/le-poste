import { LoadDictElement } from 'di-why/build/src/DiContainer';
import { getKeyOrThrow, hasKey } from 'swiss-army-knifey';

export type MailConfig = {
  defaultFromName: string;
  commaSeparatedAdminAddresses?: string;
  commaSeparatedToAddresses: string;
}

const loadDictElement: LoadDictElement<MailConfig> = {
  instance: {
    defaultFromName: getKeyOrThrow(process.env, 'MAIL_FROM_NAME', 'John Hoo'),
    commaSeparatedAdminAddresses: (hasKey(process.env, 'MAIL_ADMIN_TO_COMMA_LIST') && getKeyOrThrow(process.env, 'MAIL_ADMIN_TO_COMMA_LIST', 'This is a bug should not throw')) || undefined,
    commaSeparatedToAddresses: getKeyOrThrow(process.env, 'MAIL_TO_COMMA_LIST', 'Ex: "Some Name" <some@web.com>,"Othern Name" <other@web.com>'),
  },
};

export default loadDictElement;