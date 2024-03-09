import { createEffect } from "effector";
import $api from "@/api/index";
import { UserData, UserRole } from "@/models/User";

export const getCurrentUserFx = createEffect(async (): Promise<UserData> => {
	const response = await $api.get("/user/");
	return response.data;
});

export const findOneUserFx = createEffect(
	async (id: string): Promise<UserData> => {
		const response = await $api.get(`/user/${id}`);
		return response.data;
	}
);

export const getUserRoleFx = createEffect(
	async (id: string): Promise<UserRole> => {
		const response = await $api.get(`/user/${id}/role`);
		return response.data;
	}
);

export const getRoleFx = createEffect(async (): Promise<UserRole> => {
	const response = await $api.get(`/user/role`);
	return response.data;
});

export const deleteUserFx = createEffect(async (id: string): Promise<void> => {
	await $api.delete(`/user/${id}`);
});

export const updateUserFx = createEffect(
	async (userData: Partial<UserData>): Promise<UserData> => {
		const response = await $api.put("/user", userData);
		return response.data;
	}
);
