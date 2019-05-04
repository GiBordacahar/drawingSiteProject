import { Component } from '@angular/core';
import { Draw, DrawType } from './models/draw.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as DrawActions from './actions/draw.actions';
import * as d3 from "d3";
import {DrawState} from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currDraw: Draw;
  myDraws : Draw[];
  drawTypeStr : string;
  offsetLeft : number;
  offsetTop : number;

  constructor(private store: Store<DrawState>) {
    store.select('currentState').subscribe((data: DrawState) =>  this.drawTypeStr = data.drawType);
    store.select('currentState').subscribe((data: DrawState) => this.currDraw = data.currentDraw);
    store.select('currentState').subscribe((data: DrawState) => this.myDraws = data.myDraws);
  }

  updateDrawType(drawtype) {
    this.store.dispatch(new DrawActions.UpdateDrawType(drawtype));
  }

  initDraw(x : number, y : number) {
    this.store.dispatch(new DrawActions.InitDraw({x1: x, y1: y, x2: x, y2: y, type: this.drawTypeStr}));
  }

  updateDraw(x : number, y : number) {
    this.store.dispatch(new DrawActions.UpdateDraw({x1: null, y1: null, x2: x, y2: y, type: this.drawTypeStr}));
  }

  saveDraw(currentDraw: Draw) {
    this.store.dispatch(new DrawActions.SaveDraw(currentDraw));
  }

  undoDraw() {
    this.store.dispatch(new DrawActions.UndoDraw(this.currDraw));
    this.updateDrawsFromStore();
  }

  //When mouse is down user starts to draw a figure
  //The currentDraw property is initialized in store
  mousedown(event) {
    this.offsetLeft = d3.select('.right').node().offsetLeft;
    this.offsetTop = d3.select('.right').node().offsetTop;
    var trg = d3.select('svg');
    var cDraw;
    console.log(this.drawTypeStr);
    switch(this.drawTypeStr) {
      case "line" : 
        cDraw = 
        trg.append("line")
        .attr("x1", event.x - this.offsetLeft)
        .attr("y1", event.y - this.offsetTop)
        .attr("x2", event.x - this.offsetLeft)
        .attr("y2", event.y - this.offsetTop);
        this.setOnMouseMove(this.drawTypeStr, cDraw);
        break;
      case "rectangle":
       cDraw =
        trg.append("rect")
        .attr("x", event.x - this.offsetLeft)
        .attr("y", event.y - this.offsetTop)
        .attr("width", 0)
        .attr("height", 0);
        this.setOnMouseMove(this.drawTypeStr, cDraw);
        break;
      default: null;
    }
    this.initDraw(event.x, event.y);
  }

  //Mouseup indicates that user stopped drawing, the last draw is saved in store
  mouseup(event) {
    d3.select('svg').on("mousemove", null);
    this.offsetLeft = d3.select('.right').node().offsetLeft;
    this.offsetTop = d3.select('.right').node().offsetTop;
    this.updateDraw(event.x - this.offsetLeft, event.y - this.offsetTop);
    this.saveDraw(this.currDraw);
  }

  //While mouse is moving the currentDraw is updated in screen using d3
  setOnMouseMove(type, cDraw) {
    d3.select('svg')
      .on("mousemove", function() {
          var m = d3.mouse(this);
          switch(type) {
            case "line" : 
            cDraw.attr("x2", m[0])
                       .attr("y2", m[1]);
              break;
            case "rectangle": 
            cDraw.attr("width", m[0] - cDraw.attr('x'))
                       .attr("height", m[1] - cDraw.attr('y'));
              break;
          }
        }
      );
  }

  //re-draw all elements after action UNDO_DRAW
  updateDrawsFromStore() {
      d3.select('svg').selectAll('line').data(this.myDraws.filter(function(s) {return s.type == DrawType.LineType}))
      .enter().append("line")
      .attr("x1", function(d) {d.x1})
      .attr("y1", function(d) {d.y1})
      .attr("x2", function(d) {d.x2})
      .attr("y2", function(d) {d.y2});

    d3.select('svg').selectAll('line').data(this.myDraws.filter(function(s) {return s.type == DrawType.LineType}))
      .exit().remove();

      d3.select('svg').selectAll('rect').data(this.myDraws.filter(function(s) { return s.type == DrawType.RectangleType}))
      .enter().append("rect")
      .attr("x", function(d) {d.x1})
      .attr("y", function(d) {d.y1})
      .attr("width", function(d) {d.x2})
      .attr("height", function(d) {d.y2});

    d3.select('svg').selectAll('rect').data(this.myDraws.filter(function(s) {return s.type == DrawType.RectangleType}))
      .exit().remove();
    
  }

}


