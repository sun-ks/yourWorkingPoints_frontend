export interface IWarehouseItem {
  name: string;
  category_id: string;
  supplier_id: string;
  point_id: string;
  phone: string;
  serial_number: string;
  purchase_price: number;
  retail_price: number;
  warranty: number | null;
  received_date: Date;
  quantity: number;
  description: string;
}
