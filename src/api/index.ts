import axios from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	// Добавляем токен в заголовок Authorization для каждого запроса
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	axios.defaults.headers.post["Content-Type"] =
		"application/x-www-form-urlencoded";
	return config;
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(
					`${API_URL}/auth/refresh-tokens`,
					{ withCredentials: true }
				);
				if (!response || !response.data.accessToken) {
					console.log("Ошибка входа");
					return;
				}
				const token = response.data.accessToken.split(" ")[1];
				console.log(response);
				if (response) {
					localStorage.setItem("token", token);
					// originalRequest.headers.Authorization = `Bearer ${response}`;
					return await $api.request(originalRequest);
				}
				// Ошибка или отсутствие токена
				return await Promise.reject(error);
			} catch (e) {
				// console.log("Error refreshing token:", e);
				return Promise.reject(e);
			}
		}
		// Пропускаем все другие ошибки
		return Promise.reject(error);
	}
);

export default $api;
