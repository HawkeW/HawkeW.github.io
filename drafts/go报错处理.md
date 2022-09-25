## go报错

1. 连接失败 `A connection attempt failed...`

> A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.

**fix:** 被墙了。修改代理:

```bash
> go env -w GOPROXY=https://goproxy.io,direct
```



