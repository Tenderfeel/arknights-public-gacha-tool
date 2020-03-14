/**
 * [category]
 * rare: レアリティ確定
 * range: 攻撃距離
 * type: 役割
 * other: その他
 * [characters]
 * need: そのタグが　3=必須 2=選択 1=狙える
 */
export default [
  {
    category: "rare",
    name: "初期",
    description: "★2のキャラが出る"
  },
  {
    category: "rare",
    name: "エリート",
    description: "★5のキャラが出る",
    characters: [
      { rare: 5, name: "インドラ", need: 3 },
      { rare: 5, name: "ヴァルカン", need: 1 }
    ]
  },
  {
    category: "rare",
    name: "上級エリート",
    description: "★6のキャラが出る"
  },

  {
    category: "range",
    name: "近距離",
    description: "近距離攻撃系のキャラが出る",
    characters: [
      { rare: 5, name: "インドラ", need: 1 },
      { rare: 5, name: "ヴァルカン", need: 1 },
      { rare: 4, name: "フロストリーフ", need: 2 },
      { rare: 5, name: "二アール", need: 2 },
      { rare: 4, name: "グム", need: 2 }
    ]
  },
  {
    category: "range",
    name: "遠距離",
    description: "遠距離攻撃系のキャラが出る",
    characters: [
      { rare: 5, name: "フィリオプシス", need: 2 },
      { rare: 5, name: "ワルファリン", need: 2 },
      { rare: 5, name: "スペクター", need: 2 },
      { rare: 4, name: "エステル", need: 2 },
      { rare: 4, name: "ジェシカ", need: 2 }
    ]
  },

  {
    category: "type",
    name: "先鋒タイプ",
    description: "先鋒タイプのキャラが出る",
    characters: [{ rare: 5, name: "ズィマー", need: 2 }]
  },
  {
    category: "type",
    name: "前衛タイプ",
    description: "前衛タイプのキャラが出る",
    characters: [
      { rare: 5, name: "インドラ", need: 3 },
      { rare: 5, name: "スペクター", need: 2 },
      { rare: 4, name: "エステル", need: 2 },
      { rare: 4, name: "フロストリーフ", need: 2 }
    ]
  },
  {
    category: "type",
    name: "重装タイプ",
    description: "重装タイプのキャラが出る",
    characters: [
      { rare: 5, name: "ヴァルカン", need: 2 },
      { rare: 5, name: "リスカム", need: 2 },
      { rare: 5, name: "クロワッサン", need: 2 },
      { rare: 5, name: "二アール", need: 2 },
      { rare: 4, name: "グム", need: 2 }
    ]
  },
  {
    category: "type",
    name: "特殊タイプ",
    description: "特殊タイプのキャラが出る",
    characters: [
      { rare: 5, name: "レッド", need: 3 },
      { rare: 5, name: "マンティコア", need: 2 },
      { rare: 5, name: "クリフハート", need: 2 },
      { rare: 5, name: "エフイーター", need: 2 },
      { rare: 4, name: "グラベル", need: 3 },
      { rare: 4, name: "ロープ", need: 3 },
      { rare: 4, name: "ショウ", need: 3 }
    ]
  },
  {
    category: "type",
    name: "狙撃タイプ",
    description: "狙撃タイプのキャラが出る",
    characters: [
      { rare: 5, name: "メテオリーテ", need: 2 },
      { rare: 4, name: "シラユキ", need: 2 },
      { rare: 4, name: "ジェシカ", need: 2 }
    ]
  },
  {
    category: "type",
    name: "術師タイプ",
    description: "術師タイプのキャラが出る"
  },
  {
    category: "type",
    name: "医療タイプ",
    description: "医療タイプのキャラが出る",
    characters: [
      { rare: 5, name: "フィリオプシス", need: 2 },
      { rare: 5, name: "ワルファリン", need: 2 }
    ]
  },
  {
    category: "type",
    name: "補助タイプ",
    description: "補助タイプのキャラが出る",
    characters: [
      { rare: 5, name: "イースチナ", need: 2 },
      { rare: 5, name: "プラマニクス", need: 2 }
    ]
  },

  {
    category: "other",
    name: "火力",
    description: "攻撃力の高いキャラが出る",
    characters: [
      { rare: 5, name: "インドラ", need: 3 },
      { rare: 5, name: "ヴァルカン", need: 3 },
      { rare: 5, name: "イースチナ", need: 3 },
      { rare: 5, name: "マンティコア", need: 3 },
      { rare: 5, name: "クリフハート", need: 3 },
      { rare: 5, name: "リスカム", need: 3 },
      { rare: 4, name: "フロストリーフ", need: 2 }
    ]
  },
  {
    category: "other",
    name: "生存",
    description:
      "倒されにくい能力持ち(防御力上昇、HP回復、無敵、ステルス等)のキャラが出る",
    characters: [
      { rare: 5, name: "インドラ", need: 1 },
      { rare: 5, name: "ヴァルカン", need: 3 },
      { rare: 5, name: "マンティコア", need: 3 },
      { rare: 5, name: "スペクター", need: 2 },
      { rare: 4, name: "エステル", need: 2 },
      { rare: 4, name: "ジェシカ", need: 2 }
    ]
  },
  {
    category: "other",
    name: "防御",
    description: "防御力の高いキャラが出る",
    characters: [
      { rare: 5, name: "ヴァルカン", need: 2 },
      { rare: 5, name: "クロワッサン", need: 2 },
      { rare: 5, name: "二アール", need: 2 },
      { rare: 4, name: "グム", need: 2 }
    ]
  },
  {
    category: "other",
    name: "治療",
    description: "味方を回復する能力持ちのキャラが出る",
    characters: [
      { rare: 5, name: "フィリオプシス", need: 2 },
      { rare: 5, name: "ワルファリン", need: 2 },
      { rare: 5, name: "二アール", need: 3 },
      { rare: 4, name: "グム", need: 3 }
    ]
  },
  {
    category: "other",
    name: "支援",
    description: "味方を支援する能力持ちのキャラが出る",
    characters: [
      { rare: 5, name: "ズィマー", need: 3 },
      { rare: 5, name: "フィリオプシス", need: 3 },
      { rare: 5, name: "ワルファリン", need: 3 },
      { rare: 4, name: "ドーベルマン", need: 3 }
    ]
  },
  {
    category: "other",
    name: "範囲攻撃",
    description: "範囲攻撃できるキャラが出る",
    characters: [
      { rare: 5, name: "メテオリーテ", need: 3 },
      { rare: 5, name: "スペクター", need: 3 },
      { rare: 4, name: "エステル", need: 3 },
      { rare: 4, name: "シラユキ", need: 3 }
    ]
  },
  {
    category: "other",
    name: "減速",
    description: "「敵を一瞬足止め」できるキャラが出る",
    characters: [
      { rare: 5, name: "エフイーター", need: 3 },
      { rare: 5, name: "イースチナ", need: 3 },
      { rare: 4, name: "シラユキ", need: 3 },
      { rare: 4, name: "フロストリーフ", need: 3 }
    ]
  },
  {
    category: "other",
    name: "牽制",
    description: "敵をスタンさせるスキル持ちのキャラが出る",
    characters: [
      { rare: 5, name: "テキサス", need: 3 },
      { rare: 5, name: "レッド", need: 3 },
      { rare: 5, name: "メイヤー", need: 3 }
    ]
  },
  {
    category: "other",
    name: "弱化",
    description: "敵のパラメータを下げる能力持ちのキャラが出る",
    characters: [
      { rare: 5, name: "メテオリーテ", need: 3 },
      { rare: 5, name: "プラマニクス", need: 3 },
      { rare: 4, name: "ヘイズ", need: 3 },
      { rare: 4, name: "メテオ", need: 3 }
    ]
  },
  {
    category: "other",
    name: "COST回復",
    description: "COSTを回復できるキャラが出る",
    characters: [{ rare: 5, name: "ズィマー", need: 2 }]
  },
  {
    category: "other",
    name: "強制移動",
    description: "敵を強制移動させるスキル持ちのキャラが出る",
    caracters: [
      { rare: 5, name: "クリフハート", need: 2 },
      { rare: 5, name: "エフイーター", need: 2 },
      { rare: 5, name: "クロワッサン", need: 3 },
      { rare: 4, name: "ロープ", need: 3 },
      { rare: 4, name: "ショウ", need: 3 }
    ]
  },
  {
    category: "other",
    name: "爆発力",
    description: "大ダメージの一撃を与えるスキル持ちのキャラが出る",
    characters: [{ rare: 5, name: "ファイヤーウォッチ", need: 3 }]
  },
  {
    category: "other",
    name: "召喚",
    description: "召喚スキル持ちのキャラが出る",
    characters: [{ rare: 5, name: "メイヤー", need: 3 }]
  },
  {
    category: "other",
    name: "高速再配置",
    description: "再配置までの時間が短いキャラが出る",
    characters: [
      { rare: 5, name: "レッド", need: 3 },
      { rare: 4, name: "グラベル", need: 3 }
    ]
  },
  {
    category: "other",
    name: "ロボット",
    description: "ロボキャラが出る（3:50推奨）",
    characters: [
      { rare: 1, name: "Lancet-2", need: 3 },
      { rare: 1, name: "Castle-3", need: 3 }
    ]
  }
];

// export const characters = {
//   ヴァルカン: {
//     rare: 5,
//     tags: [
//       [
//         {
//           name: "生存",
//           need: 3
//         },
//         {
//           name: "重装タイプ",
//           need: 2
//         },
//         {
//           name: "防御",
//           need: 2
//         }
//       ],
//       [
//         { name: "火力", need: 3 },
//         { name: "重装タイプ", need: 2 },
//         { name: "防御", need: 2 }
//       ]
//     ]
//   }
// };
