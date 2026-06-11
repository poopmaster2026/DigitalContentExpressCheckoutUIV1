"use client";

import {
  Button,
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";
import Search from "@react-spectrum/s2/icons/Search";
import Close from "@react-spectrum/s2/icons/Close";
import "./search-field.css";

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, "className" | "children"> {
  placeholder?: string;
  className?: string;
}

/** ピル型の検索フィールド（Express 文法）。ラベルは aria-label で渡す。 */
export function SearchField({ placeholder, className, ...props }: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={["ui-search-field", className].filter(Boolean).join(" ")}
    >
      <span className="ui-search-field__icon" aria-hidden="true">
        <Search />
      </span>
      <Input placeholder={placeholder} className="ui-search-field__input" />
      <Button className="ui-search-field__clear" aria-label="クリア">
        <Close />
      </Button>
    </AriaSearchField>
  );
}
