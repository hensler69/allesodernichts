import os
# Weiche Stadt-Silhouetten ohne Pixel-Fenster: glatte Kanten, nur wenige runde Lichter
import random
OUT = os.path.join(os.environ.get("SHOP_ZIEL", "./shop/"), "assets/img/")  # Zielordner per Umgebungsvariable SHOP_ZIEL
W,H=1600,520
def layer(name, seed, col, col2, hmin, hmax, wmin, wmax, lichter=0):
    r=random.Random(seed); parts=[]; extra=[]; x=-30
    while x<W+30:
        w=r.randint(wmin,wmax); h=r.randint(hmin,hmax); y=H-h; rad=min(10,w//6)
        k=r.random()
        if k<.2:
            parts.append(f'<path d="M{x} {H}V{y+26}Q{x} {y+8} {x+w*.5:.0f} {y}Q{x+w} {y+8} {x+w} {y+26}V{H}Z"/>')
        else:
            parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h+20}" rx="{rad}"/>')
        if lichter and r.random()<lichter:
            ax=x+w//2
            extra.append(f'<circle class="b" cx="{ax}" cy="{y-6}" r="2.6" fill="#ff7a59" style="animation-delay:{r.random()*4:.2f}s"/>')
        x+=w+r.randint(4,14)
    css="<style>.b{animation:b 3.2s ease-in-out infinite}@keyframes b{50%{opacity:.15}}@media (prefers-reduced-motion:reduce){.b{animation:none}}</style>"
    grad=f'<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{col}"/><stop offset="1" stop-color="{col2}"/></linearGradient></defs>'
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice">{css}{grad}<g fill="url(#g)">{"".join(parts)}</g>{"".join(extra)}</svg>'
    open(OUT+name,"w").write(svg); print(name,len(svg))
layer("stadt-fern.svg",7,"#2a2550","#16142c",180,420,50,120)
layer("stadt-mitte.svg",21,"#171633","#0d0d20",120,330,60,140,lichter=.12)
layer("stadt-nah.svg",43,"#0b0b18","#05060c",70,210,90,190)
fav='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc27a"/><stop offset="1" stop-color="#ff7a59"/></linearGradient></defs><rect width="64" height="64" rx="15" fill="#0a0d1c"/><circle cx="32" cy="38" r="15" fill="url(#g)"/><rect x="8" y="38" width="48" height="18" fill="#0a0d1c"/><rect x="12" y="41" width="40" height="3" rx="1.5" fill="#59e3e0"/></svg>'''
open(OUT+"../favicon.svg","w").write(fav)
