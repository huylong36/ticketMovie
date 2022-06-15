import { Button } from "@mui/material";

export const FCButton = (props) => {
  const {
    variant,
    color,
    text,
    type,
    className,
    startIcon,
    endIcon,
    handleAction,
    size,
    style,
  } = props;
  return (
    <Button
      variant={variant || "contained"}
      color={color || "primary"}
      type={type}
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleAction}
      size={size || "medium"}
      style={{ ...style, textTransform: "none" }}
    >
      {text}
    </Button>
  );
};
