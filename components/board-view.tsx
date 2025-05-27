"use client";

import type React from "react";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Paperclip,
  User,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CardItem {
  id: string;
  title: string;
  description?: string;
  assignees: string[];
  dueDate?: string;
  tags: string[];
  comments: number;
  attachments: number;
}

interface List {
  id: string;
  title: string;
  cards: CardItem[];
}

const initialData: List[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Design new landing page",
        description: "Create a modern, responsive landing page for the product",
        assignees: ["JD", "AS"],
        dueDate: "2024-01-15",
        tags: ["Design", "High Priority"],
        comments: 3,
        attachments: 2,
      },
      {
        id: "card-2",
        title: "Set up authentication system",
        assignees: ["JD"],
        tags: ["Backend", "Security"],
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-3",
        title: "Implement drag and drop",
        description: "Add drag and drop functionality to the Kanban board",
        assignees: ["AS"],
        dueDate: "2024-01-12",
        tags: ["Frontend", "Feature"],
        comments: 5,
        attachments: 1,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      {
        id: "card-4",
        title: "Code review for API endpoints",
        assignees: ["JD", "AS"],
        tags: ["Backend", "Review"],
        comments: 2,
        attachments: 0,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "card-5",
        title: "Project setup and configuration",
        assignees: ["JD"],
        tags: ["Setup"],
        comments: 0,
        attachments: 0,
      },
    ],
  },
];

function TaskCard({ card, index }: { card: CardItem; index: number }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 ${
            snapshot.isDragging ? "rotate-2 scale-105" : ""
          } transition-transform`}
        >
          <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-border/50 hover:border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-medium leading-tight pr-2">
                  {card.title}
                </h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {card.description && (
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {card.description}
                </p>
              )}

              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {card.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {card.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(card.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {card.comments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      <span>{card.comments}</span>
                    </div>
                  )}
                  {card.attachments > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Paperclip className="h-3 w-3" />
                      <span>{card.attachments}</span>
                    </div>
                  )}
                </div>

                {card.assignees.length > 0 && (
                  <div className="flex -space-x-1">
                    {card.assignees.map((assignee, i) => (
                      <Avatar
                        key={i}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarFallback className="text-xs">
                          {assignee}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

function AddCardDialog({ listId }: { listId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add card logic here
    console.log("Adding card:", { listId, title, description });
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter card description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Card</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BoardView() {
  const [lists, setLists] = useState<List[]>(initialData);
  const [isStarred, setIsStarred] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    if (!sourceList || !destList) return;

    const sourceCards = Array.from(sourceList.cards);
    const destCards =
      sourceList === destList ? sourceCards : Array.from(destList.cards);

    const [movedCard] = sourceCards.splice(source.index, 1);

    if (sourceList === destList) {
      sourceCards.splice(destination.index, 0, movedCard);
      const newLists = lists.map((list) =>
        list.id === sourceList.id ? { ...list, cards: sourceCards } : list
      );
      setLists(newLists);
    } else {
      destCards.splice(destination.index, 0, movedCard);
      const newLists = lists.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destList.id) {
          return { ...list, cards: destCards };
        }
        return list;
      });
      setLists(newLists);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Project Alpha</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsStarred(!isStarred)}
                className="h-8 w-8"
              >
                <Star
                  className={`h-4 w-4 ${
                    isStarred ? "fill-yellow-400 text-yellow-400" : ""
                  }`}
                />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Invite
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Board settings</DropdownMenuItem>
                  <DropdownMenuItem>Change background</DropdownMenuItem>
                  <DropdownMenuItem>Export board</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete board
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm text-muted-foreground">3 members</span>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {lists.map((list) => (
              <div key={list.id} className="flex-shrink-0 w-80">
                <div className="bg-muted/50 rounded-lg p-4 group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">{list.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                        {list.cards.length}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Add card</DropdownMenuItem>
                          <DropdownMenuItem>Edit list</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete list
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <Droppable droppableId={list.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] ${
                          snapshot.isDraggingOver
                            ? "bg-accent/50 border-2 border-dashed border-primary/50"
                            : ""
                        } rounded-md transition-all duration-200 p-1`}
                      >
                        {list.cards.map((card, index) => (
                          <TaskCard key={card.id} card={card} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <AddCardDialog listId={list.id} />
                </div>
              </div>
            ))}

            <div className="flex-shrink-0 w-80">
              <Button
                variant="ghost"
                className="w-full h-12 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add another list
              </Button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
