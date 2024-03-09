"use client";

import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
	Box,
	Button,
	ButtonGroup,
	Heading,
	Stack,
	StackDivider,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { CodeEditor } from "@/components";
import {
	executeTestsForTaskFx,
	findOneTaskFx,
	getResultsByUserAndTaskFx,
} from "@/api/TaskService";
import {
	$currentTask,
	$currentUser,
	$currentUserRole,
	$taskResults,
} from "@/store";
import { getCurrentUserFx, getRoleFx } from "@/api/UserService";
import { TestResultsSummary } from "@/models/response/TaskResposne";
import { EditTaskModal } from "@/components/EditTaskModal";

function TaskPage({ params }: { params: { id: string } }) {
	const {
		task,
		getTask,
		executeTests,
		currentUser,
		getCurrentUser,
		getResultsByUserAndTask,
		getRole,
		currentUserRole,
	} = useUnit({
		task: $currentTask,
		getTask: findOneTaskFx,
		executeTests: executeTestsForTaskFx,
		currentUser: $currentUser,
		getCurrentUser: getCurrentUserFx,
		getResultsByUserAndTask: getResultsByUserAndTaskFx,
		getRole: getRoleFx,
		currentUserRole: $currentUserRole,
		taskResults: $taskResults,
	});

	const [code, setCode] = useState("");
	const [testResults, setTestResults] = useState<TestResultsSummary[]>([]);
	const {
		isOpen: isEditTaskModalOpen,
		onOpen: onEditTaskModalOpen,
		onClose: onEditTaskModalClose,
	} = useDisclosure();
	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	useEffect(() => {
		if (params.id && currentUser) {
			getTask(+params.id);
			getResultsByUserAndTask({
				userId: currentUser.id,
				taskId: +params.id,
			});
		}
	}, [getTask, getResultsByUserAndTask, params.id, currentUser]);

	useEffect(() => {
		$currentUserRole.watch((role) => console.log(role));
	});

	// Подписка на стор с результатами и обновление состояния компонента
	useEffect(() => {
		if ($taskResults) {
			const unsubscribe = $taskResults.watch((newTestResults) => {
				setTestResults(newTestResults);
			});

			return () => unsubscribe();
		}
	}, []);

	useEffect(() => {
		if (!currentUserRole) {
			getRole();
		}
	}, []);

	const handleSubmit = async () => {
		if (task?.id && currentUser) {
			await executeTests({ taskId: +params.id, code });
			getResultsByUserAndTask({
				userId: currentUser.id,
				taskId: task.id,
			});
		}
	};

	return (
		<VStack spacing={4} align='stretch'>
			{task ? (
				<>
					<Box>
						<Heading>{task.name}</Heading>
						{(currentUserRole?.name === "ADMIN" ||
							currentUserRole?.name === "TEACHER") && (
							<ButtonGroup>
								<Button onClick={onEditTaskModalOpen}>
									Редактировать тему
								</Button>
							</ButtonGroup>
						)}
						<Text>
							{task.description || "Описание отсутствует."}
						</Text>
						<CodeEditor onCodeChange={handleCodeChange} />
						<Button colorScheme='blue' onClick={handleSubmit}>
							Отправить
						</Button>
					</Box>
					<Stack divider={<StackDivider />} spacing={4}>
						{testResults &&
							testResults
								.slice() // Создаем копию, чтобы не мутировать оригинальный массив
								.sort(
									(a, b) =>
										new Date(b.executionDate).getTime() -
										new Date(a.executionDate).getTime()
								) // Сортировка по убыванию даты
								.map((result, index) => (
									<Box key={index}>
										<Text>
											Дата выполнения:{" "}
											{new Date(
												result.executionDate
											).toLocaleString()}
										</Text>
										<Text>
											Пройдено тестов:{" "}
											{result.passedTests} из{" "}
											{result.totalTests}
										</Text>
									</Box>
								))}
					</Stack>

					<EditTaskModal
						isOpen={isEditTaskModalOpen}
						onClose={onEditTaskModalClose}
						task={task}
					/>
				</>
			) : (
				<Text>Загрузка информации о задаче...</Text>
			)}
		</VStack>
	);
}

export default TaskPage;
