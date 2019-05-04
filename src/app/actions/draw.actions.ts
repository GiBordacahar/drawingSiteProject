import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Draw } from './../models/draw.model'

export const INIT_DRAW       = '[Draw] Init'   //Init the draw creation with origin coordinates
export const UPDATE_DRAW    = '[Draw] Update'  //Update draw's coordinates 
export const SAVE_DRAW    = '[Draw] Save'  //Saves last draw into draw's collections
export const UNDO_DRAW    = '[Draw] Undo' //Delete last draw
export const UPDATE_DRAWTYPE    = '[DrawType] Update' //Update current type of drawing

export class UpdateDrawType implements Action {
    readonly type = UPDATE_DRAWTYPE

    constructor(public payload: string) {}
}

export class InitDraw implements Action {
    readonly type = INIT_DRAW;

    constructor(public payload: Draw) {}
}

export class UpdateDraw implements Action {
    readonly type = UPDATE_DRAW

    constructor(public payload: Draw) {}
}

export class SaveDraw implements Action {
    readonly type = SAVE_DRAW

    constructor(public payload: Draw) {}
}

export class UndoDraw implements Action {
    readonly type = UNDO_DRAW
    constructor(public payload: Draw) {}
} 

export type Actions = UpdateDrawType | InitDraw | UpdateDraw | SaveDraw | UndoDraw