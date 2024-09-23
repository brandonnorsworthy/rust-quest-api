type Category = {
  id: number;
  name: categoryName;
  weight: number;
  created_at: Date;
  updated_at: Date;
  updated_by: number | null;
  deleted_by: Date | null;
};

export type categoryName = "PVP" |
  "PVE" |
  "Monuments" |
  "Exploration" |
  "Crafting" |
  "Gambling" |
  "Roleplay" |
  "Automation" |
  "Trolling" |
  "Survival" |
  "Raiding" |
  "Building";

export default Category;