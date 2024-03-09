import { createEffect } from "effector";
import $api from "@/api/index";
import { CreateCourseData, UpdateCourseData } from "@/models/Course";
import { CourseResponse } from "@/models/response/CourseResponse";
import { AxiosError } from "axios";

export const findAllCoursesFx = createEffect(async () => {
	const response = await $api.get("/learning/course");
	return response.data;
});

export const createCourseFx = createEffect(
	async (createdCourse: CreateCourseData): Promise<CourseResponse> => {
		const response = await $api.post("/learning/course", createdCourse);
		return response.data;
	}
);

export const findOneCourseFx = createEffect(
	async (id: number): Promise<CourseResponse | null> => {
		try {
			const response = await $api.get(`/learning/course/${id}`);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 404) {
				console.error(`Course with ID ${id} not found.`);
			} else {
				console.error("An unknown error occurred.", error);
			}
			return null; // Возвращаем null или альтернативные данные, если курс не найден или произошла другая ошибка
		}
	}
);

export const updateCourseFx = createEffect(
	async ({
		id,
		updateCourseDto,
	}: {
		id: number;
		updateCourseDto: UpdateCourseData;
	}): Promise<CourseResponse> => {
		const response = await $api.put(
			`/learning/course/${id}`,
			updateCourseDto
		);
		return response.data;
	}
);

export const removeCourseFx = createEffect(async (id: number) => {
	const response = await $api.delete(`/learning/course/${id}`);
	return response.data;
});

export const getAllThemeCourseFx = createEffect(async (id: number) => {
	const response = await $api.get(`/learning/course/${id}/themes`);
	return response.data;
});
