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
	id?: string;
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
	tests?: TaskTestData[];
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
	tests?: TaskTestData[];
}

export interface CreateTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	themeId: number;
}

export interface EditTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	task: TaskData;
}
