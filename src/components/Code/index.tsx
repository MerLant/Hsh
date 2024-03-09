import React, { useCallback, useState } from "react";
import { CodeEditorProps, CompletionItem } from "@/models/CodeEditor";
import { langs } from "@uiw/codemirror-extensions-langs";
import { autocompletion } from "@codemirror/autocomplete";
import CodeMirror from "@uiw/react-codemirror";

export function CodeEditor({
	onCodeChange,
	readonly = false,
}: CodeEditorProps) {
	/*
	Что бы получить данный в родительском компоненте просто используйте данный код
	
	const ParentComponent = () => {
	    const [code, setCode] = useState('');
	
	    const handleCodeChange = (newCode: string) => {
	        setCode(newCode);
	    };

	    return (
	        <div>
	            <CodeEditor onCodeChange={handleCodeChange} />
			</div>
		);
	};
	*/

	const placeholder =
		"using System;\n\nclass Program\n{\n\tstatic void Main(string[] args)\n\t{\n\t\t\n\t\t// Ваш код сюда\n\t\t\n\t}\n\n}";

	const [value, setValue] = useState(placeholder);
	const onChange = useCallback(
		(val: string) => {
			setValue(val);
			if (onCodeChange) {
				onCodeChange(val);
			}
		},
		[onCodeChange]
	);

	const completions: CompletionItem[] = [
		{
			label: "WriteLine",
			type: "function",
			info: "Записывает указанные данные, за которыми следует терминатор текущей строки, в стандартный выходной поток.",
		},
		{
			label: "ReadLine",
			type: "function",
			info: "Считывает следующую строку символов из стандартного входного потока.",
		},
		{
			label: "ToString",
			type: "method",
			info: "Возвращает строку, которая представляет текущий объект.",
		},
		{
			label: "Equals",
			type: "method",
			info: "Определяет, равен ли указанный объект текущему объекту.",
		},
		{
			label: "Math",
			type: "class",
			info: "Предоставляет константы и статические методы для тригонометрических, логарифмических и других общих математических функций.",
		},
		{
			label: "DateTime",
			type: "class",
			info: "Представляет момент времени, обычно выраженный в виде даты и времени дня.",
		},
		{
			label: "Console",
			type: "class",
			info: "Предоставляет свойства и методы для манипулирования консолью, ввода/вывода и вывода символов на консоль.",
		},
	];

	function myCompletions(context: any): any {
		const word = context.matchBefore(/\w+/);

		if (!word) return null;

		// Получаем доступ к документу и текущей позиции курсора
		const doc = context.state.doc;
		const start = word.from;
		const end = context.pos;

		// Получаем текущую строку из документа
		const currentLine = doc.lineAt(start).text;
		const currentWord = currentLine.slice(
			start - doc.lineAt(start).from,
			end - doc.lineAt(start).from
		);

		const filteredCompletions = completions.filter((item: CompletionItem) =>
			item.label.toLowerCase().startsWith(currentWord.toLowerCase())
		);

		return {
			from: start,
			to: end,
			options: filteredCompletions.map((item: CompletionItem) => ({
				label: item.label,
				type: item.type,
				info: item.info,
			})),
		};
	}

	return (
		<CodeMirror
			value={value}
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
			style={{ borderRadius: "0.5rem", overflow: "hidden" }}
			readOnly={readonly}
		/>
	);
}
