---
title: Nginx-Location
date: 2020-12-16T18:57:15.000Z
tags: [Nginx]
# CC BY-NC 4.0
license: CC BY-NC 4.0
---

> 文档：http://nginx.org/en/docs/http/ngx_http_core_module.html#location

规则:

```nginx
location [ = | ~ | ~* | ^~] url { ... }

location @name { ... }
```

修饰符：

- `=`: 一模一样的等于
- `~`: 区分 url 大小写
- `~*`: 不区分 url 大小写
- `^~`: 标志 location 后面的 url 不是正则表达式。如果 url 是正则的形式，则会以字符串的形式匹配。

如，无修饰符，默认匹配最长前缀。

<!-- more -->

示例：

```nginx
location = / {
    [ configuration A ]
}

location / {
    [ configuration B ]
}

location /documents/ {
    [ configuration C ]
}

location ^~ /images/ {
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
    [ configuration E ]
}
```

| 路径                     | 配置 |
| ------------------------ | ---- |
| /                        | A    |
| /index.html              | B    |
| /documents/document.html | C    |
| /images/1.gif            | D    |
| /documents/1.jpg         | E    |

问：为什么 `/documents/1.jpg` 匹配到的是 E 二不是 C ？

答：因为 E 中 url 表达式比 C 中长。
