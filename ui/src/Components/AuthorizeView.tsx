import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext({});

interface User {
    email: string;
}


function AuthorizeView(props: { children: React.ReactNode }) {

    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // add a loading state
    let emptyuser: User = { email: "" };

    const [user, setUser] = useState(emptyuser);
    let csrf = '';

    useEffect(() => {
        // Get the cookie value
        let retryCount = 0; // initialize the retry count
        let maxRetries = 10; // set the maximum number of retries
        let delay: number = 1000; // set the delay in milliseconds

        // define a delay function that returns a promise
        function wait(delay: number) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        // define a fetch function that retries until status 200 or 401
        async function pingAuth() {

            axios
                .get('/auth/pingauth')
                .then((response) => {
                    // If the status code is 200, print ok
                    if (response.status === 200) {
                        setUser({ email: response.data.email });
                        setAuthorized(true);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    // If the error is an axios error
                    setLoading(false);
                    if (axios.isAxiosError(error)) {
                        // If the status code is 401, print bad
                        if (error.response?.status === 401) {
                            // not authorized.  OK!  Need to log in.
                        }
                        // Otherwise, print the error message
                        else {
                            console.log(error.message);
                        }
                    }
                    // Otherwise, print the unexpected error
                    else {
                        console.log('unexpected error:', error);
                    }
                });
        }

        pingAuth()
            .catch((error) => {
                // handle the final error
                console.log(error.message);
            })
            .finally(() => {
            });

    }, []);


    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }
    else {
        if (authorized && !loading) {
            return (
                <>
                    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/login" />
                </>
            )
        }
    }

}

export function AuthorizedUser(props: { value: string }) {
    // Consume the username from the UserContext
    const user: any = React.useContext(UserContext);

    // Display the username in a h1 tag
    if (props.value == "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;