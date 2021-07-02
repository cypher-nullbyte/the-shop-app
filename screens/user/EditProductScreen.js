import React, { useCallback, useEffect,useReducer } from 'react';
import {View,StyleSheet,ScrollView, Alert,KeyboardAvoidingView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';


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

    const inputChangeHandler=useCallback((inputIdentifier,inputValue,inputValidity)=>{
        dispatchFormState({
            type:'UPDATE',
            value:inputValue,
            isValid:inputValidity,
            input:inputIdentifier,
        })
    },[dispatchFormState]);


    return (
        <KeyboardAvoidingView >
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id="title"
                    label="Title"
                    errorText="Please Enter a Valid Title"
                    keyboardType="default" autoCapitalize="sentences" autoCorrect returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title:''}
                    initiallyValid={!!editedProduct}
                    required 
                />
                <Input 
                    id="imageUrl"
                    label="Image Url"
                    errorText="Please Enter a Valid ImageUrl"
                    keyboardType="default"  returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl:''}
                    initiallyValid={!!editedProduct}
                    required 
                />
                {!editedProduct&&
                <Input 
                    id="price"
                    label="Price"
                    errorText="Please Enter a Valid Price"
                    keyboardType="decimal-pad"  returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.price:''}
                    initiallyValid={!!editedProduct}
                    required min={0.1}
                />
                }
                <Input 
                    id="description"
                    label="Description"
                    errorText="Please Enter a Valid Description"
                    keyboardType="default" autoCapitalize="sentences" autoCorrect multiline 
                    numberOfLines={3}  //only works with android
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description:''}
                    initiallyValid={!!editedProduct}
                    required minLength={5}
                />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
});

export default EditProductScreen;