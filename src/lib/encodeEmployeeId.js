import { encode } from 'base-64';

export const encodeEmployeeId = (id) => {
  return encode(id); // Encode the employee ID using base64 encoding
};
