import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { BaseConfig } from "@config";

const index = (props) => {
    var uri = props.source;
    var source = '';
    if(!uri) {
        source = "";
    } else if (parseInt(uri) > 0) {
        source = uri;
    } else if (uri.search('http') >= 0) {
        source = { uri };
    } else {
        source = { uri: `${BaseConfig.SERVER_HOST}${uri}` };
    }
    return (
        <Image {...props} source={source}/>
    )
}

export default index

const styles = StyleSheet.create({})
