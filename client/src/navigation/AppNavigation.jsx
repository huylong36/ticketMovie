import { Route } from "react-router-dom";
import { Routes } from "./routes";
import Home from "../layout/clientView/index";
import { LoginView } from "../screen/login";
export const AppNavigation = () => {
  return (
    <>
      <Route path={Routes.home} exact component={Home} />
      <Route path={Routes.login} component={LoginView} />
    </>
  );
};
