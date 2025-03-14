import { useState } from "react";

import ModalDialog from "./ModalDialog";

export default function App() {
  const [title, setTitle] = useState("Modal Dialog");
  const [open, setOpen]= useState(true);

  return (
    <div style={{ border: "1px solid black" }}>
      <button onClick={()=>setOpen(true)}>
        Open Model
      </button>
      <ModalDialog title={title} open={open} onClose={()=>setOpen(false)}>
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
}
