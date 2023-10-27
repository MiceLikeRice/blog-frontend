module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    "@babel/plugin-transform-private-methods",
    [
      "prismjs", 
      {
        languages: [
            'html',
            'css',
            'javascript',
            'php',
            'dart',
            'bash',
            'nginx',
            'sql',
            'c',
            'cpp',
            'python',
            'go',
            'java',
            'bash',
            'json'
        ],
        plugins: [
          'line-numbers',
          'show-language',
          'copy-to-clipboard'
        ],
        theme: 'tomorrow',  // 正确的主题名称
        css: true
      }
    ]
  ]
}
