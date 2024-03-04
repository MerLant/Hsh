import { createEffect } from "effector";
import $api from "@/api/index";
import { CreateCourseData, UpdateCourseData } from "@/models/Course";
import { CourseResponse } from "@/models/response/CourseResponse";

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
	async (id: number): Promise<CourseResponse> => {
		const response = await $api.get(`/learning/course/${id}`);
		return response.data;
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
