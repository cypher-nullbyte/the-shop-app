import React from 'react';
import { FlatList,View,Button, } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
const UserProductsScreen=props=>{
    const userProducts=useSelector(state=>state.products.userProducts);
    console.log(userProducts);
    return (
    <FlatList 
        data={userProducts} keyExtractor={(item,idx)=>item.id}
        renderItem={itemData=>(
            <ProductItem 
                image={itemData.item.imageUrl} title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{}}
            >
                <Button color={Colors.primary} title="View Details" 
                        onPress={()=>{}}
                    />
                <Button color={Colors.primary} title="Add to Cart" onPress={()=>{}}/>
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