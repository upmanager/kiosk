import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColor.backgroundColor
  },
  contain: {
    flex: 1,
    flexDirection: "row",
  },
  smallCategories: {
    width: "20%",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  largeCategoreis: {
    flex: 1,
  },
  prodItem: {
    flex: 1,
    padding: 6,
    margin: 4
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  prodImage: {
    width: "70%",
  },
  prodText: {
    padding: 5,
    width: "100%",
    backgroundColor: BaseColor.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  action: {
    padding: 8
  },
  category: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  Hline: {
    height: 1,
    backgroundColor: BaseColor.grayColor,
    marginVertical: 10,
    marginHorizontal: "5%",
  },
  Vline: {
    height: "90%",
    marginTop: "5%",
    width: 1,
    backgroundColor: BaseColor.grayColor,
    marginHorizontal: 10,
  },
  checked: {
    borderColor: "#00000099",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#00000044"
  },
  selectedItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderColor: "#00000099",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#00000044"
  },
  checkbox: {
    position: "absolute",
    top: -2,
    left: 0,
    zIndex: 99
  }
});
