import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions"

export default function ( SpecificComponent, option, adminRoute = null){

    //status 3종류
    //null : 아무나 출입 가능
    //true : 로그인만 출입 가능
    //false : 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect( () => {
            dispatch(auth()).then(response => {


                if(!response.payload.isAuth){ // 비로그인
                    if(option === true){ // option 이 true 인 페이지로 들어갈경우
                        navigate("/login");
                    }
                } else { // 로그인
                    if( adminRoute === true && response.payload.isAdmin !== false){
                        navigate("/");
                    }else {
                        if(option === false ){
                            navigate("/");
                        }
                    }
                }

            });
        }, []);

        return (
            <SpecificComponent {...props}/>
        );
    }

    return AuthenticationCheck;

}