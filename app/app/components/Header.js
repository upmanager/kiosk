import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseColor } from "@config";
import { Text } from "@components";
import { LinearProgress, Avatar, Image } from 'react-native-elements';
import PropTypes from "prop-types";
import { getDeviceWidth } from "@utils";
import { Images } from "@assets";

export default class Header extends Component {
    render() {
        const { renderLeft, renderRight, renderCenter, title, onPressLeft, onPressRight, loading, showSlider, backgroundColor, user } = this.props;
        return (
            <>
                <View style={[styles.container, { backgroundColor }]}>
                    <View style={{ alignItems: "flex-start" }}>
                        {renderLeft && (
                            <TouchableOpacity onPress={onPressLeft}>
                                {renderLeft}
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        {!!renderCenter && renderCenter}
                        {!!title && <Text title3 whiteColor flexCenter>{title}</Text>}
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        {user ?
                            <TouchableOpacity onPress={onPressRight} style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text blackColor style={{ marginRight: 10 }}>{`Hi, ${user.first_name}`}</Text>
                                <Avatar
                                    title={user.first_name.charAt(1)}
                                    source={{ uri: user.avatar }}
                                    rounded
                                    size={'small'}
                                />
                            </TouchableOpacity>
                            :
                            renderRight && (
                                <TouchableOpacity onPress={onPressRight}>
                                    {renderRight}
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
                {loading &&
                    <LinearProgress color="primary" />
                }
                {showSlider &&
                    <Image
                        source={Images.slider}
                        style={{ height: 200, width: getDeviceWidth() }}
                        resizeMode={'cover'}
                    />
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
    }
});
Header.propTypes = {
    renderLeft: PropTypes.element,
    renderRight: PropTypes.element,
    renderCenter: PropTypes.element,
    title: PropTypes.string,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    loading: PropTypes.bool,
    backgroundColor: PropTypes.string,
    user: PropTypes.object,
    showSlider: PropTypes.bool,

}
Header.defaultProps = {
    renderLeft: null,
    renderRight: null,
    renderCenter: null,
    title: null,
    onPressLeft: () => { },
    onPressRight: () => { },
    loading: false,
    backgroundColor: BaseColor.whiteColor,
    user: null,
    showSlider: false,
}