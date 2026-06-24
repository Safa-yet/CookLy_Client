"use client";

import { useState } from "react";

import {
  Button,
  Modal,
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  TextArea,
  Input,
  Label,
  Select,
  ListBox,
  Surface,
} from "@heroui/react";

import Image from "next/image";

import { FiEdit2, FiUpload } from "react-icons/fi";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { UpdateRecipe } from "@/lib/actions/recipe";

export default function EditRecipeModal({
  recipe,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [recipeImage, setRecipeImage] =
    useState(null);

  const [preview, setPreview] =
    useState(recipe.recipeImage);

  const [category, setCategory] =
    useState(recipe.category);

  const [cuisineType, setCuisineType] =
    useState(recipe.cuisineType);

  const [
    difficultyLevel,
    setDifficultyLevel,
  ] = useState(
    recipe.difficultyLevel
  );

  // =====================
  // IMAGE PREVIEW
  // =====================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setRecipeImage(file);

    const imagePreview =
      URL.createObjectURL(file);

    setPreview(imagePreview);
  };

  // =====================
  // IMGBB
  // =====================

  const uploadToImageBB =
    async (imageFile) => {
      const formData =
        new FormData();

      formData.append(
        "image",
        imageFile
      );

      const response =
        await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      return (
        result?.data
          ?.display_url ||
        result?.data?.url ||
        ""
      );
    };

  // =====================
  // UPDATE
  // =====================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const formData =
          new FormData(
            e.currentTarget
          );

        const formValues =
          Object.fromEntries(
            formData.entries()
          );

        let imageUrl =
          recipe.recipeImage;

        if (recipeImage) {
          imageUrl =
            await uploadToImageBB(
              recipeImage
            );
        }

        const updateData = {
          ...formValues,

          recipeImage:
            imageUrl,

          category,

          cuisineType,

          difficultyLevel,

          updatedAt:
            new Date(),
        };
console.log(updateData,recipe._id,'Check updataew');
  

        const data = await UpdateRecipe(updateData,recipe._id,);

        if (data.success) {
            router.refresh();
          toast.success(
            "Recipe Updated Successfully"
          );

        } else {
          toast.error(
            data.message
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Modal>
      <Button
        size="sm"
        variant="outline"
      >
        <FiEdit2 />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-5xl">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Edit Recipe
              </Modal.Heading>

              <p className="text-sm text-default-500">
                Update recipe
                information
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">

              <Surface variant="default">

                <Form
                  id="editRecipeForm"
                  onSubmit={
                    handleSubmit
                  }
                >
                  <Fieldset>

                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Name */}

                      <TextField
                        isRequired
                        name="recipeName"
                          defaultValue={
                            recipe.recipeName
                          }
                      >
                        <Label>
                          Recipe Name
                        </Label>

                        <Input
                        
                        />
                      </TextField>

                      {/* Price */}

                      <TextField
                        isRequired
                        name="recipePrice"
                        defaultValue={
                            recipe.recipePrice
                          }
                      >
                        <Label>
                          Recipe Price
                        </Label>

                        <Input
                          type="number"
                        
                        />
                      </TextField>

                      {/* Time */}

                      <TextField
                        isRequired
                        name="preparationTime"
                        defaultValue={
                            recipe.preparationTime
                          }
                      >
                        <Label>
                          Preparation Time
                        </Label>

                        <Input
                          
                        />
                      </TextField>

                      {/* Category */}

                      <Select
                        selectedKey={
                          category
                        }
                        onSelectionChange={(
                          key
                        ) =>
                          setCategory(
                            String(
                              key
                            )
                          )
                        }
                      >
                        <Label>
                          Category
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
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
                            String(
                              key
                            )
                          )
                        }
                      >
                        <Label>
                          Cuisine Type
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
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
                            String(
                              key
                            )
                          )
                        }
                      >
                        <Label>
                          Difficulty
                        </Label>

                        <Select.Trigger>
                          <Select.Value />
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

                      {/* Image */}

                      <div className="md:col-span-2">

                        <Label>
                          Recipe Image
                        </Label>

                        <label className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl h-72 flex flex-col items-center justify-center cursor-pointer overflow-hidden">

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
                              width={800}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <>
                              <FiUpload
                                size={40}
                              />

                              <p>
                                Upload
                                Image
                              </p>
                            </>
                          )}
                        </label>

                      </div>

                    </FieldGroup>

                    {/* Ingredients */}

                    <div className="mt-5">
                      <TextField
                        name="ingredients"
                        defaultValue={
                            recipe.ingredients
                          }
                      >
                        <Label>
                          Ingredients
                        </Label>

                        <TextArea
                          rows={6}
                          
                        />
                      </TextField>
                    </div>

                    {/* Instructions */}

                    <div className="mt-5">
                      <TextField
                        name="instructions"
                        defaultValue={
                            recipe.instructions
                          }
                      >
                        <Label>
                          Instructions
                        </Label>

                        <TextArea
                          rows={8}
                          
                        />
                      </TextField>
                    </div>

                  </Fieldset>
                </Form>

              </Surface>

            </Modal.Body>

            <Modal.Footer>

              <Button
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="editRecipeForm"
                isLoading={
                  loading
                }
                className="bg-green-600 text-white"
              >
                Save Changes
              </Button>

            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}