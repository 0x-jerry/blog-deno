---
title: gRPC 在 JS 中的应用
date: 2022-04-28T15:13:02.588Z
tags: [gRPC, TypeScript]
publish: true
---

简单记录一下在 NodeJS 中折腾 gRPC Client 端的相关事情。

<!-- more -->

目前，gRPC 官网关于 NodeJS 的相关资料并不是特别全，不过，参考 Example 也大概知道怎么用了。记录一下关键的几个点：

1. 如何根据 `.proto` 文件生成 TypeScript 的类型
2. 怎么使用 [@grpc/proto-loader] 以及 [@grpc/grpc-js]

准备文件，[v2ray.proto](https://github.com/v2fly/v2ray-core/blob/master/app/stats/command/command.proto)，源代码如下：

```proto
syntax = "proto3";

package v2ray.core.app.stats.command;
option csharp_namespace = "V2Ray.Core.App.Stats.Command";
option go_package = "v2ray.com/core/app/stats/command";
option java_package = "com.v2ray.core.app.stats.command";
option java_multiple_files = true;

message GetStatsRequest {
  // Name of the stat counter.
  string name = 1;
  // Whether or not to reset the counter to fetching its value.
  bool reset = 2;
}

message Stat {
  string name = 1;
  int64 value = 2;
}

message GetStatsResponse {
  Stat stat = 1;
}

message QueryStatsRequest {
  string pattern = 1;
  bool reset = 2;
}

message QueryStatsResponse {
  repeated Stat stat = 1;
}

message SysStatsRequest {}

message SysStatsResponse {
  uint32 NumGoroutine = 1;
  uint32 NumGC = 2;
  uint64 Alloc = 3;
  uint64 TotalAlloc = 4;
  uint64 Sys = 5;
  uint64 Mallocs = 6;
  uint64 Frees = 7;
  uint64 LiveObjects = 8;
  uint64 PauseTotalNs = 9;
  uint32 Uptime = 10;
}

service StatsService {
  rpc GetStats(GetStatsRequest) returns (GetStatsResponse) {}
  rpc QueryStats(QueryStatsRequest) returns (QueryStatsResponse) {}
  rpc GetSysStats(SysStatsRequest) returns (SysStatsResponse) {}
}

message Config {}
```

## 如何生成 TypeScript 类型文件

我是 TypeScript 的重度使用者，现在都不太习惯写 JS 代码了。所以，没有类型提示怎么行呢！好在 gRPC 已经有现成的工具，[proto-loader-gen-types]。

这个工具是包含在 [@grpc/proto-loader] 里的，因此安装 [@grpc/proto-loader] 即可。因为必须指定 `-grpcLib` 参数，因此也需要安装 [@grpc/grpc-js]。

使用例子：

```sh
$(npm bin)/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=src/proto/ grpc/v2ray.proto

# 根据 grpc/v2ray.proto 的内容，生成的类型文件，会存放在 src/proto 中
# 这里的路径，都是相对于执行的目录。
```

## 怎么使用 [@grpc/proto-loader] 和 [@grpc/grpc-js]

一个简单 **Client** 端的例子：

```ts
import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'
import path from 'path'
// 上面生成好的类型文件
import { ProtoGrpcType } from '@/proto/v2ray'

// 载入 proto 文件
const protoFileName = path.resolve('grpc', 'v2ray.proto')

// 加载 proto
const packageDefinition = protoLoader.loadSync(protoFileName, {})
// 将 proto 定义 转换成 gRPC 对象
const grpcObj = grpc.loadPackageDefinition(packageDefinition) as any as ProtoGrpcType

// 具体的实例
const StatsService = grpcObj.v2ray.core.app.stats.command.StatsService

// 根据需要作出调整
const host = 'localhost:10086'
const client = new StatsService(host, grpc.credentials.createInsecure())

client.queryStats(
  {
    pattern: '',
    reset: false,
  },
  (err, val) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(val?.stat)
  },
)
```

**Server** 端的示例可参考 [Create the server](https://grpc.io/docs/languages/node/basics/#server)。

## 参考资料

- [gRPC Node Tutorial][grpc-node-tutorial]
- [@grpc/proto-loader]
- [@grpc/grpc-js]

[grpc-node-tutorial]: https://grpc.io/docs/languages/node/basics/
[@grpc/proto-loader]: https://github.com/grpc/grpc-node/tree/master/packages/proto-loader
[@grpc/grpc-js]: https://github.com/grpc/grpc-node/tree/master/packages/grpc-js
[proto-loader-gen-types]: https://github.com/grpc/grpc-node/tree/master/packages/proto-loader#generating-typescript-types
