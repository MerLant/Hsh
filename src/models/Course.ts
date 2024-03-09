import { CourseResponse } from "@/models/response/CourseResponse";

export interface CreateCourseData {
	name: string;
	description?: string;
	isDisable?: boolean;
}

export interface UpdateCourseData {
	name?: string;
	description?: string;
	isDisable?: boolean;
}

export interface CreateCourseModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface EditCourseModalProps {
	isOpen: boolean;
	onClose: () => void;
	course: CourseResponse;
}
