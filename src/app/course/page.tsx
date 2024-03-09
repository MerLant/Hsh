"use client";

import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Container,
	Flex,
	Heading,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { $allCourses, $currentUserRole } from "@/store";
import { getRoleFx } from "@/api/UserService";
import { findAllCoursesFx } from "@/api/CourseService";
import CreateCourseModal from "@/components/CreateCourseModal";
import { Link } from "@chakra-ui/next-js";

export default function CoursesPage() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { courses, currentUserRole, getRole, findAllCourses } = useUnit({
		courses: $allCourses,
		currentUserRole: $currentUserRole,
		getRole: getRoleFx,
		findAllCourses: findAllCoursesFx,
	});

	useEffect(() => {
		if (!currentUserRole) {
			getRole();
		}
	}, []);

	useEffect(() => {
		findAllCourses();
	}, []);

	return (
		<Container maxW='container.xl' py={5}>
			<Flex justifyContent='space-between' alignItems='center' mb={5}>
				<Heading as='h1'>Все Курсы</Heading>
				{(currentUserRole?.name === "ADMIN" ||
					currentUserRole?.name === "TEACHER") && (
					<Button
						leftIcon={<AddIcon />}
						colorScheme='teal'
						onClick={onOpen}
					>
						Добавить курс
					</Button>
				)}
			</Flex>

			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
				{courses.map((course, index) => (
					<LinkBox as={Card} key={index}>
						<CardHeader>
							<LinkOverlay
								as={Link}
								href={`./course/${course.id}`}
							>
								<Heading size='md'>{course.name}</Heading>
							</LinkOverlay>
						</CardHeader>
						<CardBody>
							<Text fontSize='sm'>
								{course.description || "Описание отсутствует."}
							</Text>
						</CardBody>
					</LinkBox>
				))}
			</SimpleGrid>

			<CreateCourseModal isOpen={isOpen} onClose={onClose} />
		</Container>
	);
}
