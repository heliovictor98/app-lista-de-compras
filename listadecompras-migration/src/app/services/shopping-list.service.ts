import { Injectable, signal, computed } from '@angular/core';
import { ShoppingItem } from '../models/shopping-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private items = signal<ShoppingItem[]>([
    {
      id: '1',
      descricao: 'Suco',
      quantidade: 2,
      valor: 3.00,
      total: 6.00,
      createdAt: new Date()
    }
  ]);

  readonly allItems = this.items.asReadonly();
  readonly totalValue = computed(() => 
    this.items().reduce((sum, item) => sum + item.total, 0)
  );
  readonly itemCount = computed(() => this.items().length);

  addItem(descricao: string, quantidade: number, valor: number): void {
    const newItem: ShoppingItem = {
      id: this.generateId(),
      descricao: descricao.trim(),
      quantidade,
      valor,
      total: quantidade * valor,
      createdAt: new Date()
    };

    this.items.update(items => [...items, newItem]);
  }

  updateItem(id: string, updates: Partial<Omit<ShoppingItem, 'id' | 'createdAt'>>): void {
    this.items.update(items => 
      items.map(item => {
        if (item.id === id) {
          const updated = { ...item, ...updates, updatedAt: new Date() };
          if ('quantidade' in updates || 'valor' in updates) {
            updated.total = updated.quantidade * updated.valor;
          }
          return updated;
        }
        return item;
      })
    );
  }

  removeItem(id: string): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  getItem(id: string): ShoppingItem | undefined {
    return this.items().find(item => item.id === id);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}