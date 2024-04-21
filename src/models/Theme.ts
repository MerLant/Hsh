import { ThemeResponse } from "@/models/response/ThemeResponse";

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

export interface CreateThemeModalProps {
	isOpen: boolean;
	onClose: () => void;
	courseId: number;
}

export interface EditThemeModalProps {
	isOpen: boolean;
	onClose: () => void;
	theme: ThemeResponse;
}
