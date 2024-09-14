import Role from "./role";

export type tokenData = {
  userId: number;
  username: string;
  role: Role;
  metadata: any;
}