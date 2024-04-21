const sd = {
  stausInvalid: "invalid",
  statusValid: "valid",
  longFirstName: "user name must be shorter than 20 charactes long",
  longLastName: "user last name must be shorter than 20 charactes long",
  weakPassword: `Password should contain at least a capital letter \n
  Should contain at least a small letter\n
  Should contain at least a number\n
  Should contain at least a special character \n
  And minimum length 8`,
  passwordDontMatch: "password dont match",
  inavlidEmial: "email is invalid",
};
export function ValidateSingUp({
  firstname,
  lastname,
  password,
  passwordagain,
  email,
}) {
  if (firstname.length > 20)
    return { status: sd.stausInvalid, message: sd.longFirstName };
  if (lastname.length > 20)
    return { status: sd.stausInvalid, message: sd.longLastName };

  const epx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
  if (!password.match(epx))
    return { status: sd.stausInvalid, message: sd.weakPassword };
  if (password != passwordagain)
    return { status: sd.stausInvalid, message: sd.passwordDontMatch };

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex))
    return { status: sd.stausInvalid, message: sd.inavlidEmial };

  return { status: sd.statusValid };
}
