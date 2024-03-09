import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export function ChangeTheme() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<header>
			<Button onClick={toggleColorMode}>
				{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			</Button>
		</header>
	);
}
