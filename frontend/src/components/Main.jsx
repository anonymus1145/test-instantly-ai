import ContentHeader from "./ContentHeader";
import EmailDetails from "./EmailDetails";
import EmailList from "./EmailList";

const Main = () => {
  return (
    <main className="flex flex-col w-full bg-gray-800 h-full">
      <ContentHeader />
      <div className="flex flex-row">
        <EmailList />
        <EmailDetails />
      </div>
    </main>
  )
}

export default Main;
