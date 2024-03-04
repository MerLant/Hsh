import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Button } from "@chakra-ui/react";
import { checkAuthFx, loginWithYandex, logoutFx } from "@/api/AuthService";
import { $isLoggedIn } from "@/store/authStore"; // Предполагается, что у вас есть такой стор

const Login = () => {
	const { isLoggedIn, checkAuth, logout } = useUnit({
		isLoggedIn: $isLoggedIn,
		checkAuth: checkAuthFx,
		logout: logoutFx,
	});

	// При загрузке страницы проверяем, авторизован ли пользователь
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// Обработчик нажатия кнопки
	const handleLoginLogout = () => {
		if (!isLoggedIn) {
			loginWithYandex();
		} else {
			logout();
		}
	};

	return (
		<Button onClick={handleLoginLogout}>
			{isLoggedIn ? "Выйти" : "Войти через Yandex"}
		</Button>
	);
};

export default Login;
