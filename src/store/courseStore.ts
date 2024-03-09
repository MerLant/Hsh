// src/store/courseStore.ts
import { createStore } from "effector";
import {
	findAllCoursesFx,
	findOneCourseFx,
	getAllThemeCourseFx,
} from "@/api/CourseService";
import { CourseResponse } from "@/models/response/CourseResponse";
import { ThemeResponse } from "@/models/response/ThemeResponse";

// Создание основного стора для хранения списка всех курсов
export const $allCourses = createStore<CourseResponse[]>([]);

// Подписка на успешное завершение эффекта загрузки курсов для обновления стора
$allCourses.on(findAllCoursesFx.doneData, (_, courses) => courses);

// Создание производного стора для получения первых пяти курсов
export const $topCourses = $allCourses.map((courses) => courses.slice(0, 5));


export const $course = createStore<CourseResponse | null>(null)
	.on(findOneCourseFx.doneData, (_, course) => course);

export const $courseLoading = createStore<boolean>(true)
	.on(findOneCourseFx, () => true)
	.on(findOneCourseFx.done, () => false)
	.on(findOneCourseFx.fail, () => false);

export const $courseThemeLoading = createStore<boolean>(true)
	.on(getAllThemeCourseFx, () => true)
	.on(getAllThemeCourseFx.done, () => false)
	.on(getAllThemeCourseFx.fail, () => false);

export const $allCoursesTheme = createStore<ThemeResponse[]>([]);

$allCoursesTheme.on(getAllThemeCourseFx.doneData, (_, themes) => themes);
// Для использования в компоненте
// import { useStore } from 'effector-react';
// const topCourses = useStore($topCourses);
