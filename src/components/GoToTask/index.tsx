import React, { useState } from "react";
import { useUnit } from "effector-react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	NumberInput,
	NumberInputField,
	Spacer,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { findOneTaskFx } from "@/api/TaskService";
import { useRouter } from "next/navigation"; // Предполагается, что у вас есть эффект findOneTaskFx

export function GoToTask() {
	const router = useRouter();
	const toast = useToast();
	const [taskId, setTaskId] = useState(0);
	const { isLoading, executeFindOneTask } = useUnit({
		isLoading: findOneTaskFx.pending,
		executeFindOneTask: findOneTaskFx,
	});

	const handleInputChange = (
		valueAsString: string,
		valueAsNumber: number
	) => {
		setTaskId(valueAsNumber);
	};

	const handleGoToTask = async () => {
		try {
			await executeFindOneTask(taskId);
			// Перенаправление на страницу задачи, предполагается что она существует
			// Например, можно использовать useRouter от next/router для переадресации
			// router.push(`/tasks/${taskId}`);
			toast({
				title: "Задача найдена.",
				description: "Вы будете перенаправлены на страницу задачи.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			router.push(`/task/${taskId}`);
		} catch (error) {
			toast({
				title: "Ошибка.",
				description: "Задача не найдена.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Card minW='400' h='150'>
			<CardHeader>
				<Heading size='md'>Перейти к задаче:</Heading>
			</CardHeader>
			<CardBody>
				<Flex gap='8px'>
					<NumberInput min={0} onChange={handleInputChange}>
						<NumberInputField />
					</NumberInput>
					<Spacer />
					<Button
						rightIcon={
							isLoading ? (
								<Spinner size='xs' />
							) : (
								<ArrowForwardIcon />
							)
						}
						p={4}
						fontWeight='bold'
						borderRadius='md'
						onClick={handleGoToTask}
						_hover={{
							bgGradient: "linear(to-l, #7928CA, #FF0080)",
							color: "white",
						}}
					>
						{isLoading ? <Spinner size='sm' /> : "Вперёд!"}
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
}
