import { createStore } from "effector";
import {
	createThemeFx,
	findAllThemesFx,
	findOneThemeFx,
	getAllTaskThemeFx,
	removeThemeFx,
	updateThemeFx,
} from "@/api/ThemeService";
import { ThemeResponse } from "@/models/response/ThemeResponse";
import { TaskResponse } from "@/models/response/TaskResposne";

// Создаем стор для хранения списка тем
export const $themes = createStore<ThemeResponse[]>([]).on(
	findAllThemesFx.doneData,
	(_, themes) => themes
);

// Создаем стор для хранения одной темы, может использоваться для детального просмотра
export const $currentTheme = createStore<ThemeResponse | null>(null)
	.on(findOneThemeFx.doneData, (_, theme) => theme)
	.reset(removeThemeFx.finally);

// Создаем стор для обновления темы
// Предполагается, что обновление темы не требует хранения данных в сторе,
// но если нужно, можно создать стор для хранения результата обновления.

// Создаем стор для индикации загрузки данных
export const $loadingThemes = createStore<boolean>(false)
	.on(findAllThemesFx.pending, (_, pending) => pending)
	.on(findOneThemeFx.pending, (_, pending) => pending)
	.on(createThemeFx.pending, (_, pending) => pending)
	.on(updateThemeFx.pending, (_, pending) => pending)
	.on(removeThemeFx.pending, (_, pending) => pending);

export const $allThemeTask = createStore<TaskResponse[]>([]);
$allThemeTask.on(getAllTaskThemeFx.doneData, (_, tasks) => tasks);
