
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutLink(props: { children: React.ReactNode }) {

    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        axios
        .post('/auth/logout')
        .then((response) => {
            console.log(response.status);
            navigate("/login");
        })
        .catch((error) => {
            console.log(error);
        });



    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;
