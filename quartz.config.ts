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
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono"
      },
      colors: {
        lightMode: {
          light: "#F7FBFF",
          lightgray: "#DCE8F3",
          gray: "#8CA3B8",
          darkgray: "#56708A",
          dark: "#2B2B2B",
          secondary: "#3A6EA5",
          tertiary: "#A9C8E8",
          highlight: "rgba(95, 168, 255, 0.14)",
          textHighlight: "#D8EBFF"
        },
        darkMode: {
          light: "#101826",
          lightgray: "#233246",
          gray: "#7D93AB",
          darkgray: "#D7E6F6",
          dark: "#F5F9FD",
          secondary: "#8CB8E8",
          tertiary: "#4D79A6",
          highlight: "rgba(95, 168, 255, 0.2)",
          textHighlight: "#35506E"
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
