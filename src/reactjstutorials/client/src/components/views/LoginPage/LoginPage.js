import React, {useState} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';


const LoginPage = () => {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // submit 을 실행시 refresh 된다. (실행이 완료되기전)

        let body = {
            email : Email,
            password : Password
        };

        dispatch(loginUser(body)).then(
            response => {
                if(response.payload.loginSuccess){
                    navigate('/'); // react 의 리다이렉트 방법 '/' 으로 이동한다.
                } else {
                    alert("Error");
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
                <label>Password</label>
                <input type={'password'} value={Password} onChange={onPasswordHandler} />
                <br/>

                <button type={"submit"}>
                    login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;