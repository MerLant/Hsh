import $api from "@/api/index";
import { CreateCourseData, UpdateCourseData } from "@/models/Course";

class CourseService {
	static async findAll() {
		try {
			const response = await $api.get("/learning/course");
			return response.data;
		} catch (error) {
			console.error("Error fetching courses:", error);
			throw error;
		}
	}

	static async create(createdCourse: CreateCourseData) {
		try {
			const response = await $api.post("/learning/course", createdCourse);
			return response.data;
		} catch (error) {
			console.error("Error creating course:", error);
			throw error;
		}
	}

	static async findOne(id: number) {
		try {
			const response = await $api.get(`/learning/course/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching course with ID ${id}:`, error);
			throw error;
		}
	}

	static async update(id: number, updateCourseDto: UpdateCourseData) {
		try {
			const response = await $api.put(
				`/learning/course/${id}`,
				updateCourseDto
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating course with ID ${id}:`, error);
			throw error;
		}
	}

	static async remove(id: number) {
		try {
			const response = await $api.delete(`/learning/course/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error removing course with ID ${id}:`, error);
			throw error;
		}
	}
}

export default CourseService;
