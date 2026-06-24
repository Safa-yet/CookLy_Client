"use client";

import { AlertDialog, Button } from "@heroui/react";

import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeFavorite } from "@/lib/actions/recipe";
import Image from "next/image";

export default function FavoriteRemoveModal({ favorite }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {

    try {
      setLoading(true);

      const data = await removeFavorite(favorite._id);

      if (data.success) {
        toast.success("Removed From Favorites");

        router.refresh();
      }
    } catch (error) {
      toast.error("Failed To Remove");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Button size="sm" color="danger" className="bg-red-500 text-white hover:bg-red-600" variant="flat">
        <FiTrash2 />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[450px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>Remove Favorite?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <div className="space-y-3">
                <p>
                  Are you sure you want to remove this recipe from your
                  favorites?
                </p>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <Image
  src={favorite.recipeImage}
  alt={favorite.recipeName}
  width={500}
  height={500}
  className="w-full w-40 h-40 object-contain rounded-full"
/>
                  <h3 className="font-semibold text-red-600">
                    {favorite.recipeName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {favorite.category}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  You can always add it again later.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button color="danger" isLoading={loading} onPress={handleRemove}>
                Remove Favorite
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
