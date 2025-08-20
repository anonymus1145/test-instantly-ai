import SideNav from "./SideNav";
import Main from "./Main";

const MainLayout = () => {
  return (
    <div className="w-10/12 flex h-[90vh] bg-blue-200">
      <SideNav />
      <Main />
    </div>
  )
}

export default MainLayout;
