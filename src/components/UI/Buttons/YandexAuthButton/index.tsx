import { useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import AuthService from "@/services/AuthService";

const Login = () => {
	// При загрузке страницы проверяем, есть ли токен в параметрах URL
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (token) {
			// @ts-ignore
			setToken(token);
			localStorage.setItem('token', token);

		}
	}, []);

	// Функция для входа через Yandex
	const loginWithYandex = async () => {
		await AuthService.loginWithYandex();
	};

	return (
		<div>
			<Button onClick={loginWithYandex}>Войти через Yandex</Button>
		</div>
	);
};

export default Login;
