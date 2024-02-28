import axios from 'axios';
import { AuthResponse } from "@/models/response/AuthResponse";

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	// Добавляем токен в заголовок Authorization для каждого запроса
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
	return config;

});

$api.interceptors.response.use((config) => {
	return config;
},async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh-tokens`, {withCredentials: true})
			localStorage.setItem('token', response.data.accessToken);
			return $api.request(originalRequest);
		} catch (e) {
			console.log(e);
		}
	}
	throw error;
})

export default $api;
