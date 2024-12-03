import { parse as baseParse } from './_parser';

type Command =
    | { code: 'M' | 'm'; x: number; y: number }
    | { code: 'L' | 'l'; x: number; y: number }
    | { code: 'H' | 'h'; x: number }
    | { code: 'V' | 'v'; y: number }
    | { code: 'C' | 'c'; x1: number; y1: number; x2: number; y2: number; x: number; y: number }
    | { code: 'S' | 's'; x2: number; y2: number; x: number; y: number }
    | { code: 'Q' | 'q'; x1: number; y1: number; x: number; y: number }
    | { code: 'T' | 't'; x: number; y: number }
    | {
          code: 'A' | 'a';
          rx: number;
          ry: number;
          xAxisRotation: number;
          largeArc: boolean;
          sweep: boolean;
          x: number;
          y: number;
      };

export function parse(path: string): Command[] {
    return baseParse(path) as Command[];
}

function toPath(path: Command[]): string {
    return path
        .map((command) => {
            if (command.code === 'M' || command.code === 'm') {
                return `${command.code}${command.x} ${command.y}`;
            } else if (command.code === 'L' || command.code === 'l') {
                return `${command.code}${command.x} ${command.y}`;
            } else if (command.code === 'H' || command.code === 'h') {
                return `${command.code}${command.x}`;
            } else if (command.code === 'V' || command.code === 'v') {
                return `V${command.y}`;
            } else if (command.code === 'C' || command.code === 'c') {
                return `C${command.x1} ${command.y1} ${command.x2} ${command.y2} ${command.x} ${command.y}`;
            } else if (command.code === 'S' || command.code === 's') {
                return `S${command.x2} ${command.y2} ${command.x} ${command.y}`;
            } else if (command.code === 'Q' || command.code === 'q') {
                return `Q${command.x1} ${command.y1} ${command.x} ${command.y}`;
            } else if (command.code === 'T' || command.code === 't') {
                return `T${command.x} ${command.y}`;
            } else if (command.code === 'A' || command.code === 'a') {
                return `A${command.rx} ${command.ry} ${command.xAxisRotation} ${command.largeArc ? 1 : 0} ${command.sweep ? 1 : 0} ${command.x} ${command.y}`;
            }
            return '';
        })
        .join(' ');
}

export function scalePath(path: string, scaleX: number, scaleY: number): string {
    const commands = parse(path);

    for (const command of commands) {
        if (command.code === 'M' || command.code === 'm') {
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'L' || command.code === 'l') {
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'H' || command.code === 'h') {
            command.x *= scaleX;
        } else if (command.code === 'V' || command.code === 'v') {
            command.y *= scaleY;
        } else if (command.code === 'C' || command.code === 'c') {
            command.x1 *= scaleX;
            command.y1 *= scaleY;
            command.x2 *= scaleX;
            command.y2 *= scaleY;
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'S' || command.code === 's') {
            command.x2 *= scaleX;
            command.y2 *= scaleY;
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'Q' || command.code === 'q') {
            command.x1 *= scaleX;
            command.y1 *= scaleY;
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'T' || command.code === 't') {
            command.x *= scaleX;
            command.y *= scaleY;
        } else if (command.code === 'A' || command.code === 'a') {
            command.rx *= scaleX;
            command.ry *= scaleY;
            command.x *= scaleX;
            command.y *= scaleY;
        } else {
            throw new Error(`Unknown path command: ${command.code}`);
        }
    }

    const result = toPath(commands);
    return result;
}
