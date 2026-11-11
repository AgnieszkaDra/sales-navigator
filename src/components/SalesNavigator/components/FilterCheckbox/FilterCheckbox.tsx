interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox = ({
    label,
    checked,
    onChange,
  }: FilterCheckboxProps) => {
  return (
    <label className="filters__checkbox grid__item h5-input">
    <input
        type="checkbox"
        className="filters__input"
        checked={checked}
        onChange={onChange}
      />
    {label}
  </label>
  );
};

export default FilterCheckbox;