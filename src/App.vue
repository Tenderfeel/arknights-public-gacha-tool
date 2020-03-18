<template>
  <div id="app" class="container">
    <h1 class="h6 mt-1">アークナイツ公開求人タグフィルター</h1>
    <div class="row">
      <div class="col-sm">
        <div class="tags py-2">
          <b-button
            class="tag"
            v-for="tag in tagData"
            :variant="`${tag.selected ? '': 'outline-'}${categoryVariant(tag)}`"
            :key="tag.name"
            size="sm"
            :pressed.sync="tag.selected"
            :title="tag.description"
            @click="onSelect(tag)"
          >{{tag.name}}</b-button>
        </div>
      </div>
      <!-- キャラクターリスト -->
      <div class="chracter col-sm py-2" ref="characters">
        <b-list-group v-if="characters.length">
          <b-list-group-item v-for="char in sortCharacters" :key="char.name" size="sm">
            <p class="mb-1">
              {{ char.name }}
              <span>★{{char.rare}}</span>
            </p>
            <div v-if="char.tags" class="another-tags">
              <span
                v-for="(tag, index) in char.tags"
                class="badge font-weight-normal text-small border p-1 mr-1"
                :class="[`border-${tagVariant(tag)}`, isSelectedTag(tag) ? 'text-white':`text-${tagVariant(tag)}`,
                isSelectedTag(tag) ? `bg-${tagVariant(tag)}` : '']"
                :key="index"
              >{{tag}}</span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import tags from "@/data/tags.js";
import * as charData from "@/data/charcter.js";

Object.values(charData).forEach(charArray => {
  charArray.forEach(char => {
    if (char.rare === 6) {
      char.tags.unshift("上級エリート");
    }
    if (char.rare === 5) {
      char.tags.unshift("エリート");
    }
    char.tags.unshift(`${char.type}タイプ`);
  });
});

export default {
  name: "App",
  components: {},
  data() {
    return {
      // タグデータ
      tagData: tags.map(tag => {
        tag.selected = false;
        return tag;
      }),
      // 選択されたタグ
      selectedTags: [],
      // タグで絞込めるキャラ
      characters: []
    };
  },

  computed: {
    sortCharacters() {
      const copy = [...this.characters];
      return copy.sort((a, b) => {
        const countA = a.match + a.rare;
        const countB = b.match + b.rare;
        return countB - countA;
      });
    },

    characterData() {
      let baseData = [
        ...charData.rare1,
        ...charData.rare2,
        ...charData.rare3,
        ...charData.rare4
      ];
      if (this.selectedTags.find(tag => tag.name === "上級エリート")) {
        baseData = baseData.concat(charData.rare6);
      }
      if (this.selectedTags.find(tag => tag.name === "エリート")) {
        baseData = baseData.concat(charData.rare5);
      }
      return baseData.filter(char => char.public);
    }
  },

  methods: {
    /**
     * [category]
     * rare: レアリティ確定
     * range: 攻撃距離
     * type: 役割
     * other: その他
     */
    categoryVariant(tag) {
      switch (tag.category) {
        case "rare":
          return "warning";
        case "range":
          return "primary";
        case "type":
          return "info";
        default:
          return "dark";
      }
    },

    tagVariant(tagName) {
      const tag = this.tagData.find(data => data.name === tagName);
      return this.categoryVariant(tag);
    },

    isSelectedTag(tagName) {
      return this.selectedTags.find(t => t.name === tagName);
    },

    /**
     * タグが選択された
     */
    onSelect(tag) {
      if (tag.selected) {
        this.selectedTags.push(tag);
      } else {
        const index = this.selectedTags.findIndex(t => t.name === tag.name);
        this.selectedTags.splice(index);
      }
      this.characters.length = 0;

      this.characterData.forEach(character => {
        // 選択されたタグにマッチした数カウント
        const match = this.selectedTags.reduce((accu, tag) => {
          return (
            accu +
            Number(!!character.tags.find(charTag => charTag === tag.name))
          );
        }, 0);

        if (match) {
          this.characters.push({ ...character, match });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.tags {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
