import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("enter a valid email").required("enter email"),
  password: Yup.string()
    .min(8, "cannot be less than 8")
    .max(30, "")
    .required("enter password"),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "enter a valid name")
    .max(30, "")
    .required("enter name to signup"),
  email: Yup.string().email("enter your email").required("enter email"),
  password: Yup.string()
    .min(8, "cannot be less than 8")
    .max(30, "")
    .required("enter password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords don't match"
  ),
});

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "oops too short").max(30, "a little too long"),
  lastName: Yup.string().min(3, "oops too short").max(30, "a little too long"),
  phone: Yup.string().min(11, "enter a valid phone number").max(14, ""),
  email: Yup.string().email("enter your email").required("enter email"),
});

export const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6, "oops too short").max(30, ""),
  newPassword: Yup.string()
    .min(6, "oops too short")
    .max(30, "")
    .required("enter new password"),
  confirmPassword: Yup.string()
    .min(6, "enter a valid phone number")
    .max(30, "")
    .required("confirm password"),
});

export const shippingValidationSchema = Yup.object().shape({
  address: Yup.string().min(3, "oops too short").max(50, "a little too long"),
  phone: Yup.string()
    .min(11, "enter a valid phone number")
    .max(14, "")
    .required("enter phone number"),
  email: Yup.string().email("enter your email").required("enter email"),
  location: Yup.string()
    .min(3, "enter a valid location")
    .max(30, "a little too long")
    .required("enter location"),
  state: Yup.string()
    .min(3, "enter a valid state")
    .max(30, "a little too long")
    .required("enter state"),
});

export const shippingDetailsValidationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "").max(20, "oops thats long"),
  lastName: Yup.string().min(2, "").max(20, "oops thats long"),
  phone: Yup.string().min(11, "enter a phone number").max(15, "mistake?"),
  email: Yup.string().email("enter your email"),
  location: Yup.string()
    .min(3, "enter a valid location")
    .max(10, "enter a valid location"),
  state: Yup.string().min(2).max(15),
  address: Yup.string()
    .min(10, "enter a valid address")
    .max(500, "must be less than 50"),
  notes: Yup.string().max(50, "that's a little long"),
});
