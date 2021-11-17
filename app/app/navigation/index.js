import Loading from "@screens/Loading";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Main from "./Main";
import Intro from "@screens/Intro";
import PickMode from "@screens/PickMode";

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    Intro: Intro,
    PickMode: PickMode,
    Main: Main,
  },
  {
    initialRouteName: "Intro"
  }
);

export default createAppContainer(AppNavigator);
