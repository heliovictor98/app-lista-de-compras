export interface ShoppingItem {
  id: string;
  descricao: string;
  quantidade: number;
  valor: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShoppingItemForm {
  descricao: string;
  quantidade: number;
  valor: string;
}