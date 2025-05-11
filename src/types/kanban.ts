
export type ColumnType = 'health' | 'family' | 'create' | 'future' | 'completed';

export interface Card {
  id: string;
  title: string;
  description: string;
  youtubeLink?: string;
  column: ColumnType;
}

export interface Column {
  id: ColumnType;
  title: string;
  icon: string;
  themeColor: string;
  cards: Card[];
}
