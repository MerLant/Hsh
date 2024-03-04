import { TaskData } from "@/models/Task";

export interface TaskResponse {
	data: TaskData;
	message?: string;
}
