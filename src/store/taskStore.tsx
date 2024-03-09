import { createStore } from "effector";
import {
	createTaskFx,
	executeTestsForTaskFx,
	findAllTasksFx,
	findOneTaskFx,
	getResultsByUserAndTaskFx,
	removeTaskFx,
	updateTaskFx,
} from "@/api/TaskService";
import { TaskData } from "@/models/Task";

// Определение сторов
const $allTasks = createStore<TaskData[]>([])
	.on(findAllTasksFx.doneData, (_, tasks) => tasks)
	.on(createTaskFx.doneData, (tasks, task) => [...tasks, task])
	.on(updateTaskFx.doneData, (tasks, updatedTask) =>
		tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
	)
	.on(removeTaskFx.done, (tasks, { params: id }) =>
		tasks.filter((task) => task.id !== id)
	);

const $currentTask = createStore<TaskData | null>(null)
	.on(findOneTaskFx.doneData, (_, task) => task)
	.reset(removeTaskFx);

// Создание сторов для результатов выполнения и исполнения задачи
const $taskResults = createStore<any | null>(null).on(
	getResultsByUserAndTaskFx.doneData,
	(_, result) => result
);

const $taskExecution = createStore<any | null>(null).on(
	executeTestsForTaskFx.doneData,
	(_, result) => result
);

// Индикаторы загрузки
const $isLoadingTasks = findAllTasksFx.pending;
const $isLoadingCurrentTask = findOneTaskFx.pending;
const $isCreatingTask = createTaskFx.pending;
const $isUpdatingTask = updateTaskFx.pending;
const $isRemovingTask = removeTaskFx.pending;
const $isLoadingTaskResults = getResultsByUserAndTaskFx.pending;
const $isExecutingTask = executeTestsForTaskFx.pending;

export {
	$allTasks,
	$currentTask,
	$taskResults,
	$taskExecution,
	$isLoadingTasks,
	$isLoadingCurrentTask,
	$isCreatingTask,
	$isUpdatingTask,
	$isRemovingTask,
	$isLoadingTaskResults,
	$isExecutingTask,
};
