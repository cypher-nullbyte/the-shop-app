import React from 'react';
import { FlatList,Button, Alert, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductsScreen=props=>{
    const userProducts=useSelector(state=>state.products.userProducts);
    const dispatch=useDispatch();
    const editProductHandler=(id)=>{
        props.navigation.navigate('EditProduct',{productId:id});
    };

      const deleteHandler=(id)=>{
        Alert.alert('Are you Sure?','Do you really want to delete this item?',[
            {text:'No',style:'default'},
            {text:'Yes',style:"destructive",onPress:()=>{
                dispatch(productActions.deleteProduct(id));}
            }
        ]);
    };

    return (
    <FlatList 
        data={userProducts} keyExtractor={(item,idx)=>item.id}
        renderItem={itemData=>(
            <ProductItem 
                image={itemData.item.imageUrl} title={itemData.item.title}
                price={itemData.item.price}
                onSelect={()=>{editProductHandler(itemData.item.id)}}
            >
                <Button color={Colors.primary} title="Edit" 
                        onPress={()=>{editProductHandler(itemData.item.id)}}
                    />
                <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(null,itemData.item.id)}/>
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
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Add" iconName={Platform.OS==='android'?"md-create":'ios-create'} 
                    onPress={()=>{
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        ),
})};

export default UserProductsScreen;