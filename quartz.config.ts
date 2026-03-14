import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "个人知识库",
    pageTitleSuffix: " | Academic Knowledge Base",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "PennGan.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "IBM Plex Mono"
      },
      colors: {
        lightMode: {
          light: "#f7f5f1",
          lightgray: "#dfdbd2",
          gray: "#9d9588",
          darkgray: "#5b584f",
          dark: "#26231f",
          secondary: "#355c7d",
          tertiary: "#6c8b74",
          highlight: "rgba(53, 92, 125, 0.12)",
          textHighlight: "#efe1a7"
        },
        darkMode: {
          light: "#171818",
          lightgray: "#343638",
          gray: "#6b7075",
          darkgray: "#d2d6da",
          dark: "#f2f4f5",
          secondary: "#9ebad1",
          tertiary: "#9bb69a",
          highlight: "rgba(158, 186, 209, 0.16)",
          textHighlight: "#665f1f"
        }
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"]
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark"
        },
        keepBackground: false
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest"
      }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "katex"
      })
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage()
    ]
  }
}

export default config

