import { MaterialCommunityIcons } from "@expo/vector-icons";

import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
TimeAgo.addDefaultLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

type Headline = {
  articles: Article[];
};

type Article = {
  title: string;
  urlToImage: string;
  source: string;
  publishedAt: string;
  url: string;
};

const NewsScreen = () => {
  const [headlines, setHeadlines] = useState<Headline>(null);
  const language = "tr";
  const API_KEY = "55d51f93924344e083d2f96a773ff0d1";
  const url = `https://newsapi.org/v2/everything?language=${language}&q=${"technology"}&apiKey=${API_KEY}`;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    (await fetch(url)).json().then((res) => setHeadlines(res));
  }

  function renderItem({ item }) {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.urlToImage }}
          />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={{ flexWrap: "wrap" }}>{item.title}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="newspaper"
                  size={15}
                  style={{ paddingRight: 5 }}
                />
                <Text>{item.source.name}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={15}
                  style={{ paddingRight: 5 }}
                />

                <Text>{timeAgo.format(new Date(item.publishedAt))}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View
        style={{
          paddingTop: insets.top + 16,
          backgroundColor: "dodgerblue",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Teknoloji Haberleri
        </Text>
      </View>
      <FlatList
        data={headlines && headlines.articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.publishedAt}
      />
    </View>
  );
};

export default NewsScreen;
