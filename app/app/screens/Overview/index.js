import * as reduxActions from "@actions";
import { Text } from "@components";
import React, { Component } from 'react';
import { View, FlatList, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import styles from "./styles";
import RNRestart from 'react-native-restart';
import { Icon } from "react-native-elements";
import { BaseColor } from "@config";

// global.pickType
export class index extends Component {
    state = {
        curIndex: 0,
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    get _totalPrice() {
        var price = 0;
        try {
            this._selectedList.map(item => { price += (item.price || 0) });
            price = parseInt(price * 100) / 100;
        } catch (error) {
            console.log(error);
        }
        return price;
    }
    get _selectedList() {
        return this.props.app?.selectedList?.filter?.(item => item?.id > 0) || [];
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text header dangerColor bold>{`Total: ${this._totalPrice}$`}</Text>
                <View style={{ padding: 20, flex: 1 }}>
                    <Text title2 dangerColor bold>{`Selected Items`}</Text>
                    <FlatList
                        data={this._selectedList}
                        keyExtractor={(_, index) => index}
                        renderItem={({ item, index }) => (
                            item && <View style={{ flexDirection: "row", padding: 3 }}>
                                <Text title3 blackColor style={{ flex: 1 }}>{item.name}</Text>
                                <Text title3 blackColor>{`$${item?.price || 0}`}</Text>
                            </View>
                        )}
                    />
                    <Text title3 dangerColor bold>{`Total: ${this._totalPrice}$`}</Text>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                        <Icon name={'arrow-long-right'} type={'entypo'} size={60} color={BaseColor.dangerColor} />
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Icon name={'plus'} type={'entypo'} size={60} color={BaseColor.primaryColor} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Icon name={'cross'} type={'entypo'} size={60} color={BaseColor.redColor} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Icon name={'arrow-right'} type={'entypo'} size={60} color={BaseColor.dangerColor} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(state => state, reduxActions)(index)
