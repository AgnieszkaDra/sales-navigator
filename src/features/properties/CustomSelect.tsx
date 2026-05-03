import { useState, useRef, useEffect, useId } from "react";

export default function CustomSelect({
  className = "",
  options,
  value,
  onChange,
 
  })
  {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const ref = useRef(null);
  const listRef = useRef(null);
  const buttonRef = useRef(null);

  const listboxId = useId();

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex] || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      const index = selectedIndex >= 0 ? selectedIndex : 0;
      
      requestAnimationFrame(() => {
        const el = document.getElementById(
          `${listboxId}-option-${index}`
        );
        el?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [open, selectedIndex, listboxId]);

  const selectOption = (index) => {
    onChange(options[index].value);
    setOpen(false);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % options.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) =>
          i === 0 ? options.length - 1 : i - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        selectOption(highlightedIndex);
        break;

      case " ":
        e.preventDefault();
        selectOption(highlightedIndex);
        break;

      case "Escape":
        setOpen(false);
        buttonRef.current?.focus();
        break;

      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={ref} className={`custom-select ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className={`custom-select__trigger input-text ${open ? "is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open ? `${listboxId}-option-${highlightedIndex}` : undefined
      }
    >
      <span className="custom-select__value">
        {selected ? selected.label : "Wybierz opcję"}
      </span>

      <span className="custom-select__icon" aria-hidden="true">
      </span>
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
              onMouseEnter={() => setHighlightedIndex(index)}
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