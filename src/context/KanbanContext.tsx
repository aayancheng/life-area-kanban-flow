
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Column, ColumnType, KanbanContextType } from '@/types/kanban';
import { useAuth } from '@/context/AuthContext';
import { initialColumns } from '@/data/initialKanbanData';
import { useLoadKanban } from '@/hooks/useLoadKanban';
import { useSaveKanban } from '@/hooks/useSaveKanban';

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const KanbanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Load data from Supabase when user changes
  useLoadKanban(user, setLoading, setColumns);

  // Save to database whenever columns change
  useSaveKanban(columns, user, loading);

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
