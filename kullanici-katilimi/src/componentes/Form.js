import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";

const loginDataInitial = {
  isim: "",
  email: "",
  password: "",
  rememberMe: false,
  terms: false,
  role: null,
};

// const roller = [
//   { label: "Yönetici", value: "admin" },
//   { label: "Yazar", value: "Writer" },
//   { label: "Okur", value: "Reader" },
// ];

const LoginFormYup = () => {
  const [loginData, setLoginData] = useState(loginDataInitial);
  const [formErrors, setFormErrors] = useState({
    isim: "",
    email: "",
    password: "",
    terms: "",
    // rememberMe: "",
    // option: "",
    // role: "",
  });
  const [isFormValid, setFormValid] = useState(false);

  const formSchema = Yup.object().shape({
    isim: Yup.string(),
    email: Yup.string()
      .email("Bu email olmamış!")
      .required("E-posta adresini girmezsen sana nasıl ulaşıcam? "),
    password: Yup.string().required("Şifre şart").min(6, "Six or S.."),
    terms: Yup.boolean().oneOf(
      [true],
      "Şaka yapıyor olmalısın; hala kabul etmedin"
    ),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submit Edildi! ", loginData);
    // axios.post("https://wwww.haziran-react.com/api/login", loginData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setLoginData({
      ...loginData,
      [name]: inputValue,
    });

    validateFormField(e);
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
    formSchema.isValid(loginData).then((valid) => setFormValid(valid));
  }, [loginData]);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2>Login Form</h2>
      <hr />
      <FormGroup>
        <Label htmlFor="isim">İsim</Label>
        <Input
          id="isim"
          type="text"
          name="isim"
          value={loginData.isim}
          onChange={handleInputChange}
          invalid={!!formErrors.isim}
        />
        <FormFeedback>{formErrors.isim}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="user-mail">Email</Label>
        <Input
          id="user-mail"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          placeholder="Lütfen eposta bilgisini giriniz..."
          invalid={!!formErrors.email}
        />
        <FormFeedback>{formErrors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="user-pass">Password</Label>
        <Input
          id="user-pass"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          invalid={!!formErrors.password}
        />
        <FormFeedback>{formErrors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Label htmlFor="terms">Terms</Label>
        <Input
          id="terms"
          type="checkbox"
          name="terms"
          checked={loginData.terms}
          onChange={handleInputChange}
          invalid={!!formErrors.terms}
        />
        <FormFeedback>{formErrors.terms}</FormFeedback>
      </FormGroup>

      <br />
      <Button
        type="button"
        onClick={() => {
          setLoginData(loginDataInitial);
        }}
      >
        Reset Form
      </Button>
      <Button type="submit" disabled={!isFormValid} data-cy="login-button">
        Login
      </Button>
    </Form>
  );
};

export default LoginFormYup;
