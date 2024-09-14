import Category from "./category";
import Role from "./role";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  metadata: metadata;
  completed_quests: number[];
  oauth_provider: string;
  oauth_id: string;
  created_at: Date;
  updated_at: Date;
  updated_by: number;
  last_login: Date;
  login_count: number;
}

export type metadata = {
  category_filters: Category[];
  show_instrument_pack_quests: boolean;
  show_voice_props_pack_quests: boolean;
  show_sunburn_pack_quests: boolean;
  disable_animations: boolean;
}

export default User;