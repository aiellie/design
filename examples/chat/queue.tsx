"use client";

import type { QueueMessage, QueueTodo } from "@/components/chat/queue";
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@/components/chat/queue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { memo, useCallback, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  Progress01Icon,
  Trash,
  Message01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
const sampleMessages: QueueMessage[] = [
  {
    id: "msg-1",
    parts: [{ text: "How do I set up the project?", type: "text" }],
  },
  {
    id: "msg-2",
    parts: [{ text: "What is the roadmap for Q4?", type: "text" }],
  },
  {
    id: "msg-3",
    parts: [
      { text: "Update the default logo to this png.", type: "text" },
      {
        filename: "setup-guide.png",
        mediaType: "image/png",
        type: "file",
        url: "https://github.com/haydenbleasel.png",
      },
    ],
  },
  {
    id: "msg-4",
    parts: [{ text: "Please generate a changelog.", type: "text" }],
  },
  {
    id: "msg-5",
    parts: [{ text: "Add dark mode support.", type: "text" }],
  },
  {
    id: "msg-6",
    parts: [{ text: "Optimize database queries.", type: "text" }],
  },
  {
    id: "msg-7",
    parts: [{ text: "Set up CI/CD pipeline.", type: "text" }],
  },
];

const sampleTodos: QueueTodo[] = [
  {
    description: "Complete the README and API docs",
    id: "todo-1",
    status: "completed",
    title: "Write project documentation",
  },
  {
    id: "todo-2",
    status: "pending",
    title: "Implement authentication",
  },
  {
    description: "Resolve crash on settings page",
    id: "todo-3",
    status: "pending",
    title: "Fix bug #42",
  },
  {
    description: "Unify queue and todo state management",
    id: "todo-4",
    status: "pending",
    title: "Refactor queue logic",
  },
  {
    description: "Increase test coverage for hooks",
    id: "todo-5",
    status: "pending",
    title: "Add unit tests",
  },
];

interface MessageActionsProps {
  messageId: string;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onSend: (id: string) => void;
}

const MessageActions = memo(
  ({ messageId, onEdit, onRemove, onSend }: MessageActionsProps) => {
    const handleEdit = useCallback(
      () => onEdit(messageId),
      [onEdit, messageId]
    );
    const handleSend = useCallback(
      () => onSend(messageId),
      [onSend, messageId]
    );
    const handleRemove = useCallback(
      () => onRemove(messageId),
      [onRemove, messageId]
    );

    return (
      <QueueItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <QueueItemAction
                aria-label="Queued message actions"
                className="data-open:opacity-100"
              />
            }
          >
            <HugeiconsIcon
              className="size-3"
              icon={MoreHorizontalIcon}
              strokeWidth={2}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                <HugeiconsIcon
                  className="size-3.5"
                  icon={Edit02Icon}
                  strokeWidth={2}
                />
                Edit in composer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSend}>
                <HugeiconsIcon
                  className="size-3.5"
                  icon={ArrowUp02Icon}
                  strokeWidth={2}
                />
                Send now
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleRemove}>
              <HugeiconsIcon
                className="size-3.5"
                icon={Trash}
                strokeWidth={2}
              />
              Remove from queue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </QueueItemActions>
    );
  }
);

MessageActions.displayName = "MessageActions";

type TodoStatus = NonNullable<QueueTodo["status"]>;

const todoStatuses: {
  id: TodoStatus;
  label: string;
  icon: typeof Clock01Icon;
}[] = [
  { id: "pending", label: "Pending", icon: Clock01Icon },
  { id: "completed", label: "Completed", icon: CheckmarkCircle02Icon },
];

interface TodoActionsProps {
  todo: QueueTodo;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoActions = memo(
  ({ todo, onEdit, onRemove, onStatusChange }: TodoActionsProps) => {
    const status = todo.status ?? "pending";
    const statusLabel =
      todoStatuses.find((item) => item.id === status)?.label ?? "Pending";

    const handleEdit = useCallback(() => onEdit(todo.id), [onEdit, todo.id]);
    const handleRemove = useCallback(
      () => onRemove(todo.id),
      [onRemove, todo.id]
    );
    const handleStatusChange = useCallback(
      (value: string) => onStatusChange(todo.id, value as TodoStatus),
      [onStatusChange, todo.id]
    );

    return (
      <QueueItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <QueueItemAction
                aria-label="Todo actions"
                className="data-open:opacity-100"
              />
            }
          >
            <HugeiconsIcon
              className="size-3"
              icon={MoreHorizontalIcon}
              strokeWidth={2}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                <HugeiconsIcon
                  className="size-3.5"
                  icon={Edit02Icon}
                  strokeWidth={2}
                />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon
                    className="size-3.5"
                    icon={Progress01Icon}
                    strokeWidth={2}
                  />
                  Status
                  <span className="ml-auto text-xs text-muted-foreground">
                    {statusLabel}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-40">
                  <DropdownMenuRadioGroup
                    value={status}
                    onValueChange={handleStatusChange}
                  >
                    {todoStatuses.map((item) => (
                      <DropdownMenuRadioItem key={item.id} value={item.id}>
                        <HugeiconsIcon
                          className="size-3.5"
                          icon={item.icon}
                          strokeWidth={2}
                        />
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleRemove}>
              <HugeiconsIcon
                className="size-3.5"
                icon={Trash}
                strokeWidth={2}
              />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </QueueItemActions>
    );
  }
);

TodoActions.displayName = "TodoActions";

interface TodoItemProps {
  todo: QueueTodo;
  index: number;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onReorder: (from: number, to: number) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoItem = memo(
  ({ todo, index, onEdit, onRemove, onReorder, onStatusChange }: TodoItemProps) => {
    const isCompleted = todo.status === "completed";

    return (
      <QueueItem
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const data = event.dataTransfer.getData("text/plain");
          if (!data.startsWith("todo:")) {
            return;
          }
          onReorder(Number(data.slice("todo:".length)), index);
        }}
      >
        <div className="flex items-center gap-2">
          <QueueItemIndicator
            completed={isCompleted}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", `todo:${index}`);
              event.dataTransfer.effectAllowed = "move";
            }}
          />
          <QueueItemContent className="shrink-0" completed={isCompleted}>
            {todo.title}
          </QueueItemContent>
          {todo.description && (
            <QueueItemDescription completed={isCompleted}>
              {todo.description}
            </QueueItemDescription>
          )}
          <TodoActions
            onEdit={onEdit}
            onRemove={onRemove}
            onStatusChange={onStatusChange}
            todo={todo}
          />
        </div>
      </QueueItem>
    );
  }
);

TodoItem.displayName = "TodoItem";

const Example = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [todos, setTodos] = useState(sampleTodos);

  const handleRemoveMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const handleRemoveTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleTodoStatusChange = useCallback(
    (id: string, status: TodoStatus) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
      );
    },
    []
  );

  const handleReorderMessages = useCallback((from: number, to: number) => {
    if (from === to) {
      return;
    }
    setMessages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleReorderTodos = useCallback((from: number, to: number) => {
    if (from === to) {
      return;
    }
    setTodos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleEditTodo = useCallback((id: string) => {
    console.log("Edit todo:", id);
  }, []);

  const handleSendNow = useCallback((id: string) => {
    console.log("Send now:", id);
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const handleEditInComposer = useCallback((id: string) => {
    console.log("Edit in composer:", id);
  }, []);

  if (messages.length === 0 && todos.length === 0) {
    return null;
  }

  return (
    <Queue>
      {messages.length > 0 && (
        <QueueSection>
          <QueueSectionTrigger>
            <QueueSectionLabel count={messages.length} icon={<HugeiconsIcon className="size-3" icon={Message01Icon} strokeWidth={2} />} label="Queued" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {messages.map((message, index) => {
                const summary = (() => {
                  const textParts = message.parts.filter(
                    (p) => p.type === "text"
                  );
                  const text = textParts
                    .map((p) => p.text)
                    .join(" ")
                    .trim();
                  return text || "(queued message)";
                })();

                const hasFiles = message.parts.some(
                  (p) => p.type === "file" && p.url
                );

                return (
                  <QueueItem
                    key={message.id}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const data = event.dataTransfer.getData("text/plain");
                      if (!data.startsWith("message:")) {
                        return;
                      }
                      handleReorderMessages(
                        Number(data.slice("message:".length)),
                        index
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <QueueItemIndicator
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData(
                            "text/plain",
                            `message:${index}`
                          );
                          event.dataTransfer.effectAllowed = "move";
                        }}
                      />
                      <QueueItemContent>{summary}</QueueItemContent>
                      {hasFiles && (
                        <QueueItemAttachment>
                          {message.parts
                            .filter((p) => p.type === "file" && p.url)
                            .map((file) => {
                              if (
                                file.mediaType?.startsWith("image/") &&
                                file.url
                              ) {
                                return (
                                  <QueueItemImage
                                    alt={file.filename || "attachment"}
                                    key={file.url}
                                    src={file.url}
                                  />
                                );
                              }
                              return (
                                <QueueItemFile key={file.url}>
                                  {file.filename || "file"}
                                </QueueItemFile>
                              );
                            })}
                        </QueueItemAttachment>
                      )}
                      <MessageActions
                        messageId={message.id}
                        onEdit={handleEditInComposer}
                        onRemove={handleRemoveMessage}
                        onSend={handleSendNow}
                      />
                    </div>
                  </QueueItem>
                );
              })}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      )}
      {todos.length > 0 && (
        <QueueSection>
          <QueueSectionTrigger>
            <QueueSectionLabel count={todos.length} icon={<HugeiconsIcon className="size-3" icon={CheckmarkCircle01Icon} strokeWidth={2} />} label="Todo" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {todos.map((todo, index) => (
                <TodoItem
                  index={index}
                  key={todo.id}
                  onEdit={handleEditTodo}
                  onRemove={handleRemoveTodo}
                  onReorder={handleReorderTodos}
                  onStatusChange={handleTodoStatusChange}
                  todo={todo}
                />
              ))}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      )}
    </Queue>
  );
};

export function QueueExample() {
  return (
    <Example />
  );
}
