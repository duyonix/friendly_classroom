import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
function OperationMember() {
  return (
    <section className="operation-member">
      <div className="classname">TOÁN 6</div>
      <div class="input-group">
        <TextField label="Tìm kiếm thành viên" />
        <button type="button" id="idFind" class="btn btn-primary">
          <SearchIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
      <div className="btn btn-add">TH</div>
    </section>
  );
}

export default OperationMember;
