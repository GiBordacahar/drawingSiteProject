export interface Draw {
    x1: number,
    y1: number;
    x2: number;
    y2: number;
    type: string;
}

export function equalDraw (draw1 : Draw, draw2: Draw) {
    return draw1.x1 == draw2.x1 &&
           draw1.x2 == draw2.x2 &&
           draw1.y1 == draw2.y1 &&
           draw1.y2 == draw2.y2 &&
           draw1.type == draw2.type;
}

export const DrawType = {
    LineType : 'linea',
    RectangleType : 'rectangulo'
}