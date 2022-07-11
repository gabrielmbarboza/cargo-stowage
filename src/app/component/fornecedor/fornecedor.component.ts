import { AfterViewInit, HostListener } from '@angular/core';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ngfModule, ngf } from "angular-file"
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PathLocationStrategy } from '@angular/common';
import { ReadVarExpr } from '@angular/compiler';
import {FormControl} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCommonModule} from '@angular/material/core';

interface Caminhao {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-component-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})

export class FornecedorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasRef', { static: false }) canvasRef: any


  selectedValue: number = -1;
//  <p> Caminhão escolhido: {{selectedValue}} </p>

  DropDownCam: Caminhao[] = [];

  public width = 1000;
  public height = 500;

  private cx!: CanvasRenderingContext2D; 

  private startx:number = 0.0;
  private starty:number = 0.0;
  private startz:number = 0.0;
  private endx:number = 0.0;
  private endy = 0.0;
  private endz = 0.0;

  private placas: any = [];
  private semi: any = [];
  private comp: any = [];
  private posinicialx: any = [];
  private posinicialy: any = [];
  private posinicialz: any = [];
  private largura: any = [];
  private comprimento: any = [];
  private altura: any = [];
  private tamPaintX: any = this.width/2;
  private tamPaintZ: any = this.height;
  private fatorx: any = 0;
  private fatorz: any = 0;

  private placascam: any = [];
  private semicam: any = [];
  private compcam: any = [];
  
  private larguraCompCam: any = [];
  private comprCompCam: any = [];
  private alturaCompCam: any = [];

  result: any;
  //urlToJson = 'assets/caixas.json';
  urlToJson: any;

  private ncaixas: any;
  private ncamim: any;
  private proxcaixa: any;
  private numcaixadesenho: number = 0;
  private caixasescolhidas: any = [];

limparcanvas() {
    this.selectedValue = -1;
    this.numcaixadesenho = 0;
    this.cx.beginPath();
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.closePath();
    this.cx.setLineDash([]);
    this.cx.strokeStyle ='black';
  }

getTodas() {


  if (this.selectedValue == -1) {
    alert("Não foi escolhido um caminhão/semirreboque/compartimento. Faça sua escolha ao lado!");
  } else {
    this.cx.beginPath();
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.closePath();

    /*
  for(let p = 0; p <= 2; p++) {
    alert("Rodrigo");
    alert(p+ " " +this.placas[p]+ " " +this.semi[p]+ " " +this.comp
    [p]+ " " +this.posinicialx[p]+ " " +this.posinicialy[p]+ " " +this.posinicialz[p]);
    alert(this.largura[p]+ " " +this.comprimento[p]+ " " +this.altura[p]);
  }
  */
  //alert("n caminhao :"+this.ncamim);

    this.cx.lineWidth = 5;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle ='red';
    this.cx.beginPath();
    this.cx.setLineDash([1 , 15]);
    this.cx.moveTo(this.width/2, 0);
    this.cx.lineTo(this.width/2, this.height);
    this.cx.stroke();
    this.cx.closePath();

    this.cx.beginPath();
    this.cx.setLineDash([]);
    this.cx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
    this.cx.fillStyle = 'rgba(255, 0, 0, 0.1)';
    this.cx.fillRect(0, 0, this.width/2, this.height);
    this.cx.stroke;
    this.cx.closePath();

  /* this.cx.setLineDash([1 , 15]);
    this.cx.moveTo(this.width/2, 0);
    this.cx.lineTo(this.width/2, this.height);
    this.cx.stroke();
    this.cx.closePath();
    this.cx.setLineDash([0 , 0]);*/

    //alert("n caminhao :"+this.ncamim);
    //alert("n caminhao :"+this.ncamim);
    //alert("selectedValue :"+this.selectedValue);

    for(let i = 0; i <= this.ncaixas; i++) {
      
      if(this.placas[i] == this.placascam[this.selectedValue]) {
        if(this.semi[i] == this.semicam[this.selectedValue]) {
          if(this.comp[i] == this.compcam[this.selectedValue]) {

          this.cx.strokeStyle ='yellow';
          
          this.fatorx   = this.tamPaintX / this.larguraCompCam[this.selectedValue];
          //this.fatorz = this.tamPaintZ / this.comprCompCam[this.selectedValue];
          this.fatorz = this.tamPaintZ / this.alturaCompCam[this.selectedValue];
          //alert (i + " - "+this.fatorx + " - "+this.fatorz);

          //0-7 10 escondidas
          this.startx = this.width/2 + this.tamPaintX-(this.posinicialx[i]+this.posinicialy[i])*this.fatorx
          this.startz = this.tamPaintZ-(this.posinicialz[i]+this.posinicialy[i])*this.fatorz
          this.endx = this.startx - (this.comprimento[i]/2)*this.fatorx
          this.endz = this.startz - (this.comprimento[i]/2)*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          //7-5 10 escondidas
          this.startx = this.endx
          this.startz = this.endz
          this.endx = this.startx
          this.endz = this.startz - this.altura[i]*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          //7-2 11 escondidas
          this.endx = this.startx - this.largura[i]*this.fatorx
          this.endz = this.startz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          this.cx.strokeStyle ='black';

          //0-1 1
          //alert(i + " - "+ this.tamPaintX + " - "+ this.tamPaintZ + " - "+ this.posinicialx[i] + " - " + this.posinicialy[i] + " - "+ this.posinicialz[i] + "  **");

          this.startx = this.width/2 + this.tamPaintX-(this.posinicialx[i]+this.posinicialy[i])*this.fatorx;
          this.startz = (this.tamPaintZ-(this.posinicialz[i]*this.fatorz))-(this.posinicialy[i]*this.fatorz);
          this.endx = this.startx - this.largura[i]*this.fatorx;
          this.endz = this.startz;

          /* this.startx = this.tamPaintX - this.posinicialx[i]*this.fatorx + this.posinicialy[i]*this.fatorx;
          this.startz = this.tamPaintZ - this.posinicialz[i]*this.fatorz - this.posinicialy[i]*this.fatorz;
          this.endx = this.startx + this.largura[i]*this.fatorx;
          this.endz = this.startz;*/
          
          //alert (this.startx + " - "+ this.startz + this.endx + " - "+ this.endz);
          
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          /*    canvas.drawText(
            "Cx-"+i.toString(),
            this.startx-(this.largura[i]/2f)*this.fatorx,
            this.startz-(this.altura[i]/2f)*this.fatorz, paint
          )*/

          // (1-2) 2
          this.startx = this.endx
          this.startz = this.endz
          this.endx = this.startx - (this.comprimento[i]/2)*this.fatorx
          this.endz = this.startz - (this.comprimento[i]/2)*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (4-1) 3
          this.endx = this.startx
          this.endz = this.startz
          this.startx = this.endx
          this.startz = this.endz - this.altura[i]*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (4-3) 4
          //this.startx = this.startx
          //this.startz = this.startz
          this.endx = this.startx - (this.comprimento[i]/2)*this.fatorx
          this.endz = this.startz - (this.comprimento[i]/2)*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (6-4) 5
          this.endx = this.startx
          this.endz = this.startz
          this.startx = this.startx + this.largura[i]*this.fatorx
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (6-0) 6
          //this.startx = this.startx
          //this.startz = this.startz
          this.endx = this.startx //this.this.posicaoinicialx[i]
          this.endz = this.startz + this.altura[i]*this.fatorz //this.this.posicaoinicialz[i]
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (6-5) 7
          //this.startx = this.startx
          //this.startz = this.startz
          this.endx = this.startx - (this.comprimento[i]/2)*this.fatorx
          this.endz = this.startz - (this.comprimento[i]/2)*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (5-3) 8
          this.startx = this.endx
          this.startz = this.endz
          this.endx = this.startx - this.largura[i]*this.fatorx
          this.endz = this.startz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();

          // (3-2)
          this.startx = this.endx
          this.startz = this.endz
          this.endx = this.startx
          this.endz = this.startz + this.altura[i]*this.fatorz
          this.cx.beginPath();
          if (this.startx > this.endx) {
            this.cx.moveTo(this.startx, this.startz);
            this.cx.lineTo(this.endx, this.endz);
          } else {
            this.cx.moveTo(this.endx, this.endz);
            this.cx.lineTo(this.startx, this.startz);
          }
          this.cx.stroke();
          this.cx.closePath();
        }
      }
    }
  }
  }     
  this.numcaixadesenho == 0; 
  }


  getUma() {


    alert(this.ncaixas);
    alert(this.proxcaixa);
    alert(this.selectedValue);
    alert(this.numcaixadesenho);

    if ((this.numcaixadesenho == 0) || (this.numcaixadesenho == this.proxcaixa)) {
      this.cx.beginPath();
      this.cx.clearRect(0, 0, this.width, this.height);
      this.cx.closePath();
      this.proxcaixa = 0;
      this.numcaixadesenho = 0;
      alert("if "+this.ncaixas);
      alert(this.proxcaixa);
      alert(this.selectedValue);
    }

    if (this.selectedValue == -1) {
      alert("Não foi escolhido um caminhão/semirreboque/compartimento. Faça sua escolha ao lado!");
    } else {
      /*
      for(let p = 0; p <= 2; p++) {
        alert("Rodrigo");
        alert(p+ " " +this.placas[p]+ " " +this.semi[p]+ " " +this.comp
        [p]+ " " +this.posinicialx[p]+ " " +this.posinicialy[p]+ " " +this.posinicialz[p]);
        alert(this.largura[p]+ " " +this.comprimento[p]+ " " +this.altura[p]);
      }
      */
      //alert("n caminhao :"+this.ncamim);
    
    
      /* this.cx.setLineDash([1 , 15]);
        this.cx.moveTo(this.width/2, 0);
        this.cx.lineTo(this.width/2, this.height);
        this.cx.stroke();
        this.cx.closePath();
        this.cx.setLineDash([0 , 0]);*/
    
  //      alert("n caminhao :"+this.ncamim);
  //      alert("n caixas :"+this.ncaixas);
  //      alert("selectedValue :"+this.selectedValue);
  //      alert("numcaixadesenho :"+this.numcaixadesenho);
      
        if (this.numcaixadesenho == 0) {
          
          this.cx.beginPath();
          this.cx.lineWidth = 5;
          this.cx.lineCap = 'round';
          this.cx.strokeStyle ='red';
          this.cx.setLineDash([1 , 15]);
          this.cx.moveTo(this.width/2, 0);
          this.cx.lineTo(this.width/2, this.height);
          this.cx.stroke();
          this.cx.closePath();
  
          this.cx.beginPath();
          this.cx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
          this.cx.fillStyle = 'rgba(255, 0, 0, 0.1)';
          this.cx.fillRect(0, 0, this.width/2, this.height);
          this.cx.stroke;
          this.cx.strokeStyle ='black';
          this.cx.setLineDash([]);
          this.cx.closePath();
 
          this.proxcaixa = 0;
          for(let i = 0; i <= this.ncaixas; i++) {
            if(this.placas[i] == this.placascam[this.selectedValue]) {
              if(this.semi[i] == this.semicam[this.selectedValue]) {
                if(this.comp[i] == this.compcam[this.selectedValue]) {
                  this.caixasescolhidas[this.proxcaixa] = i;
                  this.proxcaixa = this.proxcaixa + 1;
                  //alert("selectedValue dentro :"+this.proxcaixa);
                }
              }
            }
          }
        }

        //alert("numcaixadesenho :"+this.numcaixadesenho);
        //alert("proxcaixa :"+this.proxcaixa);
        //alert("caixasescolhidas :"+this.caixasescolhidas[this.numcaixadesenho]);

        if (this.numcaixadesenho >= this.proxcaixa) {
          alert("Não existem mais cargas do caminhão/semirreboque/compartimento escolhidos");
        } else 
        {   
          alert("Existem :"+(this.proxcaixa-this.numcaixadesenho)+" caixas para sererm desenhadas");
  /*        for(let i = 0; i <= this.ncaixas; i++) {
            if(this.placas[i] == this.placascam[this.selectedValue]) {
              if(this.semi[i] == this.semicam[this.selectedValue]) {
                if(this.comp[i] == this.compcam[this.selectedValue]) {
  */    
                this.cx.strokeStyle ='yellow';
                
                this.fatorx   = this.tamPaintX / this.larguraCompCam[this.selectedValue];
                //this.fatorz = this.tamPaintZ / this.comprCompCam[this.selectedValue];
                this.fatorz = this.tamPaintZ / this.alturaCompCam[this.selectedValue];
                //alert (i + " - "+this.fatorx + " - "+this.fatorz);
      
                //0-7 10 escondidas
                this.startx = this.width/2 + this.tamPaintX-(this.posinicialx[this.caixasescolhidas[this.numcaixadesenho]]+this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]])*this.fatorx
                this.startz = this.tamPaintZ-(this.posinicialz[this.caixasescolhidas[this.numcaixadesenho]]+this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]])*this.fatorz
                this.endx = this.startx - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorx
                this.endz = this.startz - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                //7-5 10 escondidas
                this.startx = this.endx
                this.startz = this.endz
                this.endx = this.startx
                this.endz = this.startz - this.altura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                //7-2 11 escondidas
                this.endx = this.startx - this.largura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx
                this.endz = this.startz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                this.cx.strokeStyle ='black';
      
                //0-1 1
                //alert(i + " - "+ this.tamPaintX + " - "+ this.tamPaintZ + " - "+ this.posinicialx[this.caixasescolhidas[this.numcaixadesenho]] + " - " + this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]] + " - "+ this.posinicialz[this.caixasescolhidas[this.numcaixadesenho]] + "  **");
      
                this.startx = this.width/2 + this.tamPaintX-(this.posinicialx[this.caixasescolhidas[this.numcaixadesenho]]+this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]])*this.fatorx;
                this.startz = (this.tamPaintZ-(this.posinicialz[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz))-(this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz);
                this.endx = this.startx - this.largura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx;
                this.endz = this.startz;
      
                /* this.startx = this.tamPaintX - this.posinicialx[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx + this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx;
                this.startz = this.tamPaintZ - this.posinicialz[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz - this.posinicialy[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz;
                this.endx = this.startx + this.largura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx;
                this.endz = this.startz;*/
                
                //alert (this.startx + " - "+ this.startz + this.endx + " - "+ this.endz);
                
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                /*    canvas.drawText(
                  "Cx-"+i.toString(),
                  this.startx-(this.largura[this.caixasescolhidas[this.numcaixadesenho]]/2f)*this.fatorx,
                  this.startz-(this.altura[this.caixasescolhidas[this.numcaixadesenho]]/2f)*this.fatorz, paint
                )*/
      
                // (1-2) 2
                this.startx = this.endx
                this.startz = this.endz
                this.endx = this.startx - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorx
                this.endz = this.startz - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (4-1) 3
                this.endx = this.startx
                this.endz = this.startz
                this.startx = this.endx
                this.startz = this.endz - this.altura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (4-3) 4
                //this.startx = this.startx
                //this.startz = this.startz
                this.endx = this.startx - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorx
                this.endz = this.startz - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (6-4) 5
                this.endx = this.startx
                this.endz = this.startz
                this.startx = this.startx + this.largura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (6-0) 6
                //this.startx = this.startx
                //this.startz = this.startz
                this.endx = this.startx //this.this.posicaoinicialx[this.caixasescolhidas[this.numcaixadesenho]]
                this.endz = this.startz + this.altura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz //this.this.posicaoinicialz[this.caixasescolhidas[this.numcaixadesenho]]
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (6-5) 7
                //this.startx = this.startx
                //this.startz = this.startz
                this.endx = this.startx - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorx
                this.endz = this.startz - (this.comprimento[this.caixasescolhidas[this.numcaixadesenho]]/2)*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (5-3) 8
                this.startx = this.endx
                this.startz = this.endz
                this.endx = this.startx - this.largura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorx
                this.endz = this.startz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();
      
                // (3-2)
                this.startx = this.endx
                this.startz = this.endz
                this.endx = this.startx
                this.endz = this.startz + this.altura[this.caixasescolhidas[this.numcaixadesenho]]*this.fatorz
                this.cx.beginPath();
                if (this.startx > this.endx) {
                  this.cx.moveTo(this.startx, this.startz);
                  this.cx.lineTo(this.endx, this.endz);
                } else {
                  this.cx.moveTo(this.endx, this.endz);
                  this.cx.lineTo(this.startx, this.startz);
                }
                this.cx.stroke();
                this.cx.closePath();

              this.numcaixadesenho = this.numcaixadesenho + 1;
   
            }
          //}
        //}      
      //}
    }
  }

  ngOnInit(): void {

    var i: number = 0;
    var j: number = 0;
    var linha: String = '';

    this.urlToJson = 'assets/caixas.json';

    this.http.get<any>(this.urlToJson).subscribe(response => {
      this.result = JSON.stringify(response);
      //alert("antes do Json");
      i = 0;
      JSON.parse(this.result, (key: string, value: any) => {
          if (key == "Placa") {
            this.placas[i] = value;
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "Semi") {
            this.semi[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "Comp") {
            this.comp[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "PosX") {
            this.posinicialx[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "PosY") {
            this.posinicialy[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "PosZ") {
            this.posinicialz[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "L") {
            this.largura[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "C") {
            this.comprimento[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
          };
          if (key == "H") {
            this.altura[i] = Number(value);
            //alert("i="+i+" - "+key+": "+ value);
            this.ncaixas = i;
            i = i + 1;
          };

      });

    });

    this.urlToJson = 'assets/caminhao.json';

    this.http.get<any>(this.urlToJson).subscribe(response => {
      this.result = JSON.stringify(response);
      //alert("antes do Json");
      j = 0;
      JSON.parse(this.result, (key: string, value: any) => {
        if (key == "Placa") {
          this.placascam[j] = value;
        };
        if (key == "Semi") {
          this.semicam[j] = Number(value);
        };
        if (key == "Comp") {
          this.compcam[j] = Number(value);
        };
        if (key == "L") {
          this.larguraCompCam[j] = Number(value);
        };
        if (key == "C") {
          this.comprCompCam[j] = Number(value);
        };
        if (key == "H") {
            this.alturaCompCam[j] = Number(value);
            this.ncamim = j;
            //alert("Rodrigo dentro "+this.ncamim);
             j = j + 1;
          };

      });
      //alert("Rodrigo for "+this.ncamim);
      for(let p = 0; p <= this.ncamim; p++) {
        //alert(p+ " " +this.placascam[p]+ " " +this.semicam[p]+ " " +this.compcam[p]);
        //alert(this.larguraCompCam[p]+ " " +this.comprCompCam[p]+ " " +this.alturaCompCam[p]);
        this.DropDownCam.push({
          value: p,
          viewValue: this.placascam[p]+" ; "+this.semicam[p]+" ; "+this.compcam[p]
        });
        //alert("ro -> "+ p +" <-> "+this.DropDownCam[p].value+ " " +this.DropDownCam[p].viewValue);
      }
  
    });
   
  }

  ngAfterViewInit(): void {
      this.render();
  }

  private render(): any {
    const canvasEl = this.canvasRef.nativeElement;
    
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle ='#000';
  }

  constructor(public http: HttpClient) {
  }

}

