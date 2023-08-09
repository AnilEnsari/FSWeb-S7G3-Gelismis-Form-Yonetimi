import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
function Form() {
  const [isFormvalid, setFormvalid] = useState(false);
  const loginDataStarter = {
    email: "",
    password: "",
    terms: false,
  };

  const [loginData, setLoginData] = useState(loginDataStarter);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });
  const [isFormValid, setFormValid] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçerli bir email adresi girmezsen küserim.")
      .required("Aradığnız kişiye şu anda ulaşılamıyor"),
    password: Yup.string()
      .required("Şifre önemlidir!")
      .min(6, "Hacklenmek mi istiyorsun ? 6 karakterden az şifre mi olur ?"),
    terms: Yup.boolean().oneOf(
      [true],
      "Bu koşulları onaylamazsan görüşebilmemiz mümkün değil!"
    ),
    // required isn't required for checkboxes.
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
    validateFormField(event);
  };
  const validateFormField = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    Yup.reach(formSchema, name)
      .validate(inputValue)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  useEffect(() => {
    console.log("Login Data > ", loginData);
    formSchema.isValid(loginData).then((valid) => setFormValid(valid));
  }, [loginData]);

  useEffect(() => {
    console.error("[Form Validation Error State Updated] ", formErrors);
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="isim">İsim</label>
          <input
            id="isim"
            onChange={handleChange}
            type="text"
            name="isim"
            value={loginData.isim}
            invalid={!!formErrors.isim}
          ></input>
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={handleChange}
            type="email"
            name="email"
            value={loginData.email}
            invalid={!!formErrors.email}
          ></input>
        </li>
        <li>
          <label htmlFor="sifre">Şifre</label>
          <input
            id="sifre"
            onChange={handleChange}
            type="text"
            name="sifre"
            value={loginData.sifre}
            invalid={!!formErrors.password}
          ></input>
        </li>
        <li>
          <label htmlFor="terms">Kullanım Şartlarını onaylıyorum</label>
          <input
            id="terms"
            onChange={handleChange}
            type="checkbox"
            name="terms"
            checked={loginData.terms}
            invalid={!!formErrors.terms}
          ></input>
        </li>
        <li>
          <button type="submit" disabled={!isFormvalid}>
            Gönder
          </button>
        </li>
      </ul>
    </form>
  );
}

export default Form;
