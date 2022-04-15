import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registerUser} from "../../../_actions/user_actions";



const RegisterPage = () => {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ComfirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onComfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // submit 을 실행시 refresh 된다. (실행이 완료되기전)

        if(ComfirmPassword !== Password){
            return alert("비밀번호화 확인 비밀번호가 다릅니다.");
        }

        let body = {
            email : Email,
            name : Name,
            password : Password
        };

        dispatch(registerUser(body)).then(
            response => {
                if(response.payload.success){
                    alert("가입완료");
                    navigate('/login');
                } else {
                    alert("가입실패");
                }
            }
        );
    }




    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems : 'center',
            width: "100%", height: "100vh"
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type={'email'} value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type={'text'} value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type={'password'} value={Password} onChange={onPasswordHandler} />

                <label>Comfirm Password</label>
                <input type={'password'} value={ComfirmPassword} onChange={onComfirmPasswordHandler} />

                <br/>

                <button type={"submit"}>
                    register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;