export const phoneFormat = (numberToFormat: string): string => {
  const digits = numberToFormat?.replace(/^\+55/g, '');

  const match = digits?.match(/^(\d{2})(\d{5})(\d{4})$/);

  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : numberToFormat;
};

export const handlePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[() -\s]/g, '');
