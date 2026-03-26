export interface IServiceItem {
  id: string;
  name: string;
  price: number;
  category_id: string;
  description: string;
  created_by_user_name?: string;
  created_at: Date;
}
