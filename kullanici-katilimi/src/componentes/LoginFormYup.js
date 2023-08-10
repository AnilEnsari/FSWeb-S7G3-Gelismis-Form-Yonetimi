import axios from "axios";
import { useState } from "react";

import * as Yup from "yup";

let schema = Yup.object().shape({
  name: Yup.string()
    .required("İsim yok bro")
    .min(3, " En az 3 karakter lütfen"),
  email: Yup.string()
    .email("Eposta adresinde bir hata olabilir mi bro/sis?")
    .required("Email unuttun")
    .notOneOf(["waffle@syrup.com"], "Bu email adresi kullanılıyor"),
  password: Yup.string()
    .required("şifre olmalı")
    .min(6, "Şifreniz en az 6 olmalı"),
  terms: Yup.boolean().oneOf([true], "Kullanım koşullarını kabul et"),
});

export default function MemberForm(props) {
  const { addMember } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [member, setMember] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const isAllFormValid = (formData) => {
    schema.isValid(formData).then((valid) => {
      console.log("isAllFormValid", valid);
      setIsFormValid(valid); // => true
    });
  };

  const fieldValidateHandler = (name, fieldData) => {
    Yup.reach(schema, name)
      .validate(fieldData)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors });
      });
  };

  const changeHandler = (event) => {
    const { type, name, value, checked } = event.target;
    const fieldData = type === "checkbox" ? checked : value;
    const newMemberData = {
      ...member,
      [name]: fieldData,
    };

    setMember(newMemberData);
    isAllFormValid(newMemberData);
    fieldValidateHandler(name, fieldData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Formda hiç bir hata yok?", isAllFormValid(member));

    axios
      .post("https://reqres.in/api/users", member)
      .then((res) => {
        console.log("submitHandler", res);
        addMember(res.data);
      })
      .catch((err) => {
        console.log("submitHandler", err);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name:</label>
        <div>
          <input value={member.name} name="name" onChange={changeHandler} />
          {errors.name && <p>{errors.name}</p>}
        </div>
      </div>

      <label>
        Email:
        <input value={member.email} name="email" onChange={changeHandler} />
      </label>
      {errors.email && <p>{errors.email}</p>}
      <label>
        Password:
        <input
          type="password"
          value={member.password}
          name="password"
          onChange={changeHandler}
        />
      </label>
      {errors.password && <p>{errors.password}</p>}
      <div>
        <div>
          <div>
            <input
              type="checkbox"
              name="terms"
              checked={member.terms}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="comments">Terms</label>
            <p>{errors.terms && errors.terms}</p>
          </div>
        </div>
      </div>
      <button disabled={!isFormValid} type="submit">
        Gönder
      </button>
    </form>
  );
}
