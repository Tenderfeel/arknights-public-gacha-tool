<template>
  <div id="app" class="container">
    <h1 class="h6 mt-1">アークナイツ公開求人タグフィルター</h1>
    <div class="row">
      <div class="col-sm">
        <div class="tags py-2">
          <b-button
            class="tag"
            :variant="`${tag.selected ? '': 'outline-'}${categoryVariant(tag)}`"
            v-for="tag in tags"
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
            <div v-if="char.anotherTags" class="another-tags">
              <span
                class="badge font-weight-normal text-small border p-1 mr-1"
                :class="[`border-${categoryVariant(tag)}`, tag.selected ? 'text-white':`text-${categoryVariant(tag)}`,
                tag.selected ? `bg-${categoryVariant(tag)}` : '']"
                v-for="tag in char.anotherTags"
                :key="tag.name"
              >
                {{tag.name}}
                <span class="text-danger" v-if="tag.need === 3">*</span>
              </span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <p class="text-secondary">
      <small>※が付いているのは必須タグ</small>
    </p>
  </div>
</template>

<script>
import tags from "@/data/tags";
export default {
  name: "App",
  components: {},
  data() {
    return {
      tags: tags.map(tag => {
        tag.selected = false;
        return tag;
      }),
      // タグで絞込めるキャラ
      characters: []
    };
  },

  computed: {
    sortCharacters() {
      const copy = [...this.characters];
      return copy.sort((a, b) => {
        const countA = a.anotherTags.reduce((accumulator, tag) => {
          return (
            accumulator + (tag.selected ? Number(tag.selected) + tag.need : 0)
          );
        }, 0);
        const countB = b.anotherTags.reduce(
          (accumulator, tag) =>
            accumulator + (tag.selected ? Number(tag.selected) + tag.need : 0),
          0
        );
        // 選択されたタグが多い方
        return countB - countA;
      });
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

    /**
     * タグが選択された
     */
    onSelect(tag) {
      if (!tag.characters) return;
      //選択されたタグにキャラが登録されている場合
      // そのキャラクターごとに登録されている他のタグを探す
      tag.characters.forEach(char => {
        const anotherTags = this.getTagsByChar(tag, char);
        const selectedChar = this.characters.find(c => c.name === char.name);
        if (selectedChar) {
          // 2個め以降のタグ選択でダブリが発生した
          selectedChar.anotherTags = anotherTags;
        }

        // 選択中
        if (tag.selected) {
          if (selectedChar) {
            // 2個め以降のタグ選択でダブリが発生した
            selectedChar.anotherTags = anotherTags;
          } else {
            this.characters.push({ ...char, anotherTags });
          }
        } else {
          // 選択解除された（キャラをリストから削除）
          const index = this.characters.findIndex(c => c.name === char.name);
          if (index === -1) return;
          const isSelectedEmpty = selectedChar.anotherTags.every(
            tag => !tag.selected
          );
          if (isSelectedEmpty) {
            this.characters.splice(index, 1);
          }
        }
      });
    },

    /**
     * 指定したキャラが登録されているタグを探す
     */
    getTagsByChar(tag, char) {
      const chars = [];
      this.tags.forEach(tag => {
        if (!tag.characters) return;
        const findChar = tag.characters.find(c => c.name === char.name);
        if (findChar) {
          // 必要度フラグ追加
          chars.push({ ...tag, need: findChar.need });
        }
      });
      return chars;
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
