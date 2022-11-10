/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}

export interface IUsernameLoginSuccess {
    ok: string;
}

export interface IUsernameLoginError {
    error: string;
}

const instance = axios.create({ baseURL: "http://127.0.0.1:8000/api/v1/", withCredentials: true });

export const getRooms = () => instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
};

export const getMe = () => instance.get("users/me").then((response) => response.data);

export const logOut = () =>
    instance.post("users/log-out", null, { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }).then((response) => response.data);

export const githubLogin = (code: string) =>
    instance.post("users/github", { code }, { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }).then((response) => response.status);

export const kakaoLogin = (code: string) =>
    instance.post("users/kakao", { code }, { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }).then((response) => response.status);

export const usernameLogIn = ({ username, password }: IUsernameLoginVariables) =>
    instance.post("users/log-in", { username, password }, { headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" } }).then((response) => response.data);
