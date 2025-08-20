import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EmailCard.module.css";

const EmailCard = (props) => {
  const { image, from, time, subject, body, hasAttachments, isSelected, onClick } = props;
  return (
    <div className={`
      ${isSelected ? "bg-gradient-to-br from-gray-400 to-gray-500 cursor-pointer rounded-3xl drop-shadow-2xl" : ""}
      flex flex-row py-10 px-6 hover:bg-gradient-to-br from-gray-400 to-gray-500 cursor-pointer rounded-3xl drop-shadow-2xl`}>
      <div className={`w-12 h-10 mt-3 rounded-xl ${image}`} />
      <div className="flex flex-col w-full ml-3">
        <div className="flex items-center mt-2">
          <span className="text-xs text-gray-400 font-medium mr-auto">{from}</span>
          {
            hasAttachments ? <FontAwesomeIcon icon={faPaperclip} className="text-gray-400 mr-2" /> : null
          }
          <span className="text-gray-400 bg-gray-600 text-xs font-medium px-3 py-1 rounded-xl">{time}</span>
        </div>
        <span className="text-sm text-gray-200 font-medium mt-2">{subject}</span>
        <span className={`${styles.body}text-xs font-normal text-gray-400 mt-4 w-full`}>{body}</span>
      </div>
    </div>
  )
}

export default EmailCard;
