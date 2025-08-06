import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingsGetOne } from "../types";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: NewMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initailValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
