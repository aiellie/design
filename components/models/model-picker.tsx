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
import {
  CpuIcon,
  Search01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, type ComponentProps, type KeyboardEvent } from "react";

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
/** Pixel-tight ramp for the avatar badge. */
const EFFORT_BAR_HEIGHTS_COMPACT = [
  "h-[2px]",
  "h-[3px]",
  "h-[4px]",
  "h-[5px]",
  "h-[6px]",
  "h-[7px]",
];

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
  compact = false,
  inverse = false,
}: {
  effort: ReasoningLevel;
  chef?: Chef;
  className?: string;
  /** Thinner, shorter bars that fit inside an avatar badge. */
  compact?: boolean;
  /** Draw bars in the current text color (for use on a colored surface). */
  inverse?: boolean;
}) {
  const filled = effortBarCounts[effort];
  const heights = compact ? EFFORT_BAR_HEIGHTS_COMPACT : EFFORT_BAR_HEIGHTS;
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-end",
        compact ? "gap-px" : "gap-[2px]",
        className
      )}
    >
      {heights.map((height, index) => (
        <span
          key={height}
          className={cn(
            "rounded-full",
            compact ? "w-px" : "w-[3px]",
            height,
            index < filled
              ? inverse
                ? "bg-current"
                : (chef?.colorClass ?? "bg-foreground")
              : inverse
                ? "bg-current/30"
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
};

export const ModelPicker = ({
  models = allModels,
  defaultModel,
  onModelChange,
  defaultEffort = "medium",
  onEffortChange,
  defaultFastMode = false,
  onFastModeChange,
  className,
  ...props
}: ModelPickerProps) => {
  const [model, setModel] = useState(defaultModel ?? models[0]?.id ?? "");
  const [effort, setEffort] = useState<ReasoningLevel>(defaultEffort);
  const [fastMode, setFastMode] = useState(defaultFastMode);
  const [search, setSearch] = useState("");

  const selected = models.find((entry) => entry.id === model);
  const chef = getChef(selected?.chefSlug);
  const query = search.trim().toLowerCase();
  const visibleModels = query
    ? models.filter((entry) =>
        [entry.name, entry.chef, entry.id].some((field) =>
          field.toLowerCase().includes(query)
        )
      )
    : models;
  const chefNames = [...new Set(visibleModels.map((entry) => entry.chef))];
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

  /**
   * Keep typing inside the search box: the menu's typeahead and list
   * navigation listen on the popup, so only let arrows/Escape/Enter bubble.
   */
  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const passthrough = ["ArrowDown", "ArrowUp", "Escape", "Enter", "Tab"];
    if (!passthrough.includes(event.key)) event.stopPropagation();
  };

  const summary = [
    selected?.name ?? "Model",
    `${effortLabel(effort)} effort`,
    ...(fastMode ? ["Fast Mode"] : []),
  ].join(" · ");

  return (
    <DropdownMenu onOpenChange={(open) => !open && setSearch("")}>
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
                    <AvatarBadge
                      className={cn(
                        "right-auto left-0 w-auto! px-[3px] text-white",
                        chef?.colorClass
                      )}
                    >
                      <EffortBars effort={effort} chef={chef} compact inverse />
                    </AvatarBadge>
                    {fastMode && (
                      <AvatarBadge
                        className={cn("text-white", chef?.colorClass)}
                      >
                        {/* Paths carry their own stroke attribute, so make them
                            inherit — fill-* and stroke-* utilities on the icon
                            then both apply. */}
                        <HugeiconsIcon
                          icon={ZapIcon}
                          strokeWidth={2}
                          className="fill-current stroke-current [&_path]:stroke-inherit"
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
            <div className="sticky -top-1 z-10 -mx-1 -mt-1 mb-1 flex items-center gap-2 border-b border-foreground/5 bg-popover/70 px-3 py-1.5 backdrop-blur-2xl">
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={2}
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search models…"
                aria-label="Search models"
                autoComplete="off"
                spellCheck={false}
                className="h-6 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {visibleModels.length === 0 && (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                No models found
              </div>
            )}
            <DropdownMenuRadioGroup
              value={model}
              onValueChange={(value) => handleModelChange(value as string)}
            >
              {chefNames.map((chefName) => (
                <DropdownMenuGroup key={chefName}>
                  <DropdownMenuLabel>{chefName}</DropdownMenuLabel>
                  {visibleModels
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
