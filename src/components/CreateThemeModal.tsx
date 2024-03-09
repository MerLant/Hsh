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
import { useUnit } from "effector-react";
import { CreateThemeModalProps } from "@/models/Theme";
import { createThemeFx } from "@/api/ThemeService";

function CreateCourseModal({
	isOpen,
	onClose,
	courseId,
}: CreateThemeModalProps) {
	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");

	const storeManager = useUnit({
		createTheme: createThemeFx,
	});

	const handleCreateCourse = () => {
		storeManager.createTheme({
			courseId: courseId,
			name: courseName,
			description: courseDescription,
		});
		onClose(); // Закрыть модальное окно после создания курса
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создание нового курса</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Название темы</FormLabel>
						<Input
							placeholder='Название темы'
							value={courseName}
							onChange={(e) => setCourseName(e.target.value)}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Описание темы</FormLabel>
						<Textarea
							placeholder='Описание темы'
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
