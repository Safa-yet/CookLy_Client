"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  Label,
  ListBox,
} from "@heroui/react";

export default function RecipeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category =
    searchParams.get("category") || "";

  const handleCategoryChange = (key) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (key) {
      params.set("category", key);
    } else {
      params.delete("category");
    }

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-default-200 rounded-3xl p-6">
      <div className="max-w-sm">
        <Select
          selectedKey={category}
          onSelectionChange={(key) =>
            handleCategoryChange(String(key))
          }
        >
          <Label>Filter By Category</Label>

          <Select.Trigger>
            <Select.Value placeholder="Select Category" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>

              <ListBox.Item id="Breakfast">
                <Label>Breakfast</Label>
              </ListBox.Item>

              <ListBox.Item id="Lunch">
                <Label>Lunch</Label>
              </ListBox.Item>

              <ListBox.Item id="Dinner">
                <Label>Dinner</Label>
              </ListBox.Item>

              <ListBox.Item id="Dessert">
                <Label>Dessert</Label>
              </ListBox.Item>

              <ListBox.Item id="Snacks">
                <Label>Snacks</Label>
              </ListBox.Item>

            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}