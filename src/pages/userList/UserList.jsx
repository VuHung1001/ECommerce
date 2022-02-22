import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiCalls";


export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.allUsers);

  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   deleteProduct(id, dispatch);
  // };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" 
              src={
                params.row?.img 
                || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              } 
              alt= {params.row?.username}
              referrerPolicy="no-referrer"
            />
            {params.row?.loginByGoogle 
              ? params.row?.username
              : 'Logged with Google'
            }
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row?._id}>
              <button className="userListEdit">View</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row?._id}
        rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
        checkboxSelection
      />
    </div>
  );
}
