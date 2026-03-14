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
          light: "#FAFAF8",
          lightgray: "#E6E6E1",
          gray: "#A3A39A",
          darkgray: "#5E5E57",
          dark: "#2B2B2B",
          secondary: "#2B2B2B",
          tertiary: "#D7D7D1",
          highlight: "rgba(43, 43, 43, 0.08)",
          textHighlight: "#E9E9E4"
        },
        darkMode: {
          light: "#161616",
          lightgray: "#2A2A2A",
          gray: "#7F7F7A",
          darkgray: "#DADAD5",
          dark: "#F5F5F2",
          secondary: "#F0F0EB",
          tertiary: "#3A3A38",
          highlight: "rgba(255, 255, 255, 0.1)",
          textHighlight: "#4A4A46"
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
