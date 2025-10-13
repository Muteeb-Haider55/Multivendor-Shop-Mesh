import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createEvent, getAllEventsShop } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };
  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };
  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_date", startDate.toISOString());
    newForm.append("finish_date", endDate.toISOString());

    dispatch(createEvent(newForm));
    if (success) {
      toast.success("Event Created SuccessFully");
      navigate("/dashboard-events");
      dispatch(getAllEventsShop());
      window.location.reload();
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow rounded-[4px] overflow-y-scroll h-[85vh] p-3 top-4">
      <h5 className="text-[30px] font-[Poppins] text-center">Create Event</h5>
      {/* Create Event form */}
      <form className="font-[Poppins]" action="" onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500"> *</span>
          </label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500"> *</span>
          </label>
          <textarea
            rows={8}
            cols={30}
            className={`appearance-none mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product Description"
            type="text"
            name="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500"> *</span>
          </label>
          <select
            name=""
            id=""
            className={`  border-gray-200 border-[2px]  w-full  h-[35px] rounded-[5px] cursor-pointer`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product Tags"
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product Price"
            type="number"
            name="price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500"> *</span>
          </label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product price with discount"
            type="number"
            name="price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500"> *</span>
          </label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Product Stock"
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500"> *</span>
          </label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Start Date"
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500"> *</span>
          </label>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm `}
            placeholder="Enter Event Start Date"
            type="date"
            name="price"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500"> *</span>
          </label>
          <input
            type="file"
            id="uplaod"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className=" w-full flex items-center flex-wrap">
            <label htmlFor="uplaod">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <input
            className={`${styles.input} mt-2  block w-full px-3 rounded-md border-[2px] placeholder-grey-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer `}
            type="submit"
            value="Create"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
