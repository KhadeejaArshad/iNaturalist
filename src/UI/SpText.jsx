import { StyleSheet, Text as RNText } from 'react-native'
import { fonts } from '../utils/font';


const Text = ({children , weight =  'regular' , size=14 , color='white' ,alignment ='left' , marginH =2 , marginV}) => {
    const weightStyle = styles [weight];
    const sizeStyle = {fontSize : size };
    const colorStyle = {color} 
    const marginStyle = { marginHorizontal: marginH ,  marginVertical :marginV}
    const alignStyle = {textAlign :alignment} 
  return (

      <RNText style={[styles.text , weightStyle , sizeStyle , colorStyle , alignStyle , marginStyle]}>{children}</RNText>
  )
}

export default Text

const styles = StyleSheet.create({
    text:{

    },
    regular:{
        fontFamily:fonts.regular
    },
    bold:{
        fontFamily:fonts.bold
    },
   
})