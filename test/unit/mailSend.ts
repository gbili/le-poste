import 'dotenv';
import { expect } from 'chai';
import DiContainer from 'di-why';
import { mailInjectionDict } from '../../src';
import { logger } from 'saylo';
import { SendMail } from '../../src/utils/mailSendGen';

describe('getRootDir', function () {
  describe(`getRootDir(__dirname)`, function() {
    it(`should send an email`, async function() {

      const di = new DiContainer({ logger, load: mailInjectionDict });
      await di.loadAll();
      const mailSend: SendMail = await di.get('mailSend');

      const a = mailSend({ subject: 'Hello', text: 'Some text' });
      expect(a).to.eventually.haveOwnProperty('accepted');
    });
  });
});

