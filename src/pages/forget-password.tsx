import React, { ReactElement, useState } from "react";
import { NextPage } from "next";

import PublicRoute from "../components/PublicRoute";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import FormLink from "../components/FormLink";
import Logo from "../components/Logo"
import PagesContainer from "../components/PagesContainer";
import LoadingGif from "../components/LoadingGif";

import Form from "../styles/form";

import api from "../services/api/clientApi";

import isEmailValid from "../utils/isEmailValid";

import { useModal } from "../providers/ModalProvider";

const ForgetPassword: NextPage = () => {
  const [formValues, setFormValues] = useState({});
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Enviar Email");
  const { handleShowModal } = useModal();

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    
    const { email } = e.target;

    if (!email.value) {
      return handleShowModal("Preencha o campo de email");
    }

    if (!isEmailValid(email.value)) {
      return handleShowModal("Coloque um email válido");
    }

    setButtonChildren(<LoadingGif />);

    await api
      .post("/user/password/send-token-password-recover", {
        email: email.value,
      })
      .then(({ data }) => {
        setFormValues({});
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor, tente novamente mais tarde")
      );

    setButtonChildren("Enviar Email");
  };

  return (
    <>
      <PagesContainer>
      <Form onSubmit={handleForgetPassword}>
            <Logo />
            
            <h2>
                Esqueci Minha Senha
            </h2>
  
            <FormInput type="email" name="email" placeholder="Email" formValues={formValues} setFormValues={setFormValues} />
  
            <Button type="submit">
              {buttonChildren}
            </Button>
  
            <FormLink link="/">Lembrou sua senha?</FormLink>
          </Form>
      </PagesContainer>
    </>
  );
};

export default PublicRoute(ForgetPassword);