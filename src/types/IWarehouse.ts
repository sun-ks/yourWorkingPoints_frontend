export interface IWarehouseItem {
  id: string;
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
  used_count_this_ticket?: number;
  quantity_used: number;
  used_in_tickets?: any[];
}
