export const isValidEmail = (email: string): boolean => {
  // This is a more comprehensive regex for email validation
  // It still doesn't cover 100% of RFC 5322, but handles most common cases
  const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email || email.length > 254) {
    return false;
  }

  const valid = emailRegex.test(email.trim());
  if (!valid) {
    return false;
  }

  // Additional checks for common edge cases
  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false;
  }

  const domainParts = parts[1].split('.');
  if (domainParts.some(part => part.length > 63)) {
    return false;
  }

  return true;
};

export const isFormattedEmail = (str: string): boolean => {
  // Enhanced regex for quoted display names
  // Handles escaped quotes and special characters in display names
  const formattedEmailRegex = /^"((?:[^"\\]|\\[\\"'])*)"\s*<([^>]+)>$/;

  if (!formattedEmailRegex.test(str.trim())) {
    return false;
  }

  // Extract and validate the email part
  const matches = str.match(formattedEmailRegex);
  if (!matches) return false;

  const email = matches[2];
  return isValidEmail(email);
};

export const parseEmailList = (emailString: string): string => {
  if (!emailString) {
    return '';
  }

  return emailString
    .split(',')
    .map(entry => {
      const trimmed = entry.trim();

      // Case 1: Already formatted - "John Doe" <john@example.com>
      if (isFormattedEmail(trimmed)) {
        return trimmed;
      }

      // Case 2: Name:email format - John Doe:john@example.com
      if (trimmed.includes(':')) {
        const [name, email] = trimmed.split(':');
        if (!isValidEmail(email)) {
          throw new Error(`Invalid email in name:email format: ${trimmed}`);
        }
        return `"${name.trim()}" <${email.trim()}>`;
      }

      // Case 3: Plain email - john@example.com
      if (isValidEmail(trimmed)) {
        return trimmed;
      }

      throw new Error(`Invalid email format: ${trimmed}`);
    })
    .join(',');
};