import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Text from '../../UI/SpText'
import React,{useState} from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';
const filterOptions = ['All', 'New', 'Outdoor', 'Indoor'];
const Filterbutton = () => {
  const [selected, setSelected] = useState('All');

  return (
    <View style={styles.buttoncontainer}>
      {filterOptions.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setSelected(option)}
          style={[
            styles.button,
            selected === option && styles.selectedButton,
          ]}
        >
          <Text color={selected === option ? 'white' : '#7D7B7B'}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default Filterbutton

const styles = StyleSheet.create({
    buttoncontainer:{
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:verticalScale(10)
    },
    selectedButton:{
        backgroundColor:'#009245',
        padding:moderateScale(5),
        borderRadius:moderateScale(4)
    }
})