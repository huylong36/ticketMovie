import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppNavigation } from "./navigation/AppNavigation";
import store from "./redux/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
          limit={3}
          toastStyle={{ backgroundColor: "#000", color: "#fff" }}
        />
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Switch>
              <AppNavigation />
            </Switch>
          </Router>
        </SnackbarProvider>
      </Provider>
    </div>
  );
}

export default App;
