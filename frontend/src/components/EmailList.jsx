import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EmailCard from "./EmailCard";

const EmailList = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      image: "bg-blue-100",
      from: "Github",
      subject: "New pull request opened",
      body: "Someone just opened a PR on your repo. Review when you can.",
      hasAttachments: false,
      time: "9:15AM",
      isSelected: false,
    },
    {
      id: 2,
      image: "bg-red-100",
      from: "Dribbble Team",
      subject: "How are you getting on?",
      body: "This is a test email, don't take it serious!",
      hasAttachments: true,
      time: "3:30PM",
      isSelected: true,
    },
    {
      id: 3,
      image: "bg-green-100",
      from: "Slack",
      subject: "You’ve got 3 new messages",
      body: "Your teammates have sent you updates in #general.",
      hasAttachments: false,
      time: "11:42AM",
      isSelected: false,
    },
    {
      id: 4,
      image: "bg-yellow-100",
      from: "Figma",
      subject: "File shared with you",
      body: "A new design file has been shared. Check it out now.",
      hasAttachments: true,
      time: "1:05PM",
      isSelected: false,
    },
    {
      id: 5,
      image: "bg-purple-100",
      from: "Product Hunt",
      subject: "Trending today 🚀",
      body: "Check out the top new products launched this morning.",
      hasAttachments: false,
      time: "8:00AM",
      isSelected: false,
    }
  ])

  return (
    <div className="flex flex-col bg-gray-700 w-6/12 mr-1 px-0 h-screen overflow-hidden">
      <div className="flex items-center py-6 px-10">
        <spna className="font-light text-xl text-gray-200">Inbox</spna>
        <div className="ml-2 w-5 h-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-2xs font-normal text-gray-400">
          3
        </div>
        <FontAwesomeIcon icon={faPlus}
          className="px-3 py-3 rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 text-gray-400 drop-shadow-3xl ml-auto" />
      </div>
      <div className="px-10 pb-5">
        <span className="text-xs text-gray-200">Recent</span>
        <FontAwesomeIcon icon={faCaretDown} className="text-gray-200 text-xs ml-2" />
      </div>
      <div className={`container flex flex-col px-10 pb-10 overflow-y-scroll`}>
        {
          emails.map((email, index) => (
            <EmailCard key={email.id} {...email} />
          ))
        }
      </div>
    </div>
  )
}

export default EmailList;
