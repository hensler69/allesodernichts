import os
from bausteine import *
# Vorschaubild für soziale Netzwerke (1200 x 630) aus der eigenen Zeichnung, nie aus dem Lieferantenfoto.
# Erzeugt og.html; danach mit og.js als Bild aufnehmen und als assets/og-image.jpg speichern.
A = os.path.abspath(os.path.join(OUT, "assets"))
lagen = [("#9cc46e", "scheibe"), ("#ee8a2a", "streifen"), ("#8e3a80", "streifen"), ("#f2d77a", "krumen"), ("#9cc46e", "scheibe")]
html = f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{{font-family:"AB";src:url("{A}/fonts/ArchivoBlack-Regular.woff2")}}
@font-face{{font-family:"AR";src:url("{A}/fonts/Archivo-Medium.woff2")}}
@font-face{{font-family:"SM";src:url("{A}/fonts/SpaceMono-Bold.woff2");font-weight:700}}
html,body{{margin:0;width:1200px;height:630px;overflow:hidden}}
body{{position:relative;background:#dff3a6;background-image:radial-gradient(rgba(18,18,18,.14) 1.3px,transparent 1.6px);background-size:24px 24px;font-family:AR}}
.text{{position:absolute;left:64px;top:70px;width:660px}}
.logo{{display:flex;align-items:center;gap:14px;font:400 32px/1 AB;letter-spacing:.06em;color:#121212}}
.logo svg{{width:48px;height:48px}}
h1{{font:400 72px/1.02 AB;text-transform:uppercase;color:#121212;margin:38px 0 0;letter-spacing:-.015em}}
.hl{{display:inline-block;padding:0 .12em .04em;border:5px solid #121212;box-shadow:8px 8px 0 #121212;background:#ffd23f;transform:rotate(-1.6deg)}}
.hg{{background:#43d36b;transform:rotate(1.4deg)}}
p{{font-size:27px;line-height:1.35;color:#2e3228;margin:34px 0 0;max-width:560px;font-weight:500}}
.chips{{display:flex;gap:14px;margin-top:30px}}
.chips span{{font:700 18px/1 SM;text-transform:uppercase;color:#ffd23f;background:#121212;padding:12px 14px}}
.bild{{position:absolute;right:48px;top:56px;width:440px;background:#43d36b;border:5px solid #121212;box-shadow:12px 12px 0 #121212;padding:18px;
  background-image:repeating-linear-gradient(135deg,rgba(18,18,18,.08) 0 8px,transparent 8px 16px)}}
.bild svg{{width:100%;height:auto;overflow:visible}}
</style></head><body>
<div class="text"><div class="logo">{LOGO_MARK}HORTA</div>
<h1>Weniger <span class="hl">schnippeln.</span><br>Mehr <span class="hl hg">Salat.</span></h1>
<p>Elektrischer Gemüseschneider mit fünf Einsätzen aus Edelstahl.</p>
<div class="chips"><span>Scheiben</span><span>Raspeln</span><span>Reibe</span></div></div>
<div class="bild">{geraet_svg("o", "HORTA", lagen=lagen)}</div>
</body></html>'''
open("og.html", "w", encoding="utf-8").write(html)
print("og.html geschrieben")
