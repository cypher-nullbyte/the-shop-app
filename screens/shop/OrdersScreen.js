import React from 'react';
import { Text,FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen=props=>{
    const orders=useSelector(state=>state.orders.orders);
    return (
        <FlatList
            data={orders} keyExtractor={(item,idx)=>item.id}
            renderItem={itemData=>(
                <OrderItem 
                    amount={itemData.item.totalAmount} date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
};

OrdersScreen.navigationOptions=navData=>{
    return({
        headerTitle:'Your Orders',
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName={Platform.OS==='android'?"md-menu":'ios-menu'} 
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    });
};

export default OrdersScreen;