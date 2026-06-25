"use client";

import { AlertDialog, Button } from "@heroui/react";

import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteRecipe } from "@/lib/actions/recipe";
import Image from "next/image";

export default function DeleteRecipeModal({ recipe }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);



      const data = await deleteRecipe(recipe._id);
      router.refresh();
      if (data.success) {
        toast.success("Recipe Deleted Successfully");

      } else {
        toast.error(data.message || "Delete Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Button title="Delete Recipe" size="sm" color="danger" className="bg-red-500 hover:bg-red-600 text-white" variant="flat">
        <FiTrash2 />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[500px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>Delete Recipe?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <div className="space-y-3">
                <p>You are about to permanently delete:</p>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <Image
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    width={500}
                    height={500}
                    className="w-full w-40 h-40 object-contain rounded-full"
                  />
                  <h3 className="font-semibold text-red-600">
                    {recipe.recipeName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Category: {recipe.category}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button color="danger" isLoading={loading} onPress={handleDelete}>
                Delete Recipe
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
