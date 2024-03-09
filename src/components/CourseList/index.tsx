import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	LinkBox,
	LinkOverlay,
	Spinner,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";
import { findAllCoursesFx } from "@/api/CourseService";

import { $topCourses } from "@/store/courseStore";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";

export function CourseList() {
	const router = useRouter(); // Используем useRouter для получения доступа к функциональности роутинга

	const { findAllCourses, courses } = useUnit({
		findAllCourses: findAllCoursesFx.pending, // Предполагаем, что этот стор отражает состояние загрузки
		courses: $topCourses, // Предполагаем, что этот стор содержит все курсы
	});

	useEffect(() => {
		findAllCoursesFx();
	}, []);

	return (
		<Card minWidth='400'>
			<CardHeader>
				<Heading size='md'>Курсы</Heading>
			</CardHeader>

			{findAllCourses ? (
				<CardBody
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='200px'
				>
					<Spinner />
				</CardBody>
			) : (
				<CardBody>
					<Stack divider={<StackDivider />} spacing='4'>
						{courses.slice(0, 5).map((course, index) => (
							<LinkBox as={Box} key={index}>
								<LinkOverlay
									as={Link}
									href={`/course/${course.id}`}
								>
									<Heading
										size='xs'
										textTransform='uppercase'
									>
										{course.name}
									</Heading>
								</LinkOverlay>
								<Text pt='2' fontSize='sm'>
									{course.description || "Нет описания"}
								</Text>
							</LinkBox>
						))}
					</Stack>
					<Button
						leftIcon={<HamburgerIcon />}
						mt='4'
						onClick={() => {
							router.push("/course");
						}}
					>
						Все курсы
					</Button>
				</CardBody>
			)}
		</Card>
	);
}
