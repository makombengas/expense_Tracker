import "../App.css";
import Graph from "../Components/Graph/Graph";
import Labels from "../Components/Labels/Labels";
import Form from "../Components/Form/Form";
import NavBar from "../Components/NavBar/NavBar";

function ExpenseApp() {
  return (
    <div>
      <div className="App">
        <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
          <div>
            <div
              className=" py-4 mb-5 bg-emerald-600 text-white rounded "
              style={{
                display: "flex 1",
                justifyContent: "space-between",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  flexWrap: "wrap",
                  textAlign: "center",
                }}
              >
                EXPENSE TRACKER
              </h1>
              <NavBar />
            </div>
          </div>
          {/* grid column*/}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Chart*/}
            <Graph />
            {/*Form*/}
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseApp;
