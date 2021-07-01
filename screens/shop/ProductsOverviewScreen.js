import React from 'react';
import { FlatList, Platform, Text,Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
const ProductsOverviewScreen=props=>{
    const products=useSelector(state=>state.products.availableProducts);
    const dispatch=useDispatch();
    const selectItemHandler=(id,title)=>{
        props.navigation.navigate('ProductDetail',
            {
                productId:id, 
                productTitle:title
            }
        ); 
    };


    return <FlatList data={products} keyExtractor={(item,idx)=>item.id}
                renderItem={itemData=>(
                <ProductItem image={itemData.item.imageUrl}
                    title={itemData.item.title} price={itemData.item.price}
                    onSelect={selectItemHandler.bind(null,itemData.item.id,itemData.item.title)} 
                >
                    <Button color={Colors.primary} title="View Details" 
                        onPress={()=>selectItemHandler(itemData.item.id,itemData.item.title)}
                    />
                    <Button color={Colors.primary} title="Add to Cart" onPress={()=>{dispatch(cartActions.addToCart(itemData.item))}}/>
                </ProductItem>
                
                )}
            />;
};

ProductsOverviewScreen.navigationOptions=navData=>{
    return({
        headerTitle:'All Products',
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
                <Item title="Cart" iconName={Platform.OS==='android'?"md-cart":'ios-cart'} 
                    onPress={()=>{
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        ),
    });
};

export default ProductsOverviewScreen;