import axios from 'axios';
import Cookies from 'js-cookie';
import url from '../url';

var authenticationCall = false;
var result = 0;
var userInfo = 0;

var AuthenticationFunk = async () => {
    try {
        const response = await axios.get(`${url}/authentication/${Cookies.get("token")}`, {
            withCredentials: true, // Include cookies
        });

        if (response.status === 200) {
            result = response.data.verificationStatus;
            userInfo = response.data.userInfo;
            authenticationCall = true;
            return authenticationCall;
        } else {
            console.error("Failed to make request:", response.statusText);
            authenticationCall = false;
            return authenticationCall;
        }
    } catch (error) {
        console.error("Failed to make request:", error);
        authenticationCall = false;
        return authenticationCall;
    }
};

export { authenticationCall, result, userInfo, AuthenticationFunk };
