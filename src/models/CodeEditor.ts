export interface CodeEditorProps {
	onCodeChange: (code: string) => void;
	readonly?: boolean;
}

export interface CompletionItem {
	label: string;
	type: string;
	info: string;
}
