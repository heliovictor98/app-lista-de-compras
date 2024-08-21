import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {ChangeDetectionStrategy, inject} from '@angular/core';
//import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogexcluirComponent } from '../dialogexcluir/dialogexcluir.component';

export interface listaCompras {
  descricao: string;
  valor: string;
  quantidade: string;
  total: string;
  acao: string;
}

const ELEMENT_DATA: listaCompras[] = [
   {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
  // {descricao: 'Suco', quantidade: '2',valor: 'R$3,00',  total: 'R$6,00', acao: 'icones'},
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
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './grud-lista.component.html',
  styleUrl: './grud-lista.component.scss'
})
export class GrudListaComponent {
  displayedColumns: string[] = ['descricao', 'quantidade','valor', 'total','acao'];
  dataSource = ELEMENT_DATA;
  readonly dialog = inject(MatDialog);

  produto: string = '';
  quantidade: number = 0;
  valor: string = '';

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    console.log(dialogRef);
    return;
  }

  openDialogexcluir() {
    const dialogRef = this.dialog.open(DialogexcluirComponent);
    console.log(dialogRef);
    return;
  }
  adicionarItem() {
    const quantidadeNum = this.quantidade;
    const valorNum = parseFloat(this.valor.replace('R$', '').replace(',', '.'));

    if (!this.produto || isNaN(quantidadeNum) || isNaN(valorNum) || quantidadeNum <= 0 || valorNum <= 0) {
      this.openDialog();
      //alert('Por favor, insira valores válidos para produto, quantidade e valor.');
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
    this.openDialogexcluir();
    this.dataSource = this.dataSource.filter(item => item !== element);
  }
}
