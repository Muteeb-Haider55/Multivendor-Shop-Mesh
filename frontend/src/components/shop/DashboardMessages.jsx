import axios from "axios";

import { useEffect } from "react";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";

import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  // socket
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  //
  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" w-[90%] bg-white m-3 h-[86vh] overflow-y-scroll rounded ">
      {!open && (
        <>
          <h1 className=" text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
        />
      )}
    </div>
  );
};

const MessageList = ({ data, index, setOpen, setCurrentChat }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  return (
    <div
      className={`cursor-pointer  ml-2  shadow-sm w-full flex py-2 px-3 my-1 ${
        active === index ? `bg-[#0b0b0b13]` : `bg-transparent`
      }  rounded-[3px]`}
      onClick={() => {
        setActive(index) || handleClick(data._id) || setCurrentChat(data);
      }}
    >
      <div className="relative">
        <img
          src="http://localhost:3000/1-1759085823841-27011257.png"
          alt=""
          className=" w-[50px] h-[50px] rounded-full"
        />
        <div className=" w-[12px] h-[12px] bg-green-500 rounded-full absolute top-9 left-9 "></div>
      </div>
      <div className="pl-3">
        <h1 className=" text-[18px]">Mateeb Haider</h1>
        <p className="text-[15px] text-[#000c]">You: Good looking seen... </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
}) => {
  return (
    <div className=" w-full h-[84vh] flex flex-col justify-between ">
      {/* Message Header */}
      <div className="bg-gray-300 w-full flex p-3 items-center justify-between">
        <div className="flex">
          <img
            className=" w-[60px] h-[60px] rounded-full "
            src="http://localhost:3000/1-1759085823841-27011257.png"
            alt=""
          />
          <div className=" pl-3">
            <h1 className=" text-[18px] font-[600]">Muteeb Haider</h1>
            <h1>Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          className="cursor-pointer"
          size={20}
          onClick={() => setOpen(false)}
        />
      </div>
      {/* Messages */}
      <div className="px-3 h-[57vh] py-1 overflow-y-scroll">
        <div className="flex w-full my-2">
          <img
            src="http://localhost:3000/1-1759085823841-27011257.png"
            alt=""
            className=" w-[40px] h-[40px] rounded-full mx-3"
          />
          <div className=" w-max p-2 bg-green-400 rounded h-min ">
            <p className="text-white">Hello There!</p>
          </div>
        </div>

        <div className="flex w-full justify-end my-2">
          <div className=" w-max p-2 bg-green-400 rounded h-min ">
            <p className="text-white"> Hi</p>
          </div>
        </div>
      </div>
      {/* send Message input */}
      <form
        onSubmit={sendMessageHandler}
        aria-required={true}
        className=" p-3 relative w-full flex justify-between items-center"
      >
        <div className="w-[3%]">
          <TfiGallery size={20} className=" cursor-pointer" />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter Your Message"
            className={`${styles.input}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className=" cursor-pointer absolute right-4 top-4"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
