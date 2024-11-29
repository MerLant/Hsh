"use client";
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

const EditTaskModal: React.FC<EditTaskModalProps> = ({
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
	const [taskTests, setTaskTests] = useState<TaskTestData[]>([]);

	const storeManager = useUnit({
		updateTask: updateTaskFx,
		currentTask: $currentTask,
		findOneTask: findOneTaskFx,
	});

	const removeTest = (index: number) => {
		const updatedTests = [...taskTests];
		updatedTests.splice(index, 1);
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
		updatedTests[index] = {
			...updatedTests[index],
			[field]: value,
		};
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
			setTaskTests(task.taskTests || []);
		}
	}, [task]);

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
					tests: taskTests,
				},
			});
		}

		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Редактировать задачу</ModalHeader>
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
						{/* Остальные поля формы */}
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
						Сохранить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditTaskModal;
