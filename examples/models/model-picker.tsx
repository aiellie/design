"use client";

import { ModelPicker } from "@/components/models/model-picker";

export function ModelPickerExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <ModelPicker
        defaultModel="claude-fable-5"
        defaultEffort="high"
        defaultFastMode
      />
    </div>
  );
}
