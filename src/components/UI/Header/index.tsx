import {
	Badge,
	Box,
	ButtonGroup,
	Flex,
	Heading,
	Spacer,
	useColorModeValue,
} from "@chakra-ui/react";
import { ChangeTheme, YandexAuthButton } from "@/components/UI/Buttons";
import { Link } from "@chakra-ui/next-js";

export function Header() {
	const bgColor = useColorModeValue("gray.200", "gray.700");
	return (
		<header>
			<Flex
				minWidth='max-content'
				alignItems='center'
				gap='2'
				marginY='8px'
				marginX='4%'
				borderRadius='lg'
				padding='4px'
				bg={bgColor}
			>
				<Box p='2' gap='2'>
					<Link href='/' _hover={{}}>
						<Heading
							display={"inline"}
							size='md'
							bgGradient='linear(to-l, #7928CA, #FF0080)'
							bgClip='text'
						>
							HshCode
						</Heading>
						<Badge colorScheme='purple'>BETA</Badge>
					</Link>
				</Box>

				<Spacer />
				<ButtonGroup gap='2'>
					<ChangeTheme />
					<YandexAuthButton />
				</ButtonGroup>
			</Flex>
		</header>
	);
}
