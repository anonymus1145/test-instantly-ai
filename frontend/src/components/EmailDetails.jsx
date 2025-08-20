import { faEllipsisH, faReply, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Create } from '@mui/icons-material';
import EmailModal from "./EmailModal";

const EmailDetails = () => {
  const body = `Dear Staff: 

As you all know, Christmas falls on a Wednesday this year. Like every year, we need some staff in the office at all times to answer
the phones and take care of any emergency customer needs.

Since business tapers off quite dramatically for the last two weeks of the year, most of the staff will be able to enjoy the full holidays, 
especially since Christmas and New Year’s fall directly in the middle of the week. Last year, some people wanted extra time off before 
Christmas, and others wanted to be sure they had extra time off at New Year’s.

Since we need a skeleton staff at all times — and we’d like to accommodate everyone’s wishes as much as possible — please send me 
the days you would like to have free so I can make up the holiday schedule. I will post this schedule on December 1, so I’ll need 
everyone’s holiday requests no later than November 23, 2024. 

Greetings,
Besliu Daniel`;
  return (
    <div className="flex flex-col bg-gray-700 w-2/3">
      <span className="text-2xs text-center text-gray-600 my-6"> 13/ 13</span>
      <div className="flex items-center px-10">
        <div className="w-10 h-10 rounded-xl bg-red-200 mr-4"></div>
        <span className="text-sm text-gray-200 font-medium">Dribbble Team</span>
        <div className="flex relative ml-6">
          <div className="w-6 h-6 rounded-full bg-red-200 border-2 border-gray-800"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-gray-800 absolute ml-3"></div>
          <div className="w-6 h-6 rounded-full bg-green-200 border-2 border-gray-800 absolute ml-6"></div>
          <div className="w-6 h-6 rounded-full bg-yellow-200 border-2 border-gray-800 absolute ml-9"></div>
        </div>
        <div className="flex ml-auto">
          <FontAwesomeIcon icon={faReply} className="mx-2 text-gray-200" />
          <FontAwesomeIcon icon={faTrashCan} className="mx-2 text-gray-200" />
          <FontAwesomeIcon icon={faEllipsisH} className="mx-2 text-gray-200" />
        </div>
      </div>
      <span className="px-10 text-2xs text-gray-600 font-bold mt-6">3:30PM</span>
      <span className="px-10 text-lg text-gray-200 font-light mb-6">How are you getting on?</span>
      <div className="px-10 text-xs text-gray-500 whitespace-break-spaces">{body}</div>
      <div className="fixed bottom-30 right-50 cursor-pointer">
        <EmailModal />
      </div>
    </div>
  )
}

export default EmailDetails;
