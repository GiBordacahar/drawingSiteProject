import { Action, createFeatureSelector, createSelector } from '@ngrx/store'
import { Draw, equalDraw } from './../models/draw.model'
import * as DrawActions from './../actions/draw.actions'
import { DrawState, initialDrawState } from '../app.state';

var lastElement;

export function reducer(state: DrawState = initialDrawState, action: DrawActions.Actions) {
    switch(action.type) {
        case DrawActions.UPDATE_DRAWTYPE:
            return {...state, drawType : action.payload };
        case DrawActions.INIT_DRAW:
            return {...state, currentDraw : action.payload };
        case DrawActions.UPDATE_DRAW:
            return {...state, currentDraw : {x1: state.currentDraw.x1, y1: state.currentDraw.y1, x2:action.payload.x2, y2: action.payload.y2, type: state.drawType} };
        case DrawActions.SAVE_DRAW:
            return {...state, myDraws: [...state.myDraws, action.payload]};
        case DrawActions.UNDO_DRAW:
            lastElement = state.myDraws.length > 1 ? state.myDraws[state.myDraws.length-2] : null;
            return {...state , currentDraw: lastElement,  myDraws : [...state.myDraws.filter(function(value, index, arr){ return !equalDraw(value,action.payload); }) ] };
        default:
            return state;
    }
}

