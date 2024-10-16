import axios from 'axios';

export const setSession = (access_token : any) => {
       
};

export const getAccessToken = () => {
    return window.localStorage.getItem('token');
};
