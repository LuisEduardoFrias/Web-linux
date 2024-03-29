/** @format */

"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./files/terminal.module.css";
import { Post } from "hp/fetch";

interface ITerminalProps {
	width: number;
	height: number;
}

enum keys {
	backspace = "Backspace",
	enter = "Enter"
}

export default function Terminal(props: ITerminalProps): JSX.Element {
	//const [path, setPath] = useState();
	const [prompt, setPrompt] = useState(`┌─{》|《}-[~]\n└── $ `);

	const [backlines, setBackLines] = useState<number>(prompt.length);
	const [lines, setLines] = useState<string>(prompt);
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLTextAreaElement>(null);

	const endpoint: string = "command";

	useEffect(() => {
		//alert("useeffect: " + lines);
		textRef.current.scrollTop = textRef.current.scrollHeight;
	}, [prompt, lines]);

	const _style = {
		//width: `${props.width ?? 100}%`,
		//height: `${props.height ?? 100}%`,
	};

	async function handleKeyDown(
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) {
		if (
			event.key === keys.backspace &&
			lines.length <= backlines - 1 &&
			event.currentTarget.selectionStart <= backlines - 1
		) {
			event.preventDefault();
		}

		if (event.key === "Enter") {
			event.preventDefault();

			let command = event.currentTarget.value.split(prompt);
			command = command[command.length - 1];

			if (command === "clear") {
				setLines(prompt);
				return;
			}

			const { answer, cmd } = await Post(endpoint, {
				command: command
			});

			let newprompt = prompt;

			if (cmd === "cd") {
				newprompt = `┌─{T-Dragon}-[~${answer}]\n└── $ `;
				setPrompt(newprompt);
				//setLines(newprompt);
			}

			setLines(prev => {
				const value = `${prev}\n${
					answer &&
					`${
						Array.isArray(answer)
							? answer.join("\n")
							: cmd !== "cd"
							? answer
							: ""
					}`
				}\n${newprompt}`;

				setBackLines(value.length);
				return value;
			});
		}
	}

	function handleInput(event: React.FormEvent<HTMLTextAreaElement>) {
		/*const inputType = event.nativeEvent.inputType;
    if (inputType === 'deleteContentBackward' && newLine.length <= prompt.length) {
      return;
    } */
	}

	function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const cursorIndex = event.target.selectionStart;
		if (cursorIndex < backlines) {
			setLines(prev => prev);
		} else {
			setLines(event.target.value);
		}
	}

	return (
		<div className={styles.container} style={_style} ref={containerRef}>
			<textarea
				className={styles.textarea}
				onKeyDown={handleKeyDown}
				onInput={handleInput}
				onChange={handleChange}
				ref={textRef}
				value={lines}></textarea>
		</div>
	);
}
