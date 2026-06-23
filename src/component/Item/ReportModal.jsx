"use client";

import { useState } from "react";
import { Modal, Button, Label, Select } from "@heroui/react";

import { FiFlag } from "react-icons/fi";
import toast from "react-hot-toast";
import { addReport } from "@/lib/actions/recipe";


export default function ReportModal({ recipe, user }) {
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Select a reason");
      return;
    }

    const reportData = {
      recipeId: recipe._id,
      recipeName: recipe.name,
      reporterId: user.id,
      reporterEmail: user.email,
      reason,
    };

    // console.log(reportData, "jskdfgsjkdfg");

    const result =
      await addReport(
        reportData
      );

    if (result.success) {
      toast.success(
        "Report Submitted"
      );
    }
  };

  return (
    <Modal>
      <Button
        fullWidth
        color="warning"
        variant="flat"
        startContent={<FiFlag />}
      >
        Report Recipe
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-warning/20 text-warning">
                <FiFlag />
              </Modal.Icon>

              <Modal.Heading>Report Recipe</Modal.Heading>

              <p className="text-sm text-default-500 mt-2">
                Tell us why this recipe should be reviewed.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>Report Reason</Label>

                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border rounded-xl p-3 mt-2"
                  >
                    <option value="">Select Reason</option>

                    <option value="Spam">Spam</option>

                    <option value="Offensive Content">Offensive Content</option>

                    <option value="Copyright Issue">Copyright Issue</option>
                  </select>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button slot="close" color="warning" onPress={handleSubmit}>
                Submit Report
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
