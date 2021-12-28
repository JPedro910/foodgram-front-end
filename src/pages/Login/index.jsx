import React from "react";

import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import FormLink from "../../components/FormLink/index";
import Logo from "../../components/Logo/index"

import PagesContainer from "../../components/PagesContainer/index";

const Login = () => {
  return (
    <>
      <PagesContainer>
        <Form name="login">
          <Logo />
          
          <h2>Login</h2>

          <FormInput type="email" name="email" placeholder="Email" />

          <FormInput type="password" name="password" placeholder="Senha" />

          <Button>
            Entrar
          </Button>

          <FormLink link="register">Ainda não tem um cadastro?</FormLink>
          <FormLink link="forget-password">Esqueceu sua senha?</FormLink>
        </Form>
      </PagesContainer>
    </>
  );
};

export default Login;