// 子分类类型
export interface TagChild {
  tag_name: string;
  tag_id: number;
}

// 分类类型
export interface TagCategory {
  tag_name: string;
  tag_id: number;
  children: TagChild[];
}

// 导航接口响应类型
export interface TagResponse {
  code: number;
  msg: string;
  data: TagCategory[];
} 