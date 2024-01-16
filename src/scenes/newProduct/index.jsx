import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
const category = [
  {
    title: "Iphone",
    value: "iphone",
  },
  {
    title: "Ipad",
    value: "ipad",
  },
  {
    title: "Macbook",
    value: "macbook",
  },
  {
    title: "AirPods",
    value: "airpods",
  },
];
const NewProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [files, setFiles] = useState("");
  const [selectCategory, setSelectCategory] = useState();
  const token = localStorage.getItem("token");
  const handleCategoryChange = (event) => {
    setSelectCategory(event.target.value);
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("cloud_name", "dteef5ei8");
          data.append("upload_preset", "booking-application");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dteef5ei8/image/upload",
            data
          );
          const { url } = res.data;
          return url;
        })
      );
      const newProduct = {
        ...values,
        img1: list[0],
        img2: list[1],
        img3: list[2],
        img4: list[3],
        category: selectCategory,
      };
      await axios.post(`${BASE_URL}/product/newproduct`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/product");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD PRODUCT" subtitle="Create a New Product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Count"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.count}
                name="count"
                error={!!touched.count && !!errors.count}
                helperText={touched.count && errors.count}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Short Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.short_desc}
                name="short_desc"
                error={!!touched.short_desc && !!errors.short_desc}
                helperText={touched.short_desc && errors.short_desc}
                sx={{ gridColumn: "span 4" }}
                rows={4}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Long Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.long_desc}
                name="long_desc"
                error={!!touched.long_desc && !!errors.long_desc}
                helperText={touched.long_desc && errors.long_desc}
                sx={{ gridColumn: "span 4" }}
                multiline
                rows={8}
              />

              <input
                type="file"
                id="file"
                onChange={(e) => setFiles(e.target.files)}
                multiple
              ></input>
              <FormControl fullWidth sx={{ gridColumn: "span 1" }}>
                <InputLabel>Category</InputLabel>
                <Select onChange={handleCategoryChange}>
                  {category.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  price: yup.string().required("required"),
  short_desc: yup.string().required("required"),
  long_desc: yup.string().required("required"),
  count: yup.number().required("required"),
});
const initialValues = {
  name: "",
  price: "",
  short_desc: "",
  long_desc: "",
  count: "",
};

export default NewProduct;
