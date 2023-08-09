const headers = (token?:string) => ({
  'Authorization': `Bearer ${token}`,
});

export default headers;