import { createEffect } from "effector";
import $api from "@/api/index";
import { CreateThemeData, UpdateThemeData } from "@/models/Theme";
import { ThemeResponse } from "@/models/response/ThemeResponse";
import { TaskResponse } from "@/models/response/TaskResposne";

export const findAllThemesFx = createEffect(
	async (): Promise<ThemeResponse[]> => {
		return $api.get("/learning/theme").then((response) => response.data);
	}
);

export const createThemeFx = createEffect(
	async (createThemeData: CreateThemeData): Promise<ThemeResponse> => {
		return $api
			.post("/learning/theme", createThemeData)
			.then((response) => response.data);
	}
);

export const findOneThemeFx = createEffect(
	async (id: number): Promise<ThemeResponse> => {
		return $api
			.get(`/learning/theme/${id}`)
			.then((response) => response.data);
	}
);

export const updateThemeFx = createEffect(
	async ({
		id,
		updateThemeData,
	}: {
		id: number;
		updateThemeData: UpdateThemeData;
	}): Promise<ThemeResponse> => {
		return $api
			.put(`/learning/theme/${id}`, updateThemeData)
			.then((response) => response.data);
	}
);

export const removeThemeFx = createEffect(async (id: number): Promise<void> => {
	return $api
		.delete(`/learning/theme/${id}`)
		.then((response) => response.data);
});

export const getAllTaskThemeFx = createEffect(
	async (id: number): Promise<TaskResponse[]> => {
		const response = await $api.get(`/learning/theme/${id}/tasks`);
		return response.data;
	}
);
