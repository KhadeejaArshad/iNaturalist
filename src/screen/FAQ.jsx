import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Text from '../UI/SpText';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';

const FAQ = () => {
  function AccordionItem({ children, title }) {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
      setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.nestedHeader} onPress={toggleItem}>
          <View style={styles.title}>
            <Text size={16} color="black">{title}</Text>
          </View>
         <View>
             <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="black"
          />
         </View>
        </TouchableOpacity>
        {expanded && body}
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <ScrollView  contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        <AccordionItem title="How long will it take for my order to arrive?">
        <Text color="#7D7B7B" size={16}>
          Orders placed via Standard shipping will be processed within 2-8
          business days and will be in transit for 1-5 days. Orders placed via
          Expedited shipping will be processed within 1-2 business days and will
          be in transit for 1-5 days.
        </Text>
      </AccordionItem>
      <AccordionItem title="Where do you ship?">
        <Text color="#7D7B7B" size={16}>We ship to all 63 provinces in the Vietnam.</Text>
      </AccordionItem>
      <AccordionItem title="If I order more than one plant, will they ship separately?">
        <Text color="#7D7B7B" size={16}>
          Yes, each individual plant ships separately. Plants that are part of
          the same order may ship out on different days and may also be
          delivered on different days. You will receive individual tracking
          information for each plant in your order.
        </Text>
      </AccordionItem>
      <AccordionItem title="How do I order several plants to go to different addresses?">
        <Text color="#7D7B7B" size={16}>
          If you're hoping to purchase 5 or more plants going to different
          addresses, our Customer Support team can help with that! Just with
          details about your bulk order and someone on our team will get back to
          you as soon as possible.
        </Text>
      </AccordionItem>
      <AccordionItem title="What if I need to cancel my order?">
        <Text color="#7D7B7B" size={16}>
          We begin work on each order soon after it is placed. To cancel an
          order, you must within 12 hours of your order being placed and we will
          process a refund at our discretion. After that, it is not possible to
          cancel your order. We are unable to cancel or make any changes to
          orders after they have shipped.
        </Text>
      </AccordionItem>
      </ScrollView>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  accordContainer: {

    borderRadius: 8,
    overflow: 'hidden',
    padding:moderateScale(10)
  },



  accordBody: {
    padding: 12,
  },
  nestedHeader: {
    // padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
    scrollView: {
    marginHorizontal: scale(20),
    marginVertical:scale(20)
  },

  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  title:{
    width:scale(235)
  }
});
