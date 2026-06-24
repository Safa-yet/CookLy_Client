"use client";

import Link from "next/link";

import {
  Table,
  Button,
  Chip,
} from "@heroui/react";

import {
  FiEye,
  FiCreditCard,
} from "react-icons/fi";

export default function PurchasedRecipesTable({
  recipes,
}) {

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-default-200 shadow-sm p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Purchased Recipes
          </h2>

          <p className="text-default-500 text-sm mt-1">
            All recipes purchased by you
          </p>

        </div>

        <Chip
          color="success"
          variant="flat"
        >
          {recipes?.length || 0} Purchased
        </Chip>

      </div>

      <Table>

        <Table.ScrollContainer>

          <Table.Content
            aria-label="Purchased Recipes"
            className="min-w-[1000px]"
          >

            <Table.Header>

              <Table.Column>
                Recipe
              </Table.Column>

              <Table.Column>
                Price
              </Table.Column>

              <Table.Column>
                Transaction
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Purchase Date
              </Table.Column>

              <Table.Column>
                Action
              </Table.Column>

            </Table.Header>

            <Table.Body>

              {recipes?.map(
                (recipe) => (
                  <Table.Row
                    key={recipe._id}
                  >

                    <Table.Cell>

                      <div>

                        <h4 className="font-semibold">
                          {
                            recipe.recipeName
                          }
                        </h4>

                        <p className="text-xs text-default-500">
                          ID:
                          {" "}
                          {
                            recipe.recipeId
                          }
                        </p>

                      </div>

                    </Table.Cell>

                    <Table.Cell>

                      <Chip
                        color="warning"
                        variant="flat"
                      >
                        $
                        {
                          recipe.recipePrice
                        }
                      </Chip>

                    </Table.Cell>

                    <Table.Cell>

                      <div className="flex items-center gap-2">

                        <FiCreditCard />

                        <span className="text-xs">
                          {
                            recipe.transactionId?.slice(
                              0,
                              18
                            )
                          }
                          ...
                        </span>

                      </div>

                    </Table.Cell>

                    <Table.Cell>

                      <Chip
                        color="success"
                      >
                        {
                          recipe.status
                        }
                      </Chip>

                    </Table.Cell>

                    <Table.Cell>

                      {new Date(
                        recipe.paidAt
                      ).toLocaleDateString()}

                    </Table.Cell>

                    <Table.Cell>

                      <Link
                        href={`/recipes/${recipe.recipeId}`}
                      >

                        <Button
                          size="sm"
                          color="success"
                          variant="flat"
                          startContent={
                            <FiEye />
                          }
                        >
                          View
                        </Button>

                      </Link>

                    </Table.Cell>

                  </Table.Row>
                )
              )}

            </Table.Body>

          </Table.Content>

        </Table.ScrollContainer>

      </Table>

    </div>
  );
}