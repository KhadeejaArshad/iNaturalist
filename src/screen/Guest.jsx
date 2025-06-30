import { ScrollView, StyleSheet,View} from 'react-native';
import Text from '../UI/SpText';

import React from 'react';

import Header from '../components/Guest/Header';
import List from '../components/Guest/List';


const Guest = () => {
  return (
  <ScrollView>
   <Header/>
 <View style={styles.root}>
       <Text size={24} color="black" marginH={16} marginV={20}>
        Plants
      </Text>
   <List/>
 </View>
  <View>
      <Text size={24} color="black" marginH={16} marginV={20}>
        Equipment
      </Text>
   <List/>
  </View>

  </ScrollView>
    


   
  );
};

export default Guest;

const styles = StyleSheet.create({
      root: {
    marginTop: 50,
  },
 

});
