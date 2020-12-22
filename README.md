# dudu-tools

Tools for rs-ui: http://gitlab.100credit.cn/bairong/rs-ui

## 安装

本地安装 npm install --save-dev @bairong/dudu-tools
全局安装 npm install -g @bairong/dudu-tools

## 命令

| 命令               | 描述                                                          |
| ------------------ | ------------------------------------------------------------- |
| `dudu run es`      | 编译至 es 目录,es                                             |
| `dudu run lib`     | 编译至 lib 目录,commonjs                                      |
| `dudu run dist`    | 编译至 dist 目录,umd                                          |
| `dudu run compile` | 相当于同时执行 `dudu run es && dudu run lib && dudu run dist` |
| `dudu run clean`   | 清除 dist、es、lib 文件目录                                   |
