"use client";

import {
  Modal,
  Button,
  Input,
  Label,
  TextField,
  Surface,
} from "@heroui/react";

import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { updateUser } from "@/lib/actions/manageUser";

export default function EditProfileModal({
  user,
}) {
  const [preview, setPreview] =
    useState(user?.image || "");

  const [loading, setLoading] =
    useState(false);

  const handleImageUpload =
    async (e) => {
      const image =
        e.target.files?.[0];

      if (!image) return;

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data =
          await res.json();

        if (
          data?.success
        ) {
          setPreview(
            data.data.url
          );
        }
      } catch {
        toast.error(
          "Image Upload Failed"
        );
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      const form =
        e.target;

      const payload = {
        name:
          form.name.value,
        image: preview,
      };

      try {
    const data = await updateUser(payload,user._id)

        if (
          data.success
        ) {
          toast.success(
            "Profile Updated"
          );

          window.location.reload();
        }
      } catch {
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
        startContent={
          <FiEdit2 />
        }
        className="bg-[#00B96D] text-white"
      >
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Edit Profile
              </Modal.Heading>

              <p className="text-sm text-default-500">
                Update your account
                information
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">

              <Surface
                variant="default"
                className="dark:bg-zinc-900"
              >

                <form
                  id="profileForm"
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-5"
                >

                  {/* Profile Preview */}

                  <div className="flex justify-center">

                    <Image
                      src={
                        preview ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="Profile"
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-[#00B96D]"
                    />

                  </div>

                  {/* Name */}

                  <TextField
                    variant="secondary"
                     name="name"
                      defaultValue={
                        user?.name
                      }
                  >
                    <Label>
                      Full Name
                    </Label>

                    <Input
                     
                    />
                  </TextField>

                  {/* Email */}

                  <TextField
                  isReadOnly
                    variant="secondary"
                  >
                    <Label>
                      Email
                    </Label>

                    <Input
                      value={
                        user?.email
                      }
                      readOnly
                    />
                  </TextField>

                  {/* Upload Image */}

                  <div>

                    <Label>
                      Profile Image
                    </Label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                      className="mt-2 block w-full text-sm
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-xl
                      file:border-0
                      file:bg-[#00B96D]
                      file:text-white
                      hover:file:opacity-90"
                    />

                  </div>

                </form>

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
                form="profileForm"
                isLoading={
                  loading
                }
                className="bg-[#00B96D] text-white"
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