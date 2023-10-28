
import Cookies from 'js-cookie'; 
import url from '../url';
var authenticationCall = false;

var result = 0 ;
var userInfo =0;
var AuthenticationFunk = async () => {
    try {
        const response = await fetch(`${url}/authentication/${Cookies.get('token')}`, {
            method: 'GET', 
            credentials: 'include', // Include cookies
          });
        if (response.ok) {
            const fullReturn = await response.json();
            result = fullReturn.verificationStatus;
            userInfo = fullReturn.userInfo;
            authenticationCall = true;
            return authenticationCall
        } else {
            console.error("Failed to make request:", response.statusText);
            authenticationCall = false;
            return authenticationCall
        }
        console.log(response);
    } catch (error) {
        console.error("Failed to make request:", error);
        authenticationCall = false;
        return authenticationCall
    }
}

export { authenticationCall,result, userInfo, AuthenticationFunk };
