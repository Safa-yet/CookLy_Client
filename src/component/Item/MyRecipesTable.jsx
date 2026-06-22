"use client";

import Link from "next/link";
import Image from "next/image";

import { Table, Button } from "@heroui/react";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function MyRecipesTable({
  recipes,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-default-200 shadow-sm p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            My Recipes
          </h2>

          <p className="text-sm text-default-500 mt-1">
            Manage all recipes created by you
          </p>
        </div>

        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
          {recipes?.length || 0} Recipes
        </div>
      </div>

      {/* Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="My Recipes"
            className="min-w-[1100px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                Recipe
              </Table.Column>

              <Table.Column>
                Category
              </Table.Column>

              <Table.Column>
                Cuisine
              </Table.Column>

              <Table.Column>
                Difficulty
              </Table.Column>

              <Table.Column>
                Likes
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Featured
              </Table.Column>

              <Table.Column>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {recipes?.map((recipe) => (
                <Table.Row key={recipe._id}>
                  
                  {/* Recipe */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      
                      <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover w-[60px] h-[60px]"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {recipe.recipeName}
                        </h4>

                        <p className="text-xs text-default-500 mt-1">
                          {recipe.authorName}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Category */}
                  <Table.Cell>
                    {recipe.category}
                  </Table.Cell>

                  {/* Cuisine */}
                  <Table.Cell>
                    {recipe.cuisineType}
                  </Table.Cell>

                  {/* Difficulty */}
                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        recipe.difficultyLevel ===
                        "Easy"
                          ? "bg-green-100 text-green-700"
                          : recipe.difficultyLevel ===
                            "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {recipe.difficultyLevel}
                    </span>
                  </Table.Cell>

                  {/* Likes */}
                  <Table.Cell>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {recipe.likesCount || 0}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        recipe.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {recipe.status}
                    </span>
                  </Table.Cell>

                  {/* Featured */}
                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        recipe.isFeatured
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {recipe.isFeatured
                        ? "Featured"
                        : "No"}
                    </span>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      
                      {/* View */}
                      <Link
                        href={`/recipes/${recipe._id}`}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <FiEye />
                        </Button>
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/dashboard/my-recipes/edit/${recipe._id}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <FiEdit2 />
                        </Button>
                      </Link>

                      {/* Delete */}
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          // TODO:
                          // Delete Recipe API Call
                          console.log(
                            "Delete Recipe:",
                            recipe._id
                          );
                        }}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}