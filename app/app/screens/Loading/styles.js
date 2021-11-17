import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 100,
  },
  loading: {
    position: "absolute",
    top: 160,
    bottom: 0,
  }
});
