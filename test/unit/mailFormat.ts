import { expect } from 'chai';
import { parseEmailList } from '../../src/utils/mailStrings';

describe('Email Parser', () => {
  describe('parseEmailList', () => {
    it('should handle empty input', () => {
      expect(parseEmailList('')).to.equal('');
    });

    it('should handle already formatted emails', () => {
      const input = '"John Doe" <john@example.com>,"Jane Smith" <jane@example.com>';
      expect(parseEmailList(input)).to.equal(input);
    });

    it('should transform name:email format', () => {
      const input = 'John Doe:john@example.com,Jane Smith:jane@example.com';
      const expected = '"John Doe" <john@example.com>,"Jane Smith" <jane@example.com>';
      expect(parseEmailList(input)).to.equal(expected);
    });

    it('should handle plain email addresses', () => {
      const input = 'john@example.com,jane@example.com';
      expect(parseEmailList(input)).to.equal(input);
    });

    it('should handle mixed formats', () => {
      const input = 'John Doe:john@example.com,"Jane Smith" <jane@example.com>,bob@example.com';
      const expected = '"John Doe" <john@example.com>,"Jane Smith" <jane@example.com>,bob@example.com';
      expect(parseEmailList(input)).to.equal(expected);
    });

    it('should throw error for invalid email in name:email format', () => {
      const input = 'John Doe:invalid-email';
      expect(() => parseEmailList(input)).to.throw('Invalid email in name:email format');
    });

    it('should throw error for invalid email format', () => {
      const input = 'not-an-email';
      expect(() => parseEmailList(input)).to.throw('Invalid email format');
    });
  });
});