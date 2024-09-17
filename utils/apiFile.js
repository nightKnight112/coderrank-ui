import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const apiHeader = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type" : 'application/json'
    }
});

//api functions for user login and registration

export const userLogin = async(reqBody) => {
    const response = await apiHeader.post('/login-user', reqBody);
    if(response.status === 200){
        localStorage.setItem("userId", response.data?.user_id);
        return true;
    }else{
        return false;
    }
}

export const userRegistration = async(reqBody) => {
    const response = await apiHeader.post('/register-user', reqBody)
    if(response.status === 200){
        return true
    }else{
        return false
    }
}