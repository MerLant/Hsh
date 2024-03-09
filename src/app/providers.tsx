"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Header } from "@/components";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider>
			<Header />
			<Box marginX='4%'>{children}</Box>
		</ChakraProvider>
	);
}
