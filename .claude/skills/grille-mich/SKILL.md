---
name: grille-mich
description: Grille den Nutzer unerbittlich zu einem Plan, einer Entscheidung oder einer Idee. Ein Interview in Runden, das das Denken schärft, bis jede Verzweigung des Entscheidungsbaums geklärt ist. Nur auf ausdrücklichen Aufruf des Nutzers (/grille-mich, "grill mich", "grille mich").
disable-model-invocation: true
license: MIT
metadata:
  author: Matt Pocock
  source: https://github.com/mattpocock/skills (grill-me + grilling)
  translation: Deutsche Fassung von Jonas Keil (jonaskeil.com)
---

Interviewe den Nutzer unerbittlich, bis ihr ein gemeinsames Verständnis erreicht habt. Bilde das Ganze als **Entscheidungsbaum** ab: Jede Entscheidung verzweigt sich in die Entscheidungen, die von ihr abhängen.

Arbeite den Baum in **Runden** ab. Die **Front** ist die Menge aller Entscheidungen, deren Voraussetzungen bereits geklärt sind: also die Fragen, die du _jetzt_ stellen kannst, ohne Antworten zu erraten, die du noch nicht gehört hast. Stelle die gesamte Front in einer Runde: Nummeriere jede Frage und gib deine empfohlene Antwort dazu. Warte dann auf die Antworten des Nutzers, bevor du die nächste Runde beginnst.

Formatiere eine Runde so:

```
❓ **F1** - **<Titel der Frage>**: <Fragetext, kann mehrere Absätze umfassen, inklusive Auswahlmöglichkeiten>

➡️ <deine empfohlene Antwort>

---

❓ **F2** - **<Titel der Frage>**: <Fragetext, kann mehrere Absätze umfassen, inklusive Auswahlmöglichkeiten>

➡️ <deine empfohlene Antwort>
```

Jede Runde, die der Nutzer beantwortet, formt den Baum neu: Geklärte Entscheidungen schieben die Front nach außen und schalten Fragen frei, die von ihnen abhingen. Berechne die Front neu und stelle die nächste Runde. Eine Frage, deren Antwort von einer anderen, in dieser Runde noch offenen Frage abhängt, gehört in eine _spätere_ Runde, nicht in diese.

_Fakten_ zu finden ist deine Aufgabe, niemals die des Nutzers. Wenn eine Frage der Front einen Fakt aus der Umgebung braucht (Dateisystem, Tools usw.), schicke einen Sub-Agenten los, der ihn ermittelt; frage den Nutzer nach nichts, was du selbst nachschlagen könntest. Blockiere dabei nicht: Eine laufende Recherche ist eine ungeklärte Voraussetzung, also warten nur die Fragen, die davon abhängen, auf den Bericht des Sub-Agenten; den Rest der Front stellst du sofort. Die _Entscheidungen_ gehören dem Nutzer: Lege ihm jede einzelne vor und warte.

Die Sitzung ist beendet, wenn die Front leer ist: jede Verzweigung des Entscheidungsbaums besucht, nichts mehr stillschweigend angenommen. Handle erst dann danach, wenn der Nutzer bestätigt hat, dass ihr ein gemeinsames Verständnis erreicht habt.
