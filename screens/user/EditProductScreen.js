import React, { useCallback, useEffect,useReducer } from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';


const formReducer=(state,action)=>{
    if(action.type==='UPDATE')
    {   
        const updatedValues={
            ...state.inputValues,
            [action.input]:action.value
        };

        const updatedValidities={
            ...state.inputValidities,
            [action.input]:action.isValid,
        }
        let updatedFormIsValid=true;
        for(let key in updatedValidities){
            updatedFormIsValid=updatedFormIsValid&&updatedValidities[key];
        }
        return {
            formIsValid:updatedFormIsValid,
            inputValues:updatedValues,
            inputValidities:updatedValidities,
        }
    }
    return state;
};

const EditProductScreen=props=>{
    const prodId=props.navigation.getParam('productId');
    const editedProduct=useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId));
    const dispatch=useDispatch();

    const [formState,dispatchFormState]=useReducer(formReducer,
    {
        inputValues:{
            title:editedProduct ? editedProduct.title : "",
            imageUrl:editedProduct ? editedProduct.imageUrl : "",
            description:editedProduct? editedProduct.description :"",
            price: '',
        },
        inputValidities:{
            title: editedProduct ? true:false,
            imageUrl: editedProduct ? true:false,
            description: editedProduct ? true:false,
            price: editedProduct ? true:false,
        },
        formIsValid:editedProduct ? true:false,
    });

    

    const submitHandler=useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert("Wrong input!","Please Check the errors in form.",[{text:'Okay'}])
            return;
        }
        if(editedProduct) 
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        else 
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                parseFloat(formState.inputValues.price),
            ));
        props.navigation.goBack();
    },[dispatch,prodId,formState]);

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler});
    },[submitHandler]);

    const textChangeHandler=(inputIdentifier,text)=>{
        let isValid=true;
        if(text.trim().length===0) isValid=false;
        if(inputIdentifier==='price' && isNaN(parseFloat(text))) isValid=false;
        dispatchFormState({type:'UPDATE',value:text,isValid:isValid,input:inputIdentifier});
    };


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={formState.inputValues.title} 
                        onChangeText={textChangeHandler.bind(null,'title')} autoCapitalize keyboardType="default"
                    />
                    {!formState.inputValidities.title&&<Text>Please Enter a Valid Title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={formState.inputValues.imageUrl} 
                        onChangeText={textChangeHandler.bind(null,'imageUrl')} keyboardType='default' 
                    />
                </View>
                {!editedProduct&&<View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={formState.inputValues.price}

                        onChangeText={textChangeHandler.bind(null,'price')} keyboardType='decimal-pad' 
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={formState.inputValues.description} 
                        onChangeText={text=>textChangeHandler('description',text)} keyboardType='default' 
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions=navData=>{
    const submitFn=navData.navigation.getParam('submit');
    return{
        headerTitle:navData.navigation.getParam('productId')? 'Edit Product' : 'Add Product',
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName={Platform.OS==='android'?"md-checkmark":'ios-checkmark'} 
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
};


const styles=StyleSheet.create({
    form:{
        margin:20,
    },
    formControl:{
        width:"100%",
    },  
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8,
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,

    },
});

export default EditProductScreen;