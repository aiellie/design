"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/models/model-selector";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { models, type Model } from "@/lib/models";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { memo, useCallback, useState } from "react";

interface ModelItemProps {
  model: Model;
  selectedModel: string;
  onSelect: (id: string) => void;
}

const ModelItem = memo(({ model, selectedModel, onSelect }: ModelItemProps) => {
  const handleSelect = useCallback(
    () => onSelect(model.id),
    [onSelect, model.id]
  );
  return (
    <ModelSelectorItem key={model.id} onSelect={handleSelect} value={model.id}>
      <ModelSelectorLogo provider={model.chefSlug} />
      <ModelSelectorName>{model.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {model.providers.map((provider) => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {selectedModel === model.id ? (
        <HugeiconsIcon className="ml-auto size-4" icon={Tick02Icon} strokeWidth={2} />
      ) : (
        <div className="ml-auto size-4" />
      )}
    </ModelSelectorItem>
  );
});

ModelItem.displayName = "ModelItem";

export const ModelSelectorExample = () => {
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(
    models[0]?.id ?? ""
  );

  const handleModelSelect = useCallback((id: string) => {
    setSelectedModel(id);
    setOpen(false);
  }, []);

  const selectedModelData = models.find((model) => model.id === selectedModel);

  // Get unique chefs in order of appearance
  const chefs = [...new Set(models.map((model) => model.chef))];

  return (
    <div className="flex size-full items-center justify-center p-8">
      <ModelSelector onOpenChange={setOpen} open={open}>
        <Tooltip>
          <TooltipTrigger
            render={
              <ModelSelectorTrigger
                render={
                  <Button
                    aria-label={selectedModelData?.name}
                    size="icon-sm"
                    variant="outline"
                    className="rounded-full"
                  >
                    {selectedModelData?.chefSlug && (
                      <ModelSelectorLogo provider={selectedModelData.chefSlug} />
                    )}
                  </Button>
                }
              />
            }
          />
          <TooltipContent>{selectedModelData?.name}</TooltipContent>
        </Tooltip>
        <ModelSelectorContent>
          <ModelSelectorInput placeholder="Search models..." />
          <ModelSelectorList>
            <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
            {chefs.map((chef) => (
              <ModelSelectorGroup heading={chef} key={chef}>
                {models
                  .filter((model) => model.chef === chef)
                  .map((model) => (
                    <ModelItem
                      key={model.id}
                      model={model}
                      onSelect={handleModelSelect}
                      selectedModel={selectedModel}
                    />
                  ))}
              </ModelSelectorGroup>
            ))}
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>
    </div>
  );
};

