import { Draw, DrawType } from './models/draw.model';


export interface DrawState {
    drawType:string;
    currentDraw: Draw;
    myDraws: Draw[];
}

export const initialDrawState : DrawState = {
    drawType : DrawType.LineType,
    currentDraw : null,
    myDraws : []
}