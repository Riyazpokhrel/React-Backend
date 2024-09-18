// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// import { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   let [name, setName] = useState("");
//   let [quantity, setQuantity] = useState(0);
//   let [price, setPrice] = useState(0);
//   let [feature, setFeature] = useState(false);
//   let [productImage, setProductImage] = useState("");
//   let [manufactureDate, setManufactureDate] = useState("");
//   let [company, setCompany] = useState("");
//   let [oldImage, setOldImage] = useState("");

//   let navigate = useNavigate("");

//   let params = useParams();
//   let companies = [
//     { label: "Choose a company" },
//     { label: "Apple", value: "apple" },
//     { label: "Dell", value: "dell" },
//     { label: "Microsoft", value: "microsoft" },
//     { label: "Samsung", value: "samsung" },
//   ];

//   //   function getYearMonthDay(dateString) {
//   //     const date = new Date(dateString);
//   //     const year = date.getUTCFullYear();
//   //     const month = date.getUTCMonth() + 1; // Months are zero-indexed, so add 1
//   //     const day = date.getUTCDate();

//   //     return `${year}/${month}/${day}`;
//   //   }
//   function getYearMonthDay(dateString) {
//     const date = new Date(dateString);
//     const year = date.getUTCFullYear();
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Ensure two digits
//     const day = String(date.getUTCDate()).padStart(2, "0"); // Ensure two digits

//     return `${year}-${month}-${day}`; // Format to yyyy-MM-dd
//   }

//   const getData = async () => {
//     try {
//       //   console.log(params.id);
//       let result = await axios({
//         url: `http://localhost:8000/product/${params.id}`,
//         method: `GET`,
//       });
//       console.log(result.data.data);
//       setCompany(result.data.data.company);
//       setName(result.data.data.name);
//       setQuantity(result.data.data.quantity);
//       setPrice(result.data.data.price);
//       setFeature(result.data.data.feature);
//       setManufactureDate(getYearMonthDay(result.data.data.manufactureDate));
//       setOldImage(result.data.data.productImage);
//       console.log(result.data.data.company);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   // function MyDropzone() {
//   const onDrop = useCallback(async (acceptedFiles) => {
//     // Do something with the files
//     let fileData = acceptedFiles[0];
//     let data = new FormData();
//     data.append("document", fileData);
//     try {
//       let result = await axios({
//         url: `http://localhost:8000/file/single`,
//         method: `post`,
//         data: data,
//       });
//       console.log(result.data.link);

//       setProductImage(result.data.link);
//     } catch (error) {}
//   }, []);
//   // }
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let data = {
//       name,
//       quantity,
//       price,
//       feature,
//       manufactureDate,
//       productImage,
//       company,
//     };
//     try {
//       let result = await axios({
//         url: `http://localhost:8000/product/${params.id}`,
//         method: "patch",
//         data,
//       });
//       console.log(result);
//       setName("");
//       setQuantity(0);
//       setPrice(0);
//       setFeature(false);
//       setManufactureDate("");
//       setCompany("");
//       setProductImage("");
//       toast.success(result.data.message);
//       navigate(`/products/${params.id}`);
//     } catch (error) {}
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="quantity">Quantity:</label>
//           <input
//             type="number"
//             name="quantity"
//             id="quantity"
//             value={quantity}
//             onChange={(e) => {
//               setQuantity(e.target.value);
//             }}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             name="price"
//             id="price"
//             value={price}
//             onChange={(e) => {
//               setPrice(e.target.value);
//             }}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="feature">Feature:</label>
//           <input
//             type="checkbox"
//             name="feature"
//             id="feature"
//             checked={feature === true}
//             onChange={(e) => {
//               setFeature(e.target.checked);
//             }}
//           />
//         </div>
//         <br />
//         <label htmlFor="">Old Image:</label>
//         <img
//           src={oldImage}
//           alt="Product Image"
//           style={{ height: "100px", width: "auto" }}
//         ></img>
//         <br />
//         <div {...getRootProps()}>
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the files here ...</p>
//           ) : (
//             <p>Drag n drop some files here, or click to select files</p>
//           )}
//           {productImage ? (
//             <img
//               src={productImage}
//               alt="Product Image"
//               style={{ height: "100px", width: "auto" }}
//             ></img>
//           ) : null}
//           {/* <label htmlFor="image">Image:</label> */}
//           {/* <input type="file" name="image" id="image" /> */}
//         </div>
//         <br />

//         <div>
//           <label htmlFor="date">Manufacture Date:</label>
//           <input
//             type="date"
//             name="date"
//             id="image"
//             value={manufactureDate}
//             onChange={(e) => {
//               setManufactureDate(e.target.value);
//             }}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="company">Company:</label>
//           {/* <input type="text" name="company" id="company" /> */}
//           <select
//             value={company}
//             onChange={(e) => {
//               setCompany(e.target.value);
//             }}
//           >
//             {companies.map((item, i) => {
//               return (
//                 <option key={i} value={item.value}>
//                   {item.label}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         <br />
//         <button>Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
