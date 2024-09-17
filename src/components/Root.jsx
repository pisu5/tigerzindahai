import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HighlightedText from "./HighlightedText";
import Header from "./Header";
import WhatsAppChatIcon from "./Whatsapp";
import Trial from "./Trial";

function Root() {
  return (
    <div>
      <Trial />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Root;
