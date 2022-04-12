import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createCategory,
  getAllCategory,
} from "../../../actions/productAction";
import { NEW_CATEGORY_RESET } from "../../../constants/productConstants";
import Loader from "../../Layout/Loader/Loader";
import MetaData from "../../Layout/MetaData";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./AddCategory.scss";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [categoryItem, setCategoryItem] = useState();

  console.log(categoryItem);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, category } = useSelector(
    (state) => state.getCategory
  );
  const {
    loading: createLoading,
    error: createError,
    success,
  } = useSelector((state) => state.createCategory);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (createError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Category added successfully");
      dispatch({ type: NEW_CATEGORY_RESET });
      setTitle("");
      setSubTitle("");
    }
    dispatch(getAllCategory());
  }, [dispatch, alert, success, error, createError]);

  const addCategoryHandler = (e) => {
    e.preventDefault();
    let data;
    if (subTitle) {
      data = {
        title: title,
        subTitle: [{ letTitle: subTitle }],
      };
    } else {
      data = {
        title: title,
      };
    }
    console.log(data);
    dispatch(createCategory(data));
  };
  let subCategory;
  if (title) {
    subCategory = category && category.find((item) => item.title === title);
  }

  return (
    <div>
      <MetaData title="Add Category" />
      {loading ? (
        <Loader />
      ) : (
        <div className="category">
          <Sidebar />
          <div className="categoryContainer">
            <Navbar />
            <div className="cateContainer">
              <div className="leftCont">
                <form
                  encType="multipart/form-data"
                  onSubmit={addCategoryHandler}
                >
                  <div className="left">
                    <h2>Add Category</h2>
                    <div className="items">
                      <label htmlFor="title">Category Title</label>
                      <div className="item">
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: 300 }}
                          inputValue={title}
                          onInputChange={(event, newInputValue) => {
                            setTitle(newInputValue);
                          }}
                          options={
                            category && category.map((option) => option.title)
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Category" />
                          )}
                        />
                      </div>
                    </div>

                    {subCategory && (
                      <div className="items">
                        <label htmlFor="subTitle">Category Subtitle</label>
                        <div className="item">
                          <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            sx={{ width: 300 }}
                            inputValue={subTitle}
                            onInputChange={(event, newInputValue) => {
                              setSubTitle(newInputValue);
                            }}
                            options={
                              subCategory &&
                              subCategory?.subTitle?.map(
                                (option) => option.letTitle
                              )
                            }
                            renderInput={(params) => (
                              <TextField {...params} label="Sub Category" />
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={createLoading ? true : false}
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </div>
              {createLoading ? (
                <Loader />
              ) : (
                <div className="rightCont">
                  <div className="left">
                    <h2>Category Title</h2>
                    <ul>
                      {category &&
                        category.map((item) => (
                          <li
                            key={item.title}
                            onClick={() => setCategoryItem(item)}
                          >
                            {item.title}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="right">
                    <h2>Category Subtitle</h2>
                    <ul>
                      {categoryItem &&
                        categoryItem.subTitle.map((item) => (
                          <li key={item.letTitle}>{item.letTitle}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
