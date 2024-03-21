import React, { useEffect, useState } from "react";
import {
	Button,
	CloseButton,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { EditTaskModalProps, TaskTestData } from "@/models/Task";
import { useUnit } from "effector-react";
import { findOneTaskFx, updateTaskFx } from "@/api/TaskService";
import { $currentTask } from "@/store";

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
	isOpen,
	onClose,
	task,
}: EditTaskModalProps) => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [runTimeout, setRunTimeout] = useState<number>(1000);
	const [runMemoryLimit, setRunMemoryLimit] = useState<number>(1000);
	const [compileTimeout, setCompileTimeout] = useState<number>(5000);
	const [compileMemoryLimit, setCompileMemoryLimit] = useState<number>(5000);
	const [taskTests, setTaskTests] = useState<TaskTestData[]>([
		{ input: "", output: "" },
	]);

	const storeManager = useUnit({
		updateTask: updateTaskFx,
		currentTask: $currentTask,
		findOneTask: findOneTaskFx,
	});

	const removeTest = (index: number) => {
		// Создаём копию текущего массива тестов
		const updatedTests = [...taskTests];

		// Удаляем тест по индексу
		updatedTests.splice(index, 1);

		// Обновляем состояние тестов новым массивом
		setTaskTests(updatedTests);
	};

	const addTest = () =>
		setTaskTests([...taskTests, { input: "", output: "" }]);
	const updateTest = (
		index: number,
		field: "input" | "output",
		value: string
	) => {
		const updatedTests = [...taskTests];
		updatedTests[index][field] = value;
		setTaskTests(updatedTests);
	};

	useEffect(() => {
		if (task) {
			setName(task.name);
			setDescription(task.description || "");
			setRunTimeout(task.runTimeout);
			setRunMemoryLimit(task.runMemoryLimit);
			setCompileTimeout(task.compileTimeout);
			setCompileMemoryLimit(task.compileMemoryLimit);
			setTaskTests(task.taskTests || taskTests);
		}
	}, [$currentTask]);

	const handleSubmit = () => {
		if (task?.id) {
			storeManager.updateTask({
				id: task.id,
				updateTaskData: {
					name,
					description,
					runTimeout,
					runMemoryLimit,
					compileTimeout,
					compileMemoryLimit,
				},
			});
		}

		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создать новую задачу</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<FormControl>
							<FormLabel>Название</FormLabel>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Описание</FormLabel>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Run Timeout</FormLabel>
							<Input
								type='number'
								value={runTimeout}
								onChange={(e) =>
									setRunTimeout(Number(e.target.value))
								}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Run Memory Limit</FormLabel>
							<Input
								type='number'
								value={runMemoryLimit}
								onChange={(e) =>
									setRunMemoryLimit(Number(e.target.value))
								}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Compile Timeout</FormLabel>
							<Input
								type='number'
								value={compileTimeout}
								onChange={(e) =>
									setCompileTimeout(Number(e.target.value))
								}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Compile Memory Limit</FormLabel>
							<Input
								type='number'
								value={compileMemoryLimit}
								onChange={(e) =>
									setCompileMemoryLimit(
										Number(e.target.value)
									)
								}
							/>
						</FormControl>
						<Button onClick={addTest}>Добавить тест</Button>
						{taskTests.map((test, index) => (
							<HStack key={index} width='100%' alignItems={"end"}>
								<FormControl>
									<FormLabel>Ввод {index + 1}</FormLabel>
									<Input
										value={test.input}
										onChange={(e) =>
											updateTest(
												index,
												"input",
												e.target.value
											)
										}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Вывод {index + 1}</FormLabel>
									<Input
										value={test.output}
										onChange={(e) =>
											updateTest(
												index,
												"output",
												e.target.value
											)
										}
									/>
								</FormControl>
								<CloseButton
									size='lg'
									onClick={() => removeTest(index)}
								/>
							</HStack>
						))}
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' onClick={handleSubmit}>
						Создать
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
