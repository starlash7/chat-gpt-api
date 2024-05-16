import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatlistCard from "../components/ChatlistCard";
import { CgOpenCollective } from "react-icons/cg";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      setLoading(true);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      const newChat = {
        question: content,
        answer: response.data.choices[0].message.content,
      };

      let savedChatlist = localStorage.getItem("savedChatlist");

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      }

      savedChatlist.push(newChat);

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist));

      setChatlist([newChat, ...chatlist]);

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <form className="flex items-center" onSubmit={onSubmitChat}>
        <input
          className="flex-1 py-2 px-4 text-lg rounded-full border-2 border-green-200 focus:outline-none focus:border-green-400"
          type="text"
          value={content}
          disabled={isLoading}
          onChange={(e) => setContent(e.target.value)}
          placeholder="검색어를 입력해 주세요."
        />
        <button
          className="flex-shrink-0 py-2 px-4 ml-2 bg-green-500 text-white rounded-3xl shadow-md hover:bg-green-600"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgOpenCollective className="animate-spin mr-2" />
          ) : (
            <FiSearch className="mr-2" />
          )}
          검색
        </button>
      </form>
      <ul className="mt-8 space-y-4">
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
