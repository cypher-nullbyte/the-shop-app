import React from 'react';
import { StyleSheet,Image,View,Button,Text, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';


const ProductDetailScreen=props=>{
    const productId=props.navigation.getParam('productId');
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(prod=>prod.id===productId));
    console.log(selectedProduct.imageUrl);
    return(
        <ScrollView>
            <View style={styles.imageView}>
                <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
            </View>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add To Cart" onPress={()=>{}}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}> {selectedProduct.description}</Text>
        </ScrollView>
    );
};


ProductDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('productTitle'),
    };
}

const styles=StyleSheet.create({
    imageView:{
        width:"100%",
        height:Dimensions.get('window').height*0.4,
    },
    image:{
       width:"100%",
       height:"100%",
    },
    price:{
        fontSize:20,
        color:"#888",
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold',
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily:'open-sans',
    },
    actions:{
        marginVertical:10,
        alignItems:'center',
    }
});

export default ProductDetailScreen;