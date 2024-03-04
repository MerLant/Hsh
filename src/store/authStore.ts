// src/store/authStore.ts
import { createEvent, createStore } from "effector";
import { checkAuthFx, logoutFx, refreshTokensFx } from "@/api/AuthService";

// Инициализация стора с предположением, что статус аутентификации неизвестен
const $isLoggedIn = createStore<boolean | null>(null);

// Событие для явного обновления состояния аутентификации
const setIsLoggedIn = createEvent<boolean>();

// Привязка эффектов к обновлению стора
$isLoggedIn.on(refreshTokensFx.doneData, (_, result) => result);
$isLoggedIn.on(logoutFx.done, () => false);
$isLoggedIn.on(checkAuthFx.doneData, (_, result) => result);

// Обновление стора по событию
$isLoggedIn.on(setIsLoggedIn, (_, status) => status);

// Пример прямого вызова setIsLoggedIn для обновления стора из компонента
// Например, после успешного выполнения другого эффекта, не показанного здесь

// Реэкспорт стора и события
export { $isLoggedIn, setIsLoggedIn };

// Для использования в компоненте
// import { useStore } from 'effector-react';
// const isLoggedIn = useStore($isLoggedIn);
