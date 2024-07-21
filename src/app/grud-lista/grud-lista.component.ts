import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface listaCompras {
  descricao: string;
  valor: string;
  quantidade: string;
  total: string;
  acao: string;
}

const ELEMENT_DATA: listaCompras[] = [
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
    MatTableModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './grud-lista.component.html',
  styleUrl: './grud-lista.component.scss'
})
export class GrudListaComponent {
  displayedColumns: string[] = ['descricao', 'quantidade','valor', 'total','acao'];
  dataSource = ELEMENT_DATA;

  produto: string = '';
  quantidade: number = 0;
  valor: string = '';

  adicionarItem() {
    const quantidadeNum = this.quantidade;
    const valorNum = parseFloat(this.valor.replace('R$', '').replace(',', '.'));

    if (!this.produto || isNaN(quantidadeNum) || isNaN(valorNum) || quantidadeNum <= 0 || valorNum <= 0) {
      alert('Por favor, insira valores válidos para produto, quantidade e valor.');
      return;
    }

    const novoItem: listaCompras = {
      descricao: this.produto,
      quantidade: this.quantidade.toString(),
      valor: `R$${valorNum.toFixed(2).replace('.', ',')}`,
      total: `R$${(quantidadeNum * valorNum).toFixed(2).replace('.', ',')}`,
      acao: 'icones'
    };

    this.dataSource = [...this.dataSource, novoItem];
    this.resetForm();
  }

  resetForm() {
    this.produto = '';
    this.quantidade = 0;
    this.valor = '';
  }
  removerItem(element: listaCompras) {
    this.dataSource = this.dataSource.filter(item => item !== element);
  }
}
