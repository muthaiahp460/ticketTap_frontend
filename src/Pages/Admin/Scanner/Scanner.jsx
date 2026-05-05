import { useState } from "react";
import Scanner from "./Scanner";

const AdminScanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        🎟️ Scan Ticket
      </button>

      {open && <Scanner onClose={() => setOpen(false)} />}
    </>
  );
};

export default AdminScanner;