import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/PennGan/PennGan.github.io"
    }
  })
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Search(),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index"
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Darkmode()
        },
        {
          Component: Component.ReaderMode()
        }
      ]
    }),
    Component.Explorer()
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())]
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Search(),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Darkmode()
        }
      ]
    }),
    Component.Explorer()
  ],
  right: []
}
