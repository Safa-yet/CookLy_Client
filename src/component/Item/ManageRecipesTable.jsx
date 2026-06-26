"use client";

import Image from "next/image";

import { Button, Chip, Input, Pagination } from "@heroui/react";

import { FiStar, FiSearch } from "react-icons/fi";

import { useState } from "react";

import toast from "react-hot-toast";



import { ServerPost } from "@/lib/Shared/Server";
import DeleteRecipeModal from "./DeleteRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import { useRouter } from "next/navigation";


export default function ManageRecipesTable({
  recipes,
  totalPages,
  currentPage,
}) {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const filteredRecipes = recipes.filter((recipe) => {
    const keyword = search.toLowerCase();

    return (
      recipe.recipeName?.toLowerCase().includes(keyword) ||
      recipe.authorName?.toLowerCase().includes(keyword)
    );
  });

  const handleFeature = async (id) => {
    const res = await ServerPost(
      {},
      `/api/manage_recipes/feature/${id}`,
      "PATCH",
    );

    if (res.success) {
      toast.success("Recipe Featured");

      location.reload();
    }
  };

  const handleUnFeature = async (id) => {
    const res = await ServerPost(
      {},
      `/api/manage_recipes/unfeature/${id}`,
      "PATCH",
    );

    if (res.success) {
      toast.success("Feature Removed");

      location.reload();
    }
  };

  return (
    <div className="rounded-3xl border border-default-200 bg-white dark:bg-zinc-900 p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manage Recipes</h2>

          <p className="text-default-500">All Recipes Of Users</p>
        </div>

        <div className="w-72">
          <Input
            startContent={<FiSearch />}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Recipe</th>

              <th className="text-left">Author</th>

              <th className="text-left">Category</th>

              <th className="text-left">Likes</th>

              <th className="text-left">Featured</th>

              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecipes.map((recipe) => (
              <tr key={recipe._id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={recipe.recipeImage}
                      alt=""
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />

                    <div>
                      <h4 className="font-semibold">{recipe.recipeName}</h4>

                      <p className="text-sm text-default-500">
                        ${recipe.recipePrice}
                      </p>
                    </div>
                  </div>
                </td>

                <td>{recipe.authorName}</td>

                <td>{recipe.category}</td>

                <td>
                  <Chip color="primary">{recipe.likesCount}</Chip>
                </td>

                <td>
                  {recipe.isFeatured ? (
                    <Chip color="warning">Featured</Chip>
                  ) : (
                    <Chip>No</Chip>
                  )}
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <EditRecipeModal recipe={recipe} />

                    <DeleteRecipeModal recipe={recipe} />

                    {recipe.isFeatured ? (
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() => handleUnFeature(recipe._id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        color="warning"
                        startContent={<FiStar />}
                        onPress={() => handleFeature(recipe._id)}
                      >
                        Feature
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-between items-center border-t border-default-200 pt-6">

  <div className="text-sm text-default-500">
    Page <span className="font-semibold">{currentPage}</span> of{" "}
    <span className="font-semibold">{totalPages}</span>
  </div>

  <Pagination className="justify-center">
    <Pagination.Content>

      <Pagination.Item>

        <Pagination.Previous
          isDisabled={currentPage === 1}
          onPress={() =>
            router.push(
              `/dashboard/admin/recipes?page=${currentPage - 1}`
            )
          }
        >
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>

      </Pagination.Item>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (
        <Pagination.Item key={page}>

          <Pagination.Link
            isActive={page === currentPage}
            onPress={() =>
              router.push(
                `/dashboard/admin/recipes?page=${page}`
              )
            }
          >
            {page}
          </Pagination.Link>

        </Pagination.Item>
      ))}

      <Pagination.Item>

        <Pagination.Next
          isDisabled={currentPage === totalPages}
          onPress={() =>
            router.push(
              `/dashboard/admin/recipes?page=${currentPage + 1}`
            )
          }
        >
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>

      </Pagination.Item>

    </Pagination.Content>
  </Pagination>

</div>
      </div>
    </div>
  );
}
