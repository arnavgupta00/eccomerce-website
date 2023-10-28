
import Cookies from 'js-cookie'; // Import the library


var authenticationCall = false;


var AuthenticationFunk = async () => {
    try {
        const response = await fetch('http://localhost:5000/authentication', {
            method: 'GET', // Replace with your desired HTTP method
            credentials: 'include', // Include cookies
            // Other headers and body data as needed
          });

        if (response.ok) {
            const result = await response.json();

            authenticationCall = true;
            return authenticationCall
        } else {
            console.error("Failed to make request:", response.statusText);
            authenticationCall = false;
            return authenticationCall
        }
    } catch (error) {
        console.error("Failed to make request:", error);
        authenticationCall = false;
        return authenticationCall
    }
}

export { authenticationCall, AuthenticationFunk };