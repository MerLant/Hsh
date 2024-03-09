// src/store/userStore.ts
import { createStore } from "effector";
import { getCurrentUserFx, getRoleFx } from "@/api/UserService";
import { UserData, UserRole } from "@/models/User";

// Создание стора для хранения данных текущего пользователя
const $currentUser = createStore<UserData | null>(null);
// Подписка на успешное завершение эффекта загрузки текущего пользователя
$currentUser.on(getCurrentUserFx.doneData, (_, user) => user);

// Создание стора для хранения роли текущего пользователя
const $currentUserRole = createStore<UserRole | null>(null);
// Подписка на успешное завершение эффекта загрузки роли пользователя
$currentUserRole.on(getRoleFx.doneData, (_, role) => role);

// Экспорт сторов
export { $currentUser, $currentUserRole };

// Для использования в компоненте
// import { useStore } from 'effector-react';
// const currentUser = useStore($currentUser);
// const currentUserRole = useStore($currentUserRole);
