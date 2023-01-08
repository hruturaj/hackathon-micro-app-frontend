import React from "react";
import { Route } from "./models/routes";
import ChooseSkill from "./pages/ChooseSkill";
import AddSkillsParent from "./components/AddSkillsParent";

const AboutPage = React.lazy(() => import("./aboutPage"));

const routes: Array<Route> = [
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/skill/choose/new",
    element: <AddSkillsParent />,
  },
  {
    path: "/skill/choose",
    element: <ChooseSkill />,
  },
];

export default routes;
