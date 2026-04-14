export interface NewsroomContent {
  id: string;
  slug: string;
  image: string;
  header_text: string;
  category: string;
  created_at: string;
  paragraph_text: string;
}

export interface NewsroomListItem {
  id: string;
  slug: string;
  image: string;
  headerText: string;
  category: string;
  createdAt: string;
}

export function toNewsroomListItem(item: NewsroomContent): NewsroomListItem {
  return {
    id: item.id,
    slug: item.slug,
    image: item.image,
    headerText: item.header_text,
    category: item.category,
    createdAt: item.created_at,
  };
}
