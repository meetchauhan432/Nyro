export const MAX_OTP_ATTEMPTS = 5;

export function isValidOtpShape(code) {
  return typeof code === 'string' && /^\d{6}$/.test(code);
}

export function maskMobile(mobile) {
  const number = mobile.trim();
  return /^\d{10}$/.test(number) ? `+91 ${number.slice(0, 2)}•••••${number.slice(-3)}` : '';
}

export function nextAttemptState(previousAttempts) {
  const attempts = Math.min(previousAttempts + 1, MAX_OTP_ATTEMPTS);
  return { attempts, locked: attempts === MAX_OTP_ATTEMPTS };
}
