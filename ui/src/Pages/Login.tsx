import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);
    // state variable for error messages
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "";
            if (rememberme == true)
                loginurl = "/auth/login?useCookies=true";
            else
                loginurl = "/auth/login?useSessionCookies=true";

            const data = {
                email: email,
                password: password,
            };

            axios
                .post('/auth/login',data)
                .then((response) => {
                    console.log(response.status);
                    // If the status code is 200, print ok
                    if (response.status === 200) {
                        setError("Successful login.");
                        window.location.href = '/';
                    }
                    else
                    {
                        setError("Error logging in.");
                    }
                })
                .catch((error) => {
                    // If the error is an axios error
                    if (axios.isAxiosError(error)) {
                        setError("Error logging in.");
                        
                    }
                    // Otherwise, print the unexpected error
                    else {
                        setError("Error logging in.");
                        console.log('unexpected error:', error);
                    }
                });  


            
        }
    };

    return (
        <div className="containerbox">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="forminput" htmlFor="email">Email:</label>
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        checked={rememberme}
                        onChange={handleChange} /><span>Remember Me</span>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <button onClick={handleRegisterClick}>Register</button>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Login;
