import DraggablePoints from "./components/DraggablePoints";

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border-2 inline-block rounded border-DARK_GREY">
        <DraggablePoints />
      </div>
    </div>
  );
}

export default App;