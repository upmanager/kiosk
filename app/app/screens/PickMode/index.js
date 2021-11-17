import * as reduxActions from "@actions";
import { Text } from "@components";
import _ from "lodash";
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from "./styles";
import { Icon } from "react-native-elements";
import { BaseColor } from "@config";


export class index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.contain} onPress={() => {
                    global.pickType = 0;
                    this.props.navigation.navigate("Main");
                }}>
                    <Icon name={'where-to-vote'} size={120} color={BaseColor.primaryColor} type={'material-icons'} />
                    <Text header primaryColor bold>In place</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contain} onPress={() => {
                    global.pickType = 1;
                    this.props.navigation.navigate("Main");
                }}>
                    <Icon name={'airplane-takeoff'} size={120} color={BaseColor.primaryColor} type={'material-community'} />
                    <Text header primaryColor bold>Take Away</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(state => state, reduxActions)(index)
