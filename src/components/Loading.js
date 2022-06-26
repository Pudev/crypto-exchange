import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Loading = ({ show }) => {
  return (
    <Backdrop
      sx={{
        color: "#0c3b69",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
