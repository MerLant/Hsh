import React, { useState } from "react";
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
import { CreateTaskModalProps, TaskTestData } from "@/models/Task";
import { useUnit } from "effector-react";
import { createTaskFx } from "@/api/TaskService";

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
	isOpen,
	onClose,
	themeId,
}: CreateTaskModalProps) => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [runTimeout, setRunTimeout] = useState<number>(10);
	const [runMemoryLimit, setRunMemoryLimit] = useState<number>(10240);
	const [compileTimeout, setCompileTimeout] = useState<number>(10);
	const [compileMemoryLimit, setCompileMemoryLimit] = useState<number>(10240);
	const [taskTests, setTaskTests] = useState<TaskTestData[]>([
		{ input: "", output: "" },
	]);

	const storeManager = useUnit({
		createTask: createTaskFx,
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

	const handleSubmit = () => {
		// Logic to submit the data
		storeManager.createTask({
			themeId,
			name,
			description,
			runTimeout,
			runMemoryLimit,
			compileTimeout,
			compileMemoryLimit,
			tests: taskTests,
		});
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
