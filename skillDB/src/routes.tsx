import React from "react";
import { Route } from "./models/routes";

const HomePage = React.lazy(() => import("./homePage"));
const SkillList = React.lazy(() => import("./page/skillList"));
import ErrorBoundary from "./errorBoundary";
const AddDomain = React.lazy(() => import("./components/AddDomain"));
const AboutPage = React.lazy(() => import("app2/About"));
const ChooseSkill = React.lazy(() => import("app2/ChooseSkill"));
const AddChooseSkill = React.lazy(() => import("app2/AddChooseSkill"));

const routes: Array<Route> = [
  // {
  //   path: "/",
  //   element: <HomePage redirectLink={"/skill/list"} />,
  // },
  {
    path: "/about",
    element: (
      <ErrorBoundary>
        <AboutPage />
      </ErrorBoundary>
    ),
  },
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
    path: "/skill/report",
    element: <>Skill Report From app 1</>,
  },
  {
    path: "*",
    element: <>Page Not Found</>,
  },
];

export default routes;
