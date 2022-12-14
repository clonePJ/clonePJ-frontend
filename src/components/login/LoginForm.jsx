import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {serverUrl} from "../../redux/modules/index.js"
import { useEffect } from "react";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const loginCheck = () =>{
    const token = window.localStorage.getItem('token')
    if (token !== null) {
      navigate("/")
    }
  }

  const onSubmit = (data) => {
    axios.post(`${serverUrl}/user/login`, data) 
    .then(res=> {
      localStorage.setItem('token', res.data.token)
      Swal.fire(
        '로그인 완료!',
        'success'
      )
      navigate("/")
    })
    .catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    });
  };

  useEffect(()=>{loginCheck()},[])

  return (
    <LoginContainer>
      <div>
        <StLoginFormTitle>DISBOARD에 오신 것을 환영합니다</StLoginFormTitle>
        <StLoginFormSubtitle>만나서 너무 반가워요!</StLoginFormSubtitle>
      </div>

      <StLoginFormContainer onSubmit={handleSubmit(onSubmit)}>
        <StLoginLable>이메일</StLoginLable>
        <StLoginInput
          type="email"
          {...register("email", { required: true, pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ })}
        />
        {errors.email && errors.email.type === "required" && (
          <p> 이메일을 입력해주세요 </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>올바른 이메일 형식이 아닙니다</p>
        )}

        <StLoginLable>비밀번호</StLoginLable>
        <StLoginInput
          type="password"
          {...register("password", { required: true, minLength:8, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/ })}
        />
        {errors.password && errors.password.type === "required" && (
          <p> 비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "required" && (
          <p> 비밀번호는 8자 이상입니다</p>
        )}

        <StLoginFormSubmit>로그인</StLoginFormSubmit>
        <StLogintoSignUp onClick={() => navigate("/signup")}>
          계정이 필요한가요? 가입하기
        </StLogintoSignUp>
        <StLogintoMain onClick={() => navigate("/")}>
          홈으로
        </StLogintoMain>
      </StLoginFormContainer>
    </LoginContainer>
  );
};
export default LoginForm;

const LoginContainer = styled.div`
  width: 550px;
  height: 400px;
  background-color: #36393f;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 0px 0px 3px;
  & div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 30px 0px 10px 0px;
  }
`;
const StLoginFormTitle = styled.h2`
  width: 400px;
  color: white;
  font-weight: 600;
  text-align: center;
`;

const StLoginFormSubtitle = styled.p`
  font-size: 16px;
  margin: 5px;
  font-weight: 200;
  color: #adadad;
`;

const StLoginFormContainer = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  & p {
    color: #c75a5a;
    font-size: 12px;
    font-weight: 100;
  }
`;

const StLoginLable = styled.label`
  color: #adadad;
  font-size: 11px;
  padding: 10px 0px 5px 0px;
`;

const StLoginInput = styled.input`
  width: 400px;
  height: 35px;
  background-color: #222222;
  border-radius: 4px;
  outline: none;
  border: none;
  color: #adadad;
  padding: 5px;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    box-shadow: 0 0 0px white inset !important;
    -webkit-text-fill-color: #adadad !important;
  }
`;

const StLoginFormSubmit = styled.button`
  width: 400px;
  height: 40px;
  background-color: #3f36bb;
  border-radius: 4px;
  outline: none;
  border: none;
  color: white;
  padding: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const StLogintoSignUp = styled.h5`
  width: fit-content;
  margin-top: 5px;
  color: #4495ff;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const StLogintoMain = styled.h5`
  width: fit-content;
  align-self: center;
  margin-top: 40px;
  color: #868686;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
