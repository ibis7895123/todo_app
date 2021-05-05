# TODO アプリ

なお、こちらのページはモバイルでの閲覧を前提に作成しており、
PC でのデザインについては考慮しておりませんのでご了承いただきたく。

## 使用パッケージ

- eslint(コード規約)
- material-ui(コンポーネント)
- prettier(コード整形)
- react
- react-redux(state 管理)
- @reduxjs/toolkit(redux のツールキット)

## 確認環境(EC2)

http://18.183.216.122:3001

確認環境は AWS EC2 上に React Static をインストールし、サーバを建てております。

## 開発環境構築

1. node.js(ver: 14.x), yarn をインストール
2. `yarn install`で必要なパッケージをインストール
3. `yarn start`でローカルサーバ立ち上げ
4. http://localhost:3000 にアクセスするとアプリを確認可能
