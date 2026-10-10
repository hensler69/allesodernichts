# erzeugt die Data-URI-Kacheln fuer die Punktrampen (Punkte wachsen von oben nach unten)
import urllib.parse
rows=[.6,1.3,2.1,3.0,4.0,5.0,6.0,7.2]
P=10  # Zeilenabstand
W=12
def tile(col):
    h=P*len(rows)
    out=[f"<svg xmlns='http://www.w3.org/2000/svg' width='{W}' height='{h}' viewBox='0 0 {W} {h}'><g fill='{col}'>"]
    for i,r in enumerate(rows):
        y=P*i+P/2
        xs=[6] if i%2==0 else [0,12]
        for x in xs: out.append(f"<circle cx='{x}' cy='{y}' r='{r}'/>")
    out.append("</g></svg>")
    s="".join(out)
    return 'url("data:image/svg+xml,'+urllib.parse.quote(s,safe="/:='\" ")+'")'
for n,c in (('tinte','#1a1530'),('rosa','#ff4f8b'),('blau','#2d5bff')):
    print(f"--rampe-{n}:{tile(c)};")
