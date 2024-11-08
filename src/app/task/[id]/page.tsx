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
	Badge,
	Flex,
	IconButton,
	useColorModeValue,
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
import { EditIcon } from "@chakra-ui/icons";

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
		<VStack spacing={6} align='stretch' p={6} minH='100vh'>
			{task ? (
				<>
					<Flex justify='space-between' align='center'>
						<Heading
							size='lg'
							color={useColorModeValue("blue.600", "blue.300")}
						>
							{task.name}
						</Heading>
						{(currentUserRole?.name === "ADMIN" ||
							currentUserRole?.name === "TEACHER") && (
							<IconButton
								aria-label='Edit Task'
								icon={<EditIcon />}
								onClick={onEditTaskModalOpen}
								colorScheme='teal'
								variant='outline'
							/>
						)}
					</Flex>

					<Text
						fontSize='lg'
						color={useColorModeValue("gray.700", "gray.300")}
					>
						{task.description || "Описание отсутствует."}
					</Text>

					<CodeEditor onCodeChange={handleCodeChange} />
					<Button
						colorScheme='blue'
						onClick={handleSubmit}
						width='full'
					>
						Отправить код на тестирование
					</Button>

					<Stack divider={<StackDivider />} spacing={4} mt={8}>
						<Heading size='md'>Результаты тестирования</Heading>
						{testResults.length > 0 ? (
							testResults
								.slice()
								.sort(
									(a, b) =>
										new Date(b.executionDate).getTime() -
										new Date(a.executionDate).getTime()
								)
								.map((result, index) => (
									<Box
										key={index}
										border='1px'
										borderColor={useColorModeValue(
											"gray.300",
											"gray.700"
										)}
										borderRadius='md'
										p={4}
										bg={useColorModeValue(
											"white",
											"gray.700"
										)}
									>
										<Flex
											justify='space-between'
											align='center'
										>
											<Text
												fontSize='md'
												color={useColorModeValue(
													"gray.700",
													"gray.300"
												)}
											>
												Дата выполнения:{" "}
												{new Date(
													result.executionDate
												).toLocaleString()}
											</Text>
											<Badge
												colorScheme={
													result.passedTests ===
													result.totalTests
														? "green"
														: "red"
												}
											>
												{result.passedTests ===
												result.totalTests
													? "Успешно"
													: "Не пройдено"}
											</Badge>
										</Flex>
										<Text mt={2}>
											Пройдено тестов:{" "}
											{result.passedTests} из{" "}
											{result.totalTests}
										</Text>
									</Box>
								))
						) : (
							<Text color='gray.500'>
								Результаты тестирования отсутствуют.
							</Text>
						)}
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
