import axios from "axios";

const url = import.meta.env.REACT_APP_PRICE_CHECK_API_ENDPOINT;

export const getTokensPrice = () => axios({
    url,
    method: 'get',
    responseType: 'json',
});
