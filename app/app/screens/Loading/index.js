import { BaseColor } from "@config";
import React, { Component } from "react";
import { ActivityIndicator, PermissionsAndroid, Platform, View } from "react-native";
import styles from "./styles";
import {Text} from "@components";

const _PERMISSIONS = [
];
export default class Loading extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.requestAndroidPermission();
    setTimeout(() => {
      this.props.navigation.navigate("Intro");
    }, 1000);
  }

  requestAndroidPermission = async () => {
    try {
      if (Platform.OS != "android") return;
      const granted = await PermissionsAndroid.requestMultiple(_PERMISSIONS);
      let permissionGranted = true;
      let permissionNeverAsk = false;
      _PERMISSIONS.every((item, index) => {
        if (granted[item] !== PermissionsAndroid.RESULTS.GRANTED) {
          permissionNeverAsk = granted[item] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
          permissionGranted = false;
          return false;
        };
        return true;
      })
      if (permissionGranted) {
      } else if (!permissionNeverAsk) {
        this.requestAndroidPermission();
      }
    } catch (err) {
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginTop: -200 }}>
          <Text title1 >Kiosk</Text>
        </View>
        <ActivityIndicator
          size="large"
          color={BaseColor.whiteColor}
          style={styles.loading}
        />
      </View>
    );
  }
}