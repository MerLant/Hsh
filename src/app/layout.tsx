import type { Metadata } from "next";
import { Providers } from "./providers";
import React from "react";

export const metadata: Metadata = {
	title: "Hshcode",
	description: "Hshcode - Проверь себя сам",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
