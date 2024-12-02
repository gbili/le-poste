import { expect } from 'chai';
import { isValidEmail, isFormattedEmail } from '../../src/utils/mailStrings';

describe('Email Validator', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.com',
        'user+label@domain.com',
        'user-name@domain.co.uk'
      ];
      validEmails.forEach(email => {
        expect(isValidEmail(email)).to.be.true;
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@domain.com',
        'test@domain',
        'test@.com',
        'test@domain..com'
      ];
      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).to.be.false;
      });
    });
  });

  describe('isFormattedEmail', () => {
    it('should validate correctly formatted email strings', () => {
      const validFormats = [
        '"John Doe" <john@example.com>',
        '"User Name" <user.name@domain.com>'
      ];
      validFormats.forEach(format => {
        expect(isFormattedEmail(format)).to.be.true;
      });
    });

    it('should reject invalid formatted email strings', () => {
      const invalidFormats = [
        'John Doe <john@example.com>',
        '"John Doe" john@example.com',
        'john@example.com',
        '"John Doe" <invalid-email>'
      ];
      invalidFormats.forEach(format => {
        expect(isFormattedEmail(format)).to.be.false;
      });
    });
  });

});