/** @format */

//
export default class Commander {
	private commands: object;

	constructor() {
		this.commands = {};

		this.command("--help", "-h", "ayuda con la descripcion de los comandos.");
	}

	public command(
		cd: string,
		abbreviation?: string,
		description?: string
	): Command {
		Reflect.set(this.commands, cd, new Command(cd, abbreviation, description));
		return this.commands[cd];
	}

	public parse(terminal_text: string) {
		const command: string[] = terminal_text.split(" ");

		const selectCommand: Command = this.commands[command[0]];

		if (!selectCommand)
			return {
				answer: ` No command '${command[0]}' found.`,
				cmd: selectCommand?.name
			};

		//Remueve el comando, dwjando asi las optiones y argumentos.
		command.splice(0, 1);

		if (command.length >= 1) {
			//verifica las opciones del comando
			for (let i = 0; i < selectCommand.options.length; i++) {
				const op = selectCommand.options[i];
				for (let index = 0; index <= command.length; index++) {
					if (command[index] === op.key) {
						selectCommand.options[i] = new Option(op.key, true);
						command.splice(index, 1);
					}
				}
			}

			//Verificacion de argumentos
			//TODO varifica cuales algumentos faltan
			//TODO verificar si los argumentis son requerido

			if (selectCommand.countArgumentRequired > 0)
				if (command.length < selectCommand.countArgumentRequired)
					return {
						answer: ` Arguments found.`,
						cmd: selectCommand.name
					};

			//creando argumentos
			if (command.length >= 1) {
				command?.forEach((cmd, index) => {
					Reflect.set(
						selectCommand,
						selectCommand.arguments[index].key,
						command[index]
					);
				});
			}
		}
		return selectCommand.exe(selectCommand);
	}
}

export class Response {
	answer: string;
	cmd: string;
	constructor(answer: string, cmd: string) {
		this.answer = answer;
		this.cmd = cmd;
	}
}

class Command {
	private name: string;
	private _action: (obj: Command) => Response;
	private _options: Option[];
	private _arguments: Argument[];
	private fragments: number;
	private abbreviation: string;
	private description: string;

	constructor(name: string, abbreviation?: string, description?: string) {
		this.name = name;
		this._action = null;
		this._options = [];
		this._arguments = [];
		this.fragments = 0;
		this.abbreviation = abbreviation && "";
		this.description = description && "";
	}

	public get countOption() {
		return this._options.length;
	}

	public get countArgument() {
		return this._arguments.length;
	}

	public get countArgumentRequired() {
		return this._arguments.filter(arg => arg.value === true).length;
	}

	public get options() {
		return this._options;
	}

	public get arguments() {
		return this._arguments;
	}

	public action(ft: (obj: Command) => Response): void {
		this._action = ft;
		this.fragments = this.name.split(" ").length + this._options.length;
	}

	public exe(obj: Command): void {
		return this._action(obj);
	}

	public option(op: string): Command {
		this._options.push(new Option(op, false));
		return this;
	}

	public argument(ar: string, isrequired?: boolean): Command {
		this._arguments.push(new Argument(ar, isrequired));
		return this;
	}
}

class Dictionary {
	key: string;
	value: boolean;
	description: string;

	constructor(key: string, value: boolean) {
		this.key = key;
		this.value = value;
		this.description = "";
	}
}

class Option extends Dictionary {
	constructor(key: string, value: boolean) {
		super(key, value);
	}
}

class Argument extends Dictionary {
	constructor(key: string, value: boolean) {
		super(key, value);
	}
}
