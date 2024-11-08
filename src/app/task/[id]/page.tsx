"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useStore, useEvent } from "effector-react";
import {
	Box,
	Button,
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
	Card,
	CardHeader,
	CardBody,
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
	const task = useStore($currentTask);
	const currentUser = useStore($currentUser);
	const currentUserRole = useStore($currentUserRole);
	const testResults = useStore($taskResults);

	const getTask = useEvent(findOneTaskFx);
	const executeTests = useEvent(executeTestsForTaskFx);
	const getCurrentUser = useEvent(getCurrentUserFx);
	const getResultsByUserAndTask = useEvent(getResultsByUserAndTaskFx);
	const getRole = useEvent(getRoleFx);

	const [code, setCode] = useState("");

	const {
		isOpen: isEditTaskModalOpen,
		onOpen: onEditTaskModalOpen,
		onClose: onEditTaskModalClose,
	} = useDisclosure();

	const handleCodeChange = useCallback((newCode: string) => {
		setCode(newCode);
	}, []);

	const handleSubmit = useCallback(async () => {
		if (task?.id && currentUser) {
			await executeTests({ taskId: +params.id, code });
			getResultsByUserAndTask({
				userId: currentUser.id,
				taskId: task.id,
			});
		}
	}, [
		executeTests,
		getResultsByUserAndTask,
		task,
		currentUser,
		code,
		params.id,
	]);

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	useEffect(() => {
		if (params.id && currentUser) {
			const taskId = +params.id;
			getTask(taskId);
			getResultsByUserAndTask({
				userId: currentUser.id,
				taskId,
			});
		}
	}, [params.id, currentUser, getTask, getResultsByUserAndTask]);

	useEffect(() => {
		if (!currentUserRole) {
			getRole();
		}
	}, [currentUserRole, getRole]);

	const sortedTestResults = useMemo(() => {
		return testResults
			? [...testResults].sort(
					(a, b) =>
						new Date(b.executionDate).getTime() -
						new Date(a.executionDate).getTime()
				)
			: [];
	}, [testResults]);

	const headingColor = useColorModeValue("blue.600", "blue.300");
	const textColor = useColorModeValue("gray.700", "gray.300");
	const borderColor = useColorModeValue("gray.300", "gray.700");
	const bgColor = useColorModeValue("white", "gray.700");

	return (
		<VStack spacing={6} align='stretch' p={6} minH='100vh'>
			{task ? (
				<>
					<Flex justify='space-between' align='center'>
						<Heading size='lg' color={headingColor}>
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

					<Text fontSize='lg' color={textColor}>
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
					<Card p={4}>
						<CardHeader>
							<Heading size='md'>Результаты тестирования</Heading>
						</CardHeader>
						<CardBody>
							<Stack
								divider={<StackDivider />}
								spacing={4}
								mt={8}
							>
								{sortedTestResults.length > 0 ? (
									sortedTestResults.map((result) => (
										<Box
											key={
												result.id ||
												result.executionDate
											} // Убедитесь, что идентификатор уникален
											p={4}
										>
											<Flex
												justify='space-between'
												align='center'
											>
												<Text
													fontSize='md'
													color={textColor}
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
						</CardBody>
					</Card>

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
