import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Text from '../UI/SpText';

import Feather from '@react-native-vector-icons/feather';

const Specific = ({ route, navigation }) => {
  function AccordionItem({ children, title,variant='primary' }) {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
      setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        variant==='nested'?(
          <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.nestedHeader} onPress={toggleItem}>
          <Text color="black">{title}</Text>
          <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
        </TouchableOpacity>
        {expanded && body}
      </View>

        ):(
              <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
          <Text color="black">{title}</Text>
          <Feather name={expanded ? 'minus' : 'plus'} size={20} color="black" />
        </TouchableOpacity>
        {expanded && body}
      </View>

        )

        
    
    );
  }
  const product = route?.params?.product;
  console.log(product);

  useLayoutEffect(() => {
    if (product?.name) {
      navigation.setOptions({ title: product?.name });
    }
  }, [navigation, product]);
  return (
    <View style={styles.root}>
      <Image source={{ uri: product.image }} style={styles.img} />

      <View style={styles.desc}>
        <View style={styles.category}>
          <View style={styles.catcontainer}>
            <Text>Plants</Text>
          </View>
          <View style={styles.catcontainer}>
            <Text>{product?.category}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <AccordionItem title="Basic Knowledge">
          <AccordionItem
            title="Step 1: Prepare all tools and seeds"
            variant="nested"
          >
            <Text color="black" marginV={6}>
              Light: Orchid grass belongs to the group of plants that prefer
              bright or partially shaded light. Natural light can be used, but
              the plant will burn if directly planted under sunlight.
            </Text>
            <Text color="black" marginV={6}>
              Soil: Ensure the soil has good drainage.
            </Text>
            <Text color="black" marginV={6}>
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
            <Text color="black" marginV={6}>
              Temperature: Orchid grass thrives well at an optimal temperature
              ranging from 18 to 24 °C, suitable for the tropical climate in our
              country. ... (Please purchase the product to unlock the
              comprehensive guide on planting from A to Z)
            </Text>
          </AccordionItem>
          <AccordionItem title="Step 2: Seeding" variant="nested">
            <Text color="black" marginV={6}>
              Light: Orchid grass belongs to the group of plants that prefer
              bright or partially shaded light. Natural light can be used, but
              the plant will burn if directly planted under sunlight. Soil:
              Ensure the soil has good drainage.
            </Text>
            <Text color="black" marginV={6}>
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
            <Text color="black" marginV={6}>
              Temperature: Orchid grass thrives well at an optimal temperature
              ranging from 18 to 24 °C, suitable for the tropical climate in our
              country. ... (Please purchase the product to unlock the
              comprehensive guide on planting from A to Z)
            </Text>
          </AccordionItem>
          <AccordionItem title="Step 3: Caring" variant="nested">
            <Text color="black" marginV={6}>
              Light: Orchid grass belongs to the group of plants that prefer
              bright or partially shaded light. Natural light can be used, but
              the plant will burn if directly planted under sunlight.
            </Text>
            <Text color="black" marginV={6}>
              Soil: Ensure the soil has good drainage.
            </Text>
            <Text color="black" marginV={6}>
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
            <Text color="black" marginV={6}>
              Temperature: Orchid grass thrives well at an optimal temperature
              ranging from 18 to 24 °C, suitable for the tropical climate in our
              country. ... (Please purchase the product to unlock the
              comprehensive guide on planting from A to Z)
            </Text>
          </AccordionItem>
        </AccordionItem>
        <AccordionItem title="Stages">
          <AccordionItem title="1. Watering Seeds (48h) " variant="nested">
            <Text color="black">
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
          </AccordionItem>
          <AccordionItem title="2. Start Growing (3-5 days) " variant="nested">
            <Text color="black">
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
          </AccordionItem>
          <AccordionItem title="3. Growing (2-3 weeks) " variant="nested">  
            <Text color="black">
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
          </AccordionItem>
          <AccordionItem title="4. Maturing (4-6 weeks)  " variant="nested">
            <Text color="black">
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
          </AccordionItem>
          <AccordionItem title="5. Blooming (4-6 weeks) " variant="nested">
            <Text color="black">
              Water: Distilled water or rainwater can be used, avoid using hard
              water. Water regularly, keeping the soil moist but not soggy.
            </Text>
          </AccordionItem>
        </AccordionItem>
      </ScrollView>
    </View>
  );
};

export default Specific;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  img: {
    width: '100%',
    height: scale(268),
  },

  scrollView: {
    marginHorizontal: scale(20),
  },

  scrollContent: {
    paddingBottom: verticalScale(20),
  },

  accordContainer: {
    marginBottom: verticalScale(8),
    borderRadius: 8,
    overflow: 'hidden',
  },

  accordHeader: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#007537',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  accordBody: {
    padding: 12,
   
  },

  textSmall: {
    fontSize: 16,
    color: '#333',
  },
  catcontainer: {
    backgroundColor: '#007537',
    alignSelf: 'flex-start',
    paddingBottom: verticalScale(4),
    paddingTop: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(4),
  },
  category: {
    flexDirection: 'row',
    gap: scale(10),
    marginVertical: verticalScale(12),
  },
  desc: {
    padding: moderateScale(10),
    marginHorizontal: scale(15),
  },
  nestedHeader: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
