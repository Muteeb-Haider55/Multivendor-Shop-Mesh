import styles from "../../../styles/styles";

const Sponserd = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start w-[30%] m-auto ml-2">
          <img
            style={{ width: "100", objectFit: "contain" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomjOWk78E7BcnF36YPhlXk1Vflpp5-nNstA&s"
            alt=""
          />
        </div>
        <div className="flex items-start w-[30%] m-auto">
          <img
            style={{ width: "80", objectFit: "contain" }}
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Xiaomi_Redmi_Logo.svg"
            alt=""
          />
        </div>
        <div className="flex items-start ml-7 w-[30%] m-auto">
          <img
            style={{ width: "100", objectFit: "contain" }}
            src="https://static.vecteezy.com/system/resources/previews/020/927/282/non_2x/lenovo-logo-brand-phone-symbol-name-black-design-china-mobile-illustration-free-vector.jpg"
            alt=""
          />
        </div>
        <div className="flex items-start w-[30%] m-auto ">
          <img
            style={{ width: "100", objectFit: "contain" }}
            src="https://static.vecteezy.com/system/resources/thumbnails/019/766/419/small_2x/acer-logo-acer-icon-transparent-free-png.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponserd;
