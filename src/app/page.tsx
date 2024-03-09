"use client";
// import styles from "./page.module.css";
import React, { useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { CodeEditor } from "@/components";
import { GoToTask } from "@/components/GoToTask";
import { useUnit } from "effector-react";
import { $isLoggedIn } from "@/store/authStore";
import { CourseList } from "@/components/CourseList";

export default function Home() {
	const { isLoggedIn } = useUnit({
		isLoggedIn: $isLoggedIn,
	});

	const [, setCode] = useState("");

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	return (
		<main style={{ height: "100%" }}>
			<Flex
				flexDirection='column'
				gap='8px'
				justifyContent='center'
				flex='1'
			>
				<CodeEditor onCodeChange={handleCodeChange} readonly={true} />
				<Heading
					bgGradient='linear(to-l, #7928CA, #FF0080)'
					bgClip='text'
					fontSize='6xl'
					fontWeight='extrabold'
				>
					HshCode
				</Heading>
				<Heading fontSize='6xl'>- проверяй себя сам</Heading>

				<Text fontSize='4xl'>
					Сервис сам проверит правильность решения ваших задач
				</Text>
				{isLoggedIn ? (
					<Flex
						flexDirection={"row"}
						justifyContent={"space-between"}
						gap='8px'
						flexWrap={"wrap"}
					>
						<CourseList />

						<GoToTask />
					</Flex>
				) : (
					<Text>Войдите в аккаунт, чтобы продолжить</Text>
				)}
			</Flex>
		</main>
	);
}
