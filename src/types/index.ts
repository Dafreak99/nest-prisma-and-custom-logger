export type Role = 'INTERN' | 'ENGINEER' | 'ADMIN';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export type MyResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};
