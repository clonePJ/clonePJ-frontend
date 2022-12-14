import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { serverUrl } from "../../redux/modules/index.js";

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const loginCheck = () => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
  };

  const onSubmit = (data) => {
    axios
      .post(`${serverUrl}/user/signup`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        Swal.fire("회원가입 완료!", "success");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "이미 가입한 이메일입니다",
        });
      });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <SignUpContainer>
      <h2>계정 만들기</h2>
      <SignUpFormContainer onSubmit={handleSubmit(onSubmit)}>
        <SignUpLable>이메일</SignUpLable>
        <SignUpFormInput
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p> 이메일을 입력해주세요 </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>올바른 이메일 형식이 아닙니다</p>
        )}

        <SignUpLable>사용자명</SignUpLable>
        <SignUpFormInput
          placeholder="한글 8자 이상만 가능"
          {...register("nickname", {
            required: true,
            maxLength: 10,
            pattern: /^[가-힣]+$/,
          })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <p> 사용자명을 입력해주세요</p>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <p> 최대 10자까지 입력 가능합니다</p>
        )}
        {errors.nickname && errors.nickname.type === "pattern" && (
          <p> 한글만 가능합니다. ※ 띄어쓰기/자음 및 모음 불가 </p>
        )}

        <SignUpLable>비밀번호</SignUpLable>
        <SignUpFormInput
          placeholder="영문, 숫자, 특수문자($@!%*#?&)를 포함하여 8자리 이상"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p> 비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p> 최소 8글자부터 입력 가능합니다</p>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <p>
            {" "}
            영문, 숫자, 특수문자($@!%*#?&)를 포함하여 8자리 이상만 가능합니다{" "}
          </p>
        )}

        <SignUpLable>생년월일</SignUpLable>
        <SignUpFormInput
          placeholder="예시) 1900-01-01"
          {...register("birth", {
            required: true,
            pattern:
              /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
          })}
        />
        {errors.birth && <p> 1900-01-01 형식으로 입력해주세요 </p>}

        <SignUpFormSubmit>계속하기</SignUpFormSubmit>
        <StSignUptoLogin onClick={() => navigate("/login")}>
          이미 계정이 있으신가요?
        </StSignUptoLogin>
      </SignUpFormContainer>
    </SignUpContainer>
  );
};
export default SignUpForm;

const SignUpContainer = styled.div`
  width: 450px;
  height: 490px;
  background-color: #36393f;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 0px 0px 3px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 25px;
  & h2 {
    color: white;
    text-align: center;
  }
`;

const SignUpFormContainer = styled.form`
  position: absolute;
  top: 80px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  & p {
    color: #c75a5a;
    font-size: 12px;
    font-weight: 100;
  }
`;

const SignUpLable = styled.label`
  color: #adadad;
  font-size: 11px;
  padding: 10px 0px 5px 0px;
`;

const SignUpFormInput = styled.input`
  /* all: unset; */
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

const SignUpFormSubmit = styled.button`
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

const StSignUptoLogin = styled.h5`
  width: 400px;
  margin-top: 5px;
  color: #4495ff;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
