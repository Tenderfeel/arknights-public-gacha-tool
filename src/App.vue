<template>
  <div id="app" class="container">
    <h1 class="h6 mt-1">アークナイツ公開求人ツール</h1>
    <div class="row">
      <div class="col-sm">
        <div class="container row">
          <b-form-checkbox v-model="includeRank5" name="check-button" class="col" switch>★5表示</b-form-checkbox>
          <b-form-checkbox class="col" v-model="includeRank6" name="check-button" switch>★6表示</b-form-checkbox>
        </div>
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
        <div class="text-right">
          <b-button size="sm" type="button" variant="outline-danger" @click.prevent="onReset">リセット</b-button>
        </div>
      </div>
      <!-- キャラクターリスト -->
      <div class="chracter col-sm py-2" ref="characters">
        <b-list-group v-if="characters.length">
          <b-list-group-item
            class="d-flex justify-content-start align-items-start p-2"
            v-for="char in sortCharacters"
            :key="char.name"
            size="sm"
          >
            <div class="char_thumb">
              <div
                class="thumb border rounded"
                :style="{
              backgroundImage: `url(images/char/${char.rare}/${char.id}.png)`
            }"
              >
                <b-img fluid blank v-bind="{width: 100, height: 100}"></b-img>
                <div class="rare text-center">
                  <span class="rare_star" v-for="i in char.rare" :key="i">★</span>
                </div>
              </div>
            </div>
            <div class="char_meta ml-2">
              <p class="mb-1 font-weight-bold">{{ char.name }}</p>
              <div v-if="char.tags" class="another-tags">
                <span
                  v-for="(tag, index) in char.tags"
                  class="badge font-weight-normal text-small border p-1 mr-1"
                  :class="[`border-${tagVariant(tag)}`, isSelectedTag(tag) ? 'text-white':`text-${tagVariant(tag)}`,
                isSelectedTag(tag) ? `bg-${tagVariant(tag)}` : '']"
                  :key="index"
                >{{tag}}</span>
              </div>
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
      characters: [],
      // ★5★6を追加する
      // false時はエリートタグが選択されていないとき追加しない
      includeRank5: true,
      includeRank6: false
    };
  },

  computed: {
    sortCharacters() {
      const copy = [...this.characters];
      return copy
        .filter(char => {
          let is = 1;
          if (!this.includeRank5) {
            is -= Number(char.rare === 5);
          }
          if (!this.includeRank6) {
            is -= Number(char.rare === 6);
          }

          return is;
        })
        .sort((a, b) => {
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
        ...charData.rare4,
        ...charData.rare5,
        ...charData.rare6
      ];
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
      return this.selectedTags.includes(tagName);
    },

    /**
     * タグが選択された
     */
    onSelect(tag) {
      if (tag.selected) {
        this.selectedTags.push(tag.name);
        if (tag.name === "上級エリート") {
          this.includeRank6 = true;
        }
      } else {
        const index = this.selectedTags.findIndex(t => t === tag.name);
        this.selectedTags.splice(index, 1);
        if (tag.name === "上級エリート") {
          this.includeRank6 = false;
        }
      }

      this.characters.length = 0;

      this.characterData.forEach(character => {
        // 選択されたタグにマッチした数カウント
        const match = this.selectedTags.reduce((accu, tag) => {
          return (
            accu + Number(!!character.tags.find(charTag => charTag === tag))
          );
        }, 0);

        if (match) {
          this.characters.push({ ...character, match });
        }
      });
    },

    /**
     * リセット
     */
    onReset() {
      this.tagData.forEach(tag => {
        tag.selected = false;
      });
      this.selectedTags.length = 0;
      this.characters.length = 0;
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
.thumb {
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 100px;
  min-width: 70px;
}
.rare {
  color: rgb(243, 220, 13);
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 0.8rem;
  letter-spacing: -2px;
  //-webkit-text-stroke: 1px black;

  .rare_star {
    text-shadow: 0 0 3px #000;
  }

  @media (min-width: 576px) {
    letter-spacing: -0.4rem;
    text-indent: -0.4rem;
  }

  @media (min-width: 768px) {
    letter-spacing: -2px;
    text-indent: 0;
  }
}

.char_meta {
  flex: 1 1 80%;
}
</style>
