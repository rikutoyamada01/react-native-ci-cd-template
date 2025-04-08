import { useState, type FC } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

import emoji1 from "../assets/images/emoji1.png";
import emoji2 from "../assets/images/emoji2.png";
import emoji3 from "../assets/images/emoji3.png";
import emoji4 from "../assets/images/emoji4.png";
import emoji5 from "../assets/images/emoji5.png";
import emoji6 from "../assets/images/emoji6.png";

type EmojiListProps = {
  onSelect: (item: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export const EmojiList: FC<EmojiListProps> = (props) => {
  const [emoji] = useState<ImageSourcePropType[]>([
    emoji1 as ImageSourcePropType,
    emoji2 as ImageSourcePropType,
    emoji3 as ImageSourcePropType,
    emoji4 as ImageSourcePropType,
    emoji5 as ImageSourcePropType,
    emoji6 as ImageSourcePropType,
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listConatainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            props.onSelect(item);
            props.onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listConatainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
