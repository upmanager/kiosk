import * as reduxActions from "@actions";
import { Text, Image } from "@components";
import React, { Component } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
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
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.props.getCategories();
    }
    get colNums() {
        return this._category?.cols || 4;
    }
    get _category() {
        const { curIndex } = this.state;
        try {
            return this._categories[curIndex] || {};
        } catch (error) {
        }
        return {};
    }
    get _productsData() {
        try {
            ;
            var data = this._category.products;
            var arr = data.length % this.colNums == 0 ? [] : (new Array(this.colNums - data.length % this.colNums).fill({ id: -1 }));
            data = [...data, ...arr];
            return data;
        } catch (err) {

        }
        return [];
    }
    get _selectedList() {
        return this.props.app?.selectedList?.filter?.(item => item?.id > 0) || [];
    }
    get _showSelectedList() {
        var data = this._selectedList;
        if (data == null) return [];
        data = data.filter((item, index) => {
            if (data.slice(0, index).some(i2 => i2.categoryid == item.categoryid)) return false;
            return true;
        });
        return data;
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
    get _categories() {
        return this.props.app?.categories || [];
    }
    next() {
        const { curIndex } = this.state;
        if (curIndex < this._categories.length - 1) this.setState({ curIndex: curIndex + 1 });
        else {
            this.props.navigation.navigate("Overview");
        }
    }
    prev() {
        const { curIndex } = this.state;
        if (curIndex > 0) {
            this.setState({ curIndex: curIndex - 1 }, () => {
                this.props.clearProd(this._category.id);
            });
        }
    }
    update(data) {
        this.props.clearProd(data?.categoryid);
        var cur_index = 0;
        var cur_index = this._categories.findIndex(item => item.id == data?.categoryid);
        this.setState({ curIndex: cur_index || 0 });
        if (data == null) {
            RNRestart.Restart();
        }
    }
    checkSelected(item) {
        try {
            return this._selectedList.filter(selected => selected.id == item.id).length > 0;
        } catch (error) {
        }
        return false;
    }
    selectItem(selected, prod) {
        if (selected) {
            this.props.unSelectProd(prod);
        } else {
            this.props.selectProd(prod);
            try {
                var select_count = this._category.select_count;
                if (select_count < 1) return;
                var cur_selected = this._selectedList.filter(item => item.categoryid == this._category.id).length;
                if (cur_selected + 1 >= select_count) this.next();
            } catch (error) {
                console.error(error);
            }
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contain}>
                    <View style={styles.smallCategories}>
                        <Icon name={'arrow-down'} type={'entypo'} size={60} color={BaseColor.primaryColor} />
                        <FlatList
                            data={this._showSelectedList}
                            keyExtractor={(_, i) => i}
                            showsVerticalScrollIndicator={false}
                            style={{ width: "100%", padding: 20 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.selectedItem} onPress={() => { this.update(item) }}>
                                    <Image source={item?.image} style={styles.prodImage} resizeMode={'contain'} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.Vline} />
                    <View style={styles.largeCategoreis}>
                        <View style={styles.category}>
                            <Text header dangerColor bold>{`Total: ${this._totalPrice}$`}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Image source={this._category.image} style={{ width: 80, height: 80, borderRadius: 20 }} resizeMode={'cover'} />
                                <View style={{ marginLeft: 20 }}>
                                    <Text header primaryColor bold>{this._category.title || this._category.name}</Text>
                                    {this._category.subtitle &&
                                        <Text title3 grayColor bold>{this._category.subtitle}</Text>
                                    }</View>
                            </View>
                        </View>
                        <View style={styles.Hline} />
                        <FlatList
                            key={this.colNums}
                            data={this._productsData}
                            numColumns={this.colNums}
                            keyExtractor={(_, i) => i}
                            renderItem={({ item }) => {
                                if (item.id == -1) return <View style={styles.prodItem}></View>
                                const selected = this.checkSelected(item);
                                return (
                                    <View style={[styles.prodItem, selected && styles.checked]}>
                                        <TouchableOpacity style={styles.center} onPress={this.selectItem.bind(this, selected, item)}>
                                            <Image source={item?.image} style={styles.prodImage} resizeMode={'contain'} />
                                            <View style={styles.prodText}>
                                                <Text headline whiteColor bold numberOfLines={1} style={{ textAlign: "center" }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {selected &&
                                            <View style={styles.checkbox}>
                                                <Icon name={'check-square-o'} color={BaseColor.primaryColor} type={'font-awesome'} />
                                            </View>
                                        }
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Icon name={'shopping-cart'} type={'entypo'} size={60} color={BaseColor.primaryColor} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.action}
                            onPress={this.prev}>
                            <Icon name={'arrow-left'} type={'entypo'} size={60} color={BaseColor.primaryColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.action}
                            onPress={this.update}>
                            <Icon name={'cross'} type={'entypo'} size={60} color={BaseColor.redColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.action}
                            onPress={this.next}>
                            <Icon name={'arrow-right'} type={'entypo'} size={60} color={BaseColor.primaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(state => state, reduxActions)(index)
