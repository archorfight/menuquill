export interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary_tags?: string[];
}

export interface MenuCategory {
  name: string;
  subtitle: string;
  items: MenuItem[];
}

export interface GeneratedMenu {
  categories: MenuCategory[];
  restaurant_name?: string;
}

export interface GenerateRequest {
  restaurant_name: string;
  cuisine: string;
  atmosphere: string;
  dietary_tags: string[];
  item_count: number;
}

export interface GenerateResponse {
  success: boolean;
  data?: GeneratedMenu;
  error?: string;
  mock?: boolean;
}
