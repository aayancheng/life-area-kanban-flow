
export type ColumnType = 'health' | 'family' | 'create' | 'parking';

// Legacy column types that might exist in stored data
export type LegacyColumnType = ColumnType | 'future' | 'completed';

export interface Card {
  id: string;
  title: string;
  description: string;
  youtubeLink?: string;
  column: ColumnType;
  isFuture?: boolean;
  isCompleted?: boolean;
}

export interface Column {
  id: ColumnType;
  title: string;
  icon: string;
  themeColor: string;
  cards: Card[];
}
