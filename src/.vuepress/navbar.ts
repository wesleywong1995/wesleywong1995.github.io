import { navbar } from "vuepress-theme-hope";

// navbar是指在文章界面现实的侧边栏，默认是打开的。可以在markdown文件中通过navbar: false禁止

export default navbar([
  "/",
  {
    text: "数学",
    icon: "lightbulb",
    prefix: "math/",
    children: [
      {
        text: "线性代数",
        icon: "pen-to-square",
        prefix: "linear_algebra/",
        children: ["README.md"],
      },
    ]
  },
  {
    text: "胡言乱语",
    icon: "lightbulb",
    prefix: "essays/",
    children: [
      {
        text: "杂文",
        icon: "pen-to-square",
        prefix: "words/",
        children: ["README.md"],
      },
      {
        text: "电影",
        icon: "pen-to-square",
        prefix: "movies/",
        children: ["README.md"],
      },
      {
        text: "音乐",
        icon: "pen-to-square",
        prefix: "musics/",
        children: ["README.md"],
      },
      {
        text: "动漫",
        icon: "pen-to-square",
        prefix: "musics/",
        children: ["README.md"],
      },
    ]
  },
  {
    text: "编程设计",
    icon: "lightbulb",
    prefix: "code/",
    children: [
      {
        text: "编程语言",
        icon: "pen-to-square",
        prefix: "language/",
        children: ["README.md"],
      },
      {
        text: "图形学",
        icon: "pen-to-square",
        prefix: "graphics/",
        children: ["README.md"],
      },
      {
        text: "游戏引擎",
        icon: "pen-to-square",
        prefix: "game_engine/",
        children: ["README.md"],
      },
    ]
  }
]);
