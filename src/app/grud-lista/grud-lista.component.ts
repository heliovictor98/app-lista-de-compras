import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
  descricao: string;
  valor: string;
  quantidade: string;
  total: string;
  acao: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
];
@Component({
  selector: 'app-grud-lista',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './grud-lista.component.html',
  styleUrl: './grud-lista.component.scss'
})
export class GrudListaComponent {
  displayedColumns: string[] = ['descricao', 'quantidade','valor', 'total','acao'];
  dataSource = ELEMENT_DATA;
}
