import { IToken } from "@/@types/token";
import axios from "axios";

const url = import.meta.env.REACT_APP_PRICE_CHECK_API_ENDPOINT || 'https://interview.switcheo.com/prices.json';

export const getTokensPrice = () => axios<IToken[]>({
    url,
    method: 'get',
    responseType: 'json',
});
