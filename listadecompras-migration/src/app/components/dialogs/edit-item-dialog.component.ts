import { Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { ShoppingItem } from '../../models/shopping-item.model';

@Component({
  selector: 'app-edit-item-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Editar Item</h2>
    <mat-dialog-content>
      <div class="form-container">
        <mat-form-field appearance="outline">
          <mat-label>Produto</mat-label>
          <input matInput [(ngModel)]="formData().descricao" name="descricao">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Quantidade</mat-label>
          <input matInput type="number" [(ngModel)]="formData().quantidade" name="quantidade" min="1">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Valor (R$)</mat-label>
          <input matInput [(ngModel)]="formData().valor" name="valor" placeholder="0,00">
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()" color="warn">Cancelar</button>
      <button mat-button (click)="onSave()" color="primary" [disabled]="!isFormValid()">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 300px;
      padding: 16px 0;
    }
    
    mat-dialog-actions {
      gap: 8px;
    }
  `]
})
export class EditItemDialogComponent {
  formData = signal({
    descricao: '',
    quantidade: 1,
    valor: ''
  });

  constructor(
    public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingItem
  ) {
    this.formData.set({
      descricao: this.data.descricao,
      quantidade: this.data.quantidade,
      valor: this.formatCurrency(this.data.valor)
    });
  }

  isFormValid(): boolean {
    const form = this.formData();
    return !!(
      form.descricao?.trim() &&
      form.quantidade > 0 &&
      form.valor?.trim() &&
      this.parseValue(form.valor) > 0
    );
  }

  onSave(): void {
    if (this.isFormValid()) {
      const form = this.formData();
      const valorNum = this.parseValue(form.valor);
      
      this.dialogRef.close({
        descricao: form.descricao.trim(),
        quantidade: form.quantidade,
        valor: valorNum
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private parseValue(valor: string): number {
    return parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
  }

  private formatCurrency(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }
}