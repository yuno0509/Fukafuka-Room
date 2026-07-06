/* ふかふかルームの留守番さん（最小構成）
   いまはお家の見張りだけ。ファイルの買い置き（キャッシュ）はしない方針。
   ―― 更新が多いお家では、買い置きは事故のもとだからね。
   将来、通知欄デビュー（showNotification）する時はこの子が働きます。 */
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
