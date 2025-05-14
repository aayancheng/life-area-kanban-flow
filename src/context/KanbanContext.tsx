
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Column, ColumnType, LegacyColumnType } from '@/types/kanban';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface KanbanContextType {
  columns: Column[];
  addCard: (column: ColumnType, title: string) => void;
  moveCard: (cardId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => void;
  updateCardOrder: (columnId: ColumnType, reorderedCards: Card[]) => void;
  getCard: (cardId: string) => Card | undefined;
  updateCard: (cardId: string, updatedCard: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  loading: boolean;
}

const initialColumns: Column[] = [
  {
    id: 'health',
    title: 'Health',
    icon: 'lotus',
    themeColor: 'green',
    cards: [
      { id: uuidv4(), title: 'Exercise three times a week', description: '', column: 'health' },
      { id: uuidv4(), title: 'Eat more vegetables', description: '', column: 'health' },
    ]
  },
  {
    id: 'family',
    title: 'Family',
    icon: 'heart',
    themeColor: 'blue',
    cards: [
      { id: uuidv4(), title: 'Plan a family vacation', description: '', column: 'family' },
      { id: uuidv4(), title: 'Call parents on weekend', description: '', column: 'family' },
      { id: uuidv4(), title: 'Have a game night', description: '', column: 'family' },
    ]
  },
  {
    id: 'create',
    title: 'Create',
    icon: 'lightbulb',
    themeColor: 'orange',
    cards: [
      { id: uuidv4(), title: 'Write every day', description: '', column: 'create' },
      { id: uuidv4(), title: 'Learn piano', description: '', column: 'create' },
    ]
  },
  {
    id: 'parking',
    title: 'Parking Lot',
    icon: 'circle-parking',
    themeColor: 'slate',
    cards: [
      { id: uuidv4(), title: 'Read a book', description: '', column: 'parking', isFuture: true },
      { id: uuidv4(), title: 'Complete project proposal', description: '', column: 'parking', isCompleted: true },
    ]
  }
];

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const KanbanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Load data from Supabase when user changes
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // Attempt to fetch the user's board from the database
        const { data, error } = await supabase
          .from('kanban_boards')
          .select('columns')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // If board exists, use it
          setColumns(data.columns as Column[]);
        } else {
          // If no board exists for the user, create a new one with default data
          await saveDefaultBoard(user.id);
          setColumns(initialColumns);
        }
      } catch (error) {
        console.error('Error loading kanban board:', error);
        // Fallback to localStorage if database fetch fails
        const savedColumns = localStorage.getItem('kanbanColumns');
        if (savedColumns) {
          handleLocalStorageData(savedColumns);
        } else {
          setColumns(initialColumns);
        }
        toast({
          title: "Failed to load your board from the cloud",
          description: "Using local data instead. Your changes may not be saved to the cloud.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Create a default board for new users
  const saveDefaultBoard = async (userId: string) => {
    try {
      await supabase.from('kanban_boards').insert({
        user_id: userId,
        columns: initialColumns
      });
    } catch (error) {
      console.error('Error creating default board:', error);
    }
  };

  // Save to database whenever columns change
  useEffect(() => {
    const saveToDatabase = async () => {
      if (!user || !columns.length || loading) return;

      try {
        const { error } = await supabase
          .from('kanban_boards')
          .upsert({
            user_id: user.id,
            columns: columns,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error saving kanban board:', error);
        // Fallback to localStorage
        localStorage.setItem('kanbanColumns', JSON.stringify(columns));
        toast({
          title: "Failed to save to the cloud",
          description: "Your board was saved locally, but not to the cloud.",
          variant: "destructive"
        });
      }
    };

    // Wait a bit before saving to reduce database calls during rapid changes
    const timeoutId = setTimeout(() => {
      saveToDatabase();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [columns, user, loading]);

  // Handle data from localStorage for backward compatibility
  const handleLocalStorageData = (savedColumns: string) => {
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

  const addCard = (column: ColumnType, title: string) => {
    const newCard: Card = {
      id: uuidv4(),
      title,
      description: '',
      column,
    };

    setColumns(prevColumns =>
      prevColumns.map(col => 
        col.id === column 
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
  };

  const getCard = (cardId: string): Card | undefined => {
    for (const column of columns) {
      const card = column.cards.find(card => card.id === cardId);
      if (card) return card;
    }
    return undefined;
  };

  const updateCard = (cardId: string, updatedCard: Partial<Card>) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        cards: column.cards.map(card =>
          card.id === cardId ? { ...card, ...updatedCard } : card
        )
      }))
    );
  };

  const deleteCard = (cardId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        cards: column.cards.filter(card => card.id !== cardId)
      }))
    );
  };

  const moveCard = (cardId: string, sourceColumn: ColumnType, destinationColumn: ColumnType) => {
    const card = columns.find(col => col.id === sourceColumn)?.cards.find(c => c.id === cardId);
    
    if (!card) return;
    
    // Add special properties based on destination
    let updatedCard = { ...card, column: destinationColumn };
    
    if (destinationColumn === 'parking') {
      // Reset both flags first
      updatedCard.isFuture = false;
      updatedCard.isCompleted = false;
      
      // Set appropriate flag based on source column
      if (sourceColumn === 'parking') {
        // Toggle between future and completed inside parking lot
        updatedCard.isFuture = card.isCompleted ? true : false;
        updatedCard.isCompleted = card.isFuture ? true : false;
      } else {
        // By default, new items to parking lot are considered future items
        updatedCard.isFuture = true;
      }
    } else if (sourceColumn === 'parking') {
      // Moving out from parking lot, remove flags
      delete updatedCard.isFuture;
      delete updatedCard.isCompleted;
    }
    
    setColumns(prevColumns =>
      prevColumns.map(col => {
        if (col.id === sourceColumn) {
          return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
        }
        if (col.id === destinationColumn) {
          return { ...col, cards: [...col.cards, updatedCard] };
        }
        return col;
      })
    );
  };

  const updateCardOrder = (columnId: ColumnType, reorderedCards: Card[]) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId ? { ...column, cards: reorderedCards } : column
      )
    );
  };

  return (
    <KanbanContext.Provider 
      value={{ 
        columns, 
        addCard, 
        moveCard, 
        updateCardOrder, 
        getCard, 
        updateCard,
        deleteCard,
        loading
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = (): KanbanContextType => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};
