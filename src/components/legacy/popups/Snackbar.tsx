import React from "react";

type Props = {
  message: string;
  denied?: boolean;
};

function SnackbarDenied({ message, denied }: Props) {
  // TODO add snackbar for denied/succsess
  return <div>SnackbarDenied</div>;
}

export default SnackbarDenied;
