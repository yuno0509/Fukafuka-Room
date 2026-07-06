/* ふかふかルームの留守番さん（B工事版）
   お仕事その1：住民登録（PWAの土台）
   お仕事その2：通知欄に出た声かけがタップされたら、お家を開いて連れて帰る
   ファイルの買い置き（キャッシュ）はしない方針。更新の多いお家では事故のもとだから。 */
self.addEventListener("install", (e) => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const remId = (e.notification.data && e.notification.data.remId) || "";
  const target = "./" + (remId ? "#rem=" + remId : "");
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ("focus" in c) {
          c.focus();
          if (remId && "navigate" in c) { try { c.navigate(target); } catch (_) {} }
          return;
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
