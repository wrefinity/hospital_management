import Swal from "sweetalert2";

export const Notifier = (mess, icn, timer=1500) => {
  Swal.fire({
    position: "top-end",
    icon: icn,
    title:mess,
    showConfirmButton: false,
    timer: timer
  });
}

export const handleInput = (e, setHook) => {
  const { name, value } = e.target;
  setHook((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const truncate = (description, num) => {
  if (description.length > num) {
    let subStr = description.substring(0, num);
    return subStr + "...";
  } else {
    return description;
  }
};

export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.password) {
    errors.password = "password required";
  } else if (values.password.length < 6) {
    errors.password = "password length must exceed 6 character";
  }
  if (values.hasOwnProperty("confirm_password") && !values.confirm_password) {
    errors.confirm_password = "confirm password required";
  } else if (
    values.hasOwnProperty("confirm_password") &&
    values.confirm_password.length < 6
  ) {
    errors.confirm_password = "password length must exceed 6 character";
  } else if (
    values.hasOwnProperty("confirm_password") &&
    values.confirm_password !== values.password
  ) {
    errors.confirm_password = "password do not match";
  }

  if (!values.email) {
    errors.email = "email required";
  } else if (!regex.test(values.email)) {
    errors.email = "invalid email address";
  }

  return errors;
};

export const validateEmpty = (values) => {
  const errors = {};
  for (let x in values) {
    if (values[x] === "") {
      errors.all = "All fields required";
      break;
    }
  }
  return errors;
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const loaderColor = "#dc3545";
export const loaderSize = "120";