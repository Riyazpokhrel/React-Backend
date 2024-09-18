import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const CreateProduct = () => {
  let [name, setName] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [price, setPrice] = useState(0);
  let [feature, setFeature] = useState(false);
  let [productImage, setProductImage] = useState("");
  let [manufactureDate, setManufactureDate] = useState("");
  let [company, setCompany] = useState("");

  let companies = [
    { label: "Choose a company" },
    { label: "Apple", value: "apple" },
    { label: "Dell", value: "dell" },
    { label: "Microsoft", value: "microsoft" },
    { label: "Samsung", value: "samsung" },
  ];

  // function MyDropzone() {
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    try {
      let result = await axios({
        url: `http://localhost:8000/file/single`,
        method: `post`,
        data: data,
      });
      console.log(result);
      setProductImage(result.data.result);
    } catch (error) {}
  }, []);
  // }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      quantity,
      price,
      feature,
      manufactureDate,
      productImage,
      company,
    };
    try {
      let result = await axios({
        url: `http://localhost:8000/product`,
        method: "post",
        data,
      });
      console.log(result);
      setName("");
      setQuantity(0);
      setPrice(0);
      setFeature("");
      setManufactureDate("");
      setProductImage("");
      setCompany("");
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="feature">Feature:</label>
          <input
            type="checkbox"
            name="feature"
            id="feature"
            checked={feature === true}
            onChange={(e) => {
              setFeature(e.target.checked);
            }}
          />
        </div>
        <br />
        <div {...getRootProps()}>
          <label htmlFor="">Product Image:</label>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
          {productImage ? (
            <img
              src={productImage}
              alt="Product Image"
              style={{ height: "100px", width: "auto" }}
            ></img>
          ) : null}
        </div>
        <br />

        <div>
          <label htmlFor="date">Manufacture Date:</label>
          <input
            type="date"
            name="date"
            id="image"
            value={manufactureDate}
            onChange={(e) => {
              setManufactureDate(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="company">Company:</label>
          {/* <input type="text" name="company" id="company" /> */}
          <select
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          >
            {companies.map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <button>Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
