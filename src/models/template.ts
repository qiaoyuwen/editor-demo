import type { User } from './user';

export interface Template {
  id: number;
  name: string;
  createTime: string;
  content: string;
  admin: User;
}
