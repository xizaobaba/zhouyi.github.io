# 周易占卜网站

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tryzhouyi)

## 项目部署指南

### 推送到GitHub/GitLab

1. **初始化本地Git仓库**
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   ```

2. **创建远程仓库**
   - GitHub: 访问 https://github.com/new 创建新仓库
   - GitLab: 访问 https://gitlab.com/projects/new 创建新项目

3. **添加远程仓库并推送**
   ```bash
   git remote add origin 你的仓库地址
   git branch -M main
   git push -u origin main
   ```

4. **验证推送**
   - 刷新仓库页面，确认代码已成功上传

### Vercel一键部署

1. 点击上方按钮使用Vercel部署
2. 连接你的GitHub/GitLab账户
3. 选择刚创建的仓库
4. 点击部署，Vercel会自动构建并发布网站

### 传统部署方式

1. 构建生产版本
   ```bash
   pnpm build
   ```
2. 将`dist/static`目录上传到你的静态托管服务

### 百度验证
已添加验证文件`baidu_verify_codeva-ruDynoJUoS.html`到public目录
