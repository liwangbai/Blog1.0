# 服务器部署信息

## 基本信息

| 项目 | 值 |
|------|-----|
| 服务器 | 阿里云轻量应用服务器 |
| IP | 112.74.44.125 |
| 域名 | wpyai.cn |
| 系统 | CentOS + 宝塔面板 |
| Git 仓库 | https://github.com/liwangbai/Blog1.0.git |

## Docker 容器

| 容器名 | 端口 | 用途 |
|--------|------|------|
| `blog` | 3000 | 本博客 |
| `icecream-backend` | 8080 | 冰激凌 App 后端 (Java/Spring Boot) |
| `icecream-redis` | 6379 | Redis |
| `icecream-mysql` | 3306 | MySQL |

```bash
docker ps
```

## Nginx 配置

- 主配置: `/www/server/nginx/conf/nginx.conf`
- 站点配置: `/www/server/panel/vhost/nginx/wpyai.cn.conf`
- 其他站点: `/www/server/panel/vhost/nginx/icecream.conf`
- SSL 证书: `/www/server/panel/vhost/cert/wpyai.cn/`

### 路由规则 (wpyai.cn)

```
/ws/*      → 8080 (聊天 WebSocket)
/api/v1/*  → 8080 (App 接口)
/*         → 3000 (博客)
```

```bash
# 修改 Nginx 配置后重载
nginx -t && systemctl reload nginx
```

## 博客部署

博客代码位于 `/app/blog`。

```bash
# 一键部署
/app/deploy-blog.sh
```

### 部署脚本内容

```bash
#!/bin/bash
cd /app/blog
git pull
docker build -t blog:latest .
docker stop blog
docker rm blog
docker run -d --name blog --restart=always -p 3000:3000 blog:latest
echo "Done! https://wpyai.cn"
```

### 更新流程

1. Mac 上修改代码，commit 并 push:
   ```bash
   cd /Users/wpy/work/workspace/ai/blog1.0
   git add .
   git commit -m "描述改动"
   git push
   ```

2. SSH 到服务器，执行部署:
   ```bash
   ssh root@112.74.44.125
   /app/deploy-blog.sh
   ```

### 故障排查

```bash
# 容器是否运行
docker ps | grep blog

# 容器日志
docker logs blog

# 端口是否在监听
ss -tlnp | grep 3000

# 本地测试
curl http://localhost:3000

# Nginx 日志
tail -f /www/wwwlogs/wpyai.cn.log
tail -f /www/wwwlogs/wpyai.cn.error.log
```

## 注意事项

- 宝塔面板管理 SSL 证书自动续签，不要手动改证书文件
- 修改 Nginx 配置时不要动 `/ws` 和 `/api/` 的 `location` 块，否则 App 接口会断
- 冰激凌 App 接口路径均为 `api/v1/` 开头，与博客路由不冲突
