import { useState } from "react";

const SideNav = () => {
  const [navItems, setNavItems] = useState([
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Company" },
    { id: 3, name: "Schedule" },
    { id: 4, name: "Contacts" },
    { id: 5, name: "Inbox", isActive: true },
    { id: 6, name: "Reports" },
    { id: 7, name: "Activity" }
  ]);

  return (
    <nav className="w-3/12 h-full bg-gray-800 flex flex-col items-center">
      <div className="flex items-center my-14">
        <div className="w-6 h-6 bg-blue-300 rounded-full">
        </div>
        <span className="font-semibold text-white ml-4">Instantly-AI</span>
      </div>
      <ul>
        {
          navItems.map((navItem, index) => (
            <li key={navItem.id}
              className={`cursor-pointer ${navItem.isActive ? "flex items-center relative py-1" : ""} 
              ${index > 0 ? "my-6" : "mb-4"}`}>
              {
                navItem.isActive ? <div className="w-10 h-[2px] bg-blue-100 mr-2 absolute -left-12"></div> : null
              }
              <span className="text-white text-xs">{navItem.name}</span>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default SideNav;
