import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import AuthService from "@/services/AuthService";

const Login = () => {
	// При загрузке страницы проверяем, есть ли токен в параметрах URL
	useEffect(() => {}, []);

	// Функция для входа через Yandex
	const loginWithYandex = async () => {
		await AuthService.loginWithYandex();
	};

	if (false) {
	}

	return <Button onClick={loginWithYandex}>Войти через Yandex</Button>;
};

export default Login;
