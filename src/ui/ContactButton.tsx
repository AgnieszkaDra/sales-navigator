import type { JSX } from "react";

type ContactButtonProps = {
  onClick?: () => void;
  label?: string;
};

const ContactButton = ({
  onClick,
  label = "Napisz do nas",
}: ContactButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="contact-button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ContactButton;