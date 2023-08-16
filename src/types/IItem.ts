export interface IItem {
  "item_id": string;  
  "name"?: string;
  "description"?: string;
  "point_id": string;
  "client_first_name"?: string;
  "client_last_name"?: string;
  "client_phone": string;
  "status": "inbox" | "in progress" | "done" | "paid";
  "email": string;
  "device_sn": string;
  "paid": number;
  "comments": string;
}