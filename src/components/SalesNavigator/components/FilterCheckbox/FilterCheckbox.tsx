import { memo }  from "react";
import type { DraftFilters } from "../../schemas/filters";

interface FilterCheckboxProps {
  filterKey: keyof DraftFilters;
  label: string;
  checked: boolean;
  updateDraft: <T extends keyof DraftFilters>(
    key: T,
    value: DraftFilters[T]
  ) => void;
}

const FilterCheckbox = (
  ({ filterKey, label, checked, updateDraft }: FilterCheckboxProps) => {
    
    return (
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => updateDraft(filterKey, !checked)}
        />
        {label}
      </label>
    );
  }
);

export default memo(FilterCheckbox);