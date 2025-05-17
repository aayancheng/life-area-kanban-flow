
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
  progress?: number; // Added progress property (0-100)
}

export interface Column {
  id: ColumnType;
  title: string;
  icon: string;
  themeColor: string;
  cards: Card[];
}

export interface KanbanContextType {
  columns: Column[];
  addCard: (column: ColumnType, title: string) => void;
  moveCard: (cardId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => void;
  updateCardOrder: (columnId: ColumnType, reorderedCards: Card[]) => void;
  getCard: (cardId: string) => Card | undefined;
  updateCard: (cardId: string, updatedCard: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  loading: boolean;
  importBoard: (importedColumns: Column[]) => void;
}
