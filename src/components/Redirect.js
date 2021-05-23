import React, { useEffect } from 'react';
import {getToken} from '../api/spotify'
import { useHistory } from 'react-router-dom';

const Redirect = () => {
    let history = useHistory();
    
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        getToken(code).then((data) => {
            data.json().then(({access_token}) => {
                localStorage.setItem("access_token", access_token);
                history.push("/dashboard");
            })
        })
    }, [history]);

    return <div></div>;
};
export default Redirect;