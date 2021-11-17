import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { BaseColor } from "@config";
import { Text } from "@components";
import { connect } from 'react-redux';
import * as reduxActions from "@actions";

const Loading = (props) => {
    if (!props.app.loading) return <></>
    return (
        <View style={styles.container}>
            <View style={styles.contain}>
                <ActivityIndicator size={'large'} color={BaseColor.whiteColor} style={styles.indicator} />
                <Text whiteColor headline>Loading...</Text>
            </View>
        </View>
    )
}

export default connect(state => state, reduxActions)(Loading)

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BaseColor.transparent
    },
    contain: {
        backgroundColor: BaseColor.blackOpacity,
        padding: 25,
        borderRadius: 12
    },
    indicator: {
        marginBottom: 10
    }
});

