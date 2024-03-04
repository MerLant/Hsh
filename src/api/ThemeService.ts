import $api from "@/api/index";
import { CreateThemeData, UpdateThemeData } from "@/models/Theme";
import { ThemeResponse } from "@/models/response/ThemeResponse";

class ThemeService {
	static async findAll() {
		try {
			const response = await $api.get("/learning/theme");
			return response.data;
		} catch (error) {
			console.error("Error fetching themes:", error);
			throw error;
		}
	}

	static async create(
		createThemeData: CreateThemeData
	): Promise<ThemeResponse> {
		try {
			const response = await $api.post(
				"/learning/theme",
				createThemeData
			);
			return response.data;
		} catch (error) {
			console.error("Error creating theme:", error);
			throw error;
		}
	}

	static async findOne(id: number): Promise<ThemeResponse> {
		try {
			const response = await $api.get(`/learning/theme/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching theme with ID ${id}:`, error);
			throw error;
		}
	}

	static async update(
		id: number,
		updateThemeData: UpdateThemeData
	): Promise<ThemeResponse> {
		try {
			const response = await $api.put(
				`/learning/theme/${id}`,
				updateThemeData
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating theme with ID ${id}:`, error);
			throw error;
		}
	}

	static async remove(id: number) {
		try {
			const response = await $api.delete(`/learning/theme/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error removing theme with ID ${id}:`, error);
			throw error;
		}
	}
}

export default ThemeService;
