# erzeugt das Standbild (SVG) des Hero-Bilds fuer den Fall ohne JavaScript
import math,sys
ROSA='#ff4f8b'; BLAU='#2d5bff'; VIO='#2d1c8b'; PAP='#fffaf0'
P=[]
def a(s): P.append(s)
a('<svg class="bild__stand" viewBox="0 0 600 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">')
a('<defs>')
for n,(r,w) in {'1':(1.3,0),'2':(2.7,0),'3':(4.0,0)}.items():
    a(f'<pattern id="sr{n}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(15)"><circle cx="5" cy="5" r="{r}" fill="{ROSA}"/></pattern>')
    a(f'<pattern id="sb{n}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="5" cy="5" r="{r}" fill="{BLAU}"/></pattern>')
a('<linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset=".25" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>')
a('<mask id="sm"><rect width="600" height="600" fill="url(#sg)"/></mask>')
a('</defs>')
a('<g style="mix-blend-mode:multiply">')
a('<circle cx="300" cy="316" r="268" fill="url(#sr1)"/>')
a('<circle cx="300" cy="316" r="268" fill="url(#sr2)" mask="url(#sm)" opacity=".8"/>')
a('<ellipse cx="300" cy="574" rx="240" ry="20" fill="url(#sb2)"/>')
a('</g>')
# Trichter
a(f'<path d="M220 52H380L350 176H250Z" fill="url(#sb2)"/><ellipse cx="300" cy="54" rx="80" ry="13" fill="{VIO}"/>')
a(f'<rect x="262" y="14" width="76" height="104" rx="10" fill="url(#sr3)"/><rect x="246" y="4" width="108" height="22" rx="11" fill="{VIO}"/>')
# Gehaeuse
a('<rect x="160" y="160" width="280" height="306" rx="30" fill="url(#sb3)"/>')
a('<rect x="300" y="160" width="140" height="306" rx="30" fill="url(#sr1)" style="mix-blend-mode:multiply"/>')
a(f'<rect x="178" y="190" width="14" height="246" rx="7" fill="#fbf3e4"/><circle cx="394" cy="428" r="28" fill="#fbf3e4"/><circle cx="394" cy="428" r="19" fill="url(#sr3)"/>')
# Kegel-Einsatz
a(f'<circle cx="300" cy="304" r="126" fill="#fbf3e4"/><circle cx="300" cy="304" r="108" fill="none" stroke="{VIO}" stroke-width="11"/>')
a('<circle cx="300" cy="304" r="100" fill="url(#sr1)"/><circle cx="300" cy="304" r="52" fill="url(#sr2)" opacity=".7"/>')
for i in range(5):
    t=-math.pi/2+i*2*math.pi/5; x=300+math.cos(t)*62; y=304+math.sin(t)*62
    a(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="28" ry="15" transform="rotate({math.degrees(t):.0f} {x:.0f} {y:.0f})" fill="{VIO}"/>')
a(f'<circle cx="300" cy="304" r="22" fill="{VIO}"/><circle cx="300" cy="304" r="8" fill="#fbf3e4"/>')
# Schuessel
a(f'<ellipse cx="300" cy="506" rx="232" ry="36" fill="{VIO}" opacity=".85"/>')
for (x,y,r,c) in [(296,466,46,'r'),(200,480,40,'b'),(394,480,40,'b'),(142,506,34,'r'),(458,508,34,'r'),(246,512,34,'v'),(350,514,34,'v')]:
    f={'r':'url(#sr3)','b':'url(#sb3)','v':VIO}[c]
    a(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f}"/><circle cx="{x}" cy="{y}" r="{r*.6:.0f}" fill="none" stroke="#fbf3e4" stroke-width="{max(5,r*.17):.0f}"/>')
a('<path d="M68 506A232 36 0 0 0 532 506C532 586 430 598 300 598C170 598 68 586 68 506Z" fill="url(#sr2)" style="mix-blend-mode:multiply"/>')
a('<path d="M68 506A232 36 0 0 0 532 506C532 586 430 598 300 598C170 598 68 586 68 506Z" fill="url(#sb1)" style="mix-blend-mode:multiply"/>')
a('<path d="M92 546Q112 584 186 592L192 580Q138 574 114 542Z" fill="#fbf3e4"/>')
a('</svg>')
print("".join(P))
