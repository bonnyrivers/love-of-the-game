import PropsComponent from "./components/PropsComponent";
import UserComponent from "./components/UserComponent";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div>
      <h1>Users</h1>
      <UserList />
      <PropsComponent firstName="John" lastName="Bob" age={33} />
      <UserComponent
        name="John Doe"
        age={26}
        address="87 Summer St, Boston, MA 02110"
        dob={new Date()}
      />
    </div>
  );
};

export default App;
