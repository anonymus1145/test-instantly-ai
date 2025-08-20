import SideNav from "./SideNav";
import Main from "./Main";

const MainLayout = () => {
  return (
    <div className="w-full flex h-screen bg-blue-200">
      <SideNav />
      <Main />
    </div>
  )
}

export default MainLayout;
