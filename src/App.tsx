import { MultiSelect } from "./components";

function App() {
  return (
    <div className="flex min-h-screen justify-center mt-48">
      <div className="w-[500px]">
        <div className="flex w-full flex-col text-center">
          <h1 className="mb-4 text-4xl font-bold">Multi Select Autocomplete</h1>
          <p className="mb-4">Search characters by typing and navigate with arrow keys or tab. Press Enter to choose, and use backspace or the remove button to deselect.</p>
        </div>
        <MultiSelect />
      </div>
    </div>
  );
}

export default App;
