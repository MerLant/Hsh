import { TaskTestData } from "@/models/Task";

export interface TaskResponse {
	id?: number;
	name: string;
	description?: string;
	runTimeout: number;
	runMemoryLimit: number;
	compileTimeout: number;
	compileMemoryLimit: number;
	themeId: number;
	isDisable: boolean;
	tests?: TaskTestData[];
}

export interface TestResultsSummary {
	taskId: number;
	passedTests: number;
	totalTests: number;
	executionDate: Date;
}
