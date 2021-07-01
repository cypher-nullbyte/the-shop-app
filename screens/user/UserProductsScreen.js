import React from 'react';
import { FlatList,Button, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen=props=>{
    const userProducts=useSelector(state=>state.products.userProducts);
    const dispatch=useDispatch();
    return (
    <FlatList 
        data={userProducts} keyExtractor={(item,idx)=>item.id}
        renderItem={itemData=>(
            <ProductItem 
                image={itemData.item.imageUrl} title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{}}
            >
                <Button color={Colors.primary} title="Edit" 
                        onPress={()=>{}}
                    />
                <Button color={Colors.primary} title="Delete" onPress={()=>{
                        dispatch(productActions.deleteProduct(itemData.item.id));
                        // console.log(itemData.item.id);
                    }
                }/>
            </ProductItem>
        )}
    />);
};
UserProductsScreen.navigationOptions=navData=>{
    return({
        headerTitle:'Your Products',
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName={Platform.OS==='android'?"md-menu":'ios-menu'} 
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
})};

export default UserProductsScreen;