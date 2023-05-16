import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/types'
import sidebar from '../utils/sidebar'

const mySidebar: DefaultTheme.SidebarItem[] = sidebar.map((item) => ({
  text: item.title,
  link: item.path,
  children: [],
  sidebarDepth: item.sidebarDepth,
}))
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'cmyutils doc',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: mySidebar,
    // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

    search: {
      provider: 'local',
    },
  },
  plugins: [],
  // plugins: [[import('@vuepress/plugin-back-to-top')], [import('vuepress-plugin-anchor-right')]],
})
