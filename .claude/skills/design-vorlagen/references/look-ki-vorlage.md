# Look: KI-Vorlagen (Gegenbeispiel)

Entwurf in `vorlagen/ki-vorlage/entwurf/Startseite.dc.html` (Design-Fläche, nicht für `shops/`). Gebaut auf ausdrücklichen
Wunsch von Manuel mit genau diesen Stichworten: Lucide-Symbole überall, Badge über der Überschrift, Einblenden beim Scrollen,
Floskel-Texte, Körnung über Verlauf, ungleiche Abstände, Lichtkegel am Cursor, Serif-Kursiv als Akzent, Knöpfe blenden beim
Überfahren aus, Karten mit farbigem Rand.

## Wann
Nur wenn jemand diesen Look ausdrücklich will, zum Beispiel als Parodie, als Vergleich oder um zu zeigen, was man vermeiden
will. Für einen echten Shop nicht empfehlen: Die Texte brechen die Grundregeln (Verbotsliste mit "nahtlos", "einzigartig",
"Leidenschaft" und anderen), und der Look wirkt austauschbar.

## Wie jedes Merkmal gebaut ist
| Merkmal | Umsetzung im Entwurf |
| --- | --- |
| Lucide-Symbole | Inline-SVG aus den Lucide-Pfaden (24 × 24, Strich 2, runde Enden), Klasse `.ic`. Ein Nachladen aus dem Netz ist in der Design-Fläche gesperrt. |
| Badge über der Überschrift | Pille mit pulsierendem Punkt, Symbol und Pfeil (`.badge`), in jedem Abschnittskopf als `.pill` |
| Einblenden beim Scrollen | Nur CSS: `animation-timeline: view()` unter `@supports`, Start bei Deckkraft .14, nur bei `prefers-reduced-motion: no-preference` |
| Floskel-Texte | "Revolutionieren Sie Ihr Küchenerlebnis. Nahtlos, intelligent und einzigartig." Fakten (5 Einsätze, 800 W laut Hersteller, Lieferzeit) bleiben wahr |
| Körnung über Verlauf | SVG-Filter `feTurbulence` als Schicht (`.grain`) mit `mix-blend-mode: overlay` über dem Mehrfach-Verlauf |
| Ungleiche Abstände | Absichtlich: Abschnitte mit 112, 64, 126 und 84 px, Kartenabstände 22/31 und 27/20 px, jede Karte anderes Innenmaß |
| Lichtkegel am Cursor | Kreis (680 px) mit Farbverlauf, per `transform` verschoben; Position aus `--mx` und `--my`, die ein Handler `onMouseMove` am Wurzelelement setzt. Kein Neuzeichnen der Seite |
| Serif-Kursiv | Instrument Serif Kursiv, 1,1-fach, mit Verlauf (`.it .grad`) auf einzelnen Wörtern der Überschrift |
| Knöpfe blenden aus | `transition: opacity .25s`, Hover setzt .7 bis .78 |
| Karten mit farbigem Rand | Eigenschaft `--c` als "r g b", Rand `rgb(var(--c) / .45)`, Symbolkachel in derselben Farbe |

## Regeln
- Beispielstimmen sind erfunden und sichtbar als "Beispiel" markiert.
- Keine erfundenen Zahlen, keine Gesundheitsversprechen, auch nicht als Parodie.
- Dunkler Grund (#07070c), Violett, Himmelblau und Rosa als Verlaufsfarben, Geist als Textschrift.
