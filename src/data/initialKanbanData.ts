
import { v4 as uuidv4 } from 'uuid';
import { Column, ColumnType } from '@/types/kanban';

export const initialColumns: Column[] = [
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
