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
	$allCoursesTheme,
	$course,
	$courseLoading,
	$currentUserRole,
} from "@/store";
import { findOneCourseFx, getAllThemeCourseFx } from "@/api/CourseService";
import EditCourseModal from "@/components/EditCourseModale";
import { getRoleFx } from "@/api/UserService";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import CreateThemeModal from "@/components/CreateThemeModal"; // Импортируем модальное окно

function CoursePage({ params }: { params: { id: string } }) {
	// Добавляем второй useDisclosure для управления модальным окном создания темы
	const {
		isOpen: isEditCourseModalOpen,
		onOpen: onEditCourseModalOpen,
		onClose: onEditCourseModalClose,
	} = useDisclosure();

	const {
		isOpen: isCreateThemeModalOpen,
		onOpen: onCreateThemeModalOpen,
		onClose: onCreateThemeModalClose,
	} = useDisclosure();

	const storeManager = useUnit({
		course: $course,
		courseLoading: $courseLoading,
		currentUserRole: $currentUserRole,
		findOneCourse: findOneCourseFx,
		getAllThemeCourse: getAllThemeCourseFx,
		allCoursesTheme: $allCoursesTheme,
		getRole: getRoleFx,
	});

	useEffect(() => {
		if (params.id) {
			storeManager.findOneCourse(+params.id);
		}
	}, [storeManager.findOneCourse]);

	useEffect(() => {
		if (!storeManager.currentUserRole) {
			storeManager.getRole();
		}
	}, []);

	useEffect(() => {
		if (storeManager.course) {
			getAllThemeCourseFx(storeManager.course.id);
		}
	}, [storeManager.course]);

	return (
		<Box>
			<Breadcrumb>
				<BreadcrumbItem>
					<BreadcrumbLink as={Link} href='/course'>
						Курсы
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href='#'>
						{storeManager.course?.name || (
							<Skeleton height='20px' />
						)}
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<Flex justifyContent='space-between' alignItems='center' mb='5'>
				<Heading as='h1'>
					{storeManager.course?.name || (
						<Skeleton height='20px' width='200px' />
					)}
				</Heading>
				{(storeManager.currentUserRole?.name === "ADMIN" ||
					storeManager.currentUserRole?.name === "TEACHER") && (
					<ButtonGroup>
						<Button
							leftIcon={<AddIcon />}
							colorScheme='teal'
							onClick={onCreateThemeModalOpen}
						>
							Добавить тему
						</Button>
						<Button onClick={onEditCourseModalOpen}>
							Редактировать курс
						</Button>
					</ButtonGroup>
				)}
			</Flex>

			{storeManager.course?.description || (
				<Skeleton height={15} width={200} />
			)}

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
				{storeManager.allCoursesTheme.map((theme, index) => (
					<LinkBox as={Card} key={index}>
						<CardHeader>
							<LinkOverlay as={Link} href={`/theme/${theme.id}`}>
								<Heading size='md'>{theme.name}</Heading>
							</LinkOverlay>
						</CardHeader>
						<CardBody>
							<Text fontSize='sm'>
								{theme.description || "Описание отсутствует."}
							</Text>
						</CardBody>
					</LinkBox>
				))}
			</SimpleGrid>

			{storeManager.course && (
				<EditCourseModal
					isOpen={isEditCourseModalOpen}
					onClose={onEditCourseModalClose}
					course={storeManager.course}
				/>
			)}
			{storeManager.course && storeManager.allCoursesTheme && (
				<CreateThemeModal
					isOpen={isCreateThemeModalOpen}
					onClose={onCreateThemeModalClose}
					courseId={storeManager.course.id}
				/>
			)}
		</Box>
	);
}

export default CoursePage;
