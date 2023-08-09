import React from "react";
import axios from "axios";
import * as Yup from "yup";
function Form() {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
    // required isn't required for checkboxes.
  });

  return (
    <form>
      <ul>
        <li>
          <label htmlFor="isim">İsim</label>
          <input id="isim" type="text" name="isim"></input>
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"></input>
        </li>
        <li>
          <label htmlFor="sifre">Şifre</label>
          <input id="sifre" type="text" name="sifre"></input>
        </li>
        <li>
          <label htmlFor="terms">Kullanım Şartlarını onaylıyorum</label>
          <input id="terms" type="checkbox" name="terms"></input>
        </li>
        <li>
          <button type="submit">Gönder</button>
        </li>
      </ul>
    </form>
  );
}

export default Form;
