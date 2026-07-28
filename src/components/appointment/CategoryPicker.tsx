import React from "react";

type Category = {
  key: string;
  label: string;
  description: string;
  accentColor: string;
};

type Props = {
  categories: Category[];
  selected: string;
  onSelect: (key: string) => void;
};

const CategoryPicker = ({ categories, selected, onSelect }: Props) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {categories.map((category) => (
      <button
        key={category.key}
        type="button"
        onClick={() => onSelect(category.key)}
        className={`rounded-3xl p-4 text-left transition duration-200 ${
          selected === category.key
            ? "ring-2 ring-sky-400 bg-slate-950"
            : "bg-slate-900/80 hover:bg-slate-900"
        }`}
      >
        <div className="text-sm font-semibold" style={{ color: category.accentColor }}>
          {category.label}
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">{category.description}</p>
      </button>
    ))}
  </div>
);

export default CategoryPicker;
