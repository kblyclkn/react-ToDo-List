import Content from "./components/Content";
import Header from "./components/header";
import { TodoProvider } from "./context/TodoContext";


function App() {
  return (
    <TodoProvider>
      <section className="todoapp">
        <Header />
        <Content />
      </section>
    </TodoProvider>
  );
}

export default App;
