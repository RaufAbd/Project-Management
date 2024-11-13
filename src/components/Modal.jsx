import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const modal = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      modal.current.showModal();
    },
  }));

  return (
    <dialog
      ref={modal}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>
  );
});

export default Modal;
