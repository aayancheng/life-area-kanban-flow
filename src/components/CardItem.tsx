
import React from 'react';
import { Card as CardType } from '@/types/kanban';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useKanban } from '@/context/KanbanContext';

interface CardItemProps {
  card: CardType;
  isDragging?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, isDragging }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(card.title);
  const [editedDescription, setEditedDescription] = React.useState(card.description);
  const [editedYoutubeLink, setEditedYoutubeLink] = React.useState(card.youtubeLink || '');
  
  const { updateCard, deleteCard } = useKanban();
  
  const handleSave = () => {
    updateCard(card.id, { 
      title: editedTitle, 
      description: editedDescription,
      youtubeLink: editedYoutubeLink
    });
    setIsOpen(false);
  };

  const getColumnColor = (column: string) => {
    switch (column) {
      case 'health':
        return 'border-l-green-500';
      case 'family':
        return 'border-l-blue-500';
      case 'create':
        return 'border-l-orange-500';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <>
      <Card 
        className={`mb-2 cursor-pointer border-l-4 ${getColumnColor(card.column)} ${isDragging ? 'opacity-50' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-3">
          <p className="font-medium text-sm">{card.title}</p>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Edit Goal
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="youtube" className="text-sm font-medium">YouTube Link</label>
              <Input
                id="youtube"
                value={editedYoutubeLink}
                onChange={(e) => setEditedYoutubeLink(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            {editedYoutubeLink && (
              <div className="mt-2 aspect-video">
                <iframe
                  className="w-full h-full"
                  src={editedYoutubeLink.replace('watch?v=', 'embed/')}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={() => {
              deleteCard(card.id);
              setIsOpen(false);
            }}>
              Delete
            </Button>
            <Button type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardItem;
