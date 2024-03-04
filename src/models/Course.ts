export interface CreateCourseData {
	name: string;
	description?: string;
	isDisable?: boolean;
}

export interface UpdateCourseData {
	name: string;
	description: string;
	isDisable: boolean;
}
