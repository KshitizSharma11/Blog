import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isWindows = /windows/i.test(navigator.userAgent);
const windowWidth = Dimensions.get('window').width;
const cols = isWindows ? 3 : 1;
const wh = isWindows ? '40%' : '100%';
const hw = isWindows ? '40%' : '14%';

export default function MainScreen() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchBlogsByCategory = (category) => {
    const query = `
      query Blogs {
        blogs {
          category
          createdAt
          id
          publishedAt
          title
          updatedAt
          content
          image {
            url
          }
        }
      }
    `;

    fetch('https://api-ap-south-1.hygraph.com/v2/cljrcqi5w0jvy01um2swacri5/master', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          category,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data.blogs);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSelectedButton(category);
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return content;
  };

  const handleBlogPress = (blog) => {
    setSelectedBlog(blog);
  };

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity style={styles.blogItem} onPress={() => handleBlogPress(item)}>
      <View style={styles.blogImageContainer}>
        <Image source={{ uri: item.image.url }} style={styles.blogImage} />
      </View>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogContent}>{truncateContent(item.content)}</Text>
      <TouchableOpacity style={styles.readMoreButton} onPress={() => handleBlogPress(item)}>
        <Text style={styles.readMoreButtonText}>Read More</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSelectedBlog = () => (
    <View style={styles.selectedBlogOverlay}>
      <ScrollView style={styles.selectedBlogContainer}>
        <Text style={styles.selectedBlogTitle}>{selectedBlog.title}</Text>
        <Image source={{ uri: selectedBlog.image.url }} style={getSelectedBlogImageStyle()} />

        <Text style={styles.selectedBlogContent}>{selectedBlog.content}</Text>

        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedBlog(null)}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const getSelectedBlogImageStyle = () => {
    if (isWindows) {
      return styles.selectedBlogImageWindows;
    } else {
      return styles.selectedBlogImage;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedCategory ? blogs.filter((blog) => blog.category === selectedCategory) : blogs}
        renderItem={renderBlogItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={cols}
      />
      {selectedBlog && renderSelectedBlog()}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handleCategoryPress('Books')}
        >
          <Ionicons name="book-outline" size={24} color={selectedButton === 'Books' ? 'gold' : 'silver'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Books' ? 'gold' : 'silver' }]}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handleCategoryPress('Recipes')}
        >
          <Ionicons name="restaurant-outline" size={24} color={selectedButton === 'Recipes' ? 'gold' : 'silver'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Recipes' ? 'gold' : 'silver' }]}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => handleCategoryPress('Opinions')}
        >
          <Ionicons name="chatbubble-outline" size={24} color={selectedButton === 'Opinions' ? 'gold' : 'silver'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Opinions' ? 'gold' : 'silver' }]}>Opinions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1828'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 7,
    backgroundColor: '#01257D',
    borderWidth: 1,
    borderRadius: 8
  },
  button: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
  },
  buttonText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  blogItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    borderColor: '#FFD700',
    borderWidth: 1,
    backgroundColor: '#0A1828',
  },
  blogImageContainer: {
    height: 150,
    marginBottom: 8,
    maxHeight: 200,
  },
  blogImage: {
    flex: 1,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#BFA181'
  },
  blogContent: {
    marginBottom: 4,
    color: 'silver',
    fontSize: 16
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'gold'
  },
  readMoreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1828',
  },
  selectedBlogOverlay: {
    flex:1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A1828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBlogContainer: {
    padding: 16,
    backgroundColor: '#0A1828',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 48,
    borderRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'gold',
    maxHeight: '80%'
  },
  selectedBlogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#BFA181'
  },
  selectedBlogImage: {
    width: wh,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'cover',
    aspectRatio:1,
    borderRadius: 8
  },
  selectedBlogImageWindows: {
    width: wh,
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'cover',
    borderRadius: 8
  },
  selectedBlogContent: {
    marginTop: 24,
    fontSize: 17,
    marginBottom: 1,
    lineHeight: 24,
    color: 'silver'
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: 'gold',
    top: 16,
    right: 16,
    marginTop: 16,
  }
});
