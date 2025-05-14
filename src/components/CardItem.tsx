import React, { useState } from 'react';
import { Card } from '@/types/kanban';
import { Button } from '@/components/ui/button';
import { CircleParking, CheckCircle2, Timer, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useKanban } from '@/context/KanbanContext';

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });
  const { updateCard, deleteCard } = useKanban();

  const handleSave = () => {
    updateCard(card.id, {
      title: editedCard.title,
      description: editedCard.description,
      youtubeLink: editedCard.youtubeLink,
    });
    setIsEditing(false);
  };

  const getParkingStatusIcon = () => {
    if (card.isCompleted) {
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    } else if (card.isFuture) {
      return <Timer className="h-4 w-4 text-purple-500" />;
    }
    return null;
  };

  return (
    <>
      <div 
        onClick={() => setIsEditing(true)}
        className="p-3 mb-2 bg-white border rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              {card.column === 'parking' && getParkingStatusIcon()}
              <h4 className="font-medium text-gray-800">{card.title}</h4>
            </div>
            {card.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{card.description}</p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Edit Goal
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title"
                value={editedCard.title} 
                onChange={(e) => setEditedCard({...editedCard, title: e.target.value})} 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                value={editedCard.description} 
                onChange={(e) => setEditedCard({...editedCard, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="youtube" className="text-sm font-medium">YouTube Link (optional)</label>
              <Input 
                id="youtube"
                value={editedCard.youtubeLink || ''} 
                onChange={(e) => setEditedCard({...editedCard, youtubeLink: e.target.value})} 
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <Button 
              variant="destructive" 
              onClick={() => {
                deleteCard(card.id);
                setIsEditing(false);
              }}
              className="mr-auto"
            >
              Delete
            </Button>
            <div>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardItem;
