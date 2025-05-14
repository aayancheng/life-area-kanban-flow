
import { Card, Column, LegacyColumnType, ColumnType } from '@/types/kanban';
import { Json } from '@/integrations/supabase/types';

// Handle data from localStorage for backward compatibility
export const handleLocalStorageData = (savedColumns: string, setColumns: React.Dispatch<React.SetStateAction<Column[]>>) => {
  // Handle migration from old to new format (future, completed -> parking)
  let parsedColumns = JSON.parse(savedColumns);
  
  interface OldColumn {
    id: LegacyColumnType;
    title: string;
    icon: string;
    themeColor: string;
    cards: Card[];
  }
  
  const hasFutureOrCompleted = parsedColumns.some(
    (col: OldColumn) => col.id === 'future' || col.id === 'completed'
  );
  
  if (hasFutureOrCompleted) {
    const futureColumn = parsedColumns.find((col: OldColumn) => col.id === 'future');
    const completedColumn = parsedColumns.find((col: OldColumn) => col.id === 'completed');
    
    // Add isFuture/isCompleted flags to the cards
    const futureCards = (futureColumn?.cards || []).map((card: Card) => ({
      ...card,
      column: 'parking' as ColumnType,
      isFuture: true
    }));
    
    const completedCards = (completedColumn?.cards || []).map((card: Card) => ({
      ...card,
      column: 'parking' as ColumnType,
      isCompleted: true
    }));
    
    // Create the new parking column
    const parkingColumn = {
      id: 'parking' as ColumnType,
      title: 'Parking Lot',
      icon: 'circle-parking',
      themeColor: 'slate',
      cards: [...futureCards, ...completedCards]
    };
    
    // Filter out the old columns and add the new one
    parsedColumns = parsedColumns
      .filter((col: OldColumn) => col.id !== 'future' && col.id !== 'completed')
      .concat(parkingColumn);
  }
  
  setColumns(parsedColumns);
};

// Create a default board for new users
export const saveDefaultBoard = async (userId: string, initialColumns: Column[], supabase: any) => {
  try {
    await supabase.from('kanban_boards').insert({
      user_id: userId,
      columns: initialColumns as unknown as Json
    });
  } catch (error) {
    console.error('Error creating default board:', error);
  }
};
