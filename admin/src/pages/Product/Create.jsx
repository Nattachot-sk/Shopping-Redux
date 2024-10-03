import { React, useEffect, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faUser,
  faLock,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../config";

const Create = ({ setOpenModal }) => {
  const [showModal, setShowModal] = useState(false);

  const [dataProduct, setDataProduct] = useState({
    name: "",
    image: "",
    description: "",
    gender: "",
    size: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleChange = ({ currentTarget: input }) => {
    setDataProduct({ ...dataProduct, [input.name]: input.value });
  };
  const [categoryId, SetCategoryId] = useState();

  const getCategory = async () => {
    setLoading(true);
    try {
      const url = `${baseUrl}/category`;
      const res = await axios.get(url);
      SetCategoryId(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategory();
  }, [categoryId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmitAddproduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", dataProduct.categoryId);
    formData.append("name", dataProduct.name);
    formData.append("image", file);
    formData.append("description", dataProduct.description);
    formData.append("gender", dataProduct.gender);
    formData.append("size", dataProduct.size);
    formData.append("price", dataProduct.price);
    formData.append("quantity", dataProduct.quantity);

    try {
      const url = `${baseUrl}/product`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        icon: "success",
        title: "Sign Up successful!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
      setOpenModal(false);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg ">
            <div className="mt-3 sm:block">
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <div className="singup-page">
                  <div className="flex justify-center mx-auto ">
                    <h1 className="text-2xl font-bold">เพิ่มข้อมูลสินค้า</h1>
                  </div>
                  {showModal && <Create setOpenModal={setShowModal} />}
                  <div className="w-full h-auto p-4">
                    <form
                      className="mx-auto w-full h-full"
                      onSubmit={handleSubmitAddproduct}
                    >
                      <div className="w-full flex flex-col items-center">
                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="nameproduct"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faUser} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <select
                              name="categoryId"
                              value={dataProduct.categoryId}
                              onChange={handleChange}
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="">เลือกหมวดหมู่</option>
                              {Array.isArray(categoryId) &&
                                categoryId.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="nameproduct"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faUser} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="name"
                              type="text"
                              placeholder="name"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.name}
                            />
                          </div>
                        </div>
                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="imageproduct"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="image"
                              type="file"
                              placeholder="imageproduct"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="description"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="description"
                              type="text"
                              placeholder="description"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.description}
                            />
                          </div>
                        </div>

                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="gender"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="gender"
                              type="text"
                              placeholder="gender"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.gender}
                            />
                          </div>
                        </div>

                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="size"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="size"
                              type="text"
                              placeholder="size"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.size}
                            />
                          </div>
                        </div>

                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="colorproduct"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="price"
                              type="number"
                              placeholder="price"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.price}
                            />
                          </div>
                        </div>
                        <div className="relative mt-5 flex items-center">
                          <label
                            htmlFor="priceproduct"
                            className="text-black text-md bg-white px-1 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faLock} className="p-2" />
                          </label>
                          <div className="w-64 lg:w-80">
                            <input
                              name="quantity"
                              type="number"
                              placeholder="quantity"
                              className="block w-full bg-slate-50 rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChange}
                              value={dataProduct.quantity}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 w-full h-10 flex justify-center text-white bg-blue-500 rounded-lg mx-auto shadow-md shadow-blue-500/50 cursor-pointer">
                        <button type="submit" className="cursor-pointer">
                          Create account
                        </button>
                      </div>
                      <div>
                        <button
                          className="w-full mt-2 p-2.5 flex-1  text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                          onClick={() => setOpenModal(false)}
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
