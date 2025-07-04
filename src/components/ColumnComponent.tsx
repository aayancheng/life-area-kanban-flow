import React, { useState } from 'react';
import { Column, Card as CardType } from '@/types/kanban';
import CardItem from './CardItem';
import { Button } from '@/components/ui/button';
import { Plus, X, Heart, Lightbulb, CircleParking } from 'lucide-react';
import { useKanban } from '@/context/KanbanContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ColumnComponentProps {
  column: Column;
  onDragStart: (e: React.DragEvent, cardId: string, sourceColumn: string, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetColumn: string, targetIndex?: number) => void;
  isParkingLot?: boolean;
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ 
  column, 
  onDragStart, 
  onDragOver, 
  onDrop,
  isParkingLot = false
}) => {
  const { addCard } = useKanban();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const getIcon = () => {
    switch(column.id) {
      case 'health':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path><path d="M12 6a6 6 0 0 0-6 6c0 4 6 6 6 6s6-2 6-6a6 6 0 0 0-6-6z"></path></svg>;
      case 'family':
        return <Heart className="h-5 w-5 text-blue-600" />;
      case 'create':
        return <Lightbulb className="h-5 w-5 text-orange-500" />;
      case 'parking':
        return <CircleParking className="h-5 w-5 text-slate-600" />;
      default:
        return null;
    }
  };

  const getHeaderColor = () => {
    switch(column.id) {
      case 'health':
        return 'text-green-600';
      case 'family':
        return 'text-blue-600';
      case 'create':
        return 'text-orange-500';
      case 'parking':
        return 'text-slate-600';
      default:
        return 'text-gray-800';
    }
  };

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(column.id, newCardTitle.trim());
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleDragEnter = (index: number) => {
    setDragOverIndex(index);
  };

  return (
    <div 
      className={`flex flex-col bg-white rounded-lg border shadow-sm ${isParkingLot ? 'md:max-w-[calc(100%/3)]' : ''}`}
      onDragOver={onDragOver}
      onDrop={(e) => {
        onDrop(e, column.id, dragOverIndex !== null ? dragOverIndex : undefined);
        setDragOverIndex(null);
      }}
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <h3 className={`font-medium text-lg ${getHeaderColor()}`}>{column.title}</h3>
        </div>
        {column.id !== 'parking' && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsAddingCard(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="p-2 flex-grow overflow-y-auto max-h-[500px]">
        {column.cards.map((card, index) => (
          <div 
            key={card.id} 
            draggable 
            onDragStart={(e) => onDragStart(e, card.id, column.id, index)}
            onDragEnter={() => handleDragEnter(index)}
            className={`${dragOverIndex === index ? 'border-t-2 border-gray-400' : ''}`}
          >
            <CardItem card={card} />
          </div>
        ))}
        {column.id !== 'parking' && column.cards.length === 0 && (
          <div className="text-center p-4 text-gray-500 text-sm">
            No goals yet. Click + to add one.
          </div>
        )}
        {column.id === 'parking' && column.cards.length === 0 && (
          <div className="text-center p-4 text-gray-500 text-sm">
            Drag items here to park them for later or mark as completed.
          </div>
        )}
      </div>
      
      {column.id !== 'parking' && (
        <div className="p-2 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
            onClick={() => setIsAddingCard(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      )}

      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Add New Goal
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="new-title" className="text-sm font-medium">Goal Title</label>
              <Input
                id="new-title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter goal title"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCard(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddCard}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColumnComponent;
