import "./Modal.css";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Modal(props: ModalProps) {
  return (
    <>
      <div style={!props.open ? { display: "none" } : {}} className="modal">
        {props.children}
      </div>
      <div
        style={!props.open ? { display: "none" } : {}}
        className="overlay"
        onClick={() => props.onClose?.()}
      />
    </>
  );
}
