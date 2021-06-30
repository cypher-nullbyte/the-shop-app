import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { createAppContainer } from 'react-navigation';


const ProductsNavigator=createStackNavigator({
    ProductsOverview:ProductsOverviewScreen,
},
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? Colors.primay :'',
        },
        headerTintColor:Platform.OS==='android' ? 'white' : Colors.primay,

    }
});



export default createAppContainer(ProductsNavigator);