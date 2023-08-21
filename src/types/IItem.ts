
export interface IItem {
  "item_id": string;  
  "name"?: string;
  "description"?: string;
  "point_id": string;
  "client_first_name"?: string;
  "client_last_name"?: string;
  "client_phone": string;
  "status": 'inbox' | 'in progress' | 'done' | 'completely paid';
  "email": string;
  "device_sn": string;
  "deposit": number;
  "comments": string;
  "created": string | number | Date;
  "last_part_payment"?: number | "";
  "note"?: string;
  "priority"?: 'low' | 'high' | 'standard';
}