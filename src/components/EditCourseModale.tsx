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
	useToast,
} from "@chakra-ui/react";
import { removeCourseFx, updateCourseFx } from "@/api/CourseService";
import { EditThemeModalProps } from "@/models/Theme";
import { useRouter } from "next/navigation";
import { EditCourseModalProps } from "@/models/Course";

function EditCourseModal({ isOpen, onClose, course }: EditCourseModalProps) {
	const router = useRouter();
	const [courseData, setCourseData] = useState({
		name: course?.name || "",
		description: course?.description || "",
	});

	const toast = useToast();

	const handleUpdate = async () => {
		if (course.id) {
			await updateCourseFx({
				id: course.id,
				updateCourseDto: {
					name: courseData.name,
					description: courseData.description,
				},
			});
			onClose();
			toast({
				title: "Курс обновлен",
				description: "Изменения сохранены успешно.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleDelete = async () => {
		await removeCourseFx(course.id);
		toast({
			title: "Курс удален",
			description: "Курс успешно удален.",
			status: "info",
			duration: 5000,
			isClosable: true,
		});
		onClose();
		router.push("/course");
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Редактировать курс</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Название</FormLabel>
						<Input
							value={courseData.name}
							onChange={(e) =>
								setCourseData({
									...courseData,
									name: e.target.value,
								})
							}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Описание</FormLabel>
						<Textarea
							value={courseData.description}
							onChange={(e) =>
								setCourseData({
									...courseData,
									description: e.target.value,
								})
							}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='red' onClick={handleDelete}>
						Удалить
					</Button>
					<Button colorScheme='blue' mr={3} onClick={handleUpdate}>
						Сохранить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EditCourseModal;
