import React from "react";
import "./RadioButtonGroup.css";

type Option<V extends string | number | boolean> = {
  label: string;
  value: V;
  bgColor?: string;
};

type RadioButtonGroupProps<V extends string | number | boolean> = {
  options: Array<Option<V>>;
  selected: V;
  onChange: (value: V) => void;
  disabled?: boolean;
};

export default function RadioButtonGroup<V extends string | number>(
  props: RadioButtonGroupProps<V>
) {
  return (
    <div className="radio-container">
      {props.options.map((option) => {
        const isSelected = props.selected === option.value;

        return (
          <React.Fragment key={option.value}>
            <input
              id={option.value.toString()}
              type="radio"
              name="radio"
              checked={isSelected}
              value={option.value}
              disabled={props.disabled}
              onChange={() => props.onChange(option.value)}
            />
            <label
              style={{
                backgroundColor: isSelected ? option.bgColor : undefined,
              }}
              htmlFor={option.value.toString()}
            >
              {option.label}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}
