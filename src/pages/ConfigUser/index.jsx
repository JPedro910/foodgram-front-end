import React, { useState } from "react";

import Header from "../../components/Header/index";

import FormContainer from "./styles";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import PaddingContainer from "../../components/PaddingContainer/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";
import isEmailValid from "../../utils/isEmailValid";
import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../../providers/ModalProvider";
import { useAuth } from "../../providers/AuthProvider";

const ConfigUser = () => {

  const { handleShowModal } = useModal();
  const { handleLogout } = useAuth();
  const [formValues, setFormValues] = useState({});
  const [buttonChidrenEmail, setButtonChildrenEmail] = useState("Atualizar Email");
  const [buttonChidrenName, setButtonChildrenName] = useState("Atualizar Nome");
  const [buttonChidrenPassword, setButtonChildrenPassword] = useState("Atualizar Senha");
  const [buttonChidrenDelete, setButtonChildrenDelete] = useState("Excluir Usuário");

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    const { email } = e.target;

    if (!email.value) return handleShowModal("Preencha o campo de email");

    if (!isEmailValid(email.value))
      return handleShowModal("Coloque um email válido");

    setButtonChildrenEmail(<LoadingGif />);

    await api
      .post("/user/email/send-token-update-email", {
        email: email.value,
      })
      .then(({ data }) => {
        setFormValues({});
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor, tente novamente")
      );

    setButtonChildrenEmail("Atualizar Email");
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();

    const { name } = e.target;

    if (!name.value) 
      return handleShowModal("Preencha o campo de nome");

    setButtonChildrenName(<LoadingGif />);

    await api
      .patch("/update-name", {
        name: name.value,
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

    setButtonChildrenName("Atualizar Nome");
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { passwordCurrent, newPassword, newPasswordConfirm } = e.target;

    if (
      !passwordCurrent.value ||
      !newPassword.value ||
      !newPasswordConfirm.value
    )
      return handleShowModal("Preencha todos os campos");

    if (!isPasswordValid(passwordCurrent.value))
      return handleShowModal("Senha atual incorreta");

    const { result, message } = isPasswordValid(newPassword.value);

    if (!result) return handleShowModal(message);

    if (newPassword.value !== newPasswordConfirm.value)
      return handleShowModal("As senhas não coincidem");

    setButtonChildrenPassword(<LoadingGif />);

    await api
      .patch(`/user/password/update`, {
        passwordCurrent: passwordCurrent.value,
        newPassword: newPassword.value,
        newPasswordConfirm: newPasswordConfirm.value,
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

    setButtonChildrenPassword("Atualizar Senha");
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = e.target;

    if (!password.value || !passwordConfirm.value)
      return handleShowModal("Preencha todos os campos");

    const { result } = isPasswordValid(password.value);

    if (!result) return handleShowModal("Senha incorreta");

    if (password.value !== passwordConfirm.value)
      return handleShowModal("As senhas não coincidem");

    setButtonChildrenDelete(<LoadingGif />);

    await api
      .delete(`/user/delete`, {
        data: {
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        },
      })
      .then(({ data }) => {
        setFormValues({});
        handleLogout();
        handleShowModal(data.response);
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

    setButtonChildrenDelete("Excluir Usuário");
  };

  return (
    <>
      <Header />

      <PaddingContainer>
          <FormContainer>
            <Form onSubmit={handleUpdateEmail}>
            <h2>Atualizar Email</h2>

            <FormInput type="email" placeholder="Email" name="email" formValues={formValues} setFormValues={setFormValues}/>

            <Button type="submit">{buttonChidrenEmail}</Button>
          </Form>

          <Form onSubmit={handleUpdateName}>
            <h2>Atualizar Email</h2>

            <FormInput type="text" placeholder="Nome" name="name" formValues={formValues} setFormValues={setFormValues}/>

            <Button type="submit">{buttonChidrenName}</Button>
          </Form>

          <Form onSubmit={handleUpdatePassword}>
              <h2>Atualizar Senha</h2>

              <FormInput
                type="password"
                placeholder="Senha Atual"
                name="passwordCurrent"
                formValues={formValues}
                setFormValues={setFormValues}
              />

              <FormInput
                type="password"
                placeholder="Nova Senha"
                name="newPassword"
                formValues={formValues}
                setFormValues={setFormValues}
              />

              <FormInput
                type="password"
                placeholder="Confirmação de Nova Senha"
                name="newPasswordConfirm"
                formValues={formValues}
                setFormValues={setFormValues}
              />

              <Button type="submit">{buttonChidrenPassword}</Button>
            </Form>
            <Form onSubmit={handleDeleteUser}>
              <h2>Excluir Usuário</h2>

              <FormInput 
                type="password" 
                placeholder="Senha" 
                name="password" 
                formValues={formValues}
                setFormValues={setFormValues}
              />
              <FormInput
                type="password"
                placeholder="Confirmação de Senha"
                name="passwordConfirm"
                formValues={formValues}
                setFormValues={setFormValues}
              />

              <Button type="submit">{buttonChidrenDelete}</Button>
            </Form>
          </FormContainer>
      </PaddingContainer>
    </>
  );
};

export default ConfigUser;