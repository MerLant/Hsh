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
import { EditThemeModalProps } from "@/models/Theme";
import { useRouter } from "next/navigation";
import { removeThemeFx, updateThemeFx } from "@/api/ThemeService";

function EditThemeModal({ isOpen, onClose, theme }: EditThemeModalProps) {
	const router = useRouter();
	const [themeData, setThemeData] = useState({
		name: theme?.name || "",
		description: theme?.description || "",
	});

	const toast = useToast();

	const handleUpdate = async () => {
		if (theme.id) {
			await updateThemeFx({
				id: theme.id,
				updateThemeData: {
					name: themeData.name,
					description: themeData.description,
				},
			});
			onClose();
			toast({
				title: "Тема обновлена",
				description: "Изменения сохранены успешно.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleDelete = async () => {
		await removeThemeFx(theme.id);
		toast({
			title: "Тема удалена",
			description: "Тема успешно удалена.",
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
				<ModalHeader>Редактировать тему</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Название</FormLabel>
						<Input
							value={themeData.name}
							onChange={(e) =>
								setThemeData({
									...themeData,
									name: e.target.value,
								})
							}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Описание</FormLabel>
						<Textarea
							value={themeData.description}
							onChange={(e) =>
								setThemeData({
									...themeData,
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

export default EditThemeModal;
