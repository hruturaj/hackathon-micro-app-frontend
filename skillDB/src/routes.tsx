import React from "react";
import { Route } from "./models/routes";

const HomePage = React.lazy(() => import("./homePage"));
const SkillList = React.lazy(() => import("./page/skillList"));
import ErrorBoundary from "./errorBoundary";
const AddDomain = React.lazy(() => import("./components/AddDomain"));
const ChooseSkill = React.lazy(() => import("app2/ChooseSkill"));
const AddChooseSkill = React.lazy(() => import("app2/AddChooseSkill"));

const routes: Array<Route> = [
  {
    path: "/skill/list",
    element: <SkillList />,
  },
  {
    path: "/skill/list/new",
    element: <AddDomain />,
  },
  {
    path: "/skill/choose",
    element: (
      <ErrorBoundary>
        <ChooseSkill />
      </ErrorBoundary>
    ),
  },
  {
    path: "/skill/choose/new",
    element: (
      <ErrorBoundary>
        <AddChooseSkill />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <div style={{ textAlign: "center" }}>Page Not Found</div>,
  },
];

export default routes;
