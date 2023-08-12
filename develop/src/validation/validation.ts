/* ----- валидация поля логина ----- */
export function userLoginValidate(login: string): boolean {
  const mailFormat: RegExp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return mailFormat.test(login);
}

/* ----- валидация поля пароля ----- */
export function userPasswordValidate(password: string): boolean {
  const passwordFormat: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return passwordFormat.test(password);
}
