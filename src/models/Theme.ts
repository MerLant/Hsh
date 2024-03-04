export interface CreateThemeData {
	name: string;
	description?: string;
	courseId: number;
	isDisable?: boolean;
}

export interface UpdateThemeData {
	name?: string;
	description?: string;
	isDisable?: boolean;
}
