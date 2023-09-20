import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  diagnosisCodes: string[];
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => Promise<void>;
  error?: string;
}

const AddEntryModal = ({
  diagnosisCodes,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  console.log("error", error),
  (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm
          diagnosisCodes={diagnosisCodes}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
);

export default AddEntryModal;
