interface Suggestion {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  updated_by: number;
  deleted_by: Date;
}

export default Suggestion;