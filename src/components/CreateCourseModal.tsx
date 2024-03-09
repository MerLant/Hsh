import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
} from "@chakra-ui/react";
import { CreateCourseModalProps } from "@/models/Course";
import { useUnit } from "effector-react";
import { createCourseFx } from "@/api/CourseService";
import { CourseResponse } from "@/models/response/CourseResponse";
import { useRouter } from "next/navigation";

function CreateCourseModal({ isOpen, onClose }: CreateCourseModalProps) {
	const router = useRouter();

	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [course, setCourse] = useState<CourseResponse>({
		description: "",
		id: 0,
		isDisable: false,
		name: "",
	});

	const storeManager = useUnit({
		createCourse: createCourseFx,
	});

	const handleCreateCourse = async () => {
		// Вызов эффекта для создания курса и ожидание завершения запроса
		const createdCourse = await storeManager.createCourse({
			name: courseName,
			description: courseDescription,
		});

		// Проверка, что курс был успешно создан
		if (createdCourse && createdCourse.id) {
			// Перенаправление на страницу созданного курса
			router.push(`/course/${createdCourse.id}`);
		} else {
			// Обработка случая, когда создание курса не удалось
			// Здесь можно, например, показать уведомление об ошибке
			console.error("Не удалось создать курс.");
		}

		// Закрытие модального окна
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создание нового курса</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Название курса</FormLabel>
						<Input
							placeholder='Название курса'
							value={courseName}
							onChange={(e) => setCourseName(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Описание курса</FormLabel>
						<Textarea
							placeholder='Описание курса'
							value={courseDescription}
							onChange={(e) =>
								setCourseDescription(e.target.value)
							}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme='blue'
						mr={3}
						onClick={handleCreateCourse}
					>
						Создать
					</Button>
					<Button onClick={onClose}>Отменить</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default CreateCourseModal;
