import React, {useEffect} from "react";
import ListHomework from "../../components/ListHomework";
import OperationHomework from "../../components/OperationHomework";
import { useDispatch, useSelector } from "react-redux";
import {} from ""
export default function Homework() {
  const data = useSelector((state) => state.homeworkReducer.data);
  const loading = useSelector((state) => state.homeworkReducer.loading);
  const err = useSelector((state) => state.homeworkReducer.err);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchHomeworkList());

  })
  return (
    <div className="homework">
      <OperationHomework />
      <ListHomework />
    </div>
  );
}
