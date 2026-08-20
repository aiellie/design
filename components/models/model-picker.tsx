"use client";

import {
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
} from "@/components/models/model-selector";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BrandIcons } from "@/icons/icons";
import {
  getChef,
  models as allModels,
  REASONING_LEVELS,
  type Chef,
  type Model,
  type ReasoningLevel,
} from "@/lib/models";
import { cn } from "@/lib/utils";
import { Brain02Icon, CpuIcon, ZapIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, type ComponentProps } from "react";

const effortLabel = (effort: ReasoningLevel) =>
  effort.charAt(0).toUpperCase() + effort.slice(1);

/** Colored brand marks per chef; chefs without one fall back to models.dev. */
const chefBrandIcons: Partial<
  Record<string, (typeof BrandIcons)[keyof typeof BrandIcons]>
> = {
  openai: BrandIcons.openai,
  anthropic: BrandIcons.claude,
  google: BrandIcons.google,
  v0: BrandIcons.v0,
};

function ChefIcon({ slug, className }: { slug: string; className?: string }) {
  const Brand = chefBrandIcons[slug];
  if (Brand) {
    return (
      <Brand
        className={cn("size-3.5 shrink-0", getChef(slug)?.fastClass, className)}
      />
    );
  }
  return <ModelSelectorLogo provider={slug} className={className} />;
}

const EFFORT_BAR_HEIGHTS = ["h-1", "h-1.5", "h-2", "h-2.5", "h-3", "h-3.5"];

/** Bars lit per level — a linear ramp over the 6-bar meter (low=1, max=6). */
const effortBarCounts: Record<ReasoningLevel, number> = {
  low: 1,
  medium: 2,
  high: 4,
  extra: 5,
  max: 6,
};

function EffortBars({
  effort,
  chef,
  className,
}: {
  effort: ReasoningLevel;
  chef?: Chef;
  className?: string;
}) {
  const filled = effortBarCounts[effort];
  return (
    <span aria-hidden className={cn("flex items-end gap-[2px]", className)}>
      {EFFORT_BAR_HEIGHTS.map((height, index) => (
        <span
          key={height}
          className={cn(
            "w-[3px] rounded-full",
            height,
            index < filled
              ? (chef?.colorClass ?? "bg-foreground")
              : (chef?.colorMutedClass ?? "bg-foreground/20")
          )}
        />
      ))}
    </span>
  );
}

export type ModelPickerProps = Omit<
  ComponentProps<typeof Button>,
  "children"
> & {
  /** Models to offer; defaults to the canonical list from `lib/models`. */
  models?: Model[];
  /** Initially selected model id; falls back to the first model. */
  defaultModel?: string;
  onModelChange?: (model: string) => void;
  defaultEffort?: ReasoningLevel;
  onEffortChange?: (effort: ReasoningLevel) => void;
  defaultFastMode?: boolean;
  onFastModeChange?: (fastMode: boolean) => void;
  defaultThinking?: boolean;
  onThinkingChange?: (thinking: boolean) => void;
};

export const ModelPicker = ({
  models = allModels,
  defaultModel,
  onModelChange,
  defaultEffort = "medium",
  onEffortChange,
  defaultFastMode = false,
  onFastModeChange,
  defaultThinking = true,
  onThinkingChange,
  className,
  ...props
}: ModelPickerProps) => {
  const [model, setModel] = useState(defaultModel ?? models[0]?.id ?? "");
  const [effort, setEffort] = useState<ReasoningLevel>(defaultEffort);
  const [fastMode, setFastMode] = useState(defaultFastMode);
  const [thinking, setThinking] = useState(defaultThinking);

  const selected = models.find((entry) => entry.id === model);
  const chef = getChef(selected?.chefSlug);
  const chefNames = [...new Set(models.map((entry) => entry.chef))];
  const availableEfforts = selected?.reasoning ?? REASONING_LEVELS;

  const handleModelChange = (id: string) => {
    setModel(id);
    onModelChange?.(id);
    // Clamp the effort to what the newly picked model supports.
    const next = models.find((entry) => entry.id === id);
    const levels = next?.reasoning ?? REASONING_LEVELS;
    if (!levels.includes(effort)) {
      const clamped = levels[levels.length - 1];
      setEffort(clamped);
      onEffortChange?.(clamped);
    }
  };

  const summary = [
    selected?.name ?? "Model",
    `${effortLabel(effort)} effort`,
    ...(fastMode ? ["Fast Mode"] : []),
    ...(thinking ? ["Thinking"] : []),
  ].join(" · ");

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={summary}
                  className={cn("rounded-full", className)}
                  {...props}
                >
                  <Avatar>
                    <AvatarFallback>
                      {selected && (
                        <ChefIcon
                          slug={selected.chefSlug}
                          className="size-4"
                        />
                      )}
                    </AvatarFallback>
                    {fastMode && (
                      <AvatarBadge
                        className={cn(
                          "text-white",
                          chef?.colorClass,
                          // Sit next to the thinking badge when both are shown.
                          thinking && "right-2"
                        )}
                      >
                        <HugeiconsIcon
                          icon={ZapIcon}
                          strokeWidth={2}
                          className="fill-current"
                        />
                      </AvatarBadge>
                    )}
                    {thinking && (
                      <AvatarBadge>
                        <HugeiconsIcon
                          icon={Brain02Icon}
                          strokeWidth={2}
                          className="fill-current"
                        />
                      </AvatarBadge>
                    )}
                  </Avatar>
                </Button>
              }
            />
          }
        />
        <TooltipContent>{summary}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-48">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={CpuIcon} strokeWidth={2} className="size-3.5" />
            Models
            <span className="ml-auto max-w-24 truncate text-xs text-muted-foreground">
              {selected?.name}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            <DropdownMenuRadioGroup
              value={model}
              onValueChange={(value) => handleModelChange(value as string)}
            >
              {chefNames.map((chefName) => (
                <DropdownMenuGroup key={chefName}>
                  <DropdownMenuLabel>{chefName}</DropdownMenuLabel>
                  {models
                    .filter((entry) => entry.chef === chefName)
                    .map((entry) => (
                      <DropdownMenuRadioItem key={entry.id} value={entry.id}>
                        <ChefIcon slug={entry.chefSlug} />
                        <ModelSelectorName>{entry.name}</ModelSelectorName>
                        <ModelSelectorLogoGroup>
                          {entry.providers.map((provider) => (
                            <ModelSelectorLogo
                              key={provider}
                              provider={provider}
                            />
                          ))}
                        </ModelSelectorLogoGroup>
                      </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuGroup>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <EffortBars effort={effort} chef={chef} className="mr-0.5" />
            Effort
            <span className="ml-auto text-xs text-muted-foreground">
              {effortLabel(effort)}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-36">
            <DropdownMenuRadioGroup
              value={effort}
              onValueChange={(value) => {
                setEffort(value as ReasoningLevel);
                onEffortChange?.(value as ReasoningLevel);
              }}
            >
              {REASONING_LEVELS.map((level) => (
                <DropdownMenuRadioItem
                  key={level}
                  value={level}
                  disabled={!availableEfforts.includes(level)}
                >
                  <EffortBars effort={level} chef={chef} className="mr-0.5" />
                  {effortLabel(level)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={fastMode}
            closeOnClick={false}
            onCheckedChange={(checked) => {
              setFastMode(checked === true);
              onFastModeChange?.(checked === true);
            }}
          >
            <HugeiconsIcon
              icon={ZapIcon}
              strokeWidth={2}
              className={cn("size-3.5", fastMode && chef?.fastClass)}
            />
            Fast Mode
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={thinking}
            closeOnClick={false}
            onCheckedChange={(checked) => {
              setThinking(checked === true);
              onThinkingChange?.(checked === true);
            }}
          >
            <HugeiconsIcon
              icon={Brain02Icon}
              strokeWidth={2}
              className={cn("size-3.5", thinking && "fill-current")}
            />
            Thinking
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
