interface Quest {
  id: number;
  category_id: number;
  description: string;
  title: string;
  objectives: string[];
  image_url: string;
  suggested_by: number;
  created_at: Date;
  updated_at: Date;
  updated_by: number;
  deleted_by: Date;
  soft_deleted: boolean;
}

export default Quest;