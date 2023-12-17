import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { blue } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ImageUploader from "./ImageUploader";
import RequstServer from "../hook/request.js";
import { enqueueSnackbar } from "notistack";
const ProductManager = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    colors: [{ persianName: "", nameColor: "", hexCode: "" }],
    features: [
      {
        title: "",
        value: "",
      },
    ],
    images: new FormData(),
  });
  const [images, setImages] = useState([]);
  const [valid, setValid] = useState({ colorCode: [true] });
  const { PostData } = RequstServer();

  const validator = (name, value, index) => {
    const colorHexRegex = /^$|^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

    if (name === "colorcode") {
      const isValid = colorHexRegex.test(value);
      let newValid = valid.colorCode;
      newValid[index] = isValid;
      setValid({ ...valid, colorCode: newValid });
    }
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "featureKey") {
      const newFeature = product.features;
      newFeature[index].title = value;
      setProduct((prevProduct) => ({
        ...prevProduct,
        features: newFeature,
      }));
    } else if (name === "featureValue") {
      const newFeature = product.features;
      newFeature[index].value = value;
      setProduct((prevProduct) => ({
        ...prevProduct,
        features: newFeature,
      }));
    } else if (name === "color") {
      const newColor = product.colors;
      newColor[index].nameColor = value;
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: newColor,
      }));
    } else if (name === "colorname") {
      const newColor = product.colors;
      newColor[index].persianName = value;
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: newColor,
      }));
    } else if (name === "colorcode") {
      validator(name, value, index);
      const newColor = product.colors;
      newColor[index].hexCode = value;
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: newColor,
      }));
    } else setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleAddFeature = (index) => {
    const newFeatures = product.features;
    newFeatures.splice(index + 1, 0, { title: "", value: "" });
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: newFeatures,
    }));
  };
  const handleRemoveFeature = (index) => {
    const newFeatures = product.features;
    newFeatures.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      features: newFeatures,
    }));
  };
  const handleAddColor = (index) => {
    const newColor = product.colors;
    newColor.splice(index + 1, 0, {
      persianName: "",
      nameColor: "",
      hexCode: "",
    });
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: newColor,
    }));
  };
  const handleRemoveColor = (index) => {
    const newColor = product.colors;
    newColor.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: newColor,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newProduct = { ...product };

    newProduct.features = newProduct.features.filter(
      (feature) => feature.title.trim() !== "" && feature.value.trim() !== ""
    );
    newProduct.colors = newProduct.colors.filter(
      (color) => color.hexCode.trim() !== "" && color.persianName.trim() !== ""
    );

    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image);
    }
    formData.set("product", JSON.stringify(newProduct));

    await PostData("/api/product?type=product", formData, null, {
      "Content-Type": "multipart/form-data",
    })
      .then((result) => {
        enqueueSnackbar("محصول با موفقیت ثبت شد!", { variant: "success" });
        setProduct({
          title: "",
          description: "",
          price: "",
          colors: [{ persianName: "", nameColor: "", hexCode: "" }],
          features: [
            {
              title: "",
              value: "",
            },
          ],
        });
        setImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
    // Reset thae form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="نام محصول"
          variant="outlined"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="توضیحات محصول"
          variant="outlined"
          name="description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="قیمت محصول"
          variant="outlined"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </FormControl>

      <Divider component={"div"} sx={{ my: 1, fontWeight: 500, fontSize: 18 }}>
        رنگ
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
        {product.colors.map((color, index) => {
          return (
            <Box
              key={index}
              sx={{ display: "flex", mb: 1, alignItems: "center" }}
            >
              <TextField
                label="نام رنگ"
                variant="outlined"
                name="color"
                value={color.nameColor}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                sx={{ ml: 1 }}
              />
              <TextField
                label="نام نمایشی رنگ"
                variant="outlined"
                name="colorname"
                value={color.persianName}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                sx={{ ml: 1 }}
              />
              <TextField
                label="کد رنگ"
                variant="outlined"
                sx={{ direction: "ltr" }}
                name="colorcode"
                error={!valid.colorCode[index]}
                value={color.hexCode}
                onChange={(e) => {
                  handleChange(e, index);
                }}
              />
              <IconButton
                onClick={() => {
                  handleRemoveColor(index);
                }}
              >
                {index !== 0 ? (
                  <RemoveCircleOutlineIcon sx={{ color: blue[500] }} />
                ) : (
                  <Box sx={{ mr: 3 }}></Box>
                )}
              </IconButton>

              <IconButton
                onClick={() => {
                  handleAddColor(index);
                }}
              >
                <AddCircleOutlineIcon sx={{ color: blue[500] }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>

      <Divider component={"div"} sx={{ my: 1, fontWeight: 500, fontSize: 18 }}>
        ویژگی
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
        {product.features.map((feature, index) => (
          <Box
            sx={{ display: "flex", mb: 1, alignItems: "center" }}
            key={index}
          >
            <Typography sx={{ mx: 0.5, width: "10%" }}>
              {index + 1}
              {"-"}
            </Typography>
            <TextField
              label="اسم ویژگی"
              variant="outlined"
              name="featureKey"
              value={product.features[index].title}
              onChange={(e) => {
                handleChange(e, index);
              }}
              sx={{ ml: 1, width: "100%" }}
            />
            <TextField
              label="مقدار ویژگی"
              variant="outlined"
              name="featureValue"
              value={product.features[index].value}
              onChange={(e) => {
                handleChange(e, index);
              }}
              sx={{ ml: 1, width: "100%" }}
            />

            <IconButton
              onClick={() => {
                handleRemoveFeature(index);
              }}
            >
              {index !== 0 ? (
                <RemoveCircleOutlineIcon sx={{ color: blue[500] }} />
              ) : (
                <Box sx={{ mr: 3 }}></Box>
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                handleAddFeature(index);
              }}
            >
              <AddCircleOutlineIcon sx={{ color: blue[500] }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Divider component={"div"} sx={{ my: 1, fontWeight: 500, fontSize: 18 }}>
        تصاویر
      </Divider>
      <Box>
        <ImageUploader
          sx={{ mb: 1 }}
          acceptFiles={{
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
          }}
          files={images}
          setFiles={setImages}
        />
      </Box>

      <Button type="submit" variant="contained" color="primary">
        ثبت محصول
      </Button>
    </form>
  );
};

export default ProductManager;
