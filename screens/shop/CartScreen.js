import React from 'react';
import {View,Text, StyleSheet,Button,FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen=props=>{
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount);
    const cartItems=useSelector(state=>{
        const transformedCartItems=[];
        for(let key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a,b)=>a.productId>b.productId?1:-1);
    });
    
    const dispatch=useDispatch();
    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.abs(cartTotalAmount.toFixed(2))}</Text>
                </Text>
                <Button color={Colors.accent} title="Order Now" 
                    onPress={()=>{dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))}} 
                    disabled={cartItems.length===0}/>
            </Card>
            <View>
                <FlatList data={cartItems} keyExtractor={(item,idx)=>item.productId}
                    renderItem={itemData=><CartItem quantity={itemData.item.quantity} 
                        title={itemData.item.productTitle} amount={itemData.item.sum}
                        deletable
                        onRemove={()=>{dispatch(cartActions.removeFromCart(itemData.item.productId))}}
                    />}
                />
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    screen:{
        margin:20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color:Colors.primary,
    },
});

export default CartScreen;
