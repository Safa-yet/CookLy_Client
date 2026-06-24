"use client";

import { useState } from "react";

import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  TextArea,
  Input,
  Label,
  Description,
  FieldError,
  Button,
  Select,
  ListBox,
} from "@heroui/react";

import {
  FiUpload,
  FiClock,
  FiBookOpen,
  FiList,
  FiDollarSign,
} from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/lib/actions/createRecipe";
import toast from "react-hot-toast";

export default function AddRecipeForm({ user }) {
  const router = useRouter();

  const [recipeImage, setRecipeImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [category, setCategory] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // IMAGE PREVIEW
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setRecipeImage(file);

    const imagePreview =
      URL.createObjectURL(file);

    setPreview(imagePreview);
  };

  // =========================
  // IMGBB UPLOAD
  // =========================
  const uploadToImageBB = async (
    imageFile
  ) => {
    const formData = new FormData();

    formData.append(
      "image",
      imageFile
    );

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result =
      await response.json();

    return (
      result?.data?.display_url ||
      result?.data?.url ||
      ""
    );
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(
        e.currentTarget
      );

      const formValues =
        Object.fromEntries(
          formData.entries()
        );

      let uploadedImage = "";

      // =========================
      // TODO:
      // Upload image to ImageBB
      // =========================
      if (recipeImage) {
        uploadedImage =
          await uploadToImageBB(
            recipeImage
          );
      }

      const recipeData = {
        ...formValues,

        recipeImage: uploadedImage,

        category,

        cuisineType,

        difficultyLevel,

        likesCount: 0,

        isFeatured: false,

        status: "active",

        authorId: user?.id,

        authorName: user?.name,

        authorEmail: user?.email,

        createdAt: new Date(),

        updatedAt: new Date(),
      };

      console.log(recipeData);

      // =========================
      // TODO:
      // Save recipe to database
      //
      await createRecipe(recipeData);
      // =========================

      toast.success("Recipe Ready");

      // =========================
      // TODO:
      // Redirect after success
      // =========================

      router.push("/dashboard/user/my-recipes");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen py-10">
      <div className="w-full mx-auto px-8">

        <div className="mb-8">
          <span className="inline-flex bg-green-100 text-green-600 p-4 rounded-full text-xl font-bold">
            RecipeHub
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Add New Recipe
          </h1>

          <p className="text-gray-500 mt-3">
            Share your favorite recipe
            with the community.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="w-full"
        >
          <Fieldset className="bg-white dark:bg-zinc-950 border border-default-200 rounded-3xl p-8 shadow-sm">

            <Fieldset.Legend className="text-2xl font-bold">
              Recipe Details
            </Fieldset.Legend>

            <Description>
              Fill in all recipe
              information carefully.
            </Description>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Recipe Name */}
              <TextField
                isRequired
                name="recipeName"
              >
                <Label>
                  Recipe Name
                </Label>

                <Input
                  placeholder="Chicken Biryani"
                  startContent={
                    <FiBookOpen />
                  }
                />

                <FieldError />
              </TextField>

              {/* Preparation Time */}
              <TextField
                isRequired
                name="preparationTime"
              >
                <Label>
                  Preparation Time
                </Label>

                <Input
                  placeholder="45 Minutes"
                  startContent={
                    <FiClock />
                  }
                />

                <FieldError />
              </TextField>
              <TextField
                isRequired
                type="number"
                name="recipePrice"
              >
                <Label>
                  Recipe Price
                </Label>

                <Input
                  placeholder="$10.99"
                  startContent={
                    <FiDollarSign />
                  }
                />

                <FieldError />
              </TextField>

              {/* Category */}
              <Select
                selectedKey={category}
                onSelectionChange={(
                  key
                ) =>
                  setCategory(
                    String(key)
                  )
                }
              >
                <Label>
                  Category
                </Label>

                <Select.Trigger>
                  <Select.Value placeholder="Select Category" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Breakfast">
                      Breakfast
                    </ListBox.Item>

                    <ListBox.Item id="Lunch">
                      Lunch
                    </ListBox.Item>

                    <ListBox.Item id="Dinner">
                      Dinner
                    </ListBox.Item>

                    <ListBox.Item id="Dessert">
                      Dessert
                    </ListBox.Item>

                    <ListBox.Item id="Snack">
                      Snack
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Cuisine */}
              <Select
                selectedKey={
                  cuisineType
                }
                onSelectionChange={(
                  key
                ) =>
                  setCuisineType(
                    String(key)
                  )
                }
              >
                <Label>
                  Cuisine Type
                </Label>

                <Select.Trigger>
                  <Select.Value placeholder="Select Cuisine" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Bangladeshi">
                      Bangladeshi
                    </ListBox.Item>

                    <ListBox.Item id="Indian">
                      Indian
                    </ListBox.Item>

                    <ListBox.Item id="Chinese">
                      Chinese
                    </ListBox.Item>

                    <ListBox.Item id="Italian">
                      Italian
                    </ListBox.Item>

                    <ListBox.Item id="Thai">
                      Thai
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Difficulty */}
              <Select
                selectedKey={
                  difficultyLevel
                }
                onSelectionChange={(
                  key
                ) =>
                  setDifficultyLevel(
                    String(key)
                  )
                }
              >
                <Label>
                  Difficulty
                </Label>

                <Select.Trigger>
                  <Select.Value placeholder="Select Difficulty" />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Easy">
                      Easy
                    </ListBox.Item>

                    <ListBox.Item id="Medium">
                      Medium
                    </ListBox.Item>

                    <ListBox.Item id="Hard">
                      Hard
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Recipe Image */}
              <div>
                <Label>
                  Recipe Image
                </Label>

                <label className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl h-60 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition overflow-hidden">

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleImageChange
                    }
                  />

                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <FiUpload
                        size={40}
                        className="text-green-500"
                      />

                      <p className="font-medium mt-3">
                        Upload Recipe
                        Image
                      </p>

                      <span className="text-sm text-gray-500">
                        PNG, JPG,
                        WEBP
                      </span>
                    </>
                  )}
                </label>
              </div>

            </FieldGroup>

            {/* Ingredients */}
            <div className="mt-6">
              <TextField
                isRequired
                name="ingredients"
              >
                <Label>
                  Ingredients
                </Label>

                <TextArea
                  rows={6}
                  placeholder="Rice, Chicken, Onion..."
                />

                <FieldError />
              </TextField>
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <TextField
                isRequired
                name="instructions"
              >
                <Label>
                  Instructions
                </Label>

                <TextArea
                  rows={8}
                  placeholder="Step by step cooking instructions..."
                />

                <FieldError />
              </TextField>
            </div>

            <Fieldset.Actions>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white"
              >
                {loading
                  ? "Creating..."
                  : "Publish Recipe"}
              </Button>

              <Button
                type="reset"
                variant="secondary"
              >
                Reset
              </Button>
            </Fieldset.Actions>

          </Fieldset>
        </Form>
      </div>
    </section>
  );
}