import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isWindows = /windows/i.test(navigator.userAgent);
const align = isWindows ? 'row' : 'column';
const val = isWindows ? '50%' : '100%';

const alternatives = [
  "A 'CROSS PLATFORM' APP DEVELOPER!",
  "A VEGETARIAN",
  "AN 'ANIME' LOVER",
  "A 'SELF-HELP' READER",
  "A METALHEAD"
];

function Home({ navigation }) {
  const [currentAlternativeIndex, setCurrentAlternativeIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const alternative = alternatives[currentAlternativeIndex];
    let currentIndex = 0;
    let intervalId = null;

    const animateText = () => {
      setDisplayedText((prevText) => {
        const nextWord = alternative[currentIndex];
        currentIndex++;

        if (currentIndex === alternative.length) {
          clearInterval(intervalId);
          intervalId = null;

          setTimeout(() => {
            setDisplayedText('');
            const nextAlternativeIndex = (currentAlternativeIndex + 1) % alternatives.length;
            setCurrentAlternativeIndex(nextAlternativeIndex);
          }, 1500);
        }

        return prevText + ' ' + nextWord;
      });
    };

    setDisplayedText('');
    intervalId = setInterval(animateText, 1500 / alternative.length);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentAlternativeIndex]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Welcome To My World!</Text>
        <View style={{ flexDirection: align }}>
          <View style={{ width: val }}>
            <Text style={styles.subHeading}>I am <Text style={styles.highlightedText}>Kshitiz</Text>,</Text>
            <View style={styles.alternativeContainer}>
              <Text style={styles.alternativeText}>{displayedText}</Text>
            </View>
            <Text style={styles.description}>
              Yeah, that's pretty much it. I have quite a lot of hobbies from cooking to gaming and opinions about almost everything I come across. And yes, I am your everyday anti-social guy believing in 'Stoicism' and 'Nihilism'.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Main_Content')}>
              <Text style={styles.button}>
                Start Reading
                <Ionicons name="arrow-forward" size={20} color="gold" style={{ marginLeft: 5 }} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Hero.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made With 🧡 By Kshitiz</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1828',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 31,
    color: 'silver', // Deep Blue color
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'silver', // Deep Blue color
  },
  highlightedText: {
    color: '#BFA181',
    fontWeight: 'bold',
  },
  alternativeContainer: {
    marginBottom: 20,
  },
  alternativeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    color:'#0A1828',
    paddingVertical: 5,
    backgroundColor: 'gold',
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 18,
    lineHeight: 24,
    color:'silver'
  },
  button: {
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'gold',
    marginBottom:2
  },
  imageContainer: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 350,
    width: 350,
    borderRadius: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#01257D',
  },
  footerText: {
    color: 'silver',
    fontSize: 16,
  },
});

export default Home;
