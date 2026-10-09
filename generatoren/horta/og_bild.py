import os
from bausteine import *
# Vorschaubild für soziale Netzwerke (1200 x 630) aus der eigenen Zeichnung, nie aus dem Lieferantenfoto.
# Erzeugt og.html; danach mit og.js als Bild aufnehmen und als assets/og-image.jpg speichern.
A = os.path.abspath(os.path.join(OUT, "assets"))
lagen = [("#9cc46e", "scheibe"), ("#ee8a2a", "streifen"), ("#8e3a80", "streifen"), ("#f2d77a", "krumen"), ("#9cc46e", "scheibe")]
html = f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face{{font-family:"Fraunces";src:url("{A}/fonts/Fraunces-SemiBold.woff2");font-weight:600}}
@font-face{{font-family:"Fraunces";src:url("{A}/fonts/Fraunces-MediumItalic.woff2");font-weight:500;font-style:italic}}
@font-face{{font-family:"IS";src:url("{A}/fonts/InstrumentSans-Regular.woff2")}}
html,body{{margin:0;width:1200px;height:630px;overflow:hidden}}
body{{position:relative;background:radial-gradient(60% 80% at 78% 40%,#ffffff,rgba(255,255,255,0) 70%),radial-gradient(50% 60% at 10% 0%,rgba(150,196,118,.25),transparent),linear-gradient(180deg,#fbf8f1,#f1f0e2);font-family:IS}}
.beet{{position:absolute;left:0;right:0;bottom:0;height:150px;opacity:.75}}
.beet img{{width:100%;height:100%;object-fit:cover;object-position:50% 100%}}
.text{{position:absolute;left:72px;top:96px;width:640px}}
.logo{{display:flex;align-items:center;gap:12px;font:600 28px/1 Fraunces;letter-spacing:.2em;color:#1e2b22}}
.logo svg{{width:44px;height:44px}}
h1{{font:600 66px/1.02 Fraunces;letter-spacing:-.03em;color:#1e2b22;margin:46px 0 0}}
h1 em{{font-weight:500;color:#3a7a3a}}
p{{font-size:26px;line-height:1.4;color:#44524a;margin:26px 0 0;max-width:500px}}
.chips{{display:flex;gap:10px;margin-top:30px}}
.chips span{{font:400 19px/1 IS;color:#1e2b22;background:rgba(255,255,255,.85);border:1px solid rgba(30,43,34,.1);padding:11px 16px;border-radius:999px}}
.bild{{position:absolute;right:56px;top:34px;width:490px}}
.bild svg{{width:100%;height:auto;overflow:visible}}
</style></head><body>
<div class="beet"><img src="{A}/img/beet-mitte.svg"></div>
<div class="text"><div class="logo">{LOGO_MARK}HORTA</div>
<h1>Weniger schnippeln.<br>Mehr <em>Salat.</em></h1>
<p>Elektrischer Gemüseschneider mit fünf Einsätzen aus Edelstahl.</p>
<div class="chips"><span>Scheiben</span><span>Raspeln</span><span>Reibe</span></div></div>
<div class="bild">{geraet_svg("o", "HORTA", lagen=lagen)}</div>
</body></html>'''
open("og.html", "w", encoding="utf-8").write(html)
print("og.html geschrieben")
