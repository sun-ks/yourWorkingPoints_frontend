export interface IApiResponse<T> {
  success?: boolean;
  ok?: boolean;
  message?: string;
  data?: T;
}
