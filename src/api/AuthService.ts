import $api from "@/api/index";

export default class AuthService {
	// Метод для авторизации через Yandex
	static async loginWithYandex() {
		const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
		window.location.href = `${API_URL}/auth/yandex`;
	}

	// Метод для получения нового токена по рефреш-токену
	static async refreshTokens(): Promise<string | null> {
		const response = await $api.get("/auth/refresh-tokens", {
			withCredentials: true,
		});

		if (response.data.accessToken) {
			return response.data.accessToken.split(" ")[1];
		}

		return null;
	}

	// Метод для выхода из аккаунта
	static async logout(): Promise<void> {
		// Отправляем запрос на сервер для выхода из аккаунта
		await $api.get("/auth/logout");

		// Удаляем токен из localStorage
		localStorage.removeItem("token");
	}

	// Метод для проверки авторизации
	static async checkAuth(): Promise<boolean> {
		// Проверяем наличие токена в localStorage
		const token = localStorage.getItem("token");

		// Если токена нет, то возвращаем false
		if (!token) {
			return false;
		}

		try {
			// Отправляем запрос на сервер для проверки токена
			await $api.get("/auth/check-auth", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Если токен валидный, то возвращаем true
			return true;
		} catch (e) {
			// Если токен не валидный, то удаляем его из localStorage и возвращаем false
			localStorage.removeItem("token");
			return false;
		}
	}
}
