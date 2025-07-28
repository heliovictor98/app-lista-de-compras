import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, CommonModule } from '@angular/common';

import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingItem, ShoppingItemForm } from '../../models/shopping-item.model';
import { ErrorDialogComponent } from '../dialogs/error-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';
import { EditItemDialogComponent } from '../dialogs/edit-item-dialog.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  private shoppingService = inject(ShoppingListService);
  private dialog = inject(MatDialog);

  displayedColumns = ['descricao', 'quantidade', 'valor', 'total', 'acoes'];
  
  formData = signal<ShoppingItemForm>({
    descricao: '',
    quantidade: 1,
    valor: ''
  });

  items = this.shoppingService.allItems;
  totalValue = this.shoppingService.totalValue;
  itemCount = this.shoppingService.itemCount;

  addItem(): void {
    const form = this.formData();
    const valorNum = this.parseValue(form.valor);

    if (!this.isFormValid(form, valorNum)) {
      this.showErrorDialog('Por favor, insira valores válidos para produto, quantidade e valor.');
      return;
    }

    this.shoppingService.addItem(form.descricao, form.quantidade, valorNum);
    this.resetForm();
  }

  editItem(item: ShoppingItem): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shoppingService.updateItem(item.id, result);
      }
    });
  }

  removeItem(item: ShoppingItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmação de Exclusão',
        message: `Deseja excluir "${item.descricao}" da lista?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.shoppingService.removeItem(item.id);
      }
    });
  }

  private isFormValid(form: ShoppingItemForm, valorNum: number): boolean {
    return !!(
      form.descricao?.trim() &&
      form.quantidade > 0 &&
      !isNaN(valorNum) &&
      valorNum > 0
    );
  }

  private parseValue(valor: string): number {
    return parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
  }

  private resetForm(): void {
    this.formData.set({
      descricao: '',
      quantidade: 1,
      valor: ''
    });
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { message }
    });
  }
}