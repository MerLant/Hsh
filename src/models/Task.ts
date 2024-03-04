export interface TaskData {
	id?: number;
	name: string;
	description?: string;
	runTimeout: number;
	runMemoryLimit: number;
	compileTimeout: number;
	compileMemoryLimit: number;
	themeId: number;
	isDisable: boolean;
	taskTests?: TaskTestData[];
}

// Интерфейс для описания структуры теста задачи
export interface TaskTestData {
	input: string;
	output: string;
}

// Интерфейс для создания задачи
export interface CreateTaskData {
	name: string;
	description?: string;
	runTimeout: number;
	runMemoryLimit: number;
	compileTimeout: number;
	compileMemoryLimit: number;
	themeId: number;
	taskTests?: TaskTestData[];
}

// Интерфейс для обновления задачи
export interface UpdateTaskData {
	name?: string;
	description?: string;
	runTimeout?: number;
	runMemoryLimit?: number;
	compileTimeout?: number;
	compileMemoryLimit?: number;
	themeId?: number;
	isDisable?: boolean;
	taskTests?: TaskTestData[];
}
