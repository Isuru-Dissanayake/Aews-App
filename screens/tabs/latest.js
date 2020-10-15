import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import Article from './src/components/Article';

const url =
  "https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=e36b0d2388a6468c881ff644e0836f17";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}

export default class Latest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }
  
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <FlatList
        style={styles.flatListStyle}
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
  );
  }
}

const styles = {
  flatListStyle: {
    backgroundColor: '#fff',
  },
};