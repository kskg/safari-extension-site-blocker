# Safari Extention - Site Blocker（仮）

Site Blocker（仮）はMacOSのSafari機能拡張です。  
指定したドメインに属するサイトへのアクセスを制限することができます。

だらだらとインターネットをしてしまう事を防ぎ、  
本来やるべきことに使うための時間を捻出することが狙いです。

主に以下の機能があります。

- 指定したドメインに属するサイトへのアクセスを制限
- アクセスを制限する条件指定（時間帯、曜日）
- 条件別のリスト作成
- アクセスの制限が実行されるとオワタくんが登場します＼(^o^)／


##注意事項
- プログラミング歴半年の初心者が手探りしながらの開発のため、かなり不安定
- 開発中のため、操作しても機能しない項目があります
- 証明書未取得＆パッケージとして配布していないため、機能拡張ビルダーからインストールする必要があります
- ブラウザを終了するとアンインストールされますが、保存したデータはLocalStorageに残っています


## スクリーンショット
![Capture](https://raw.githubusercontent.com/kskg/SiteBlocker/master/capture.png)


## バージョン
0.1


## 動作環境
MacOS Safari 10.1〜  
※上記を基準に開発しているため、それ以外の上位・下位バージョンでの動作は不明


## インストール方法
  - Safariのメニューバー”開発”→”機能拡張ビルダーを表示”
  - ”機能拡張ビルダー”画面の下部にある”＋”アイコンから”機能拡張を追加”を選択
  - 該当ファイルを選択
  - パスワードを入力
  - インストール完了


## 実装予定（自分用メモ）
- パッケージとして配布
  - 証明書を取得してパッケージとして配布

- ダッシュボード画面
  - 視覚的に分かりやすく、美しく

- エラー警告
  - 正しくない記述がある場合に警告を表示

- ツールバー機能
  - ポップアップからドメインをリストへ直接登録

- 制限付き閲覧：カウントダウン
  - 指定した秒数のみサイトのブロックが無効化（例：1日10分までサイト閲覧ができる）
  - カウントのリセットサイクル（毎日、毎週、毎月）
  - カウントを画面に表示

- 制限付き閲覧：ディレイ
  - 指定した秒数後サイトの閲覧が可能になる（例：ページを開いてから30秒後に内容が表示される）

- ジャンプ先の指定
  - サイトがブロックされた際のジャンプ先を指定

- ヘルプ機能
  - 各機能の説明を表示

- 同期機能
  - 別のMacのSafari間での同期

- Firefox、Chromeの対応
  - 同等の機能をFirefox、Chrome用に開発

- 対応言語
  - 英語版の追加
  - 日本語・英語版の切り替え

- その他
  - Add Listを押した時にリスト名を指定してからリストを作成
  - サイドバーのリスト名をオンマウスした時にソートアイコンを表示（現段階でドラッグ＆ドロップでの並び替えは可能）
  - 時間帯指定のテキストフィールドをプルダウン形式に変更
  - 設定完了の通知を操作に支障が無い位置に変更
  - フレームワークの導入（全コードの書き換え）


## ライセンス
MIT Licence


## 作者
[kskg](https://github.com/kskg)