import { createEffect } from "effector";
import $api from "@/api/index";

export const loginWithYandex = () => {
	const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	window.location.href = `${API_URL}/auth/yandex`;
};

export const refreshTokensFx = createEffect(async (): Promise<boolean> => {
	try {
		const response = await $api.get("/auth/refresh-tokens", {
			withCredentials: true,
		});
		const accessToken = response.data.accessToken?.split(" ")[1];
		if (accessToken) {
			localStorage.setItem("token", accessToken);
			return true;
		}
		return false;
	} catch (e) {
		localStorage.removeItem("token");
		return false;
	}
});

export const logoutFx = createEffect(async (): Promise<void> => {
	await $api.get("/auth/logout");
	localStorage.removeItem("token");
});

export const checkAuthFx = createEffect(async (): Promise<boolean> => {
	// Проверяем наличие accessToken в localStorage
	const accessToken = localStorage.getItem("token");
	console.log(accessToken);

	// Пытаемся выполнить запрос для проверки валидности accessToken
	try {
		await $api.get("/auth/check-auth");

		// Если запрос успешен, возвращаем true
		return true;
	} catch (error) {
		return false;
	}
});
