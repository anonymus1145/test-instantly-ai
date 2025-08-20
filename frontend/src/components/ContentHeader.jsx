import { faBell, faEnvelope, faFolder, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContentHeader = () => {
  return (
    <div className="bg-gray-700 flex items-center py-6 px-10">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl text-gray-300" />
      <input placeholder="Search..." className="text-gray-300 w-4/12 mr-auto ml-4 bg-transparent outline-none" />
      <FontAwesomeIcon icon={faFolder} className="text-gray-300 mx-2" />
      <FontAwesomeIcon icon={faBell} className="text-gray-300 mx-2" />
      <FontAwesomeIcon icon={faEnvelope} className="text-gray-300 mx-2" />
      <div className="w-8 h-8 bg-blue-200 rounded-xl ml-8 mr-4">
      </div>
      <span className="font-light text-xs text-gray-100">Charlie Grant</span>
    </div>
  )
}

export default ContentHeader;
