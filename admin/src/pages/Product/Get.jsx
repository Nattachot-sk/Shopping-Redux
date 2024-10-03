import React, { useEffect, useState } from "react";
import Create from "./Create";
import { baseUrl } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const Get = () => {
  const [counter, setCounter] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);

  const { id } = useParams();

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [search, setSearch] = useState("");
  const [nodataSearch, setNodataSearch] = useState("ไม่มีข้อมูล");

  const fetchDataprodcut = async () => {
    try {
      const url = `${baseUrl}/product`;
      const res = await axios.get(url);

      setDataProduct(res.data);
    } catch (error) {
      console.log({ Error: error });
    }
  };
  useEffect(() => {
    fetchDataprodcut();
  }, []);

  const matchGender = (product) => {
    return (
      !selectedGender ||
      product.gender.toLowerCase() === selectedGender.toLowerCase()
    );
  };
  const matchSize = (product) => {
    return (
      !selectedSize || product.size.toLowerCase() === selectedSize.toLowerCase()
    );
  };
  const matchSearch = (product) => {
    const searchLower = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.gender.toLowerCase().includes(searchLower) ||
      product.size.toLowerCase().includes(searchLower) ||
      product.price.toLowerCase().includes(searchLower) ||
      product.quantity.toLowerCase().includes(searchLower)
    );
  };

  const fileredProduct = dataProduct.filter((product) => {
    return matchGender(product) && matchSize(product) && matchSearch(product);
  });

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleChangeGender = handleFilterChange(setSelectedGender);
  const handleChangeSize = handleFilterChange(setSelectedSize);
  const handleChangeSearch = handleFilterChange(setSearch);

  const handleChangeLimit = (event) => {
    setLimit(Number(event.target.value));
  };
  const startIndex = (page - 1) * limit;
  const displayProduct = fileredProduct.slice(startIndex, startIndex + limit);

  const handleDelete = async (id) => {
    try {
      const url = `${baseUrl}/product/`;
      Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลนี้?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then(async (res) => {
        if (res.isConfirmed) {
          const res = await axios.delete(url + id);
          if (res.data.Status === "Delete success") {
            Swal.fire({
              icon: "success",
              title: res.data.Status,
              timer: 2500,
            });
            setTimeout(function () {
              location.reload(1);
            }, 1000);
          } else if (res.data.Error === "Delete fail") {
            Swal.fire({
              icon: "error",
              title: "ลบไม่สำเร็จ",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center ">
      <div className="flex flex-col w-[850px] h-[550px]">
        <div className="flex justify-between ">
          <button
            className="px-4 py-2 text-white bg-indigo-600 rounded-md"
            type="button"
            onClick={() => setShowModal(true)}
          >
            เพิ่มข้อมูล
          </button>

          <div className="flex justify-center">
            <div>
              <label htmlFor="">Gender</label>
              <select name="gender" onChange={handleChangeGender}>
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div>
              <label htmlFor="">Size</label>
              <select name="size" onChange={handleChangeSize}>
                <option value="">All</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="xl">XL</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Search</label>
              <input
                type="search"
                placeholder="search"
                onChange={handleChangeSearch}
              />
            </div>
            <div>
              <label htmlFor=""></label>
              <select name="limit" onChange={handleChangeLimit}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
        {showModal && <Create setOpenModal={setShowModal} />}
        <table className="table">
          <thead>
            <tr className="bg-slate-200 ">
              <th>category</th>
              <th>name</th>
              <th>image</th>
              <th>description</th>
              <th>gender</th>
              <th>size</th>
              <th>price</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayProduct.length > 0 ? (
              displayProduct.map((data, index) => (
                <tr key={index}>
                  <td>
                    <p>{startIndex + index + 1}</p>
                  </td>
                  <td>
                    <p>{data.categoryId}</p>
                  </td>
                  <td>
                    <p>{data.name}</p>
                  </td>
                  <td>
                    <img src={data.image} alt={data.name} className="size-20" />
                  </td>
                  <td>
                    <p>{data.description}</p>
                  </td>
                  <td>
                    <p>{data.gender}</p>
                  </td>
                  <td>
                    <p>{data.size}</p>
                  </td>
                  <td>
                    <p>{data.price}</p>
                  </td>
                  <td>
                    <p>{data.quantity}</p>
                  </td>
                  <td>
                    <p></p>
                    <button
                      className="bg-red-300 rounded-xl px-5 py-3"
                      onClick={() => handleDelete(data.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center">
                  {nodataSearch}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 rounded-md ${
              page > 1 ? "bg-red-400 " : "bg-slate-400"
            }`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              page < 1 ? "bg-gray-400" : "bg-blue-500"
            }`}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={startIndex + limit >= fileredProduct.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Get;
