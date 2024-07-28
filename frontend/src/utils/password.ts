interface IPasswordRequeriment {
  name: string;
  check: boolean;
}

export const passwordRequeriment: IPasswordRequeriment[] = [
  {
    name: 'At least 8 characters',
    check: false,
  },
  {
    name: 'At least one uppercase character',
    check: false,
  },
  {
    name: 'At least one lowercase character',
    check: false,
  },
  {
    name: 'At least one numeric character',
    check: false,
  },
  {
    name: 'At least one special character (!@#$%&^)',
    check: false,
  },
  {
    name: 'Passwords match',
    check: false,
  },
];

export const validatePassword = (
  pwd: string,
  confirm: string | undefined,
  verify: (value: IPasswordRequeriment[]) => void,
) => {
  const minLength = pwd.length >= 8;
  const hasUpperCase = /[A-Z]/.test(pwd);
  const hasLowerCase = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  const passwordMatch = pwd == confirm;

  verify([
    {
      name: 'At least 8 characters',
      check: minLength,
    },
    {
      name: 'At least one uppercase character',
      check: hasUpperCase,
    },
    {
      name: 'At least one lowercase character',
      check: hasLowerCase,
    },
    {
      name: 'At least one numeric character',
      check: hasNumber,
    },
    {
      name: 'At least one special character (!@#$%&^)',
      check: hasSpecialChar,
    },
    {
      name: 'Passwords match',
      check: passwordMatch,
    },
  ]);
};
