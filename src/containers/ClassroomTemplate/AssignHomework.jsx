import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import Files from "react-files";
import DeleteIcon from "@mui/icons-material/Delete";
import { pathImgFromIndex } from "../../utils/constants";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  createHomework,
  resetCreateHomework,
} from "../../redux/modules/Homework/action";
import Loading from "../../components/Loading";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { useHistory } from "react-router-dom";

function AssignHomework() {
  const classInfo = JSON.parse(localStorage.getItem("classInfo"));
  const { classroomId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const data = useSelector((state) => state.createHomeworkReducer.data);
  const loading = useSelector((state) => state.createHomeworkReducer.loading);
  const err = useSelector((state) => state.createHomeworkReducer.err);

  const [state, setState] = useState({
    title: "",
    description: "",
    deadline: new Date(new Date().setHours(24, 0, 0, 0)),
    file: null,
    topic: "Không có chủ đề",
  });

  useEffect(() => {
    setState({
      title: "",
      description: "",
      deadline: new Date(new Date().setHours(24, 0, 0, 0)),
      file: null,
      topic: "Không có chủ đề",
    });
    // eslint-disable-next-line
  }, [render]);

  const [emptyTitleNotice, setEmptyTitleNotice] = useState(false);
  // const [emptyDeadlineNotice, setEmptyDeadlineNotice] = useState(false);
  const [emptyTopicNotice, setEmptyTopicNotice] = useState(false);
  const [validateFileNotice, setValidateFileNotice] = useState(false);
  const [emptyFieldNotice, setEmptyFieldNotice] = useState(false);

  const rawTopic = useSelector((state) => state.homeworkReducer.data);
  let allTopics = [];

  allTopics = rawTopic?.map((item) => {
    return {
      value: item.topic,
      label: item.topic,
    };
  });

  let idx = allTopics?.findIndex((item) => item.value === "Không có chủ đề");
  if (idx === -1)
    allTopics.unshift({ value: "Không có chủ đề", label: "Không có chủ đề" });
  else
    allTopics.sort(function (x, y) {
      return x.value === "Không có chủ đề"
        ? -1
        : y.value === "Không có chủ đề"
        ? 1
        : 0;
    });

  // console.log("allTopics: ", allTopics);

  const format2Digits = (n) => {
    return n < 10 ? "0" + n : n;
  };

  const convertDate = (date) => {
    date = new Date(date);
    let hours, minutes;
    hours = format2Digits(date.getHours());
    minutes = format2Digits(date.getMinutes());

    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return " " + dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFileChange = (files) => {
    if (files[0] !== undefined) setState({ ...state, file: files[0] });
    console.log(files[0]);
    // if drag directory
    if (files[0] !== undefined && files[0].type === "") {
      setState({ ...state, file: null });
      alert("Vui lòng chỉ nộp 1 tệp. Nếu muốn nộp thư mục, hãy nén lại!");
    }
  };

  const handleFileError = (error) => {
    console.log("error code " + error.code + ": " + error.message);
    setState({ ...state, file: null });
    if (error.code === 2) {
      setValidateFileNotice(true);
    }
  };

  const handleFileDelete = () => {
    setState({ ...state, file: null });
  };

  const handleDeadlineChange = (date) => {
    // console.log("deadline", date);
    if (date === null || date === "Invalid Date") {
      setState({ ...state, deadline: null });
    } else {
      setState({ ...state, deadline: date });
    }
  };

  const handleTopicChange = (field) => {
    // console.log("topic", field);
    if (field === null) {
      setState({ ...state, topic: null });
    } else {
      setState({ ...state, topic: field.value });
    }
  };

  const handleValidationTitle = () => {
    if (state.title === "") {
      setEmptyTitleNotice(true);
    }
  };

  // const handleDeadlineError = () => {
  //   setEmptyDeadlineNotice(true);
  // };

  const handleValidationTopic = () => {
    if (state.topic === null) {
      setEmptyTopicNotice(true);
    }
  };

  const renderNotice = () => {
    if (emptyFieldNotice) {
      setTimeout(() => setEmptyFieldNotice(false), 1000);
      return (
        <Alert severity="error">
          Vui lòng điền đầy đủ tiêu đề, hạn nộp và chủ đề bài tập
        </Alert>
      );
    }
    if (emptyTitleNotice) {
      setTimeout(() => setEmptyTitleNotice(false), 1000);
      return <Alert severity="error">Tiêu đề không được để trống</Alert>;
    }
    // if (emptyDeadlineNotice) {
    //   setTimeout(() => setEmptyDeadlineNotice(false), 1000);
    //   return (
    //     <Alert severity="error">
    //       Hạn nộp không được để trống hoặc sai định dạng
    //     </Alert>
    //   );
    // }
    if (emptyTopicNotice) {
      setTimeout(() => setEmptyTopicNotice(false), 1000);
      return <Alert severity="error">Chủ đề không được để trống</Alert>;
    }
    if (validateFileNotice) {
      setTimeout(() => setValidateFileNotice(false), 1000);
      return (
        <Alert severity="error">
          Kích thước tệp vượt quá 20MB. Vui lòng thử lại hoặc nén file!
        </Alert>
      );
    }
    if (err) {
      setTimeout(handleReset, 1000);
      return <Alert severity="error">{err?.response.data.message}</Alert>;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.title === "" || state.deadline === null || state.topic === null) {
      setEmptyFieldNotice(true);
      return;
    }

    const formData = new FormData();
    formData.append("classroomId", classroomId);
    formData.append("title", state.title);
    formData.append("file", state.file);
    formData.append("topic", state.topic);
    formData.append("deadline", state.deadline);
    formData.append("description", state.description);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    dispatch(createHomework(formData));
    setRender(!render);
  };

  const handleReset = () => {
    dispatch(resetCreateHomework());
  };

  if (loading) {
    return <Loading />;
  }

  if (data) {
    // alert("Tạo bài tập thành công!");
    setTimeout(handleReset, 1000);
    // history.push(`/classroom/${classroomId}/homework`);

    return (
      <Redirect
        to={{
          pathname: `/classroom/${classroomId}/homework`,
          state: { reason: "Tạo bài tập thành công!" },
        }}
      />
    );
  }

  return (
    <section className="assign-homework container">
      <div className="header">
        <Link to={{ pathname: `/classroom/${classroomId}/stream` }}>
          <div className="classroom-name">{classInfo.name}</div>
        </Link>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            className="btn-add"
            onClick={() => history.goBack()}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            className="btn-add"
            onClick={handleSubmit}
          >
            Giao bài tập
          </Button>
        </Stack>
      </div>

      <Box className="box-notice">{renderNotice()}</Box>

      <Box className="content" component="form" noValidate>
        <div className="row">
          <div className="col-md-9 left">
            <Box className="input-box">
              <TitleIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              <TextField
                variant="filled"
                // inputRef={inputName}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Tiêu đề"
                type="text"
                name="title"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleValidationTitle}
              />
            </Box>
            <Box className="input-box">
              <DescriptionIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              <TextField
                variant="filled"
                // inputRef={inputName}
                margin="normal"
                // required
                fullWidth
                id="description"
                label="Mô tả nội dung"
                type="text"
                name="description"
                autoComplete="off"
                multiline
                minRows={5}
                onChange={handleChange}
                // onBlur={handleValidationName}
              />
            </Box>
            <Box
              className="input-box"
              style={{ alignItems: "flex-start", marginTop: "1rem" }}
            >
              <AttachFileIcon
                fontSize="large"
                color="action"
                className="icon-input"
              />
              {state.file === null ? (
                <Files
                  enctype="multipart/form-data"
                  className="files-dropzone"
                  onChange={handleFileChange}
                  onError={handleFileError}
                  multiple={false}
                  maxFiles={1}
                  maxFileSize={20971520}
                  minFileSize={0}
                  clickable
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {
                    <div
                      className="drop-zone"
                      style={{
                        border: "2px dashed #bbb",
                        minHeight: 150,
                        padding: "0 10px",
                      }}
                    >
                      <div className="up-arrow"></div>
                      Kéo thả hoặc ấn vào đây để đăng tải file
                    </div>
                  }
                </Files>
              ) : (
                ""
              )}
              <div className="files">
                {state.file !== null ? (
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                  >
                    <div className="card-body d-flex p-3 file-info">
                      <img
                        src={pathImgFromIndex + "file.png"}
                        alt="file img"
                        height="100"
                        style={{ marginRight: 20, marginLeft: -20 }}
                      />
                      <div className="info-file-block" style={{ width: "80%" }}>
                        <div className="info d-flex justify-content-between">
                          <div
                            style={{
                              width: "80%",
                            }}
                          >
                            <h5
                              className="card-title"
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                marginBottom: 0,
                                lineHeight: 2.3,
                              }}
                            >
                              {state.file?.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Kích thước: {state.file?.sizeReadable}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Loại: {state.file?.extension}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Đăng tải: {convertDate(state.file?.lastModified)}
                            </h6>
                          </div>
                          <button className="btn btn-delete-file">
                            <DeleteIcon
                              fontSize="large"
                              color="error"
                              onClick={handleFileDelete}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Box>
          </div>

          <div className="col-md-3 right">
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Điểm</Typography>
              <TextField
                variant="outlined"
                id="grade"
                name="grade"
                type="number"
                label="-"
                fullWidth
                defaultValue="10"
                InputProps={{
                  readOnly: true,
                }}
                disabled
              />
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Hạn nộp</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  label="-"
                  fullWidth
                  renderInput={(props) => <TextField {...props} />}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  mask="_/__/____ __:__ _M"
                  minDateTime={new Date()}
                  value={state.deadline}
                  onChange={handleDeadlineChange}
                  // onError={handleDeadlineError}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography className="input-label">Chủ đề</Typography>
              <CreatableSelect
                isClearable
                formatCreateLabel={(inputValue) =>
                  "Tạo chủ đề mới: " + inputValue
                }
                defaultValue={allTopics[0]}
                placeholder="Chọn chủ đề"
                onChange={handleTopicChange}
                onBlur={handleValidationTopic}
                options={allTopics}
                size="large"
              />
            </Box>
          </div>
        </div>
      </Box>

      <Box className="box-notice-mobile">{renderNotice()}</Box>
      <Stack direction="row" spacing={2} className="box-mobile-add">
        <Button
          variant="contained"
          color="error"
          className="btn-mobile-add"
          onClick={() => history.goBack()}
        >
          Hủy bỏ
        </Button>
        <Button
          variant="contained"
          className="btn-mobile-add"
          onClick={handleSubmit}
        >
          Giao bài tập
        </Button>
      </Stack>
    </section>
  );
}

export default AssignHomework;
