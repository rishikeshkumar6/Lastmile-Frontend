import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "full name can only contain alphabetic characters"
    )
    .required("Full name is a required field"),
  phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is a required field"),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is a required field"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain one or more uppercase letters")
    .matches(/[a-z]/, "Password must contain one or more lowercase letters")
    .matches(/[0-9]/, "Password must contain one or more numeric characters")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain one or more special characters"
    )
    .min(8, "Password must be at least 8 characters long")
    .required("Password is a required field"),
});

export const loginFormSchema = Yup.object().shape({
  loginMethod: Yup.string()
    .oneOf(["email", "phonenumber"], "Invalid login method")
    .required("Login method is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .test("email-required", "Email is required", function (value) {
      console.log("this.parent", this.parent);
      const { loginMethod } = this.parent;
      console.log("email", !!value);
      return loginMethod === "email" ? !!value : true; // Required if loginMethod is "email"
    }),

  phonenumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .test("phone-required", "Phone number is required", function (value) {
      console.log("phonenumber", !!value);
      console.log("value", !!value);
      const { loginMethod } = this.parent;
      return loginMethod === "phonenumber" ? !!value : true; // Required if loginMethod is "phonenumber"
    }),
  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain one or more uppercase letters")
    .matches(/[a-z]/, "Password must contain one or more lowercase letters")
    .matches(/[0-9]/, "Password must contain one or more numeric characters")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain one or more special characters"
    )
    .min(8, "Password must be at least 8 characters long"),
});

export const data = [
  "password must contain one or more upper alphabetic characters",
  "password must contain one or more lower alphabetic characters",
  "password must contain one or more numeric characters",
  "password must contain one or more special characters",
  "password length must be at least eight characters",
];
