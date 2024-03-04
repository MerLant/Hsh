import { createEffect } from "effector";
import $api from "@/api/index";
import { CreateTaskData, TaskData, UpdateTaskData } from "@/models/Task";
import { TaskResponse } from "@/models/response/TaskResposne";

// Эффект для получения всех задач
export const findAllTasksFx = createEffect(async (): Promise<TaskData[]> => {
	const response = await $api.get("/learning/task");
	return response.data;
});

// Эффект для создания новой задачи
export const createTaskFx = createEffect(
	async (createTaskData: CreateTaskData): Promise<TaskResponse> => {
		const response = await $api.post("/learning/task", createTaskData);
		return response.data;
	}
);

// Эффект для получения задачи по идентификатору
export const findOneTaskFx = createEffect(
	async (id: number): Promise<TaskData> => {
		const response = await $api.get(`/learning/task/${id}`);
		return response.data;
	}
);

// Эффект для обновления задачи
export const updateTaskFx = createEffect(
	async ({
		id,
		updateTaskData,
	}: {
		id: number;
		updateTaskData: UpdateTaskData;
	}): Promise<TaskResponse> => {
		const response = await $api.put(`/learning/task/${id}`, updateTaskData);
		return response.data;
	}
);

// Эффект для удаления задачи
export const removeTaskFx = createEffect(async (id: number): Promise<void> => {
	await $api.delete(`/learning/task/${id}`);
});
