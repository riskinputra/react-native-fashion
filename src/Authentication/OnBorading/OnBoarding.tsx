import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";
import Animated, { multiply } from "react-native-reanimated";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";

const BORDER_RADIUS = 75;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

const slides = [
  {
    title: "Relaxed",
    subTitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! find the best outfit here!",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subTitle: "Hear it first, Wear it First",
    description:
      "Hearing the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
  },
  {
    title: "Excentric",
    subTitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subTitle: "Look Good, Feel Good",
    description:
      "Discofer the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
  },
];

const OnBoarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);
  // TODO: scrollHandler useScrollHandler
  const onScroll = onScrollEvent({ x });
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            },
          ]}
        >
          {slides.map(({ subTitle, description }, index) => (
            <SubSlide
              key={index}
              onPress={() => {
                if (scroll.current) {
                  scroll.current
                    .getNode()
                    .scrollTo({ x: width * (index + 1), animated: true });
                }
              }}
              last={index === slides.length - 1}
              {...{ subTitle, description }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoarding;
