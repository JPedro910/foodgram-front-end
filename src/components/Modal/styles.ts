import styled from "styled-components";

type ModalContainerTypes = {
  display: string
}

export const ModalContainer = styled.div<ModalContainerTypes>`
  @keyframes modal {
    from {
      opacity: 0;
      transform: translate3d(0, -100px, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ display }) => `${display}`};
  justify-content: center;
`;

export const ModalStyle = styled.div`
  min-width: 250px;
  width: 380px;
  height: 225px;
  margin-top: 120px;
  background-color: #f0f0f5;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #e02041;
  position: relative;
  animation: modal 0.6s;

  @media (max-width: 576px) {
    min-width: 250px;
    width: 300px;
    height: 200px;
  }

  > h3 {
    color: #000;
    font-size: 1.6rem;
    text-align: center;

    @media (max-width: 576px) {
      font-size: 1.2rem;
    }
  }

  > button {
    background-color: #e02041;
    border: none;
    padding: 5px 5px 0 5px;
    font-size: 25px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 100%;
    font-size: 1.7rem;
    font-weight: bold;
  }
`;