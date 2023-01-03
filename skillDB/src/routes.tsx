import React from "react";
import { Navigate } from "react-router-dom";
import { Route } from "./models/routes";

const HomePage = React.lazy(() => import("./homePage"));
const SkillList = React.lazy(() => import("./page/skillList"));

const routes: Array<Route> = [
  {
    path: "/",
    element: <HomePage redirectLink={"/skill/list"} />,
  },
  {
    path: "/skill/list",
    element: <SkillList />,
  },
  {
    path: "/skill/list/new",
    element: <>Add new skill</>,
  },
  {
    path: "/skill/choose",
    element: <>Choose Skill from app 1</>,
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
