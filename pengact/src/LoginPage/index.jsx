import styled from "styled-components"


const BackGround = styled.div`
    background-color: #28bec6;
    height: 100vh;
`;

const WelcomeTitle = styled.h1`
    font-size: 50px;
    color: blue;
    background-color: beige;
    text-align: center;
`;

const RightEndFlexParent = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
`;

const LoginElementContainer = styled.div`
    height: auto;
    width: 40vw;
    background-color: wheat;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

const InputBox = styled.input`
    width: 80%;
    height: 5%;
    border-radius: 5px;
`;



function LoginPage() {
    return (
        <BackGround>
            <WelcomeTitle>Log In</WelcomeTitle> 
            <RightEndFlexParent>
                <LoginElementContainer>
                    <h2>Welcome to GenericService!</h2>
                    <InputBox type="text"></InputBox>
                    <InputBox type="text"></InputBox>
                    <InputBox type="button" value="Log In"></InputBox>
                </LoginElementContainer>
            </RightEndFlexParent>
        </BackGround>
    );
}

export default LoginPage;