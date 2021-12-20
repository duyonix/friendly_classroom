import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
const [open, setOpen] = React.useState(false);
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";
const [username, setUsername] = useState("");
const handleClickOpen = () => {
  setOpen(true);
  setUsername(""); // test được nè
};
const [emptyNotice, setEmptyNotice] = useState(false);
const handleClose = () => {
  setOpen(false);
};

const renderNotice = () => {
  if (emptyNotice) {
    setTimeout(() => setEmptyNotice(false), 1500);
    return <Alert severity="error">Username không được để trống</Alert>;
  }
  // if (err) {
  //   setTimeout(handleReset, 1500);
  //   return <Alert severity="error">{err?.response.data.message}</Alert>;
  // }
};

const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  if (name === "username") {
    setUsername(value);
  }
  if (value !== "") {
    setEmptyNotice(false);
  }
};
const handleValidationUsername = () => {
  if (username === "") {
    setEmptyNotice(true);
  }
};
const handleSubmit = (event) => {
  event.preventDefault(); // That ra onSubmit moi can preventDefault

  if (username === "") {
    // setEmptyFieldNotice(true);
    setEmptyNotice(true);
    return;
  }

  console.log(username);
  //dispatch(joinClassroom(state));
  // console.log("state", state);
  // handleCloseJoinDialog();
  //setRenderJoin(!renderJoin);
  // setRender(!render);
  if (!emptyNotice) {
    handleClose();
  }
};

const handleReset = () => {
  //dispatch(resetJoinClassroom());
};
function OperationMember() {
  return (
    <section className="operation-member container">
      <div className="classname">TOÁN 6</div>
      <div className="input-group">
        <TextField label="Tìm thành viên" placeholder="Nhập tên thành viên" />
        <button type="button" id="idFind" className="btn btn-primary">
          <SearchIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
      <div className="btn btn-add">Thêm</div>
      <Dialog style={{ padding: 30 }} open={open} onClose={handleClose}>
        <DialogTitle>Thêm thành viên mới</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 10 }}>
            Nhập username của thành viên muốn thêm vào lớp
          </DialogContentText>
          {renderNotice()}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>
            Huỷ
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Đồng ý
          </button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default OperationMember;
