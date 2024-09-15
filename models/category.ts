type Category = {
  id: number;
  name: categoryName;
  created_at: Date;
  updated_at: Date;
  updated_by: number | null;
  deleted_by: Date | null;
};

export type categoryName = 'Monuments' |
  'PVE' |
  'Gambling' |
  'PVP' |
  'Roleplay' |
  'Automation' |
  'Troll' |
  'Exploration' |
  'Survival' |
  'Raid';

export default Category;