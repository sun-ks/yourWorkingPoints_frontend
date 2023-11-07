
export interface IItem {
  "ticket_id": string;  
  "name"?: string;
  "description"?: string;
  "point_id": string;
  "client_first_name"?: string;
  "client_last_name"?: string;
  "client_name"?: string;
  "client_phone": string;
  "status": 'inbox' | 'in progress' | 'done' | 'paid' | 'cancelled' | 'hold';
  "email": string;
  "client_email"?:string; 
  "device_sn": string;
  "paid": number;
  "comments": string;
  "created": string | number | Date;
  "last_part_payment"?: number | "";
  "note"?: string;
  "priority"?: 'low' | 'high' | 'medium';
  "assigned_at": string | null;
  "guarantee_till": string | number | Date | null;
  "test": string;
}

export interface IClientPhone {
  phone: string;
  name: string
}