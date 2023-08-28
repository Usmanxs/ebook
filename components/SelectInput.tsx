import * as React from "react";
import {v4} from "uuid"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectInput({
  placeholder,
  options = [],
}: {
  placeholder: string;
  options: any[];
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((o) => {
            return <SelectItem key={v4()} value={o}>{o}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
