"use client";

import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Skeleton,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import {
	$allThemeTask,
	$currentTheme,
	$currentUserRole,
	$loadingThemes,
} from "@/store";
import { getRoleFx } from "@/api/UserService";
import { AddIcon } from "@chakra-ui/icons";
import EditThemeModale from "@/components/EditThemeModale";
import { Link } from "@chakra-ui/next-js";
import { findOneThemeFx, getAllTaskThemeFx } from "@/api/ThemeService";
import { CreateTaskModal } from "@/components/CreateTaskModal"; // Импортируем модальное окно

function ThemePage({ params }: { params: { id: string } }) {
	// Добавляем второй useDisclosure для управления модальным окном создания темы
	const {
		isOpen: isEditThemeModalOpen,
		onOpen: onEditThemeModalOpen,
		onClose: onEditThemeModalClose,
	} = useDisclosure();

	const {
		isOpen: isCreateTaskModalOpen,
		onOpen: onCreateTaskModalOpen,
		onClose: onCreateTaskModalClose,
	} = useDisclosure();

	const storeManager = useUnit({
		getRole: getRoleFx,
		currentUserRole: $currentUserRole,
		currentTheme: $currentTheme,
		courseLoading: $loadingThemes,
		findOneTheme: findOneThemeFx,
		getAllTaskTheme: getAllTaskThemeFx,
		alThemeTask: $allThemeTask,
	});

	useEffect(() => {
		if (params.id) {
			storeManager.findOneTheme(+params.id);
		}
	}, [storeManager.findOneTheme]);

	useEffect(() => {
		if (!storeManager.currentUserRole) {
			storeManager.getRole();
		}
	}, []);

	useEffect(() => {
		if (storeManager.currentTheme) {
			getAllTaskThemeFx(storeManager.currentTheme.id);
		}
	}, [storeManager.currentTheme]);

	return (
		<Box>
			<Breadcrumb>
				<BreadcrumbItem>
					{storeManager.currentTheme?.courseId && (
						<BreadcrumbLink
							as={Link}
							href={`/course/${storeManager.currentTheme?.courseId}`}
						>
							Курс
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href='#'>
						{storeManager.currentTheme?.name || (
							<Skeleton height='20px' />
						)}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Flex justifyContent='space-between' alignItems='center' mb='5'>
				<Heading as='h1'>
					{storeManager.currentTheme?.name || (
						<Skeleton height='20px' width='200px' />
					)}
				</Heading>
				{(storeManager.currentUserRole?.name === "ADMIN" ||
					storeManager.currentUserRole?.name === "TEACHER") && (
					<ButtonGroup>
						<Button
							leftIcon={<AddIcon />}
							colorScheme='teal'
							onClick={onCreateTaskModalOpen}
						>
							Добавить задачу
						</Button>
						<Button onClick={onEditThemeModalOpen}>
							Редактировать тему
						</Button>
					</ButtonGroup>
				)}
			</Flex>

			{storeManager.currentTheme?.description || (
				<Skeleton height={15} width={200} />
			)}

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
				{storeManager.alThemeTask.map((task, index) => (
					<LinkBox as={Card} key={index}>
						<CardHeader>
							<LinkOverlay as={Link} href={`/task/${task.id}`}>
								<Heading size='md'>{task.name}</Heading>
							</LinkOverlay>
						</CardHeader>
						<CardBody>
							<Text fontSize='sm'>
								{task.description || "Описание отсутствует."}
							</Text>
						</CardBody>
					</LinkBox>
				))}
			</SimpleGrid>

			{storeManager.currentTheme && (
				<EditThemeModale
					isOpen={isEditThemeModalOpen}
					onClose={onEditThemeModalClose}
					theme={storeManager.currentTheme}
				/>
			)}
			{storeManager.currentTheme && storeManager.alThemeTask && (
				<CreateTaskModal
					isOpen={isCreateTaskModalOpen}
					onClose={onCreateTaskModalClose}
					themeId={storeManager.currentTheme.id}
				/>
			)}
		</Box>
	);
}

export default ThemePage;
