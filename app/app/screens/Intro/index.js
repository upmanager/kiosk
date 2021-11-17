import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as reduxActions from "@actions";
import { Text } from "@components";
import { Videos } from "@assets";
import Video from 'react-native-video';
import styles from "./styles";

class Intro extends Component {
    goNext() {
        this.props.navigation.navigate('PickMode');
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => console.log("touch")} onPress={this.goNext.bind(this)}>
                <Video
                    source={Videos.intro}
                    repeat={true}
                    style={styles.backgroundVideo}
                    resizeMode={'cover'}
                    paused={true} />
            </TouchableOpacity>
        )
    }
}


export default connect(state => state, { ...reduxActions })(Intro)
