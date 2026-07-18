export interface DrinkShop {
  id: string;
  name: string;
  brandColor: string; // Tailwind class-friendly color names or hex code
  textColor: string;  // text color matching the brand color
  bgGradient: string; // Tailwind background gradient class
  logoText: string;
  description: string;
  drinks: string[];
}

export const DRINK_SHOPS: DrinkShop[] = [
  {
    id: "fifty-lan",
    name: "五十嵐",
    brandColor: "#004791", // Classic Navy Blue
    textColor: "text-[#004791]",
    bgGradient: "from-amber-400 to-yellow-300", // Yellow cup / blue text vibe
    logoText: "嵐",
    description: "台灣手搖界的萬年不敗經典，1號四季春珍波椰是必點神作！",
    drinks: [
      "四季春珍波椰 (1號)",
      "阿薩姆紅茶拿鐵",
      "黃金烏龍茶",
      "珍珠奶茶",
      "冰淇淋紅茶",
      "旺來紅",
      "燕麥紅茶拿鐵"
    ]
  },
  {
    id: "macu",
    name: "麻古茶坊",
    brandColor: "#e60012", // Bright Red
    textColor: "text-[#e60012]",
    bgGradient: "from-red-50 to-red-100 border-red-200",
    logoText: "麻古",
    description: "水果果粒茶與濃厚芝芝起司奶蓋的極致霸主！",
    drinks: [
      "芝芝芒果果粒",
      "楊枝甘露 2.0",
      "柳橙果粒茶",
      "芝芝葡萄果粒",
      "金萱雙Q",
      "高山金萱茶",
      "翡翠椒香綠茶"
    ]
  },
  {
    id: "kebuke",
    name: "可不可熟成紅茶",
    brandColor: "#10302b", // Deep British Dark Green/Navy
    textColor: "text-[#10302b]",
    bgGradient: "from-[#10302b] to-[#1a443d]",
    logoText: "KEBUKE",
    description: "洋溢著英倫復古風情，主打熟成茶感，茶香濃郁深邃。",
    drinks: [
      "熟成紅茶",
      "麗春紅茶",
      "熟成冷露",
      "胭脂紅茶",
      "春芽綠茶",
      "胭脂多多",
      "金檸熟成"
    ]
  },
  {
    id: "chingshin",
    name: "清心福全",
    brandColor: "#009c53", // Classic ChingShin Green
    textColor: "text-[#009c53]",
    bgGradient: "from-green-50 to-emerald-100",
    logoText: "清心",
    description: "從小喝到大的親民老牌，多樣化的特調與冰沙是炎夏救星！",
    drinks: [
      "優多綠茶 (多多綠)",
      "烏龍綠茶",
      "珍珠奶茶",
      "布丁奶茶",
      "蜜桃凍紅茶",
      "冰淇淋紅茶",
      "梅子綠茶"
    ]
  },
  {
    id: "milksha",
    name: "迷客夏",
    brandColor: "#4a773c", // Milksha Fresh Green
    textColor: "text-[#4a773c]",
    bgGradient: "from-green-50 to-lime-50",
    logoText: "Milksha",
    description: "主打自家綠光牧場鮮乳，珍珠Ｑ彈透亮不添加色素。",
    drinks: [
      "香芋鮮奶",
      "珍珠紅茶拿鐵",
      "大甲芋頭鮮奶",
      "青檸香茶",
      "決明大麥鮮奶",
      "伯爵紅茶拿鐵",
      "焙香大麥青茶"
    ]
  },
  {
    id: "guiji",
    name: "龜記茗品",
    brandColor: "#334b35", // Guiji Forest Green
    textColor: "text-[#334b35]",
    bgGradient: "from-yellow-50 to-amber-100/50",
    logoText: "龜記",
    description: "主打古早味與本土小農水果入茶，紅柚翡翠天天賣到缺貨！",
    drinks: [
      "紅柚翡翠",
      "阿薩姆奶茶",
      "三桔紅茶",
      "冬瓜觀音",
      "蘋果紅萱",
      "柳丁翡翠",
      "碎銀普洱茶"
    ]
  },
  {
    id: "dejeng",
    name: "得正",
    brandColor: "#1d3f94", // Minimal Royal Blue
    textColor: "text-[#1d3f94]",
    bgGradient: "from-blue-50 to-indigo-50",
    logoText: "得正",
    description: "現代極簡美學代表，主打焙烏龍，茶香細緻乾淨、層次豐富。",
    drinks: [
      "檸檬春烏龍",
      "芝士奶蓋春烏龍",
      "輕烏龍",
      "烘焙烏龍",
      "香橙綠烏龍",
      "春烏龍",
      "芝士奶蓋烘焙烏龍"
    ]
  },
  {
    id: "tp-tea",
    name: "茶湯會",
    brandColor: "#513a29", // Calligraphy Brown
    textColor: "text-[#513a29]",
    bgGradient: "from-stone-50 to-amber-100/30",
    logoText: "茶湯會",
    description: "承襲春水堂茶藝血統，以鐵觀音與古法泡茶技術著稱。",
    drinks: [
      "鐵觀音拿鐵",
      "翡翠檸檬茶",
      "珍珠奶茶",
      "冬瓜鐵觀音",
      "蔗香紅茶",
      "觀音韻紅茶",
      "雅韻烏龍茶"
    ]
  }
];

export const SWEETNESS_OPTIONS = [
  { label: "無糖", value: "無糖", desc: "追求健康的無罪惡選擇" },
  { label: "一分糖", value: "一分糖", desc: "介於罪惡與自律的黃金微光" },
  { label: "微糖", value: "微糖", desc: "台灣人的標準「不甜」甜度" },
  { label: "半糖", value: "半糖", desc: "大人味與小孩子脾氣的完美妥協" },
  { label: "正常甜", value: "正常甜", desc: "今天生活太苦了，急需糖分轟炸！" }
];

export const ICE_OPTIONS = [
  { label: "去冰", value: "去冰", desc: "最飽滿的茶湯，一滴冰水都不摻" },
  { label: "微冰", value: "微冰", desc: "保持冰涼又不稀釋幸福感" },
  { label: "少冰", value: "少冰", desc: "標準消暑溫度，涼爽過癮" },
  { label: "正常冰", value: "正常冰", desc: "冰塊給爆！最傳統的手搖暢快感" },
  { label: "熱飲", value: "熱飲", desc: "暖胃首選，彷彿置身辦公室南極避難所" }
];

export const HUMOROUS_COMMENTS: string[] = [
  "喝這杯，你今天就是最優雅的薪水小偷！",
  "大口喝下去！體重上去了，心情也跟著上天了！",
  "聽說喝這個的人，今天發票都會中兩百萬（希望啦）。",
  "卡路里是什麼？不過是美味的計量單位罷了，喝！",
  "點了這個甜度？你今天的生活一定苦澀到需要糖分洗禮。",
  "選去冰很好，保護你那高貴的敏感性牙齒。",
  "點了熱飲？今天是不是辦公室的冷氣開得像南北極？",
  "今天辛苦了！這杯飲料是用來給疲憊的心靈做頂級 SPA 的。",
  "喝完這杯，立刻擁有了面對明天工作的勇氣（僅限今天有效）。",
  "聽說手搖飲是現代人的快樂仙丹，喝了它，你就是快樂大富翁！",
  "沒關係，錢沒有變少，只是變成了你喜歡的精緻液體。",
  "無糖？你今天是不是在跟熱量打一場世紀聖戰？",
  "少冰半糖，聽起來就像是對健康做出的極微弱掙扎，值得敬佩。",
  "手搖飲不能解決你人生所有的問題，但可以解決你現在嘴饞的問題！",
  "一分糖？這是一種『既想要甜美，又害怕罪惡』的傲嬌姿態呢。",
  "這杯喝下去，靈魂重量瞬間輕了兩公克（因為太快樂了）。",
  "建議偷偷喝，免得同事看到跟你要一口，那就虧大了！",
  "這是一杯神奇的魔法藥水，喝完後有 99% 機率能一秒忘掉主管的嘮叨。",
  "聽說珍珠的彈性代表了你今天的彈性。今天，你是個超彈性的人！",
  "不管世界怎麼變，至少這杯茶的風味會一直站在你這邊。"
];

// Helper to get random item from array
export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
