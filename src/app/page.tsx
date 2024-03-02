"use client";
import styles from "./page.module.css";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { autocompletion } from "@codemirror/autocomplete";
import React, { useCallback, useState } from "react";
import { Button, Code } from "@chakra-ui/react";
import YandexAuthButton from "@/components/UI/Buttons/YandexAuthButton";
import $api from "@/api";

export default function Home() {
	const completions = [
		{ label: "panic", type: "keyword" },
		{ label: "park", type: "constant", info: "Test completion" },
		{ label: "Console", type: "variable" },
	];

	function myCompletions(context: any) {
		let before = context.matchBefore(/\w+/);
		if (!context.explicit && !before) return null;
		return {
			from: before ? before.from : context.pos,
			options: completions,
			validFor: /^\w*$/,
		};
	}

	const [responseState, setResponseState] = useState("");
	const [value, setValue] = useState("// Type a 'p'\n");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onChange = useCallback((val: any, viewUpdate: any) => {
		// console.log("val:", val);
		setValue(val);
	}, []);

	const handleClick = async () => {
		const data = {
			code: value,
		};

		try {
			const response = await $api.post(
				"http://127.0.0.1:3001/api/check/execute/",
				data
			);
			setResponseState(JSON.stringify(response.data, null, 2));
		} catch (error) {
			setResponseState(JSON.stringify(error));
		}
	};
	const placeholder =
		"using System;\n\nclass Program\n{\n\tstatic void Main(string[] args)\n\t{\n\t\t\n\t\t// Ваш код сюда\n\t\t\n\t}\n}";

	return (
		<main className={styles.main}>
			<CodeMirror
				value={placeholder}
				height='200px'
				width='1000px'
				theme='dark'
				extensions={[
					langs.csharp(),
					autocompletion({ override: [myCompletions] }),
				]}
				basicSetup={{
					foldGutter: false,
					dropCursor: false,
					allowMultipleSelections: false,
					indentOnInput: false,
				}}
				onChange={onChange}
			/>
			<Button onClick={handleClick}>Проверить</Button>
			<Code>{responseState}</Code>
			<YandexAuthButton />
		</main>
	);
}
