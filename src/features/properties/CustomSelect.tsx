import { useState, useRef, useEffect, useId } from "react";
import type { KeyboardEvent } from "react";
import { z } from "zod";
import { statusEnum } from "../../types";

export type Status = z.infer<typeof statusEnum>;

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type CustomSelectProps<T extends string> = {
  className?: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function CustomSelect<T extends string>({
  className = "",
  options,
  value,
  onChange,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const listboxId = useId();

  const selectedIndex = options.findIndex(
    (o) => o.value === value
  );

  const selected =
    selectedIndex >= 0 ? options[selectedIndex] : options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const index = selectedIndex >= 0 ? selectedIndex : 0;

      requestAnimationFrame(() => {
      const el = document.getElementById(
        `${listboxId}-option-${index}`
      );

      el?.scrollIntoView({
        block: "nearest",
      });
    });
  }, [open, selectedIndex, listboxId]);

  const selectOption = (index: number) => {
    const option = options[index];

    if (!option) return;

    onChange(option.value);
    setOpen(false);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (!open) {
      if (
        ["ArrowDown", "ArrowUp", "Enter", " "].includes(
          e.key
        )
      ) {
        e.preventDefault();
        setOpen(true);
      }

      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        setHighlightedIndex(
          (prev) => (prev + 1) % options.length
        );

        break;

      case "ArrowUp":
        e.preventDefault();

        setHighlightedIndex((prev) =>
          prev === 0
            ? options.length - 1
            : prev - 1
        );

        break;

      case "Enter":
      case " ":
        e.preventDefault();
        selectOption(highlightedIndex);
        break;

      case "Escape":
        setOpen(false);

        requestAnimationFrame(() => {
          buttonRef.current?.focus();
        });

        break;

      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div
      ref={ref}
      className={`custom-select ${className}`}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`custom-select__trigger input-text ${
          open ? "is-open" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open
            ? `${listboxId}-option-${highlightedIndex}`
            : undefined
        }
      >
        <span className="custom-select__value h5-input">
          {selected
            ? `— ${selected.label} —`
            : "Wybierz opcję"}
        </span>

        <span
          className="custom-select__icon"
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="custom-select__menu"
        >
          {options.map((opt, index) => {
            const isSelected = value === opt.value;

            return (
              <li
                key={opt.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`custom-select__option input-text ${
                  isSelected ? "is-selected" : ""
                }`}
                onMouseEnter={() =>
                  setHighlightedIndex(index)
                }
                onClick={() => selectOption(index)}
              >
                <span className="custom-select__option-text">
                  {opt.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}