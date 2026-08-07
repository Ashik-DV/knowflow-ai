import { useOutletContext } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";

const Dashboard = () => {
  const { registerNewChat } = useOutletContext();

  return <ChatBox onRegisterNewChat={registerNewChat} />;
};

export default Dashboard;
