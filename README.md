# プロジェクト名

## 概要

このリポジトリは、[プロジェクトの簡単な説明]。GitHub Actions を使って CI/CD パイプラインを構築し、コードの整形やテストを自動化しています。

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. 新しいリポジトリの作成

新しいリポジトリを作成し、リモート URL を設定します。

```bash
git remote set-url origin https://github.com/your-username/new-repo-name.git
```

### 3. 依存関係のインストール

以下のコマンドを実行して、依存関係をインストールします。

```bash
# pnpm を使用する場合
pnpm install

# npm を使用する場合
npm install
```

## エラー解決

### ESLint 設定エラー

もし ESLint で `SyntaxError: Cannot use import statement outside a module` エラーが発生した場合、設定ファイルを `.mjs` にリネームします。

```bash
mv eslint.config.js eslint.config.mjs
```

または、`package.json` に以下を追加します：

```json
{
  "type": "module"
}
```

### Prettier フォーマットエラー

コードのスタイル問題を自動修正するには、以下を実行します。

```bash
# pnpm の場合
pnpm run format -- --write

# npm の場合
npm run format -- --write
```

### テストスクリプトエラー

`Missing script: "test"` エラーが発生した場合、`package.json` にテストスクリプトを追加します。

```json
"scripts": {
  "test": "jest"
}
```

## CI/CD パイプライン

GitHub Actions を使用して、以下の処理を自動化しています：

- コードの整形
- 型チェック
- テストの実行
- `main` ブランチへのマージ後のビルドと自動公開

## 使用方法

- `pnpm run lint` または `npm run lint` でコードの整形を行います
- `pnpm run test` または `npm run test` でテストを実行します
- `pnpm run format` または `npm run format` でコードを整形します
- `pnpm run dev` または `npm run dev` で開発サーバーを起動します

## ライセンス

このプロジェクトは [MIT license] のもとで公開されています。
